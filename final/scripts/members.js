const membersDataSource = "data/members.json";
const articleMembersGrid = document.querySelector(".membersGrid");

let members = [];
let currentIndex = 0;
let spotlightInterval = null;

// Determine if this is the index page
const isIndexPage = window.location.pathname.includes("index.html");

// Fetch members and display
async function getMembers() {
    try {
        const response = await fetch(membersDataSource);
        if (!response.ok) throw new Error("Network response failed");

        members = await response.json();

        if (isIndexPage) {
            startSpotlight();
        } else {
            startSpotlight(); // You can later customize for directory mode
        }
    } catch (error) {
        console.error("Failed to fetch members data:", error);
    }
}

// Display 3 products at a time
function displaySpotlightProducts() {
    articleMembersGrid.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const product = members[(currentIndex + i) % members.length];

        const section = document.createElement("section");
        section.className = "product-card";

        const image = document.createElement("img");
        image.setAttribute("alt", product.name);
        image.setAttribute("src", product.image);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "180");

        const h3 = document.createElement("h3");
        h3.textContent = product.name;

        const desc = document.createElement("p");
        desc.textContent = product.description;

        const category = document.createElement("p");
        category.innerHTML = `<strong>Category:</strong> ${product.category}`;

        const price = document.createElement("p");
        price.innerHTML = `<strong>Price:</strong> $${product.price.toFixed(2)}`;

        section.append(h3, image, desc, category, price);

        if (product.discount && product.discount > 0) {
            const discount = document.createElement("p");
            discount.className = "discount";
            discount.textContent = `Discount: ${product.discount}% off`;
            section.appendChild(discount);
        }

        articleMembersGrid.appendChild(section);
    }

    currentIndex = (currentIndex + 3) % members.length;
}

// Auto-rotate every 5 seconds
function startSpotlight() {
    displaySpotlightProducts();
    clearInterval(spotlightInterval);
    spotlightInterval = setInterval(displaySpotlightProducts, 5000);
}

// Grid/List toggle support
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("article.membersGrid");

if (gridButton && listButton && display) {
    gridButton.addEventListener("click", () => {
        display.classList.add("grid");
        display.classList.remove("list");
    });

    listButton.addEventListener("click", () => {
        display.classList.add("list");
        display.classList.remove("grid");
    });
}

getMembers();
