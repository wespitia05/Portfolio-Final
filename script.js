function toggleJob(container) {
    container.classList.toggle("expanded");
    // reset other containers if only one should be expanded at a time
    document.querySelectorAll('.grid-card-1, .grid-card-2, .grid-card-3').forEach(job => {
        if (job !== container) {
            job.classList.remove('expanded');
        }
    });
}