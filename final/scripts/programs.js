import { programs } from "../data/programs.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const tabsContainer = document.getElementById("programs-tabs");
  const contentContainer = document.getElementById("programs-content");

  // Tabs
  programs.forEach((program, idx) => {
    const tab = document.createElement("div");
    tab.className = "programs-tab" + (idx === 0 ? " active" : "");
    tab.dataset.target = program.id;
    tab.textContent = program.title.split("&")[0].trim();
    tabsContainer.appendChild(tab);
  });

  // Sections
  programs.forEach((program, idx) => {
    const section = document.createElement("div");
    section.className = "programs-section" + (idx === 0 ? " active" : "");
    section.id = program.id;

    const sectionTitle = document.createElement("div");
    sectionTitle.className = "programs-section-title";
    sectionTitle.innerHTML = `<h2>${program.title}</h2><p>${program.description}</p>`;
    section.appendChild(sectionTitle);

    const grid = document.createElement("div");
    grid.className = "programs-grid";

    program.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "programs-card";

      const imageDiv = document.createElement("div");
      imageDiv.className = "programs-image";
      const imgSrc = item.images || "images/programs/default.jpg";
      imageDiv.innerHTML = `<img src="${imgSrc}" alt="${item.name}" loading="lazy">`;
      card.appendChild(imageDiv);

      const details = document.createElement("div");
      details.className = "programs-details";

      const h3 = document.createElement("h3");
      h3.className = "programs-title";
      h3.textContent = item.name;
      details.appendChild(h3);

      const desc = document.createElement("p");
      desc.className = "programs-description";
      desc.textContent = item.details;
      details.appendChild(desc);

      if (item.price || item.cta) {
        const meta = document.createElement("div");
        meta.className = "programs-meta";

        if (item.price) {
          const price = document.createElement("span");
          price.className = "programs-price";
          price.textContent = item.price;
          meta.appendChild(price);
        }

        if (item.cta) {
          const cta = document.createElement("a");
          cta.href = "contact.html"; // Fix from "#"
          cta.className = "programs-cta-button";
          cta.textContent = item.cta;
          meta.appendChild(cta);
        }

        details.appendChild(meta);
      }

      card.appendChild(details);
      grid.appendChild(card);
    });

    section.appendChild(grid);
    contentContainer.appendChild(section);
  });

  // Tab switching
  tabsContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("programs-tab")) return;

    const targetId = e.target.dataset.target;

    tabsContainer.querySelectorAll(".programs-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.target === targetId);
    });

    contentContainer.querySelectorAll(".programs-section").forEach(section => {
      section.classList.toggle("active", section.id === targetId);
    });
  });
});
