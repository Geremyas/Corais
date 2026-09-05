document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // Carrossel Simples de Destaques (3 Abas)
    // ==========================================================================
    function initDestaquesCarousel() {
        const tabs = document.querySelectorAll('.destaques-tab-content');
        const dots = document.querySelectorAll('#destaquesDots .dot');
        const prevBtn = document.getElementById('destaquesPrevBtn');
        const nextBtn = document.getElementById('destaquesNextBtn');

        if (!tabs.length) return; // Só roda se a seção existir na página

        let currentIndex = 0;

        function showTab(index) {
            // Lógica de loop contínuo (vai para o último se clicar voltar no primeiro)
            if (index < 0) {
                index = tabs.length - 1;
            } else if (index >= tabs.length) {
                index = 0;
            }

            currentIndex = index;

            // Ativa apenas a aba correspondente e esconde as outras
            tabs.forEach((tab, i) => {
                if (i === currentIndex) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });

            // Atualiza a bolinha ativa
            if (dots.length) {
                dots.forEach((dot, i) => {
                    if (i === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }

        // Cliques nas setas
        if (prevBtn) {
            prevBtn.addEventListener('click', () => showTab(currentIndex - 1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => showTab(currentIndex + 1));
        }

        // Cliques nas bolinhas (dots)
        if (dots.length) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => showTab(index));
            });
        }
    }

    // Inicializa o carrossel quando a página carrega
    document.addEventListener('DOMContentLoaded', () => {
        initDestaquesCarousel();
    });

    // =========================================================================
    // Função Auxiliar Genérica de Transição por Abas (Slider Manual)
    // =========================================================================
    const createTabSlider = (tabsSelector, dotsSelector, prevBtnId, nextBtnId) => {
        const tabs = document.querySelectorAll(tabsSelector);
        const dots = document.querySelectorAll(dotsSelector);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        let currentTab = 0;
        const totalTabs = tabs.length;
        let isAnimating = false;

        const switchTab = (targetTab) => {
            if (isAnimating || targetTab === currentTab) return;
            isAnimating = true;

            const currentElement = tabs[currentTab];
            let nextTab = targetTab;

            if (nextTab >= totalTabs) nextTab = 0;
            if (nextTab < 0) nextTab = totalTabs - 1;

            const nextElement = tabs[nextTab];
            const isNext = targetTab > currentTab || (currentTab === totalTabs - 1 && targetTab === 0);

            setTimeout(() => {
                currentElement.classList.add(isNext ? 'slide-out-right' : 'slide-out-left');

                setTimeout(() => {
                    currentElement.classList.remove('active', 'slide-out-right', 'slide-out-left');
                    nextElement.classList.add('active', isNext ? 'slide-in-right' : 'slide-in-left');

                    setTimeout(() => {
                        nextElement.classList.remove('slide-in-right', 'slide-in-left');
                        currentTab = nextTab;
                        updateDots();
                        isAnimating = false;
                    }, 300);
                }, 200);
            }, 150);
        };

        const updateDots = () => {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentTab);
            });
        };

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => switchTab(currentTab + 1));
            prevBtn.addEventListener('click', () => switchTab(currentTab - 1));
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => switchTab(index));
        });
    };

    // 1. Instância para "Destaques da Semana"
    createTabSlider(
        '#destaquesSection .destaques-tab-content',
        '#destaquesDots .dot',
        'destaquesPrevBtn',
        'destaquesNextBtn'
    );

    // 2. Instância para "Cabeçalho da Seção" (Grid de 2 Colunas / 6 Itens)
    createTabSlider(
        '#grid2Section .grid2-tab-content',
        '#grid2Dots .dot',
        'grid2PrevBtn',
        'grid2NextBtn'
    );

    // =========================================================================
    // 3. Lógica do Carrossel "Mais Vendidos" (3 Abas + Auto-Play a cada 5s)
    // =========================================================================
    const tabs = document.querySelectorAll('#maisVendidosSection .tab-content');
    const mvDots = document.querySelectorAll('#maisVendidosDots .dot');
    let currentTab = 0;
    const totalTabs = tabs.length;
    let isTabAnimating = false;
    let autoPlayInterval = null;

    const switchTab = (targetTab) => {
        if (isTabAnimating || targetTab === currentTab) return;
        isTabAnimating = true;

        const currentElement = tabs[currentTab];
        let nextTab = targetTab;

        if (nextTab >= totalTabs) nextTab = 0;
        if (nextTab < 0) nextTab = totalTabs - 1;

        const nextElement = tabs[nextTab];
        const isNext = targetTab > currentTab || (currentTab === totalTabs - 1 && targetTab === 0);

        setTimeout(() => {
            currentElement.classList.add(isNext ? 'slide-out-right' : 'slide-out-left');

            setTimeout(() => {
                currentElement.classList.remove('active', 'slide-out-right', 'slide-out-left');
                nextElement.classList.add('active', isNext ? 'slide-in-right' : 'slide-in-left');

                setTimeout(() => {
                    nextElement.classList.remove('slide-in-right', 'slide-in-left');
                    currentTab = nextTab;
                    updateMvDots();
                    isTabAnimating = false;
                }, 300);
            }, 200);
        }, 150);
    };

    const updateMvDots = () => {
        mvDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTab);
        });
    };

    mvDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            resetAutoPlay();
            switchTab(index);
        });
    });

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            switchTab(currentTab + 1);
        }, 5000);
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    if (tabs.length > 0) {
        startAutoPlay();
    }
});

