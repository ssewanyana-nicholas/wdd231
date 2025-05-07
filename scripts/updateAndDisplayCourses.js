// Update the completed property for courses you have completed
function updateCompletedCourses(courses) {
    courses.forEach(course => {
        if (course.number === 110 || course.number === 130) {
            course.completed = true; // Mark these courses as completed
        }
    });
}

// Dynamically display courses in the certificate section
function displayCourses(courses, filter = 'All') {
    const coursesContainer = document.querySelector('.courses');
    coursesContainer.innerHTML = ''; // Clear existing courses

    const filteredCourses = courses.filter(course => {
        if (filter === 'All') return true;
        return course.subject === filter;
    });

    filteredCourses.forEach(course => {
        const courseButton = document.createElement('button');
        courseButton.textContent = `${course.subject} ${course.number} - ${course.title}`;
        courseButton.className = course.completed ? 'completed' : 'not-completed';
        coursesContainer.appendChild(courseButton);
    });
}

// Add event listeners to filter buttons
function setupFilterButtons(courses) {
    const filterButtons = document.querySelectorAll('.filters button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayCourses(courses, button.textContent);
        });
    });
}

// Initialize the page
function init(courses) {
    updateCompletedCourses(courses);
    displayCourses(courses);
    setupFilterButtons(courses);
}

// Export the init function for use in other files
export { init };