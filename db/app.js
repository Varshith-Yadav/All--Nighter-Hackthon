document.addEventListener('DOMContentLoaded', () => {
    // Check login status on page load
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        showDashboard();
    } else {
        document.getElementById('signup-section').style.display = 'block';
    }
});

document.getElementById('signup-btn').addEventListener('click', () => {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (username && email && password) {
        // Store user data in local storage
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password); // Note: Storing passwords in local storage is not secure and should not be used in production.

        alert('Sign-Up Successful');
        document.getElementById('signup-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
    } else {
        alert('Please fill in all fields');
    }
});

document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Retrieve stored data from local storage
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
        alert('Login Successful');
        localStorage.setItem('isLoggedIn', true); // Set login status
        showDashboard();
    } else {
        alert('Invalid credentials');
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn'); // Remove login status
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'block';
});

function showDashboard() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';

    // Display user info on dashboard
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    document.getElementById('user-info').innerText = `Username: ${username}, Email: ${email}`;
}
