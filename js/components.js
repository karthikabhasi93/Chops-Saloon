document.addEventListener("DOMContentLoaded", () => {

    // Load Navbar
    const navbarContainer =
        document.getElementById("site-navbar");

    if (navbarContainer) {

        fetch("components/navbar.html")
            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        "Failed to load navbar."
                    );
                }

                return response.text();
            })
            .then(html => {

                navbarContainer.innerHTML = html;

                initializeNavbar();

            })
            .catch(error => {

                console.error(
                    "Navbar loading error:",
                    error
                );

            });
    }


    // Load Footer
    const footerContainer =
        document.getElementById("site-footer");

    if (footerContainer) {

        fetch("components/footer.html")
            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        "Failed to load footer."
                    );
                }

                return response.text();
            })
            .then(html => {

                footerContainer.innerHTML = html;

            })
            .catch(error => {

                console.error(
                    "Footer loading error:",
                    error
                );

            });
    }

});


/* =========================================================
   NAVBAR FUNCTIONALITY
   ========================================================= */

function initializeNavbar() {

    const menuButton =
        document.querySelector(".menu-button");

    const mobileMenu =
        document.querySelector("#mobile-navigation");


    if (!menuButton || !mobileMenu) {
        return;
    }


    /* =====================================================
       OPEN / CLOSE MOBILE MENU
    ===================================================== */

    menuButton.addEventListener("click", () => {

        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";


        const shouldOpen = !isOpen;


        /* ---------------------------------------------
           Update accessibility state
        --------------------------------------------- */

        menuButton.setAttribute(
            "aria-expanded",
            String(shouldOpen)
        );


        /* ---------------------------------------------
           Open / close mobile menu
        --------------------------------------------- */

        mobileMenu.classList.toggle(
            "open",
            shouldOpen
        );


        /* ---------------------------------------------
           Change hamburger → X
        --------------------------------------------- */

        menuButton.classList.toggle(
            "active",
            shouldOpen
        );


        /* ---------------------------------------------
           Prevent page scrolling while menu is open
        --------------------------------------------- */

        document.body.classList.toggle(
            "menu-open",
            shouldOpen
        );

    });


    /* =====================================================
       CLOSE MENU WHEN A LINK IS CLICKED
    ===================================================== */

    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            /* Close menu */

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            mobileMenu.classList.remove(
                "open"
            );


            /* Change X → hamburger */

            menuButton.classList.remove(
                "active"
            );


            /* Enable page scrolling */

            document.body.classList.remove(
                "menu-open"
            );

        });

    });

}