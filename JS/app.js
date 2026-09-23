/* =========================================================
   ALITAS EXPRESS - LANDING PAGE
   Flow Digital
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

/*
    IMPORTANTE:

    Reemplaza este número por el número real de WhatsApp
    de Alitas Express.

    Formato:

    Ecuador = 593
    Luego el número sin el 0 inicial.

    Ejemplo de estructura:

    5939XXXXXXXX

    NO coloques espacios, +, guiones ni paréntesis.
*/

const WHATSAPP_NUMBER = "5939XXXXXXXX";


/*
    Mensaje inicial que aparecerá en WhatsApp.
*/

const WHATSAPP_MESSAGE =
    "Hola, Alitas Express. 👋 Quiero hacer un pedido. 🍗";


/* =========================================================
   WHATSAPP
========================================================= */

function createWhatsAppLink(message = WHATSAPP_MESSAGE) {

    const encodedMessage =
        encodeURIComponent(message);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}


function setupWhatsAppButtons() {

    const whatsappButtons =
        document.querySelectorAll(".whatsapp-link");


    whatsappButtons.forEach(button => {

        button.href =
            createWhatsAppLink();

        button.target = "_blank";

        button.rel =
            "noopener noreferrer";

    });

}


/* =========================================================
   PEDIDOS DE PRODUCTOS
========================================================= */

function setupProductButtons() {

    const productButtons =
        document.querySelectorAll(".product-button");


    productButtons.forEach(button => {

        button.addEventListener("click", function () {

            const productCard =
                this.closest(".product-card");

            if (!productCard) return;


            const productName =
                productCard.querySelector("h3")?.textContent.trim();

            const productPrice =
                productCard.querySelector(".product-price")?.textContent.trim();


            if (!productName) return;


            const message =
                `Hola, Alitas Express. 👋\n\n` +
                `Quiero pedir:\n` +
                `🍗 ${productName} - ${productPrice}\n\n` +
                `¿Me pueden ayudar con mi pedido?`;


            window.open(
                createWhatsAppLink(message),
                "_blank"
            );

        });

    });

}


/* =========================================================
   BOTÓN DEL PRODUCTO DESTACADO
========================================================= */

function setupFeaturedButton() {

    const featuredButton =
        document.querySelector(".featured-content .btn");


    if (!featuredButton) return;


    featuredButton.addEventListener(
        "click",
        function () {

            const message =
                `Hola, Alitas Express. 👋\n\n` +
                `Quiero pedir:\n` +
                `🍗 10 Alitas - $12.99\n\n` +
                `¿Me pueden ayudar con el pedido?`;


            window.open(
                createWhatsAppLink(message),
                "_blank"
            );

        }
    );

}


/* =========================================================
   AÑO DEL FOOTER
========================================================= */

function updateCurrentYear() {

    const yearElement =
        document.getElementById("current-year");


    if (!yearElement) return;


    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   ANIMACIÓN SUAVE AL HACER SCROLL
========================================================= */

function setupScrollAnimation() {

    const elements =
        document.querySelectorAll(
            ".product-card, .benefit, .step, .featured-card"
        );


    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {

            element.style.opacity = "1";

        });

        return;
    }


    elements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   INICIALIZACIÓN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupWhatsAppButtons();

        setupProductButtons();

        setupFeaturedButton();

        updateCurrentYear();

        setupScrollAnimation();

    }
);