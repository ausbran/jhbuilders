export function initContact() {
    // Select all contact sections
    const contactSections = document.querySelectorAll('.project-overview.contact');

    contactSections.forEach(contactSection => {
        const formWrapper = contactSection.querySelector('.form-wrapper'); // The form wrapper in each section
        const openButton = contactSection.querySelector('.btn:not(.close)'); // The button for opening the form
        const closeButton = formWrapper.querySelector('.close'); // The button inside the form to close it

        // Function to open the form
        function openForm() {
            formWrapper.classList.add('active');
        }

        // Function to close the form
        function closeForm() {
            formWrapper.classList.remove('active');
        }

        // Add click event listener to the open button
        if (openButton) {
            openButton.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent the default link behavior
                openForm();
                console.log('Form opened');
            });
        } else {
            console.warn('Open button not found in contact section:', contactSection);
        }

        // Add click event listener to the close button
        if (closeButton) {
            closeButton.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent any default behavior
                closeForm();
                console.log('Form closed');
            });
        } else {
            console.warn('Close button not found in form wrapper:', formWrapper);
        }
    });
}