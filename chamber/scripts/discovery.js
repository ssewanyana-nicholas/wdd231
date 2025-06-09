import { places } from "../data/places.mjs";

if (window.location.pathname.includes("discover.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        const main = document.querySelector("main");
        if (!main) return;

        const container = document.createElement("div");
        container.className = "allplaces";

        places.forEach(place => {
            const card = document.createElement("div");

            const img = document.createElement("img");
            img.src = `images/${place.photo}`;
            img.alt = place.name;
            img.loading = "lazy";

            const h2 = document.createElement("h2");
            h2.textContent = place.name;

            const address = document.createElement("p");
            address.innerHTML = `<strong>Address:</strong> ${place.address}`;
            address.className = "address";

            const cost = document.createElement("p");
            cost.innerHTML = `<strong>Cost:</strong> ${place.cost}`;
            cost.className = "cost";

            const desc = document.createElement("p");
            desc.textContent = place.description;
            desc.className = "desc";

            card.appendChild(img);
            card.appendChild(h2);
            card.appendChild(address);
            card.appendChild(cost);
            card.appendChild(desc);

            container.appendChild(card);
        });

        main.appendChild(container);
    });
}