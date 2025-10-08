// XXperiment - Vanilla JavaScript Application

// ==================== DATA ====================
const vinylSections = [
    { title: "Who we are", slug: "who", angle: 225, copy: "We're a small, scrappy crew obsessed with evidence, empathy, and telling women's health stories the way they deserve to be told — nuanced, nerdy, and never boring." },
    { title: "Purpose", slug: "purpose", angle: 315, copy: "Cut the noise. We bring science-backed clarity to the stuff that actually shapes life in an XX body — hormones, training, mental load, relationships, and the systems around them." },
    { title: "Hosts", slug: "hosts", angle: 45, copy: "Hosted by two friends who toggle between PubMed and playlists — with researchers, athletes, founders, and community voices joining at the table." },
    { title: "How to listen", slug: "listen", angle: 135, copy: "Subscribe on your favorite app, or read episode notes on our site. New shows drop weekly. Bring coffee. Or creatine. Or both." }
];

const episodes = [
    {
        id: 's1e5-episode-5',
        title: 'EP 07 • Cycle-Syncing 101',
        meta: 'EP 07 • 42 MIN',
        description: 'Training with your hormones — luteal cravings, follicular fire, and workout hacks with a sports endocrinologist.',
        cover: 'linear-gradient(135deg, #d4a574, #8b4513)',
        youtubeId: 'dQw4w9WgXcQ',
        number: 'EP 07',
        duration: '42 MIN',
        season: 'Season 1',
        guest: {
            name: 'Dr. Sarah Johnson',
            title: 'Sports Endocrinologist',
            bio: 'Leading expert in women\'s hormonal health with 15+ years of research experience.'
        }
    },
    {
        id: 's1e4-episode-4',
        title: 'EP 06 • Skin, Stress & Sleep',
        meta: 'EP 06 • 38 MIN',
        description: 'The real glow-up: dermatologists and data collide. Night routines, cortisol spikes, and why SPF is a love language.',
        cover: 'linear-gradient(135deg, #f4c2a1, #d2691e)',
        youtubeId: 'dQw4w9WgXcQ',
        number: 'EP 06',
        duration: '38 MIN',
        season: 'Season 1',
        guest: {
            name: 'Dr. Emily Chen',
            title: 'Dermatologist',
            bio: 'Specialist in skin health and the connection between stress, sleep, and skin conditions.'
        }
    },
    {
        id: 's1e3-episode-3',
        title: 'EP 05 • Money Talks',
        meta: 'EP 05 • 51 MIN',
        description: 'Raises, rizz & refusing to shrink. Negotiation scripts that slap and making the bag without losing your mind.',
        cover: 'linear-gradient(135deg, #2d4a3e, #1a5f3f)',
        youtubeId: 'dQw4w9WgXcQ',
        number: 'EP 05',
        duration: '51 MIN',
        season: 'Season 1',
        guest: {
            name: 'Alex Rodriguez',
            title: 'Career Coach',
            bio: 'Expert in negotiation strategies and career advancement for women in the workplace.'
        }
    },
    {
        id: 's1e2-episode-2',
        title: 'EP 04 • The Friendship Files',
        meta: 'EP 04 • 35 MIN',
        description: 'Why female friendships hit different — the psychology, the drama, and the unbreakable bonds that define us.',
        cover: 'linear-gradient(135deg, #9b4444, #654321)',
        youtubeId: 'dQw4w9WgXcQ',
        number: 'EP 04',
        duration: '35 MIN',
        season: 'Season 1',
        guest: {
            name: 'Dr. Lisa Park',
            title: 'Social Psychologist',
            bio: 'Researcher specializing in female relationships and the psychology of friendship dynamics.'
        }
    },
    {
        id: 's1e1-episode-1',
        title: 'EP 03 • Hormonal Intelligence',
        meta: 'EP 03 • 47 MIN',
        description: 'Beyond PMS — understanding your cycle as a superpower, not a sentence. Science meets self-advocacy.',
        cover: 'linear-gradient(135deg, #5d4e6d, #8a2be2)',
        youtubeId: 'dQw4w9WgXcQ',
        number: 'EP 03',
        duration: '47 MIN',
        season: 'Season 1',
        guest: {
            name: 'Dr. Maria Santos',
            title: 'Endocrinologist',
            bio: 'Specialist in hormonal health and cycle optimization for women of all ages.'
        }
    }
];

