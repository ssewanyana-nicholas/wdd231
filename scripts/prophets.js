// Declare the URL of the JSON resource
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Select the HTML div element with the id "cards"
const cards = document.querySelector('#cards');

// Fetch data from the JSON source
async function getProphetData() {
    const response = await fetch(url); // Fetch the data
    const data = await response.json(); // Convert response to JSON
    console.table(data.prophets); // Display data in table format for debugging
    displayProphets(data.prophets); // Call displayProphets with the prophets array
}

// Function to display the prophets
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements for the card
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let birthInfo = document.createElement('p');

        // Populate the h2 with the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        birthInfo.innerHTML = `Date of Birth: ${prophet.birthdate}<br>
        Place of Birth: ${prophet.birthplace}`;

        // Build the image element
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append elements to the card
        card.appendChild(fullName);
        card.appendChild(birthInfo);
        card.appendChild(portrait);

        // Append the card to the cards container
        cards.appendChild(card);
    });
};

// Call the function to fetch and display data
getProphetData();