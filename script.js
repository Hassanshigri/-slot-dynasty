function checkAgeVerification() {
    const ageVerified = localStorage.getItem('ageVerified');
    if (!ageVerified) {
        document.getElementById('ageModal').classList.remove('hidden');
    } else {
        checkCookieConsent();
    }
}

function verifyAge(isOver18) {
    if (isOver18) {
        localStorage.setItem('ageVerified', 'true');
        document.getElementById('ageModal').classList.add('hidden');
        checkCookieConsent();
    } else {
        alert('You must be 18 or older to access this site.');
        window.location.href = 'https://www.google.com';
    }
}

function checkCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        document.getElementById('cookieConsent').classList.remove('hidden');
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookieConsent').classList.add('hidden');
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookieConsent').classList.add('hidden');
}

function checkUserStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user) {
        document.getElementById('loggedOutSection').classList.add('hidden');
        document.getElementById('loggedInSection').classList.remove('hidden');
        document.getElementById('userWelcome').textContent = `Welcome, ${user.username} • ${user.coins.toLocaleString()} Coins`;
        if (window.location.pathname === '/login/') {
            window.location.href = '/games/';
        }
    }
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('nav a[data-page]');
    links.forEach(link => {
        const page = link.getAttribute('data-page');
        link.classList.remove('text-dynasty-gold');
        if (
            (page === 'home' && currentPath === '/') ||
            (page === 'games' && currentPath.startsWith('/games/')) ||
            (page === 'contact' && currentPath.startsWith('/contact/')) ||
            (page === 'responsible-gaming' && currentPath.startsWith('/responsible-gaming/'))
        ) {
            link.classList.add('text-dynasty-gold');
        }
    });
}

function showRegisterModal() {
    document.getElementById('registerModal').classList.remove('hidden');
}

function closeRegisterModal() {
    document.getElementById('registerModal').classList.add('hidden');
}

function register(event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    const user = {
        username: username,
        email: email,
        coins: 5000,
        registrationDate: new Date().toISOString()
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    closeRegisterModal();
    checkUserStatus();
    alert(`🎉 Welcome to SlotDynasty, ${username}! You've received 5,000 free coins to get started!`);
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = {
        username: username,
        email: username.includes('@') ? username : `${username}@example.com`,
        coins: Math.floor(Math.random() * 50000) + 5000,
        loginDate: new Date().toISOString()
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    alert(`🎉 Welcome back, ${username}! You have ${user.coins.toLocaleString()} coins available.`);
    window.location.href = '/games/';
}

function submitContactForm(event) {
    event.preventDefault();
    document.getElementById('contactForm').reset();
    document.getElementById('contactSuccessModal').classList.remove('hidden');
}

function closeContactSuccessModal() {
    document.getElementById('contactSuccessModal').classList.add('hidden');
}

function playGame(gameId, gameName, gameUrl) {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) {
        document.getElementById('loginRequiredModal').classList.remove('hidden');
        return;
    }

    document.getElementById('gameTitle').textContent = gameName;
    document.getElementById('gameFrame').src = gameUrl;
    document.getElementById('gameModal').classList.remove('hidden');
}

function closeGame() {
    document.getElementById('gameModal').classList.add('hidden');
    document.getElementById('gameFrame').src = '';
}

function closeLoginModal() {
    resetGameModal();
    document.getElementById('loginRequiredModal').classList.add('hidden');
}

function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
}

function resetGameModal() {
    document.getElementById('gameModal').classList.add('hidden');
    document.getElementById('gameFrame').src = '';
}

document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', function() {
    checkAgeVerification();
    checkUserStatus();
    highlightActiveLink();
});