// ==================== STATE ====================
let state = {
    currentEpisodeIndex: 0,
    isAnimating: false,
    currentVinylSection: 0,
    scrollCooldown: false,
    isMobileMenuOpen: false,
    isMobile: false,
    selectedEpisode: null,
    isModalOpen: false
};

// ==================== UTILITY FUNCTIONS ====================
function polarToXY(angle, radius) {
    const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180);
    const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180);
    return {
        x: Math.round(x * 1000000) / 1000000,
        y: Math.round(y * 1000000) / 1000000
    };
}

function checkMobile() {
    state.isMobile = window.innerWidth <= 768;
}

// ==================== VINYL PLAYER ====================
function initVinylPlayer() {
    const labelsContainer = document.getElementById('labels');
    const vinylTitle = document.getElementById('vinylTitle');
    const vinylCopy = document.getElementById('vinylCopy');
    const armRef = document.getElementById('arm');

    // Create labels
    vinylSections.forEach((section, index) => {
        const { x, y } = polarToXY(section.angle, 34);
        const button = document.createElement('button');
        button.className = `label ${state.currentVinylSection === index ? 'active' : ''}`;
        button.type = 'button';
        button.dataset.section = index;
        button.style.left = `${x}%`;
        button.style.top = `${y}%`;
        button.textContent = section.title;

        button.addEventListener('click', () => selectVinylSection(index));
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectVinylSection(index);
            }
        });

        labelsContainer.appendChild(button);
    });

    // Initialize content
    updateVinylContent();
}

function selectVinylSection(index) {
    state.currentVinylSection = index;

    // Update labels
    document.querySelectorAll('.label').forEach((label, i) => {
        label.classList.toggle('active', i === index);
    });

    // Rotate arm
    const armRef = document.getElementById('arm');
    if (armRef) {
        const angle = vinylSections[index].angle;
        armRef.style.setProperty('--angle', `${angle}deg`);
    }

    // Update content
    updateVinylContent();
}

function updateVinylContent() {
    const section = vinylSections[state.currentVinylSection];
    document.getElementById('vinylTitle').textContent = section.title;
    document.getElementById('vinylCopy').textContent = section.copy;
}

// ==================== EPISODE CAROUSEL ====================
function initEpisodeCarousel() {
    const track = document.getElementById('coverflowTrack');

    episodes.forEach((episode, index) => {
        const card = createEpisodeCard(episode, index);
        track.appendChild(card);
    });

    updateEpisodeCards();
}

