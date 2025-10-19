// XXperiment - Vanilla JavaScript Application

// ==================== CUSTOM PRELOADER ====================
function initCustomPreloader() {
    console.log('initCustomPreloader called');

    const preloader = document.getElementById('custom-preloader');
    const loadingPercentage = document.getElementById('loading-percentage');
    const loadingStatus = document.getElementById('loading-status');
    const vinylRecord = document.getElementById('vinyl-record');

    console.log('Elements found:', {
        preloader: !!preloader,
        loadingPercentage: !!loadingPercentage,
        loadingStatus: !!loadingStatus,
        vinylRecord: !!vinylRecord
    });

    if (!preloader) {
        console.error('Preloader element not found!');
        return;
    }

    let progress = 0;
    let loadingInterval;

    const statusMessages = [
        'Dropping the needle...',
        'Tuning the frequencies...',
        'Warming up the amp...',
        'Setting the vibe...',
        'Almost ready...'
    ];

    function updateProgress() {
        progress += Math.random() * 12 + 8;
        if (progress > 100) progress = 100;

        console.log('Progress:', Math.round(progress) + '%');

        if (loadingPercentage) {
            loadingPercentage.textContent = Math.round(progress) + '%';
        }

        if (loadingStatus) {
            let messageIndex = Math.min(Math.floor(progress / 20), statusMessages.length - 1);
            loadingStatus.textContent = statusMessages[messageIndex];
        }

        if (vinylRecord) {
            const speed = 3 - (progress / 100) * 1.5;
            vinylRecord.style.animationDuration = `${speed}s`;
        }

        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(hidePreloader, 500);
        }
    }

    function hidePreloader() {
        // Smooth fade out with scale effect
        preloader.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        preloader.style.opacity = '0';
        preloader.style.transform = 'scale(0.95)';

        // Remove from DOM
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    }

    // Add skip button functionality
    const skipButton = document.createElement('button');
    skipButton.textContent = 'Skip';
    skipButton.style.cssText = `
        position: absolute;
        bottom: 2rem;
        right: 2rem;
        background: rgba(226, 214, 199, 0.2);
        border: 1px solid rgba(226, 214, 199, 0.5);
        color: #e2d6c7;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        font-family: 'Alfa Slab One', serif;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    skipButton.addEventListener('click', () => {
        clearInterval(loadingInterval);
        hidePreloader();
    });
    
    skipButton.addEventListener('mouseenter', () => {
        skipButton.style.background = 'rgba(226, 214, 199, 0.3)';
        skipButton.style.transform = 'scale(1.05)';
    });
    
    skipButton.addEventListener('mouseleave', () => {
        skipButton.style.background = 'rgba(226, 214, 199, 0.2)';
        skipButton.style.transform = 'scale(1)';
    });
    
    preloader.appendChild(skipButton);

    // Start loading simulation
    console.log('Starting loading interval...');
    loadingInterval = setInterval(updateProgress, 200);
    
    // Force first update immediately
    updateProgress();

    // Auto-hide after maximum time (2.5 seconds)
    setTimeout(() => {
        console.log('Auto-hide triggered, progress:', progress);
        if (progress < 100) {
            clearInterval(loadingInterval);
            progress = 100;
            updateProgress();
        }
    }, 2500);
    
    // Emergency fallback - force hide after 5 seconds
    setTimeout(() => {
        console.log('Emergency fallback triggered');
        clearInterval(loadingInterval);
        hidePreloader();
    }, 5000);
}

// Initialize preloader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomPreloader);
} else {
    // DOM is already loaded
    initCustomPreloader();
}
// ==================== DATA ====================
const vinylSections = [
    { title: "Who we are", slug: "who", angle: 225, copy: "We are a voice of millions of women, laughing, longing and living to mark the significance of expression for every girl who has felt their words unheard. We are a representation of you, #Unfiltered." },
    { title: "Purpose", slug: "purpose", angle: 315, copy: "The podcast that is here to bring revolution in the world of women's wellness by talking and building a community together. But above that, also to listen. Listen to that woman inside everyone." },
    { title: "Ft.Guests", slug: "hosts", angle: 45, copy: "From daring to dream, our guests are the epitome of grace, empathy and gratitude. At XXperiment, our guests aren't placed on a pedestal, they're welcomed on the couch. Sitting with us, they share their raw and unfiltered stories of womanhood not as icons but as equals." },
    { title: "How to listen", slug: "listen", angle: 135, copy: "Subscribe on your favorite app, or read episode notes on our site. New shows drop weekly. Bring coffee. Or creatine. Or both." }
];

const episodes = [
    {
        id: 's1e5-episode-5',
        title: 'EP 05 • What Does Serving Success Taste Like?',
        meta: 'EP 05 • 1:06:54',
        description: 'Success isn\'t a destination it\'s a daring act of creation. In this episode, we sit down with Vira Vora, the visionary behind Sale & Pepe, to unpack what it truly means to reinvent yourself and your life.',
        cover: 'linear-gradient(135deg, #d4a574, #8b4513)',
        youtubeId: 'LoXnCNC_iBw',
        number: 'EP 05',
        duration: '1:06:54',
        season: 'Season 1',
        guest: {
            name: 'Ms. Vira Shah Vora',
            title: 'Founder, Sale & Pepe',
            bio: 'Visionary behind Sale & Pepe, sharing her journey of reinvention, independence, and creating success on her own terms.'
        }
    },
    {
        id: 's1e4-episode-4',
        title: 'EP 04 • This Was Never About Approval',
        meta: 'EP 04 • 50:31',
        description: 'Why do conversations about women\'s bodies still feel taboo? In this episode, we break the silence on intimate health, postpartum changes, painful sex, and cosmetic gynaecology with Dr. Bhairavi Joshi.',
        cover: 'linear-gradient(135deg, #f4c2a1, #d2691e)',
        youtubeId: 'Q_AYhx6zu1E',
        number: 'EP 04',
        duration: '50:31',
        season: 'Season 1',
        guest: {
            name: 'Dr. Bhairavi Joshi',
            title: 'Cosmetic Gynaecologist',
            bio: 'Part surgeon, part therapist, and full-time myth-buster specializing in intimate health and women\'s wellness.'
        }
    },
    {
        id: 's1e3-episode-3',
        title: 'EP 03 • Still Waiting For That Gold Star In Adulthood',
        meta: 'EP 03 • 1:24:43',
        description: 'Before we learned to chase deadlines, we learned to chase gold stars. In this episode, The Mentor x The Mess unravel how early schooling quietly shapes our adult obsession with validation, performance, and "being good."',
        cover: 'linear-gradient(135deg, #2d4a3e, #1a5f3f)',
        youtubeId: 'M_-DruIjPRU',
        number: 'EP 03',
        duration: '1:24:43',
        season: 'Season 1',
        guest: {
            name: 'Mrs. Jayati Jhala',
            title: 'Preschool Principal & Educator',
            bio: 'Part educator, part life coach, and full-time truth-teller specializing in early childhood education and emotional intelligence.'
        }
    },
    {
        id: 's1e2-episode-2',
        title: 'EP 02 • Ghosted, Gaslit, and Girlbossed',
        meta: 'EP 02 • 45:47',
        description: 'Friendships aren\'t what they used to be and that\'s exactly what makes them so fascinating. In this episode, we peel back the layers of modern female friendships the love, the jealousy, the distance, and the quiet understanding that keeps it all together.',
        cover: 'linear-gradient(135deg, #9b4444, #654321)',
        youtubeId: 'T5bs2CMnUN4',
        number: 'EP 02',
        duration: '45:47',
        season: 'Season 1',
        guest: {
            name: 'Vanshita Neetu',
            title: 'Founder & Black Cat Energy',
            bio: 'The black cat energy who\'ll lovingly call you out and help you level up, exploring the emotional Olympics of modern-day friendships.'
        }
    },
    {
        id: 's1e1-episode-1',
        title: 'EP 01 • Are You Sure It\'s Not Just Stress?',
        meta: 'EP 01 • 44:59',
        description: 'Why are women still being told "it\'s just stress"? In this episode, we sit down with Dr. Mahesh Jariwala to uncover the truth behind medical gaslighting, rushed diagnoses, and the everyday struggles women face in getting their health taken seriously.',
        cover: 'linear-gradient(135deg, #5d4e6d, #8a2be2)',
        youtubeId: 'HQFZT62XtCo',
        number: 'EP 01',
        duration: '44:59',
        season: 'Season 1',
        guest: {
            name: 'Dr. Mahesh Jariwala',
            title: 'Leading OB-GYN',
            bio: 'Leading OB-GYN who\'s here to spill the tea on medical myths, lightning-fast diagnoses, and the shocking realities of women\'s health.'
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
    isMobile: false
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

    // Set initial arm position
    if (armRef) {
        const angle = vinylSections[state.currentVinylSection].angle;
        armRef.style.setProperty('--angle', `${angle}deg`);
    }
}

function selectVinylSection(index) {
    state.currentVinylSection = index;

    // Update labels
    document.querySelectorAll('.label').forEach((label, i) => {
        label.classList.toggle('active', i === index);
    });

    // Rotate arm
    const arm = document.getElementById('arm');
    if (arm) {
        const angle = vinylSections[index].angle;
        arm.style.setProperty('--angle', `${angle}deg`);
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
    if (episode.id) {
        window.location.href = `episode.html?id=${encodeURIComponent(episode.id)}`;
        return;
    }
    
    // Fallback if no episode ID
    console.warn('Episode has no ID, cannot navigate to episode page');
}




// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const close = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-nav');
    const overlay = document.getElementById('mobile-menu-overlay');
    const links = document.querySelectorAll('.mobile-nav-link');

    function openMenu() {
        state.isMobileMenuOpen = true;
        menu.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeMenu() {
        state.isMobileMenuOpen = false;
        menu.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    toggle.addEventListener('click', () => {
        if (state.isMobileMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    close.addEventListener('click', closeMenu);

    // Close when clicking anywhere outside the menu
    document.addEventListener('click', (e) => {
        if (state.isMobileMenuOpen && 
            !menu.contains(e.target) && 
            e.target !== toggle) {
            console.log('🔘 Click outside menu, closing...');
            closeMenu();
        }
    });

    // Close when clicking a link
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.isMobileMenuOpen) {
            closeMenu();
        }
    });
}

// ==================== EVENT LISTENERS ====================
function initEventListeners() {
    // Episode navigation
    document.getElementById('prevBtn').addEventListener('click', previousEpisode);
    document.getElementById('nextBtn').addEventListener('click', nextEpisode);

    // Platform buttons
    const spotifyButton = document.querySelector('button[aria-label*="Spotify"]');
    const youtubeButton = document.querySelector('button[aria-label*="YouTube"]');
    
    if (spotifyButton) {
        spotifyButton.addEventListener('click', () => {
            window.open('https://open.spotify.com/show/3X5XYWLTkOtmhU1vNWMT7X', '_blank');
        });
    }
    
    if (youtubeButton) {
        youtubeButton.addEventListener('click', () => {
            window.open('https://www.youtube.com/@The.XXperiment', '_blank');
        });
    }

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

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from('.kicker', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    });

    gsap.from('.hero-title', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: 'power2.out'
    });

    gsap.from('.hero-sub', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        ease: 'power2.out'
    });

    gsap.from('.cta-row .btn', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // About section animations - REMOVED for performance

    // Episodes section
    gsap.from('#episodes .section-title', {
        scrollTrigger: {
            trigger: '#episodes',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out'
    });

    gsap.from('#episodes .lead', {
        scrollTrigger: {
            trigger: '#episodes',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
    });

    gsap.from('.coverflow', {
        scrollTrigger: {
            trigger: '.coverflow',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out'
    });

    // Subscribe section
    gsap.from('#subscribe .section-title', {
        scrollTrigger: {
            trigger: '#subscribe',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out'
    });

    gsap.from('#subscribe .lead', {
        scrollTrigger: {
            trigger: '#subscribe',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
    });

    gsap.from('.subscribe-card', {
        scrollTrigger: {
            trigger: '.subscribe-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out'
    });

    // Stagger animation for platform links
    gsap.from('.platforms a', {
        scrollTrigger: {
            trigger: '.platforms',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Footer animations
    gsap.from('footer .footer-content > *', {
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
    });

    // Stickers are now fixed position - parallax disabled to prevent glitchy behavior
    // gsap.to('.sticker', {
    //     scrollTrigger: {
    //         trigger: '.hero',
    //         start: 'top top',
    //         end: 'bottom top',
    //         scrub: 1
    //     },
    //     y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.depth * 0.5,
    //     ease: 'none'
    // });
}

// ==================== INITIALIZATION ====================
function init() {
    checkMobile();
    initVinylPlayer();
    initEpisodeCarousel();
    initMobileMenu();
    initEventListeners();
    initNavHoverEffects();
    
    // Initialize forum navigation with a small delay to ensure DOM is ready
    setTimeout(() => {
        setupForumNavigation();
    }, 100);

    // Initialize scroll animations after a short delay to ensure DOM is ready
    setTimeout(initScrollAnimations, 100);

}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==================== FORUM NAVIGATION ====================
async function checkAuthStatus() {
    try {
        const response = await fetch('/api/auth/status', {
            credentials: 'include' // Important: Send cookies with request
        });
        if (response.ok) {
            const data = await response.json();
            return data.authenticated ? data.user : null;
        }
    } catch (error) {
        // Silent fail - user not authenticated
    }
    return null;
}

function setupForumNavigation() {
    console.log('🔧 Setting up forum navigation...');
    const forumButtons = [
        document.getElementById('forum-btn'),
        document.getElementById('mobile-forum-btn'),
        document.getElementById('community-forum-btn')
    ];
    
    console.log('🔍 Forum buttons found:', forumButtons.map(btn => btn ? btn.id : 'null'));
    console.log('🔍 Total buttons found:', forumButtons.filter(btn => btn).length);

    forumButtons.forEach(button => {
        if (button) {
            console.log('✅ Found forum button:', button.id);
            console.log('✅ Button element:', button);
            button.addEventListener('click', (e) => {
                console.log('🖱️ Forum button clicked!', button.id, e);
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-nav');
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    console.log('📱 Closing mobile menu...');
                    mobileMenu.classList.remove('open');
                    document.getElementById('mobile-menu-overlay').classList.remove('active');
                    document.body.style.overflow = '';
                }
                // Navigate after a short delay
                console.log('🚀 Navigating to forum...');
                setTimeout(() => {
                    window.location.href = '/forum';
                }, 100);
            }, true); // Use capture phase
        }
    });
    
    // Check authentication and update UI
    checkAuthStatus().then(user => {
        console.log('👤 Auth status checked:', user ? user.username : 'Not signed in');
        const desktopSigninBtn = document.getElementById('signin-btn');
        const mobileSigninBtn = document.getElementById('mobile-signin-btn');
        
        if (user) {
            // User is signed in - show welcome message
            const displayName = user.displayName || user.username;
            
            // Update desktop button
            if (desktopSigninBtn) {
                desktopSigninBtn.textContent = `Hi, ${displayName}`;
                desktopSigninBtn.style.cursor = 'pointer';
                desktopSigninBtn.addEventListener('click', () => {
                    window.location.href = '/profile';
                });
            }
            
            // Update mobile button
            if (mobileSigninBtn) {
                console.log('✅ Setting up mobile signin button for logged in user');
                mobileSigninBtn.textContent = `Welcome, ${displayName}`;
                mobileSigninBtn.style.cursor = 'pointer';
                mobileSigninBtn.addEventListener('click', (e) => {
                    console.log('🖱️ Mobile signin button clicked (logged in)', e);
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-nav');
                    if (mobileMenu && mobileMenu.classList.contains('open')) {
                        console.log('📱 Closing mobile menu...');
                        mobileMenu.classList.remove('open');
                        document.getElementById('mobile-menu-overlay').classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    // Navigate after a short delay
                    console.log('🚀 Navigating to /profile...');
                    setTimeout(() => {
                        window.location.href = '/profile';
                    }, 100);
                }, true); // Use capture phase
            }
        } else {
            // User is not signed in - show sign in buttons
            if (desktopSigninBtn) {
                desktopSigninBtn.addEventListener('click', () => {
                    window.location.href = '/auth/signin';
                });
            }
            
            if (mobileSigninBtn) {
                console.log('✅ Setting up mobile signin button for guest user');
                mobileSigninBtn.addEventListener('click', (e) => {
                    console.log('🖱️ Mobile signin button clicked (guest)', e);
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-nav');
                    if (mobileMenu && mobileMenu.classList.contains('open')) {
                        console.log('📱 Closing mobile menu...');
                        mobileMenu.classList.remove('open');
                        document.getElementById('mobile-menu-overlay').classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    // Navigate after a short delay
                    console.log('🚀 Navigating to /auth/signin...');
                    setTimeout(() => {
                        window.location.href = '/auth/signin';
                    }, 100);
                }, true); // Use capture phase
            }
        }
    });
}