/*about1*/
// =========================================================================
// Validação de Login e Cadastro
// =========================================================================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPassword').value;

        if (email && pass) {
            alert(`Login realizado com sucesso!\nBem-vindo(a), ${email}`);
            // Exemplo de redirecionamento após o login:
            // window.location.href = '../index.html';
        }
    });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pass = document.getElementById('regPassword').value;
        const confirmPass = document.getElementById('regConfirmPassword').value;

        if (pass !== confirmPass) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }

        const nome = document.getElementById('regNome').value;
        alert(`Cadastro realizado com sucesso!\nSeja bem-vindo(a), ${nome}!`);
        // Exemplo de redirecionamento após o cadastro:
        // window.location.href = 'login.html';
    });
}

// Insira aqui a URL da sua implantação do Apps Script (terminada em /exec)
const API_URL = "https://script.google.com/macros/s/AKfycbybcLXMnXkbJvAEklR5olz3BQUyF8HGyIqSjUnbd3lGB7GDxBHR2iD-o6eRbJ2-YhZU/exec";

// Função para gerar o Hash SHA-256 com Salt
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + "CoraisModasSalt2026");
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. Cadastro Seguro
    // =========================================================================
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('regNome').value;
            const sobrenome = document.getElementById('regSobrenome').value;
            const email = document.getElementById('regEmail').value;
            const senha = document.getElementById('regPassword').value;
            const confirmSenha = document.getElementById('regConfirmPassword').value;
            const submitBtn = registerForm.querySelector('button[type="submit"]');

            if (senha !== confirmSenha) {
                alert('As senhas não coincidem. Por favor, tente novamente.');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerText = "Cadastrando...";

            try {
                const passwordHash = await hashPassword(senha);

                const payload = {
                    action: 'register',
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    passwordHash: passwordHash
                };

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(payload)
                });

                const textData = await response.text();
                const result = JSON.parse(textData);

                if (result.status === 'success') {
                    alert(result.message);
                    window.location.href = 'login.html';
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Erro no cadastro:', error);
                alert('Ocorreu um erro ao conectar com o servidor. Tente novamente.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = "Cadastrar";
            }
        });
    }

    // =========================================================================
    // 2. Login Seguro
    // =========================================================================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const senha = document.getElementById('loginPassword').value;
            const submitBtn = loginForm.querySelector('button[type="submit"]');

            submitBtn.disabled = true;
            submitBtn.innerText = "Verificando...";

            try {
                const passwordHash = await hashPassword(senha);

                const payload = {
                    action: 'login',
                    email: email,
                    passwordHash: passwordHash
                };

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(payload)
                });

                // Converte a resposta primeiro para texto para evitar a falha do JSON
                const textData = await response.text();
                const result = JSON.parse(textData);

                if (result.status === 'success') {
                    alert(`Bem-vindo(a) de volta, ${result.nome}!`);
                    window.location.href = '../index.html';
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Erro no login:', error);
                alert('Ocorreu um erro ao validar o login. Tente novamente.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = "Entrar";
            }
        });
    }

    // =========================================================================
    // Sistema Completo de Carrinho de Compras (LocalStorage)
    // =========================================================================
    const cartOpenBtn = document.getElementById('cartOpenBtn');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartOffcanvas = document.getElementById('cartOffcanvas');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartCount = document.getElementById('cartCount');
    const cartTotalValue = document.getElementById('cartTotalValue');
    const addToCartBtn = document.querySelector('.btn-add-cart');
    const sizeButtons = document.querySelectorAll('.size-btn');

    // Inicializa a lista de itens pegando do LocalStorage
    let cart = JSON.parse(localStorage.getItem('corais_cart')) || [];

    // Garante que itens antigos do cache tenham a propriedade "quantity"
    cart = cart.map(item => ({ ...item, quantity: item.quantity || 1 }));

    function toggleCart() {
        if (cartOverlay) cartOverlay.classList.toggle('active');
        if (cartOffcanvas) cartOffcanvas.classList.toggle('active');
    }

    if (cartOpenBtn) cartOpenBtn.addEventListener('click', toggleCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    if (sizeButtons.length > 0) {
        sizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                sizeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    function updateCartUI() {
        // 1. Salva e atualiza contadores gerais
        localStorage.setItem('corais_cart', JSON.stringify(cart));
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        if (cartCount) cartCount.innerText = totalItems;

        let total = 0;

        // 2. Atualiza o Carrinho Lateral (Offcanvas)
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align:center; color:#666; margin-top: 20px;">Seu carrinho está vazio.</p>';
            }
        }

        // 3. Atualiza a Página Dedicada de Carrinho (carrinho.html)
        const cartPageItems = document.getElementById('cartPageItems');
        const cartPageSubtotal = document.getElementById('cartPageSubtotal');
        const cartPageTotal = document.getElementById('cartPageTotal');

        if (cartPageItems) {
            cartPageItems.innerHTML = '';
            if (cart.length === 0) {
                cartPageItems.innerHTML = '<p style="padding: 40px 0; color: #666; font-size: 18px;">Você ainda não adicionou nenhum produto.</p>';
            }
        }

        // 4. Monta os Itens e calcula valores
        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            const precoFormatado = subtotal.toFixed(2).replace('.', ',');

            // Constrói HTML para a Aba Lateral (Se existir na página)
            if (cartItemsContainer && cart.length > 0) {
                cartItemsContainer.innerHTML += `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>Tam: ${item.size}</p>
                            <div class="cart-quantity-controls">
                                <button onclick="changeQuantity(${index}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="changeQuantity(${index}, 1)">+</button>
                            </div>
                        </div>
                        <div class="cart-item-price-actions">
                            <div class="cart-item-price">R$ ${precoFormatado}</div>
                            <button class="cart-item-remove" onclick="removeFromCart(${index})">Remover</button>
                        </div>
                    </div>
                `;
            }

            // Constrói HTML para a Página Completa (Se estiver na página carrinho.html)
            if (cartPageItems && cart.length > 0) {
                cartPageItems.innerHTML += `
                    <div class="cart-page-item">
                        <div class="cart-page-item-info">
                            <h4>${item.name}</h4>
                            <p>Tamanho: ${item.size}</p>
                            <button class="cart-page-item-remove" onclick="removeFromCart(${index})">Remover item</button>
                        </div>
                        
                        <div class="cart-quantity-controls">
                            <button onclick="changeQuantity(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQuantity(${index}, 1)">+</button>
                        </div>

                        <div class="cart-page-item-price" style="font-weight: bold; font-size: 18px;">
                            R$ ${precoFormatado}
                        </div>
                    </div>
                `;
            }
        });

        // 5. Atualiza os totais nas telas
        const totalFormatado = `R$ ${total.toFixed(2).replace('.', ',')}`;

        if (cartTotalValue) cartTotalValue.innerText = totalFormatado; // Total do offcanvas

        if (cartPageSubtotal && cartPageTotal) {
            cartPageSubtotal.innerText = totalFormatado; // Subtotal da página inteira
            cartPageTotal.innerText = totalFormatado; // Total da página inteira
        }
    }

    // Função para alterar a quantidade (+ ou -)
    window.changeQuantity = function (index, delta) {
        if (cart[index]) {
            cart[index].quantity += delta;

            // Se a quantidade chegar a zero, remove o item do carrinho
            if (cart[index].quantity <= 0) {
                removeFromCart(index);
            } else {
                updateCartUI();
            }
        }
    };

    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        updateCartUI();
    };

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const selectedSizeBtn = document.querySelector('.size-btn.active');

            if (selectedSizeBtn) {
                const tamanhoEscolhido = selectedSizeBtn.innerText;
                const nomeProduto = document.querySelector('.product-title').innerText;
                const precoTexto = document.querySelector('.product-price').innerText.replace('R$', '').replace(',', '.').trim();
                const precoCalculado = parseFloat(precoTexto);

                // Verifica se o item JÁ EXISTE no carrinho com o mesmo tamanho
                const itemExistenteIndex = cart.findIndex(item => item.name === nomeProduto && item.size === tamanhoEscolhido);

                if (itemExistenteIndex > -1) {
                    // Se existir, apenas aumenta a quantidade em 1
                    cart[itemExistenteIndex].quantity += 1;
                } else {
                    // Se não existir, cria um novo item com quantity = 1
                    cart.push({
                        name: nomeProduto,
                        size: tamanhoEscolhido,
                        price: precoCalculado,
                        quantity: 1
                    });
                }

                updateCartUI();
                toggleCart(); // Abre o carrinho
            } else {
                alert('Por favor, selecione um tamanho antes de adicionar ao carrinho.');
            }
        });
    }

    // Renderiza a primeira vez
    updateCartUI();

});
/*lgre*/