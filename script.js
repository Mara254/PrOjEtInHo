// Função para salvar os dados de cadastro no localStorage
function saveUserData(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Adiciona o novo usuário
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para verificar se o login é válido
function checkLogin(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.email === email && user.password === password);
}

// Cadastro
document.getElementById('cadastro-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verifica se o e-mail já está cadastrado
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        alert('Este e-mail já está cadastrado!');
    } else {
        saveUserData(email, password);
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html'; // Redireciona para o login
    }
});

// Login
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (checkLogin(email, password)) {
        window.location.href = 'dashboard.html'; // Redireciona para a dashboard
    } else {
        alert('E-mail ou senha incorretos!');
    }
});

// Exibir o nome de usuário na dashboard
if (document.getElementById('username-display')) {
    const user = JSON.parse(localStorage.getItem('users'))?.find(u => u.email);
    if (user) {
        document.getElementById('username-display').textContent = user.email.split('@')[0]; // Exibe a parte do e-mail antes do '@'
    } else {
        window.location.href = 'login.html'; // Se não estiver logado, redireciona para login
    }
}

// Logout
document.getElementById('logout')?.addEventListener('click', function() {
    localStorage.removeItem('user');
    window.location.href = 'login.html'; // Redireciona para login
});
