function setView(view, clickedButton) {
    // Remove the 'active' class from all buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => button.classList.remove('active'));

    // Add the 'active' class to the clicked button
    clickedButton.classList.add('active');

    // Reset all grid items to be visible and remove the full-screen effect
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.classList.remove('hidden', 'full-screen');
    });

    // Adjust layout based on the selected view
    const rightSection = document.getElementById('rightSection');
    if (view === 'WARD') {
        // Show all patients in a 2x2 grid
        rightSection.style.gridTemplateColumns = '1fr 1fr';
        rightSection.style.gridTemplateRows = '1fr 1fr';
    } else {
        // Hide all other patients and make the selected one fill the entire right section
        rightSection.style.gridTemplateColumns = '1fr';
        rightSection.style.gridTemplateRows = '1fr';

        if (view === 'PATIENT 1') {
            document.getElementById('patient1').classList.add('full-screen');
            document.getElementById('patient2').classList.add('hidden');
            document.getElementById('patient3').classList.add('hidden');
            document.getElementById('patient4').classList.add('hidden');
        } else if (view === 'PATIENT 2') {
            document.getElementById('patient2').classList.add('full-screen');
            document.getElementById('patient1').classList.add('hidden');
            document.getElementById('patient3').classList.add('hidden');
            document.getElementById('patient4').classList.add('hidden');
        } else if (view === 'PATIENT 3') {
            document.getElementById('patient3').classList.add('full-screen');
            document.getElementById('patient1').classList.add('hidden');
            document.getElementById('patient2').classList.add('hidden');
            document.getElementById('patient4').classList.add('hidden');
        } else if (view === 'PATIENT 4') {
            document.getElementById('patient4').classList.add('full-screen');
            document.getElementById('patient1').classList.add('hidden');
            document.getElementById('patient2').classList.add('hidden');
            document.getElementById('patient3').classList.add('hidden');
        }
    }
}
