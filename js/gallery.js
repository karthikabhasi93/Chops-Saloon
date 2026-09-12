document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".gallery-filter");
    const galleryItems = document.querySelectorAll(".gallery-item");

    if (!filterButtons.length || !galleryItems.length) {
        return;
    }

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter;

            // Update active button
            filterButtons.forEach(filterButton => {
                filterButton.classList.remove("active");
            });

            button.classList.add("active");

            // Filter gallery items
            galleryItems.forEach(item => {

                const itemCategory = item.dataset.category;

                if (
                    selectedFilter === "all" ||
                    itemCategory === selectedFilter
                ) {
                    item.classList.remove("gallery-hidden");
                } else {
                    item.classList.add("gallery-hidden");
                }

            });

        });

    });

});