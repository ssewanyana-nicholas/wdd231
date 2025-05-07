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



const harmburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');
const myBttn = document.querySelector('#darkButton');
const main = document.querySelector('main');

harmburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    harmburgerElement.classList.toggle('open');
});

myBttn.addEventListener('click', () => {
    main.classList.toggle('dark');
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

// Select the HTML elements in the document that will be manipulated
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Declare the API URL with the appropriate query parameters
// This URL includes the latitude and longitude for Trier, Germany, sets the units to imperial, and includes the API key
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=0.31&lon=32.59&units=imperial&appid=99990204cea55bff7337537fe3fbbcc4';

// Define the asynchronous function to fetch weather data
async function apiFetch() {
    try {
        // Fetch data from the OpenWeatherMap API using the constructed URL
        const response = await fetch(url);

        // Check if the response is OK (status code 200-299)
        if (response.ok) {
            // Parse the response data as JSON
            const data = await response.json();

            // Log the data to the console for testing purposes
            console.log(data);

            // Call the function to display the results on the web page
            displayResults(data);
        } else {
            // If the response is not OK, throw an error with the response text
            throw Error(await response.text());
        }
    } catch (error) {
        // Log any errors that occur during the fetch to the console
        console.log(error);
    }
}

// Define the function to display the fetched weather data on the web page
function displayResults(data) {
    // Set the inner HTML of the currentTemp element to the current temperature in Fahrenheit
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;

    // Construct the URL for the weather icon image using the icon code from the data
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    // Get the description of the weather from the data
    let desc = data.weather[0].description;

    // Set the src attribute of the weatherIcon element to the constructed icon URL
    weatherIcon.setAttribute('src', iconsrc);

    // Set the alt attribute of the weatherIcon element to the weather description
    weatherIcon.setAttribute('alt', desc);

    // Set the text content of the captionDesc element to the weather description
    captionDesc.textContent = `${desc}`;
}

// Invoke the function to fetch and display weather data
apiFetch();