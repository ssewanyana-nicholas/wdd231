const membersDataSource = "data/members.json";
const articleMembersGrid = document.querySelector(".membersGrid");

let members = [];
let currentIndex = 0;
let spotlightInterval = null;

// Detect if we are on the directory page
const isDirectory = window.location.pathname.includes("directory.html");

// Fetch members and start appropriate display
async function getMembers() {
    const response = await fetch(membersDataSource);
    if (response.ok) {
        members = await response.json();
        console.table(members);
        if (isDirectory) {
            displayAllMembers();
        } else {
            startSpotlight();
        }
    } else {
        console.error('Failed to fetch members data.');
    }
}

// Display all members (for directory page)
function displayAllMembers() {
    articleMembersGrid.innerHTML = '<h2 class="visually-hidden">Business Members Directory</h2>';
    members.forEach(member => {
        let section = document.createElement('section');
        let picture = document.createElement('picture');
        let image = document.createElement('img');
        let h3 = document.createElement('h3');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        let p4 = document.createElement('p');
        let url = document.createElement('a');

        image.setAttribute('alt', member.businessname);
        image.setAttribute('src', member.image || member.imageurl);
        image.setAttribute('width', "150px");
        picture.appendChild(image);
        h3.textContent = member.businessname;
        p1.textContent = "Address: " + member.address;
        p2.textContent = "Phone Number: " + member.phone;
        p3.textContent = "Membership Level: " + member.membershiplevel;
        p4.textContent = "Other Information: " + member.otherinformation;

        url.setAttribute('href', member.website);
        url.setAttribute('title', "Website of " + member.businessname);
        url.setAttribute('target', "_blank");
        url.textContent = member.website;

        section.appendChild(h3);
        section.appendChild(picture);
        section.appendChild(p1);
        section.appendChild(p2);
        section.appendChild(p3);
        section.appendChild(p4);
        section.appendChild(url);

        articleMembersGrid.appendChild(section);
    });
}

// Display three members at a time, cycling through the list (for index page)
function displaySpotlightMembers() {
    articleMembersGrid.innerHTML = '<h2 class="visually-hidden">Business Members Directory</h2>';
    for (let i = 0; i < 3; i++) {
        const member = members[(currentIndex + i) % members.length];
        let section = document.createElement('section');
        let picture = document.createElement('picture');
        let image = document.createElement('img');
        let h3 = document.createElement('h3');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        let p4 = document.createElement('p');
        let url = document.createElement('a');

        image.setAttribute('alt', member.businessname);
        image.setAttribute('src', member.image || member.imageurl);
        image.setAttribute('width', "150px");
        picture.appendChild(image);
        h3.textContent = member.businessname;
        p1.textContent = "Address: " + member.address;
        p2.textContent = "Phone Number: " + member.phone;
        p3.textContent = "Membership Level: " + member.membershiplevel;
        p4.textContent = "Other Information: " + member.otherinformation;

        url.setAttribute('href', member.website);
        url.setAttribute('title', "Website of " + member.businessname);
        url.setAttribute('target', "_blank");
        url.textContent = member.website;

        section.appendChild(h3);
        section.appendChild(picture);
        section.appendChild(p1);
        section.appendChild(p2);
        section.appendChild(p3);
        section.appendChild(p4);
        section.appendChild(url);

        articleMembersGrid.appendChild(section);
    }
    currentIndex = (currentIndex + 3) % members.length;
}

// Start the spotlight interval (for index page)
function startSpotlight() {
    displaySpotlightMembers();
    if (spotlightInterval) clearInterval(spotlightInterval);
    spotlightInterval = setInterval(displaySpotlightMembers, 5000);
}

// Grid/List toggle
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

if (gridbutton && listbutton && display) {
    gridbutton.addEventListener("click", () => {
        display.classList.add("grid");
        display.classList.remove("list");
    });

    listbutton.addEventListener("click", showList);

    function showList() {
        display.classList.add("list");
        display.classList.remove("grid");
    }
}

getMembers();