function createEpisodeCard(episode, index) {
    const card = document.createElement('div');
    card.className = 'episode-card';
    card.dataset.index = index;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Episode ${index + 1}: ${episode.title}`);

    card.innerHTML = `
        <div class="episode-sleeve">
            <div class="episode-cover" style="background: ${episode.cover}"></div>
            <div class="episode-overlay"></div>
            <div class="episode-inner-rim"></div>
            <div class="episode-edges episode-edge-l"></div>
            <div class="episode-edges episode-edge-r"></div>
            <div class="episode-spine">${episode.title}</div>
            <div class="episode-content">
                <div class="episode-meta">${episode.meta}</div>
                <h3 class="episode-title">${episode.title.replace(/^EP \d+ • /, '')}</h3>
                <p class="episode-description">${episode.description}</p>
                <button class="episode-play">▶ Play Episode</button>
            </div>
        </div>
    `;

    card.addEventListener('click', () => openEpisode(episode));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openEpisode(episode);
        }
    });

    return card;
}

function updateEpisodeCards() {
    const cards = document.querySelectorAll('.episode-card');
    const current = state.currentEpisodeIndex;
    const total = episodes.length;

    cards.forEach((card, index) => {
        card.className = 'episode-card';

        if (index === current) {
            card.classList.add('episode-center');
        } else if (index === (current - 1 + total) % total) {
            card.classList.add('left');
        } else if (index === (current + 1) % total) {
            card.classList.add('right');
        } else if (index === (current - 2 + total) % total) {
            card.classList.add('far-left');
        } else if (index === (current + 2) % total) {
            card.classList.add('far-right');
        }
    });
}

function nextEpisode() {
    if (state.isAnimating) return;
    state.isAnimating = true;
    state.currentEpisodeIndex = (state.currentEpisodeIndex + 1) % episodes.length;
    updateEpisodeCards();
    setTimeout(() => { state.isAnimating = false; }, 600);
}

function previousEpisode() {
    if (state.isAnimating) return;
    state.isAnimating = true;
    state.currentEpisodeIndex = (state.currentEpisodeIndex - 1 + episodes.length) % episodes.length;
    updateEpisodeCards();
    setTimeout(() => { state.isAnimating = false; }, 600);
}

function goToEpisode(index) {
    if (state.isAnimating || index === state.currentEpisodeIndex) return;
    state.isAnimating = true;
    state.currentEpisodeIndex = index;
    updateEpisodeCards();
    setTimeout(() => { state.isAnimating = false; }, 600);
}

// ==================== EPISODE MODAL ====================
function openEpisode(episode) {
    if (state.isMobile && episode.id) {
        window.location.href = `episode.html?id=${encodeURIComponent(episode.id)}`;
        return;
    }
    showEpisodeModal(episode);
}

function showEpisodeModal(episode) {
    state.selectedEpisode = episode;
    state.isModalOpen = true;

    const modalOverlay = document.getElementById('episode-modal-overlay');
    const modal = document.getElementById('episode-modal');

    modal.innerHTML = createModalContent(episode);
    modalOverlay.style.display = 'flex';

    // Add close button event
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
}

function createModalContent(episode) {
    return `
        <!-- Close Button -->
        <button class="modal-close-btn" style="
            position: sticky;
            top: 1rem;
            right: 1rem;
            background: linear-gradient(135deg, #7f1e16, #5a1510);
            color: #ffffff;
            border: 2px solid #ffffff;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            font-size: 24px;
            z-index: 1002;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 20px rgba(127, 30, 22, 0.5);
            transition: all 0.3s ease;
            font-weight: bold;
            float: right;
            margin-bottom: 1rem;
        ">×</button>

        <!-- Header -->
        <div style="
            padding: 2rem 2rem 1.5rem 2rem;
            background: linear-gradient(135deg, #7f1e16 0%, #5a1510 100%);
            color: #ffffff;
            border-radius: 18px 18px 0 0;
            position: relative;
            overflow: hidden;
        ">
            <h1 style="
                font-size: 2rem;
                font-weight: 800;
                color: #ffffff;
                margin: 0 0 1rem 0;
                font-family: 'Alfa Slab One', serif;
                text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
            ">
                ${episode.title}
            </h1>
            <div style="display: flex; gap: 0.75rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                <span style="
                    background: rgba(255, 255, 255, 0.2);
                    color: #ffffff;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                ">${episode.meta}</span>
                <span style="
                    background: rgba(255, 255, 255, 0.2);
                    color: #ffffff;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                ">${episode.duration}</span>
            </div>
            <p style="
                color: rgba(255, 255, 255, 0.9);
                font-size: 1.1rem;
                line-height: 1.6;
                margin: 0;
            ">${episode.description}</p>
        </div>

        <!-- Content -->
        <div style="padding: 2rem; background: #ffffff; color: #0c0b0b;">
            <!-- Video -->
            <div style="margin: 2rem 0; text-align: center;">
                <div style="
                    max-width: 1000px;
                    margin: 0 auto;
                    background: linear-gradient(135deg, #f9f0e1 0%, #f5f0e8 100%);
                    border-radius: 20px;
                    padding: 2rem;
                    box-shadow: 0 20px 60px rgba(127, 30, 22, 0.2);
                    border: 2px solid #7f1e16;
                ">
                    <h2 style="
                        font-family: 'Alfa Slab One', serif;
                        font-size: 1.8rem;
                        margin: 0 0 1.5rem;
                        color: #7f1e16;
                    ">Watch Episode</h2>
                    <iframe
                        style="
                            width: 100%;
                            aspect-ratio: 16/9;
                            border: none;
                            border-radius: 15px;
                            box-shadow: 0 15px 40px rgba(0,0,0,0.6);
                            background: #000;
                        "
                        src="https://www.youtube.com/embed/${episode.youtubeId}?rel=0&showinfo=0&modestbranding=1"
                        title="Episode Video"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>

            <!-- Guest Info -->
            <div style="
                margin: 3rem 0;
                padding: 2rem;
                background: linear-gradient(135deg, #7f1e16 0%, #5a1510 100%);
                border-radius: 20px;
                color: #ffffff;
            ">
                <h3 style="
                    font-family: 'Alfa Slab One', serif;
                    font-size: 1.5rem;
                    margin: 0 0 1rem;
                ">Featured Guest</h3>
                <h4 style="font-size: 1.2rem; margin: 0.5rem 0;">${episode.guest?.name || 'Guest Name'}</h4>
                <p style="font-weight: 600; opacity: 0.9; margin: 0.5rem 0;">${episode.guest?.title || 'Guest Title'}</p>
                <p style="line-height: 1.6; opacity: 0.9;">${episode.guest?.bio || 'Guest bio'}</p>
            </div>
        </div>
    `;
}

function closeModal() {
    state.isModalOpen = false;
    state.selectedEpisode = null;

    const modalOverlay = document.getElementById('episode-modal-overlay');
    modalOverlay.style.display = 'none';
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const close = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-nav');
    const links = document.querySelectorAll('.mobile-nav-link');

    toggle.addEventListener('click', () => {
        state.isMobileMenuOpen = !state.isMobileMenuOpen;
        menu.classList.toggle('open', state.isMobileMenuOpen);
    });

    close.addEventListener('click', () => {
        state.isMobileMenuOpen = false;
        menu.classList.remove('open');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            state.isMobileMenuOpen = false;
            menu.classList.remove('open');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (state.isMobileMenuOpen &&
            !e.target.closest('.mobile-nav') &&
            !e.target.closest('.mobile-menu-toggle')) {
            state.isMobileMenuOpen = false;
            menu.classList.remove('open');
        }
    });
}

// ==================== EVENT LISTENERS ====================
function initEventListeners() {
    // Episode navigation
    document.getElementById('prevBtn').addEventListener('click', previousEpisode);
    document.getElementById('nextBtn').addEventListener('click', nextEpisode);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousEpisode();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextEpisode();
        }
    });

    // Wheel navigation
    const container = document.getElementById('coverflowContainer');
    if (container) {
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (state.scrollCooldown) return;

            state.scrollCooldown = true;
            setTimeout(() => { state.scrollCooldown = false; }, 300);

            const current = state.currentEpisodeIndex;
            const next = e.deltaY > 0
                ? Math.min(current + 1, episodes.length - 1)
                : Math.max(current - 1, 0);

            if (next !== current) {
                goToEpisode(next);
            }
        }, { passive: false });
    }

    // Modal overlay click
    document.getElementById('episode-modal-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'episode-modal-overlay') {
            closeModal();
        }
    });

    // Subscribe form
    document.getElementById('subscribe-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Subscribed — welcome to the XX club!');
    });

    // Window resize
    window.addEventListener('resize', checkMobile);

    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();
}

// ==================== NAVIGATION HOVER EFFECTS ====================
function initNavHoverEffects() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.style.color = '#e2d6c7';
        link.style.textDecoration = 'none';
        link.style.fontSize = 'clamp(0.9rem, 3vw, 1rem)';
        link.style.fontWeight = '500';
        link.style.padding = '0.5rem 0';
        link.style.borderBottom = '2px solid transparent';
        link.style.transition = 'all 0.3s ease';

        link.addEventListener('mouseenter', () => {
            link.style.borderBottomColor = '#e2d6c7';
            link.style.color = '#ffffff';
        });

        link.addEventListener('mouseleave', () => {
            link.style.borderBottomColor = 'transparent';
            link.style.color = '#e2d6c7';
        });
    });
}

// ==================== INITIALIZATION ====================
function init() {
    checkMobile();
    initVinylPlayer();
    initEpisodeCarousel();
    initMobileMenu();
    initEventListeners();
    initNavHoverEffects();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
