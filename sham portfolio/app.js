// ==========================================
// PORTFOLIO LOGIC & ANIMATIONS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. POPULATE DATA FROM data.js ---

    // Set Personal Info
    document.title = `${portfolioData.personal.name} | ${portfolioData.personal.role}`;
    document.getElementById("logo-text").innerHTML = `<span>${portfolioData.personal.name.charAt(0)}</span>${portfolioData.personal.name.slice(1)}`;
    document.getElementById("hero-role").textContent = portfolioData.personal.role;

    // Handle tagline (keeping "grow your business" gradient if it exists, simple fallback)
    const tagline = portfolioData.personal.tagline;
    document.getElementById("hero-tagline").innerHTML = tagline.replace("grow your business", `<span class="gradient-text text-pop">grow your business.</span>`);

    document.getElementById("hero-bio").textContent = portfolioData.personal.bio;
    document.getElementById("contact-heading").textContent = portfolioData.personal.contactHeading || "Ready for your project?";

    // New customizable bottom slot elements
    const subTextEl = document.querySelector(".contact-sub");
    if (subTextEl && portfolioData.personal.contactSubText) {
        subTextEl.textContent = portfolioData.personal.contactSubText;
    }

    const contactBtn = document.getElementById("contact-email-btn");
    const linkedIn = portfolioData.socials.find(s => s.name === "LinkedIn");
    if (contactBtn && linkedIn) {
        contactBtn.href = linkedIn.url;
        contactBtn.target = "_blank";
    }
    if (portfolioData.personal.contactBtnText) {
        contactBtn.innerHTML = `${portfolioData.personal.contactBtnText} <i class="fas fa-paper-plane"></i>`;
    }

    document.getElementById("footer-name").textContent = portfolioData.personal.name;
    document.getElementById("footer-copy-name").textContent = portfolioData.personal.name;
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Set WhatsApp Links for "Let's Talk" buttons
    if (portfolioData.personal.whatsappNumber) {
        const waUrl = `https://wa.me/${portfolioData.personal.whatsappNumber.replace(/[^0-9]/g, '')}`;
        document.querySelectorAll("a").forEach(link => {
            if (link.textContent.includes("Let's Talk")) {
                link.href = waUrl;
                link.target = "_blank";
            }
        });
    }

    // Set Social Links
    const socialContainer = document.getElementById("social-container");
    portfolioData.socials.forEach(social => {
        const a = document.createElement("a");
        a.href = social.url;
        a.className = "social-link";
        a.innerHTML = `<i class="${social.icon}"></i>`;
        a.target = "_blank";
        a.setAttribute("aria-label", social.name);
        socialContainer.appendChild(a);
    });

    // Set Services
    const servicesContainer = document.getElementById("services-container");
    portfolioData.services.forEach((service, index) => {
        servicesContainer.innerHTML += `
            <div class="service-card reveal-up">
                <div class="service-content">
                    <div class="service-icon"><i class="${service.icon}"></i></div>
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-desc">${service.description}</p>
                </div>
            </div>
        `;
    });

    // Set Projects
    const portfolioContainer = document.getElementById("portfolio-container");
    portfolioData.projects.forEach((project, index) => {
        portfolioContainer.innerHTML += `
            <div class="project-card reveal-up" onclick="window.open('${project.link}', '_blank')">
                <div class="project-image-wrapper">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-overlay">
                    <span class="project-category">${project.category}</span>
                    <h3 class="project-title">${project.title}</h3>
                </div>
                <div class="project-link-icon">
                    <i class="fas fa-arrow-right"></i>
                </div>
            </div>
        `;
    });

    // Set Pricing
    const pricingContainer = document.getElementById("pricing-container");
    if (portfolioData.pricing && pricingContainer) {
        portfolioData.pricing.forEach((plan, index) => {
            const delay = index * 0.1;
            const popularBadge = plan.isPopular ? `<div class="pricing-badge">POPULAR</div>` : '';
            const cardClass = plan.isPopular ? "pricing-card popular reveal-up" : "pricing-card reveal-up";
            const btnClass = plan.isPopular ? "btn btn-primary btn-block text-lg" : "btn btn-pricing-green btn-block text-lg";

            let featuresHtml = '';
            plan.features.forEach(feature => {
                featuresHtml += `<li><i class="fas fa-check"></i> ${feature}</li>`;
            });

            pricingContainer.innerHTML += `
                <div class="${cardClass}" style="transition-delay: ${delay}s">
                    ${popularBadge}
                    <h3 class="pricing-title">${plan.title}</h3>
                    <p class="pricing-desc">${plan.description}</p>
                    <div class="pricing-price-wrap">
                        <span class="pricing-type">${plan.paymentType}</span>
                        <h4 class="pricing-price">${plan.price}</h4>
                    </div>
                    <ul class="pricing-features">
                        ${featuresHtml}
                    </ul>
                    <a href="${plan.buttonLink}" target="_blank" class="${btnClass}">${plan.buttonText} <i class="fas fa-arrow-right" style="margin-left: 5px; font-size: 0.8rem;"></i></a>
                </div>
            `;
        });
    }

    // Set Testimonials
    const testimonialContainer = document.getElementById("testimonial-container");
    portfolioData.testimonials.forEach((test, index) => {
        testimonialContainer.innerHTML += `
            <div class="testimonial-card reveal-up">
                <i class="fas fa-quote-right quote-icon"></i>
                <p class="testimonial-text">"${test.quote}"</p>
                <div class="testimonial-author">
                    <div class="author-avatar">${test.author.charAt(0)}</div>
                    <div class="author-info">
                        <h4>${test.author}</h4>
                        <p>${test.role}</p>
                    </div>
                </div>
            </div>
        `;
    });

    // --- 2. INTERACTIVE ELEMENTS ---

    // Mobile Menu Toggle
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    let menuOpen = false;

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            menuOpen = !menuOpen;
            if (menuOpen) {
                mobileMenu.classList.add("active");
                menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenu.classList.remove("active");
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            if (menuBtn) menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            menuOpen = false;
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });


    // --- 3. GSAP ANIMATIONS ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Initial Hero Animation
        const tl = gsap.timeline();

        tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2 })
            .from(".hero-title", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
            .from(".hero-desc", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
            .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
            .from(".scroll-indicator", { opacity: 0, duration: 1, ease: "power1.inOut" }, "-=0.2");

        // Scroll Animations for elements with .reveal-up class
        const revealElements = document.querySelectorAll(".reveal-up");
        revealElements.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // Trigger when element is 85% down the viewport
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        // Parallax effect for glow orbs
        gsap.utils.toArray(".glow-orb").forEach(orb => {
            gsap.to(orb, {
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                },
                y: (i, target) => -ScrollTrigger.maxScroll(window) * (target.dataset.speed || 0.2) || -300,
                ease: "none"
            });
        });
    }
});
