document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('copyright').innerHTML =
        `&copy; ${currentYear} Nicholas Ssewanyana, Uganda - Kampala`;

    const lastModifiedDate = document.lastModified;
    document.getElementById('lastModified').innerHTML =
        `Last Modification: ${lastModifiedDate}`;

    // Hamburger
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector(".nav-menu ul");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("open");
        const expanded = hamburger.getAttribute("aria-expanded") === "true";
        hamburger.setAttribute("aria-expanded", !expanded);
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });

    // Visit Counter
    const visitsDisplay = document.querySelector(".visits");
    let numVisits = Number(localStorage.getItem("numVisits-ls")) || 0;

    visitsDisplay.textContent = numVisits > 0
        ? numVisits
        : "This is your first visit. 🥳 Welcome!";

    numVisits++;
    localStorage.setItem("numVisits-ls", numVisits);

    // Dark Mode Toggle
    const darkButton = document.getElementById("darkButton");
    if (darkButton) {
        darkButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }
});

const modal = document.querySelector('.modal');
const openBtn = document.querySelector('.open-modal-btn');
const closeBtn = document.querySelector('.close-modal-btn');
const overlay = document.querySelector('.modal-overlay');

openBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'false');
});

const closeModal = () => {
    modal.setAttribute('aria-hidden', 'true');
};

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
    }
});
