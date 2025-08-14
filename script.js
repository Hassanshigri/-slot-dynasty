// Navigation Highlighting
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    const mappings = {
        '/': 'home',
        '/games/': 'games',
        '/contact/': 'contact',
        '/responsible-gaming/': 'responsible-gaming',
        '/login/': 'login',
        '/privacy/': 'privacy',
        '/terms/': 'terms',
        '/cookies/': 'cookies'
    };
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (mappings[href] === mappings[currentPath]) {
            link.classList.add('text-dynasty-gold', 'font-bold');
        } else {
            link.classList.remove('text-dynasty-gold', 'font-bold');
        }
    });
}

// User Status Check
function checkUserStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user) {
        document.getElementById('loggedOutSection').classList.add('hidden');
        document.getElementById('loggedInSection').classList.remove('hidden');
        document.getElementById('userWelcome').textContent = `Welcome, ${user.username} • ${user.coins.toLocaleString()} Coins`;
        if (window.location.pathname === '/login/') {
            window.location.href = '/games/';
        }
    } else {
        document.getElementById('loggedOutSection').classList.remove('hidden');
        document.getElementById('loggedInSection').classList.add('hidden');
    }
}

// Login Function
function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Simulate login (in real app, validate against a database)
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

// Register Function
function register(event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;

    const user = {
        username: username,
        email: email,
        coins: 5000,
        registrationDate: new Date().toISOString()
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    closeRegisterModal();
    alert(`🎉 Welcome to SlotDynasty, ${username}! You've received 5,000 free coins!`);
    window.location.href = '/games/';
}

// Modal Functions
function showRegisterModal() {
    document.getElementById('registerModal').classList.remove('hidden');
}

function closeRegisterModal() {
    document.getElementById('registerModal').classList.add('hidden');
}

function verifyAge(isOver18) {
    if (isOver18) {
        localStorage.setItem('ageVerified', 'true');
        document.getElementById('ageModal').classList.add('hidden');
    } else {
        alert('You must be 18 or older to access SlotDynasty.');
        window.location.href = 'https://www.google.com';
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookieConsent').classList.add('hidden');
}

function declineCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    document.getElementById('cookieConsent').classList.add('hidden');
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
}

// Game Functions
function filterGames(provider) {
    const cards = document.querySelectorAll('.game-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        btn.className = 'filter-btn bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded button-hover';
    });
    
    event.target.className = 'filter-btn bg-dynasty-gold text-black px-4 py-2 rounded font-bold button-hover';
    
    cards.forEach(card => {
        if (provider === 'all' || card.classList.contains(provider)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function playGame(gameId, gameName, gameUrl) {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) {
        document.getElementById('loginRequiredModal').classList.remove('hidden');
        return;
    }

    document.getElementById('gameTitle').textContent = gameName;
    document.getElementById('gameModal').classList.remove('hidden');
    
    setTimeout(() => {
        document.getElementById('gameFrame').innerHTML = `
            <iframe 
                src="${gameUrl}" 
                class="w-full h-full rounded max-w-full max-h-full" 
                frameborder="0" 
                allow="autoplay; encrypted-media" 
                sandbox="allow-same-origin allow-scripts allow-fullscreen"
                title="${gameName} Demo"
            ></iframe>
        `;
    }, 2000);
}

function closeGame() {
    document.getElementById('gameModal').classList.add('hidden');
    document.getElementById('gameFrame').innerHTML = `
        <div class="text-center h-full flex items-center justify-center">
            <div>
                <div class="text-6xl mb-4">🎰</div>
                <h4 class="text-2xl font-bold text-dynasty-gold mb-2">Game Loading...</h4>
                <p class="text-gray-400">Preparing your gaming experience</p>
                <div class="mt-4">
                    <div class="animate-spin w-8 h-8 border-4 border-dynasty-gold border-t-transparent rounded-full mx-auto"></div>
                </div>
            </div>
        </div>
    `;
}

function closeLoginModal() {
    document.getElementById('loginRequiredModal').classList.add('hidden');
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', function() {
    highlightActiveLink();
    checkUserStatus();
    
    if (!localStorage.getItem('ageVerified')) {
        document.getElementById('ageModal').classList.remove('hidden');
    }
    
    if (!localStorage.getItem('cookiesAccepted')) {
        document.getElementById('cookieConsent').classList.remove('hidden');
    }
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});