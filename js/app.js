/**
 * IGNITERS // 1947 → 2026 → 2047
 * "From Independence to Possibility"
 * Core Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. Navigation & Mobile Drawer
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect on Navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let currentSection = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    // Update Journey Progress Spine
    const spineFill = document.getElementById('spine-fill');
    const spineNodes = document.querySelectorAll('.spine-node');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && spineFill) {
      const progress = Math.min(Math.max((window.scrollY / totalHeight) * 100, 0), 100);
      spineFill.style.height = `${progress}%`;
    }

    if (spineNodes.length > 0) {
      spineNodes.forEach(node => node.classList.remove('active'));
      if (currentSection === 'hero') {
        const n = document.querySelector('.spine-node[data-era="hero"]');
        if (n) n.classList.add('active');
      } else if (currentSection === 'journey') {
        const n = document.querySelector('.spine-node[data-era="1947"]');
        if (n) n.classList.add('active');
      } else if (currentSection === 'today') {
        const n = document.querySelector('.spine-node[data-era="2026"]');
        if (n) n.classList.add('active');
      } else if (currentSection === 'transformation') {
        const n = document.querySelector('.spine-node[data-era="leap"]');
        if (n) n.classList.add('active');
      } else if (currentSection === 'vision' || currentSection === 'cinematic-2047') {
        const n = document.querySelector('.spine-node[data-era="2047"]');
        if (n) n.classList.add('active');
      }
    }
  });

  // Mobile Drawer Toggle
  function toggleMobileMenu(forceClose = false) {
    const isOpen = forceClose ? false : !mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.add('open');
      mobileBackdrop.classList.add('open');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('open');
      mobileBackdrop.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => toggleMobileMenu());
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', () => toggleMobileMenu(true));
  }

  // Smooth scroll & close mobile drawer on link click
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        toggleMobileMenu(true);
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // 2. Interactive Timeline (1947 → 2026 → 2047)
  // ==========================================
  const timelineTabs = document.querySelectorAll('.timeline-tab');
  const timelinePanes = document.querySelectorAll('.timeline-pane');

  timelineTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const year = tab.dataset.year;

      // Update active tab
      timelineTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Switch pane with transition
      timelinePanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `pane-${year}`) {
          pane.classList.add('active');
        }
      });
    });
  });

  // ==========================================
  // 3. Interactive Modal Deep-Dive Data & Handler
  // ==========================================
  const modalOverlay = document.getElementById('details-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  const cardDetailsData = {
    // India Today (2026) Pillars
    'today-tech': {
      tag: '2026 • DIGITAL ARCHITECTURE',
      title: 'Global Technology & Engineering Capital',
      html: `
        <div style="width: 100%; height: 160px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; position: relative;">
          <img src="/images/india-2026-digital-space.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Tech 2026" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(5,8,17,0.9) 100%);"></div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.7;">
          India has established itself as the world's primary digital engineering laboratory, powering over 40% of global tech development centers and sovereign AI initiatives.
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="color: #38BDF8; font-size: 1rem; margin-bottom: 0.5rem; font-family: var(--font-display);">Key 2026 Frontiers</h4>
          <ul style="list-style: disc; margin-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
            <li><strong>IndiaAI Mission:</strong> Over 10,000 GPUs dedicated for sovereign LLM and multimodal research.</li>
            <li><strong>Semiconductor Fab Grid:</strong> Commercial manufacturing of 28nm & silicon wafers in Dholera & Sanand.</li>
            <li><strong>Quantum Computing Stack:</strong> QSim & sovereign 50-qubit testbeds for cryptography and material simulation.</li>
          </ul>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);">
          Metric: $250B+ Annual Tech Export Milestone • 5.4M+ Active Engineers
        </p>
      `
    },
    'today-edu': {
      tag: '2026 • HUMAN CAPITAL',
      title: 'Next-Gen Education & Skills Ecosystem',
      html: `
        <div style="width: 100%; height: 160px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; position: relative; background: radial-gradient(circle at center, rgba(56, 189, 248, 0.4) 0%, #080c1a 100%); display: flex; align-items: center; justify-content: center;">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.7;">
          The National Education Policy (NEP) and universal digital universities have democratized world-class multidisciplinary learning across 28 states and 8 union territories.
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="color: var(--saffron); font-size: 1rem; margin-bottom: 0.5rem; font-family: var(--font-display);">Educational Transformation</h4>
          <ul style="list-style: disc; margin-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
            <li><strong>Digital University of India:</strong> AI-curated accredited degrees accessible in 22 regional languages.</li>
            <li><strong>Skill-First Incubation:</strong> 15,000+ Atal Tinkering Labs nurturing young inventors from middle school.</li>
            <li><strong>Global Research Collaborations:</strong> Joint degree programs with top 100 global universities.</li>
          </ul>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);">
          Metric: 43M+ Higher Ed Enrollments • 25,000+ AI-enabled Smart Classrooms
        </p>
      `
    },
    'today-digital': {
      tag: '2026 • DIGITAL PUBLIC INFRASTRUCTURE',
      title: 'Digital Public Infrastructure (DPI) Global Gold Standard',
      html: `
        <div style="width: 100%; height: 160px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; position: relative;">
          <img src="/images/india-2047-digital-metaverse.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="DPI 2026" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(5,8,17,0.9) 100%);"></div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.7;">
          The India Stack (Aadhaar, UPI, DigiLocker, ONDC, ABDM) handles nearly 50% of the entire planet's real-time digital payments, exported to over 30 countries globally.
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="color: var(--emerald); font-size: 1rem; margin-bottom: 0.5rem; font-family: var(--font-display);">Scale of Impact</h4>
          <ul style="list-style: disc; margin-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
            <li><strong>16B+ Monthly UPI Transactions:</strong> Frictionless commerce reaching street vendors to conglomerates.</li>
            <li><strong>ONDC Open Commerce:</strong> Democratizing e-commerce for millions of small retailers.</li>
            <li><strong>Health Stack (ABDM):</strong> Longitudinal portable electronic health records for 500M+ citizens.</li>
          </ul>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);">
          Metric: 1.4B Digital Identities • Over $2.2 Trillion Transacted Annually
        </p>
      `
    },
    'today-infra': {
      tag: '2026 • PHYSICAL CONNECTIVITY',
      title: 'High-Speed Expressways, Railways & Green Corridors',
      html: `
        <div style="width: 100%; height: 160px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; position: relative;">
          <img src="/images/india-2047-futuristic-city.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Infra 2026" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(5,8,17,0.9) 100%);"></div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.7;">
          India's PM Gati Shakti National Master Plan has synchronized logistics, high-speed rail, dedicated freight corridors, and renewable energy grids into a single powerhouse network.
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="color: #38BDF8; font-size: 1rem; margin-bottom: 0.5rem; font-family: var(--font-display);">Infrastructure Milestones</h4>
          <ul style="list-style: disc; margin-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
            <li><strong>Vande Bharat & Bullet Train:</strong> 100+ high-speed express corridors connecting economic clusters.</li>
            <li><strong>Green Hydrogen Valley Hubs:</strong> Ports powered by zero-emission green ammonia.</li>
            <li><strong>Expressway Matrix:</strong> 10,000+ km of access-controlled 8-lane expressways cutting transit times by 60%.</li>
          </ul>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);">
          Metric: 180 GW Installed Renewable Capacity • 50,000+ km Electrified Tracks
        </p>
      `
    },
    'today-inno': {
      tag: '2026 • SCIENTIFIC BREAKTHROUGH',
      title: 'Space Frontiers & The 3rd Largest Startup Matrix',
      html: `
        <div style="width: 100%; height: 160px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; position: relative;">
          <img src="/images/india-2047-space-station.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Space 2026" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(5,8,17,0.9) 100%);"></div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.7;">
          From landing at the Moon's South Pole (Chandrayaan-3) to Gaganyaan crewed spaceflights and a 125,000+ strong startup ecosystem, Indian innovation commands global reverence.
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="color: var(--saffron); font-size: 1rem; margin-bottom: 0.5rem; font-family: var(--font-display);">Breakthrough Highlights</h4>
          <ul style="list-style: disc; margin-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
            <li><strong>Gaganyaan Orbital Flight:</strong> Demonstrating indigenous human spaceflight capabilities.</li>
            <li><strong>115+ Unicorns:</strong> Spanning deeptech, biotech, spacetech, and agritech.</li>
            <li><strong>Private Space Startups:</strong> Indigenous rockets (Skyroot, Agnikul) launching commercial payloads.</li>
          </ul>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);">
          Metric: World #3 Startup Ecosystem • Top 40 Global Innovation Index
        </p>
      `
    },

    // Vision 2047 Futuristic Cards
    'v47-ai': {
      tag: 'VISION 2047 • SOVEREIGN INTELLIGENCE',
      title: 'Sovereign Artificial Superintelligence & Quantum Mesh',
      html: `
        <div style="width: 100%; height: 160px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; position: relative;">
          <img src="/images/india-2047-quantum-ai.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="AI 2047" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(5,8,17,0.9) 100%);"></div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.7;">
          By 2047, India operates the world's most resilient decentralized AI grid, orchestrating national healthcare, automated agrarian climate resilience, and quantum-safe economic infrastructure.
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="color: var(--emerald); font-size: 1rem; margin-bottom: 0.5rem; font-family: var(--font-display);">2047 Architecture</h4>
          <ul style="list-style: disc; margin-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
            <li><strong>Ethical Sovereign ASI:</strong> Aligned with universal human values and Indic philosophical ethics.</li>
            <li><strong>Optical-Quantum Grid:</strong> Instantaneous zero-latency compute across every smart district.</li>
            <li><strong>Automated Discovery Labs:</strong> Materials and pharmaceuticals discovered autonomously in days.</li>
          </ul>
        </div>
      `
    },
    'v47-edu': {
      tag: 'VISION 2047 • NEURAL KNOWLEDGE',
      title: 'Universal Neural & Holographic Learning',
      html: `
        <div style="width: 100%; height: 160px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; position: relative; background: radial-gradient(circle at center, rgba(0, 245, 155, 0.4) 0%, #080c1a 100%); display: flex; align-items: center; justify-content: center;">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" stroke-width="1.5"><path d="M12 2a10 10 0 0 0-7.07 17.07A9.95 9.95 0 0 0 12 22a10 10 0 0 0 7.07-2.93A9.95 9.95 0 0 0 22 12a10 10 0 0 0-10-10z"></path><circle cx="12" cy="12" r="4"></circle></svg>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.7;">
          Education transformed from standardized testing to hyper-personalized neural mentors and holographic interactive labs, unlocking 100% human potential for 1.5 billion citizens.
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="color: var(--saffron); font-size: 1rem; margin-bottom: 0.5rem; font-family: var(--font-display);">Educational Paradigm</h4>
          <ul style="list-style: disc; margin-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
            <li><strong>Adaptive Cognitive Guidance:</strong> AI tutors adapting to each learner's neurological strengths.</li>
            <li><strong>Zero Knowledge Barriers:</strong> Complete mastery of sciences, arts, and humanities at zero cost.</li>
            <li><strong>World's Premier Research Hub:</strong> Attracting millions of global scholars to Indian research ashrams.</li>
          </ul>
        </div>
      `
    },
    'v47-sust': {
      tag: 'VISION 2047 • PLANETARY HARMONY',
      title: 'Net-Zero Fusion Grid & Carbon Negative India',
      html: `
        <div style="width: 100%; height: 160px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; position: relative;">
          <img src="/images/india-2047-fusion-energy.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Fusion 2047" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(5,8,17,0.9) 100%);"></div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.7;">
          A fully circular economy powered by clean magnetic fusion, thorium-based nuclear reactors, solar megastructures, and bio-engineered river rejuvenation networks.
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="color: var(--emerald); font-size: 1rem; margin-bottom: 0.5rem; font-family: var(--font-display);">Ecological Restoration</h4>
          <ul style="list-style: disc; margin-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
            <li><strong>Thorium Clean Fusion:</strong> Limitless, self-sufficient, baseload clean energy for all.</li>
            <li><strong>Complete Water Abundance:</strong> Solar-desalination and atmospheric water harvesting across all arid zones.</li>
            <li><strong>Biodiverse Carbon Sinks:</strong> 33% dense canopy cover restored across the Indian subcontinent.</li>
          </ul>
        </div>
      `
    },
    'v47-cities': {
      tag: 'VISION 2047 • URBAN EXCELLENCE',
      title: 'Vertical Bio-Cities & Hyperloop Networks',
      html: `
        <div style="width: 100%; height: 160px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; position: relative;">
          <img src="/images/india-2047-futuristic-city.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Smart Cities 2047" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(5,8,17,0.9) 100%);"></div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.7;">
          Indian smart cities seamlessly integrate vertical carbon-absorbing towers, autonomous 3D aerial transit, hyperloop corridors linking metropolitan zones in 25 minutes.
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="color: #38BDF8; font-size: 1rem; margin-bottom: 0.5rem; font-family: var(--font-display);">Urban Innovations</h4>
          <ul style="list-style: disc; margin-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
            <li><strong>15-Minute Carbon Neutral Cities:</strong> Work, living, and nature accessible within minutes on foot.</li>
            <li><strong>Autonomous Transit Web:</strong> Maglev subways and zero-emission electric air vehicles.</li>
            <li><strong>Closed-Loop Circular Waste:</strong> 99.8% material recycling in all urban centers.</li>
          </ul>
        </div>
      `
    },
    'v47-digital': {
      tag: 'VISION 2047 • SOVEREIGN METAVERSE',
      title: 'Decentralized Sovereign Citizen Empowerment',
      html: `
        <div style="width: 100%; height: 160px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; position: relative;">
          <img src="/images/india-2047-digital-metaverse.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Digital 2047" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(5,8,17,0.9) 100%);"></div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.7;">
          Universal digital sovereignty where every citizen owns their verifiable credentials, wealth, intellectual property, and democratic participation on tamper-proof national protocols.
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="color: var(--saffron); font-size: 1rem; margin-bottom: 0.5rem; font-family: var(--font-display);">Democracy & Digital Rights</h4>
          <ul style="list-style: disc; margin-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
            <li><strong>Instant Transparent Governance:</strong> Real-time public budgeting with zero leakage.</li>
            <li><strong>Universal Basic Compute & Energy:</strong> Every family guaranteed sovereign compute credits.</li>
            <li><strong>Global Digital Commerce Standard:</strong> ONDC-2047 powering 25% of interplanetary trade.</li>
          </ul>
        </div>
      `
    },
    'v47-space': {
      tag: 'VISION 2047 • GALACTIC HORIZON',
      title: 'Bharatiya Antariksh Station & Lunar Outposts',
      html: `
        <div style="width: 100%; height: 160px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; position: relative;">
          <img src="/images/india-2047-space-station.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Space 2047" />
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(5,8,17,0.9) 100%);"></div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; line-height: 1.7;">
          India establishes permanent orbital colonies (BAS), a thriving lunar research settlement harvesting Helium-3, and reusable interplanetary transport missions to Mars and beyond.
        </p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
          <h4 style="color: var(--emerald); font-size: 1rem; margin-bottom: 0.5rem; font-family: var(--font-display);">Galactic Milestones</h4>
          <ul style="list-style: disc; margin-left: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
            <li><strong>Bharatiya Space Station (BAS):</strong> Continuous human habitation and microgravity biotech manufacturing.</li>
            <li><strong>Lunar South Pole Base:</strong> Autonomous mining and deep-space astronomy observatories.</li>
            <li><strong>Solar Sail Probes:</strong> Exploring outer solar systems with indigenous ion propulsion engines.</li>
          </ul>
        </div>
      `
    }
  };

  function openDetailsModal(cardKey) {
    const data = cardDetailsData[cardKey];
    if (!data) return;

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.html;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDetailsModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Attach modal trigger to interactive cards
  document.querySelectorAll('.interactive-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.cardKey;
      openDetailsModal(key);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeDetailsModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeDetailsModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeDetailsModal();
    }
  });

  // ==========================================
  // 3.5 Cinematic 2047 Theater Interactive Engine
  // ==========================================
  const sectorTabs = document.querySelectorAll('.sector-tab');
  const activeImage = document.getElementById('theater-active-image');
  const telemetrySectorName = document.getElementById('telemetry-sector-name');
  const hudCoordinates = document.getElementById('hud-coordinates');
  const sectorBriefingText = document.getElementById('sector-briefing-text');
  const hudModeToggle = document.getElementById('hud-mode-toggle');
  const hologramOverlay = document.getElementById('hologram-overlay');
  const audioSynthToggle = document.getElementById('audio-synth-toggle');
  const audioSynthLabel = document.getElementById('audio-synth-label');
  const theaterFullscreenBtn = document.getElementById('theater-fullscreen-btn');
  const cinematicTheater = document.getElementById('cinematic-theater');
  const theaterScreenMedia = document.querySelector('.theater-screen-media');

  // Sector Switching Logic
  sectorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sectorTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const newImg = tab.dataset.img;
      const newName = tab.dataset.name;
      const newCoords = tab.dataset.coords;
      const newDesc = tab.dataset.desc;

      if (activeImage && newImg) {
        activeImage.style.opacity = '0.3';
        activeImage.style.transform = 'scale(0.96)';
        setTimeout(() => {
          activeImage.src = newImg;
          activeImage.style.opacity = '1';
          activeImage.style.transform = 'scale(1)';
        }, 250);
      }

      if (telemetrySectorName) telemetrySectorName.textContent = newName;
      if (hudCoordinates) hudCoordinates.textContent = newCoords;
      if (sectorBriefingText) sectorBriefingText.textContent = newDesc;

      // Play subtle synth chirp on sector teleport
      playTeleportChirp();
    });
  });

  // HUD Optical vs Thermal vs Wireframe Mode Switcher
  let hudMode = 0; // 0: Optical, 1: Thermal, 2: Wireframe
  const hudModes = [
    { name: 'HUD: OPTICAL', filter: 'none', gridOpacity: '0.6' },
    { name: 'HUD: THERMAL', filter: 'hue-rotate(140deg) saturate(1.8) contrast(1.2)', gridOpacity: '0.9' },
    { name: 'HUD: WIREFRAME', filter: 'grayscale(1) contrast(1.8) invert(0.1)', gridOpacity: '1' }
  ];

  if (hudModeToggle) {
    hudModeToggle.addEventListener('click', () => {
      hudMode = (hudMode + 1) % hudModes.length;
      const mode = hudModes[hudMode];
      hudModeToggle.querySelector('span').textContent = mode.name;
      if (activeImage) activeImage.style.filter = mode.filter;
      if (hologramOverlay) hologramOverlay.style.opacity = mode.gridOpacity;
      playBeepSound(520, 0.08);
    });
  }

  // Web Audio API Ambient Sci-Fi Synthesizer
  let audioCtx = null;
  let synthGain = null;
  let isAudioPlaying = false;
  let osc1 = null;
  let osc2 = null;

  function initAudioSynth() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;
      audioCtx = new AudioContext();

      // Master Gain
      synthGain = audioCtx.createGain();
      synthGain.gain.setValueAtTime(0, audioCtx.currentTime);

      // Lowpass Filter for warm sci-fi drone
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, audioCtx.currentTime);
      filter.Q.setValueAtTime(4, audioCtx.currentTime);

      // Osc 1 (Sub Root Drone)
      osc1 = audioCtx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(108, audioCtx.currentTime); // A2 harmonic

      // Osc 2 (Fifth Harmonic Shimmer)
      osc2 = audioCtx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(162, audioCtx.currentTime); // E3 fifth

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(synthGain);
      synthGain.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
      return true;
    } catch (e) {
      console.warn('Web Audio not supported or blocked:', e);
      return false;
    }
  }

  function playTeleportChirp() {
    if (!audioCtx || !isAudioPlaying) return;
    try {
      const chirpOsc = audioCtx.createOscillator();
      const chirpGain = audioCtx.createGain();
      chirpOsc.type = 'sine';
      chirpOsc.frequency.setValueAtTime(800, audioCtx.currentTime);
      chirpOsc.frequency.exponentialRampToValueAtTime(1600, audioCtx.currentTime + 0.15);
      chirpGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      chirpGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      chirpOsc.connect(chirpGain);
      chirpGain.connect(audioCtx.destination);
      chirpOsc.start();
      chirpOsc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  }

  function playBeepSound(freq = 600, duration = 0.05) {
    if (!audioCtx || !isAudioPlaying) return;
    try {
      const beepOsc = audioCtx.createOscillator();
      const beepGain = audioCtx.createGain();
      beepOsc.type = 'sine';
      beepOsc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      beepGain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      beepGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      beepOsc.connect(beepGain);
      beepGain.connect(audioCtx.destination);
      beepOsc.start();
      beepOsc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  if (audioSynthToggle) {
    audioSynthToggle.addEventListener('click', () => {
      if (!audioCtx) {
        const ok = initAudioSynth();
        if (!ok) return;
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      isAudioPlaying = !isAudioPlaying;
      if (isAudioPlaying) {
        synthGain.gain.setTargetAtTime(0.06, audioCtx.currentTime, 0.1);
        audioSynthLabel.textContent = 'AUDIO: ON (SYNTH)';
        audioSynthToggle.classList.add('active');
        playTeleportChirp();
      } else {
        synthGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
        audioSynthLabel.textContent = 'AUDIO: OFF';
        audioSynthToggle.classList.remove('active');
      }
    });
  }

  // Fullscreen toggle for Theater
  if (theaterFullscreenBtn && cinematicTheater) {
    theaterFullscreenBtn.addEventListener('click', () => {
      cinematicTheater.classList.toggle('fullscreen');
      if (cinematicTheater.classList.contains('fullscreen')) {
        theaterFullscreenBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        `;
      } else {
        theaterFullscreenBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
        `;
      }
    });
  }

  // 3D Parallax Tilt for Theater Screen Media
  const theaterScreen = document.getElementById('theater-screen');
  if (theaterScreen && theaterScreenMedia) {
    theaterScreen.addEventListener('mousemove', (e) => {
      const rect = theaterScreen.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      theaterScreenMedia.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    theaterScreen.addEventListener('mouseleave', () => {
      theaterScreenMedia.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  }

  // Interactive 3D Perspective Tilt on Cards (Pillars, Vision & Transform Cards)
  const tiltCards = document.querySelectorAll('.pillar-card, .vision-card, .transform-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Scroll-triggered Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.pillar-card, .vision-card, .transform-card, .journey-card, .interactive-experience-box, .cinematic-theater');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }

  // ==========================================
  // 4. Interactive Experience: Your Vision & Your Role
  // ==========================================
  const interestChips = document.querySelectorAll('.interest-chip');
  const roleCards = document.querySelectorAll('.role-card');
  const manifestoTitle = document.getElementById('manifesto-title');
  const manifestoMessage = document.getElementById('manifesto-message');
  const manifestoTags = document.getElementById('manifesto-tags');
  const manifestoId = document.getElementById('manifesto-id');

  let selectedInterests = new Set(['AI', 'Technology']);
  let selectedRole = 'Developer';

  const roleNarratives = {
    Student: {
      roleTitle: 'Lifelong Pioneer & Knowledge Architect',
      base: 'As a passionate learner, your curiosity will shape the intellectual capital of 2047. By mastering multidisciplinary frontiers from cognitive computing to ecological engineering, you are laying the ground rules for the century ahead.'
    },
    Developer: {
      roleTitle: 'Digital Infrastructure & Systems Architect',
      base: 'As a builder of code and protocols, you construct the digital backbone of a self-reliant India. Your algorithms and sovereign platforms will empower 1.5 billion citizens to operate on secure, open, and world-class systems.'
    },
    Researcher: {
      roleTitle: 'Deep-Tech & Scientific Frontier Explorer',
      base: 'As a dedicated investigator of the unknown, your discoveries in quantum mechanics, synthetic biology, space propulsion, and clean energy will propel India to the vanguard of global science and planetary stewardship.'
    },
    Entrepreneur: {
      roleTitle: 'Venture Catalyst & Economic Engine Creator',
      base: 'As a daring founder, you translate breakthrough ideas into scalable global enterprises. You will create millions of future-proof careers and export world-beating solutions from Indian soil to global and interstellar markets.'
    },
    Creator: {
      roleTitle: 'Cultural Visionary & Narrative Shaper',
      base: 'As a storyteller and designer, you craft the cultural soul and visual identity of Viksit Bharat. You bridge ancient timeless Indic wisdom with futuristic design aesthetics, inspiring the next generation across the globe.'
    }
  };

  const interestImpact = {
    AI: 'harnessing sovereign ethical superintelligence to solve fundamental national challenges',
    Education: 'democratizing transformative, borderless knowledge for every eager mind',
    Environment: 'pioneering carbon-negative fusion energy and complete ecological balance',
    Space: 'expanding India’s presence from Earth orbits to lunar settlements and deep cosmos',
    Technology: 'building tamper-proof open protocols and resilient semiconductor supply chains',
    Entrepreneurship: 'driving high-velocity innovation and sustainable wealth creation across Bharat'
  };

  function updateManifesto() {
    const roleInfo = roleNarratives[selectedRole] || roleNarratives['Developer'];
    const interestsList = Array.from(selectedInterests);

    // Dynamic Title Generation
    let interestsTitlePart = 'Technological & Frontier';
    if (selectedInterests.has('Space') && selectedInterests.has('AI')) {
      interestsTitlePart = 'Autonomous Deep-Space & AI';
    } else if (selectedInterests.has('Environment')) {
      interestsTitlePart = 'Sustainable Clean-Tech & Ecological';
    } else if (selectedInterests.has('Education')) {
      interestsTitlePart = 'Human Capital & Neural Learning';
    } else if (selectedInterests.has('Entrepreneurship')) {
      interestsTitlePart = 'High-Impact Venture & Scalable';
    } else if (selectedInterests.has('AI')) {
      interestsTitlePart = 'Next-Gen Sovereign Intelligence';
    }

    manifestoTitle.textContent = `${interestsTitlePart} ${selectedRole} of 2047`;

    // Dynamic Narrative Synthesis
    let focusPhrase = '';
    if (interestsList.length > 0) {
      const impacts = interestsList.map(i => interestImpact[i] || i.toLowerCase());
      if (impacts.length === 1) {
        focusPhrase = ` Your primary focus lies in ${impacts[0]}.`;
      } else if (impacts.length === 2) {
        focusPhrase = ` You are uniquely positioned at the convergence of ${impacts[0]} and ${impacts[1]}.`;
      } else {
        const last = impacts.pop();
        focusPhrase = ` You are championing a multidisciplinary blueprint by ${impacts.join(', ')}, and ${last}.`;
      }
    } else {
      focusPhrase = ' Every domain you explore will accelerate India’s century of greatness.';
    }

    manifestoMessage.textContent = `${roleInfo.base}${focusPhrase} In 2047, your dedication ensures that India stands not only as an economic powerhouse, but as a beacon of universal harmony, innovation, and boundless possibility.`;

    // Update Blueprint Tags
    manifestoTags.innerHTML = '';
    const activeTags = [selectedRole, ...interestsList, 'Viksit Bharat @ 2047'];
    activeTags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'blueprint-tag';
      span.textContent = `#${tag}`;
      manifestoTags.appendChild(span);
    });

    // Update Unique ID hash
    const seed = Math.abs((selectedRole.length * 31 + interestsList.join('').length * 17) % 9000) + 1000;
    manifestoId.textContent = `VB47-ID: #${seed}-${selectedRole.substring(0, 3).toUpperCase()}`;
  }

  // Interest Selection Events (Multi-Select toggle)
  interestChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const interest = chip.dataset.interest;
      if (selectedInterests.has(interest)) {
        if (selectedInterests.size > 1) { // Keep at least one selected
          selectedInterests.delete(interest);
          chip.classList.remove('selected');
        }
      } else {
        selectedInterests.add(interest);
        chip.classList.add('selected');
      }
      updateManifesto();
    });
  });

  // Role Selection Events (Single select card)
  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      roleCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedRole = card.dataset.role;
      updateManifesto();
    });
  });

  // Initialize initial manifesto state
  updateManifesto();

  // ==========================================
  // 5. Final Section: "Explore Again" Action
  // ==========================================
  const exploreAgainBtn = document.getElementById('explore-again-btn');
  if (exploreAgainBtn) {
    exploreAgainBtn.addEventListener('click', () => {
      // Reset timeline to 1947
      const firstTab = document.querySelector('.timeline-tab[data-year="1947"]');
      if (firstTab) firstTab.click();

      // Smooth scroll back to top of the hero
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
