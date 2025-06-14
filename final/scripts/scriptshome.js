document.addEventListener('DOMContentLoaded', function () {
    // Get the current year
    const currentYear = new Date().getFullYear();
    // Set the current year in the first paragraph
    document.getElementById('copyright').innerHTML = `&copy; ${currentYear} Nicholas Ssewanyana, Uganda- kampala`;

    // Get the last modified date
    const lastModifiedDate = document.lastModified;
    // Set the last modified date in the second paragraph
    document.getElementById('lastModified').innerHTML = `Last Modification: ${lastModifiedDate}`;
});


const hamburgerElement = document.querySelector('#myButton');
const menuLinks = document.querySelector('.menuLinks');
hamburgerElement.addEventListener('click', () => {
    menuLinks.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

// 1️⃣ Initialize display element variable
const visitsDisplay = document.querySelector(".visits");

// 2️⃣ Get the stored VALUE for the numVisits-ls KEY in localStorage if it exists. If the numVisits KEY is missing, then assign 0 to the numVisits variable.
let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;

// 3️⃣ Determine if this is the first visit or display the number of visits. We wrote this example backwards in order for you to think deeply about the logic.
if (numVisits !== 0) {
    visitsDisplay.textContent = numVisits;
} else {
    visitsDisplay.textContent = `This is your first visit. 🥳 Welcome!`;
}

// 4️⃣ increment the number of visits by one.
numVisits++;

// 5️⃣ store the new visit total into localStorage, key=numVisits-ls
localStorage.setItem("numVisits-ls", numVisits);

// 💡A client can view the localStorage data using the Applications panel in the browsers's DevTools - check it out on any major site.

const membersUrl = 'https://ssewanyana-nicholas.github.io/wdd231/final/data/members.json';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=0.31&lon=32.59&units=imperial&appid=99990204cea55bff7337537fe3fbbcc4';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=0.31&lon=32.59&units=imperial&appid=99990204cea55bff7337537fe3fbbcc4';

function fetchWeatherData() {
    // Fetch current weather
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}°F`;
            const weatherIcon = document.getElementById('weather-icon');
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherIcon.alt = data.weather[0].description;
            document.getElementById('weather-description').textContent =
                data.weather[0].description.replace(/\b\w/g, c => c.toUpperCase());
        })
        .catch(error => {
            document.getElementById('current-temp').textContent = 'N/A';
            document.getElementById('weather-description').textContent = 'Weather unavailable';
        });

    // Fetch forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecastList = document.getElementById('forecast-list');
            forecastList.innerHTML = '';

            // Get the next three days at noon
            const days = {};
            data.list.forEach(item => {
                const date = new Date(item.dt_txt);
                const day = date.toLocaleDateString(undefined, { weekday: 'long' });
                if (date.getHours() === 12 && Object.keys(days).length < 3) {
                    days[day] = item;
                }
            });

            Object.entries(days).forEach(([day, item], idx) => {
                const temp = Math.round(item.main.temp);
                const li = document.createElement('li');
                li.innerHTML = `${idx === 0 ? 'Today' : day}: <strong>${temp}&deg;F</strong>`;
                forecastList.appendChild(li);
            });
        })
        .catch(error => {
            const forecastList = document.getElementById('forecast-list');
            forecastList.innerHTML = '<li>Forecast unavailable</li>';
        });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    fetchMemberData();
    setupBanner();
    checkLinks();
});

let slideIndex = 0;

function fetchMemberData() {
    fetch(membersUrl)
        .then(response => response.json())
        .then(members => {
            const spotlightContainer = document.getElementById('spotlight-container');
            const eligibleMembers = members.filter(member => member.membershiplevel === 'Gold Membership' || member.membershiplevel === 'Silver Membership');

            function loadSpotlights() {
                spotlightContainer.innerHTML = ''; // Clear previous spotlights
                const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
                shuffledMembers.forEach(member => {
                    const slideDiv = document.createElement('div');
                    slideDiv.className = 'slide';

                    const img = document.createElement('img');
                    img.src = member.imageurl;
                    img.alt = member.businessname;
                    slideDiv.appendChild(img);

                    const businessName = document.createElement('h3');
                    businessName.textContent = member.businessname;
                    slideDiv.appendChild(businessName);

                    const address = document.createElement('p');
                    address.textContent = member.address;
                    slideDiv.appendChild(address);

                    const phone = document.createElement('p');
                    phone.textContent = `Phone: ${member.phone}`;
                    slideDiv.appendChild(phone);

                    const website = document.createElement('a');
                    website.href = member.website;
                    website.textContent = member.website;
                    website.target = '_blank';
                    slideDiv.appendChild(website);

                    const otherInfo = document.createElement('p');
                    otherInfo.textContent = member.otherinformation;
                    slideDiv.appendChild(otherInfo);

                    // New element for membership level
                    const membershipLevel = document.createElement('p');
                    membershipLevel.className = 'membership-level';
                    membershipLevel.textContent = `Membership Level: ${member.membershiplevel}`;
                    slideDiv.appendChild(membershipLevel);

                    spotlightContainer.appendChild(slideDiv);
                });

                showSlides(slideIndex);
            }

            loadSpotlights();
            setInterval(loadSpotlights, 2000); // Reload spotlights every 20 seconds
        })
        .catch(error => console.error('Error fetching member data:', error));
}

function setupBanner() {
    const banner = document.getElementById('meet-greet-banner');
    const closeButton = document.getElementById('close-banner');
    const today = new Date().getDay();

    if (today >= 1 && today <= 3) { // Show banner on Monday, Tuesday, and Wednesday
        banner.style.display = 'block';
    } else {
        banner.style.display = 'none';
    }

    closeButton.addEventListener('click', () => {
        banner.style.display = 'none';
    });
}

function checkLinks() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        fetch(link.href)
            .then(response => {
                if (!response.ok) {
                    console.error(`Link not working: ${link.href}`);
                }
            })
            .catch(() => console.error(`Link not working: ${link.href}`));
    });
}

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }
    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? 'block' : 'none';
    });
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

async function fetchForecast() {
    const response = await fetch(forecastUrl);
    if (!response.ok) return;
    const data = await response.json();
    const forecastList = document.getElementById('forecast-list');
    forecastList.innerHTML = '';

    // Get the next three days at noon
    const days = {};
    data.list.forEach(item => {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString(undefined, { weekday: 'long' });
        if (date.getHours() === 12 && Object.keys(days).length < 3) {
            days[day] = item;
        }
    });

    Object.entries(days).forEach(([day, item], idx) => {
        const temp = Math.round(item.main.temp);
        const li = document.createElement('li');
        li.innerHTML = `${idx === 0 ? 'Today' : day}: <strong>${temp}&deg;F</strong>`;
        forecastList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // ...existing code...
    fetchForecast();
});

async function fetchCurrentWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error('Weather fetch failed');
        const data = await response.json();

        // Update DOM
        document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}°F`;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById('weather-icon').alt = data.weather[0].description;
        document.getElementById('weather-description').textContent = data.weather[0].description
            .replace(/\b\w/g, c => c.toUpperCase());

    } catch (err) {
        document.getElementById('current-temp').textContent = 'N/A';
        document.getElementById('weather-description').textContent = 'Weather unavailable';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCurrentWeather();
    // ...other DOMContentLoaded code...
});

// Dark mode toggle
const darkButton = document.getElementById('darkButton');
darkButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// ...existing code...

// Example: Filter for spotlight members (e.g., gold/silver tier, or a 'spotlight' property)
function getSpotlightMembers(members, count = 3) {
    // Example: spotlight members are those with a 'spotlight' property true or a certain membership level
    const spotlight = members.filter(m => m.spotlight || m.membership === 'Gold' || m.membership === 'Silver');
    // Shuffle and pick three
    for (let i = spotlight.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [spotlight[i], spotlight[j]] = [spotlight[j], spotlight[i]];
    }
    return spotlight.slice(0, count);
}

function displaySpotlightMembers(members) {
    const spotlightMembers = getSpotlightMembers(members, 3);
    const container = document.getElementById('spotlight-cards');
    container.innerHTML = '';
    spotlightMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <img src="${member.image || 'images/default-member.png'}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.tagline || ''}</p>
            <p>${member.address || ''}</p>
            <a href="${member.website || '#'}" target="_blank">Visit Website</a>
        `;
        container.appendChild(card);
    });
}

// After fetching/loading your members data, call:
if (typeof members !== "undefined") {
    displaySpotlightMembers(members);
}

