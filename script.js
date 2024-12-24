function toggleJob(container) {
    container.classList.toggle("expanded");
    // reset other containers if only one should be expanded at a time
    document.querySelectorAll('.grid-card-1, .grid-card-2, .grid-card-3').forEach(job => {
        if (job !== container) {
            job.classList.remove('expanded');
        }
    });
}

function toggleImage(card) {
    // Toggle the expanded class for the clicked card
    card.classList.toggle("expanded");

    // Reset other cards
    document.querySelectorAll('.project-card-1, .project-card-2, .project-card-3').forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove("expanded");
        }
    });
}