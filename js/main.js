let users = JSON.parse(localStorage.getItem('users')) || [];

function showRegister() {
  document.getElementById('register').style.display = 'block';
  document.getElementById('login').style.display = 'none';
}

function showLogin() {
  document.getElementById('login').style.display = 'block';
  document.getElementById('register').style.display = 'none';
}

document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  if (users.some(user => user.email === email)) {
    document.getElementById('registerMessage').textContent = 'Email already registered. Please use a different email.';
  } else {
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    showLogin();
  }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    document.getElementById('username').textContent = user.name;
    showHome();
  } else {
    document.getElementById('loginMessage').textContent = 'Invalid email or password.';
  }
});

function showHome() {
  document.getElementById('register').style.display = 'none';
  document.getElementById('login').style.display = 'none';
  document.getElementById('home').style.display = 'block';
}

function logout() {
  localStorage.removeItem('currentUser');
  showLogin();
}

window.onload = function() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    document.getElementById('username').textContent = currentUser.name;
    showHome();
  } else {
    showLogin();
  }
};