const membersDataSource = "data/members.json";
const articleMembersGrid = document.querySelector(".membersGrid");

async function getMembers() {
    const response = await fetch(membersDataSource);
    if (response.ok) {
        const data = await response.json();
        console.table(data);
        displayMembers(data);
    } else {
        console.error('Failed to fetch members data.');
    }
}

const displayMembers = (members) => {
    members.forEach((member) => {
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

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}

getMembers();