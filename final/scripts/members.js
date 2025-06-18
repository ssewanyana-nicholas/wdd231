const membersDataSource = "data/members.json";
const articleMembersGrid = document.querySelector(".membersGrid");

let members = [];
let currentIndex = 0;
let spotlightInterval = null;

// Always display 3 products at a time on index.html
const isDirectory = window.location.pathname.includes("");

// Fetch members and start appropriate display
async function getMembers() {
    const response = await fetch(membersDataSource);
    if (response.ok) {
        members = await response.json();
        if (isDirectory) {
            startSpotlight(); // Use spotlight logic for index.html
        } else {
            startSpotlight();
        }
    } else {
        console.error('Failed to fetch members data.');
    }
}

// Display three products at a time, cycling through the list
function displaySpotlightProducts() {
    articleMembersGrid.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const product = members[(currentIndex + i) % members.length];
        let section = document.createElement('section');
        section.className = 'product-card';

        let image = document.createElement('img');
        image.setAttribute('alt', product.name);
        image.setAttribute('src', product.image);
        image.setAttribute('width', "180");

        let h3 = document.createElement('h3');
        h3.textContent = product.name;

        let desc = document.createElement('p');
        desc.textContent = product.description;

        let category = document.createElement('p');
        category.innerHTML = `<strong>Category:</strong> ${product.category}`;

        let price = document.createElement('p');
        price.innerHTML = `<strong>Price:</strong> $${product.price.toFixed(2)}`;

        section.appendChild(h3);
        section.appendChild(image);
        section.appendChild(desc);
        section.appendChild(category);
        section.appendChild(price);

        if (product.discount && product.discount > 0) {
            let discount = document.createElement('p');
            discount.className = 'discount';
            discount.textContent = `Discount: ${product.discount}% off`;
            section.appendChild(discount);
        }

        articleMembersGrid.appendChild(section);
    }
    currentIndex = (currentIndex + 3) % members.length;
}

// Start the spotlight interval (for all pages)
function startSpotlight() {
    displaySpotlightProducts();
    if (spotlightInterval) clearInterval(spotlightInterval);
    spotlightInterval = setInterval(displaySpotlightProducts, 5000);
}

// Grid/List toggle (optional, will only affect layout, not count)
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article.membersGrid");

if (gridbutton && listbutton && display) {
    gridbutton.addEventListener("click", () => {
        display.classList.add("grid");
        display.classList.remove("list");
    });

    listbutton.addEventListener("click", () => {
        display.classList.add("list");
        display.classList.remove("grid");
    });
}

getMembers();