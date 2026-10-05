document.addEventListener("DOMContentLoaded", () => {

    const categoryButtons =
        document.querySelectorAll(".service-category-button");

    const categoryContents =
        document.querySelectorAll(".service-category-content");

    const emptyState =
        document.querySelector("#service-category-empty");

    if (!categoryButtons.length || !categoryContents.length) {
        return;
    }


    /* =========================================================
       CATEGORY CONTENT MAPPING
    ========================================================= */

    const categoryContentAliases = {
        "hair-styling": "hair-styling",
        "hair-treatment": "hair-treatment",
        "hair-colouring": "hair-colouring",
        "threading": "threading",
        "skin-care": "skin-care",
        "dtan": "dtan",
        "facial": "facial",
        "hydra-facial": "hydra-facial",
        "gents": "gents",
        "kids-girls": "kids-girls",
        "kids-boys": "kids-boys",
        "waxing": "waxing",
        "manicure": "manicure",
        "pedicure": "pedicure",
        "nail": "nail",
        "more": "more"
    };


    /* =========================================================
       GET CATEGORY CONTENT
    ========================================================= */

    function getContentForCategory(category) {

        const contentKey =
            categoryContentAliases[category] || category;

        return document.querySelector(
            `.service-category-content[data-category-content="${contentKey}"]`
        );
    }


    /* =========================================================
       EMPTY STATE
    ========================================================= */

    function updateEmptyState(show) {

        if (!emptyState) {
            return;
        }

        emptyState.hidden = !show;
    }


    /* =========================================================
       CLOSE ALL ACCORDIONS
    ========================================================= */

    function closeAllAccordions() {

        categoryContents.forEach(categoryContent => {

            const serviceItems =
                categoryContent.querySelectorAll(".service-item");

            serviceItems.forEach(item => {

                item.classList.remove("is-open");

                const toggle =
                    item.querySelector(".service-toggle");

                const header =
                    item.querySelector(".service-item-header");

                if (toggle) {
                    toggle.textContent = "+";
                }

                if (header) {
                    header.setAttribute("aria-expanded", "false");
                }
            });
        });
    }


    /* =========================================================
       MOBILE TAB SCROLL
    ========================================================= */

    function scrollTabIntoView(button) {

        if (!button || window.innerWidth > 700) {
            return;
        }

        button.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });
    }


    /* =========================================================
       CATEGORY SWITCHING
    ========================================================= */

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedCategory =
                button.dataset.category;

            categoryButtons.forEach(otherButton => {
                otherButton.classList.remove("active");
            });

            button.classList.add("active");

            categoryContents.forEach(content => {
                content.classList.remove("active");
            });

            const activeContent =
                getContentForCategory(selectedCategory);

            if (activeContent) {

                activeContent.classList.add("active");
                updateEmptyState(false);

            } else {

                updateEmptyState(true);
            }

            closeAllAccordions();
            scrollTabIntoView(button);
        });
    });


    /* =========================================================
       ACCORDION
    ========================================================= */

    categoryContents.forEach(categoryContent => {

        const serviceItems =
            categoryContent.querySelectorAll(".service-item");

        serviceItems.forEach(item => {

            const button =
                item.querySelector(".service-item-header");

            const toggle =
                item.querySelector(".service-toggle");

            if (!button) {
                return;
            }

            button.addEventListener("click", () => {

                const isOpen =
                    item.classList.contains("is-open");

                serviceItems.forEach(otherItem => {

                    otherItem.classList.remove("is-open");

                    const otherButton =
                        otherItem.querySelector(".service-item-header");

                    const otherToggle =
                        otherItem.querySelector(".service-toggle");

                    if (otherButton) {
                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                    if (otherToggle) {
                        otherToggle.textContent = "+";
                    }
                });

                if (!isOpen) {

                    item.classList.add("is-open");

                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    if (toggle) {
                        toggle.textContent = "−";
                    }
                }
            });
        });
    });


    /* =========================================================
       INITIAL STATE
    ========================================================= */

    const initiallyActiveButton =
        document.querySelector(
            ".service-category-button.active"
        );

    if (initiallyActiveButton) {

        const initialCategory =
            initiallyActiveButton.dataset.category;

        const initialContent =
            getContentForCategory(initialCategory);

        categoryContents.forEach(content => {
            content.classList.remove("active");
        });

        if (initialContent) {

            initialContent.classList.add("active");
            updateEmptyState(false);

        } else {

            updateEmptyState(true);
        }
    }

});
