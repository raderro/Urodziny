document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const loginContainer = document.getElementById('login-container');
    
    //const targetDate = new Date(2024, 7, 9, 0, 0, 0).getTime();
    const targetDate = new Date(2024, 4, 9, 0, 0, 0).getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown-container').style.display = 'none';
            document.getElementById('body').style.backgroundImage = "url('bg.jpg')";
            loginContainer.style.display = 'block';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}D ${hours}H ${minutes}M ${seconds}S`;
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();

    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const correctUsername = 'admin';
        const correctPassword = 'password123';

        if (username === correctUsername && password === correctPassword) {
            window.location.href = 'happy_birthday.html';
        } else {
            alert('Nieprawidłowy login lub hasło');
        }
    });
});