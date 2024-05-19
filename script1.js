document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const prezent = document.getElementById('prezent');
    const gameOverDiv = document.getElementById('game-over');
    const gift = document.getElementById('gift');
    const giftButton = document.getElementById('gift-button');
    const giftImage = document.getElementById('gift-image');
    const dostarczono = document.getElementById('dostarczono');
    const particlesDiv = document.getElementById('particles');
    const images = [
        'images/birthday1.jpg', 'images/birthday1.jpg', 'images/menu_zdj.png', 'images/menu_zdj.png', 'images/lena.png', 'images/lena.png', 'images/ola.png', 'images/ola.png',
        'images/zuza.png', 'images/zuza.png', 'images/emilia.png', 'images/emilia.png', 'images/oliwia.png', 'images/oliwia.png', 'images/victoria.png', 'images/victoria.png'
    ];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;

    // Shuffle images
    images.sort(() => 0.5 - Math.random());

    // Create cards
    images.forEach((imageSrc) => {
        const card = document.createElement('div');
        card.classList.add('card');
        const img = document.createElement('img');
        img.src = imageSrc;
        card.appendChild(img);
        board.appendChild(card);

        card.addEventListener('click', () => {
            if (lockBoard || card === firstCard) return;

            card.classList.add('flipped');

            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                lockBoard = true;

                setTimeout(() => {
                    if (firstCard.querySelector('img').src === secondCard.querySelector('img').src) {
                        firstCard.style.visibility = 'hidden';
                        secondCard.style.visibility = 'hidden';
                        matchedPairs++;
                        if (matchedPairs === images.length / 2) {
                            gameOver();
                        }
                    } else {
                        firstCard.classList.remove('flipped');
                        secondCard.classList.remove('flipped');
                    }

                    firstCard = null;
                    secondCard = null;
                    lockBoard = false;
                }, 1000);
            }
        });
        WiadomoscDostarczona();
    });

    function gameOver() {
        board.remove();
        prezent.remove();
        gameOverDiv.style.display = 'block';
        gift.style.display = 'block';
        startParticles();
    }

    giftButton.addEventListener('click', () => {
        openGift();
   });

    function openGift() {
        giftButton.remove();
        giftImage.src = 'images/gratki.jpg';
    }

    function WiadomoscDostarczona() {
        const now = new Date().getTime();
        const hours = Math.floor((now % ((1000 * 60 * 60 * 24)) / (1000 * 60 * 60))+2);
        const minutes = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));

        dostarczono.textContent = 'Dostarczono: ' + hours+":"+minutes;
    }

    function startParticles() {
        const particleCount = 100;
        const emojis = ['🎉', '🎂', '🎁', '🎈', '🎊'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particlesDiv.appendChild(particle);
        }

        animateParticles();
    }

    function animateParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const animationDuration = Math.random() * 3 + 2 + 's';
            const animationDelay = Math.random() * 5 + 's';
            const fontSize = Math.random() * 24 + 16 + 'px';

            particle.style.animationDuration = animationDuration;
            particle.style.animationDelay = animationDelay;
            particle.style.fontSize = fontSize;
            particle.style.left = Math.random() * 100 + 'vw';

            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        });
    }
});