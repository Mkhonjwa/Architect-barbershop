
/* =====================================
   THE ARCHITECT BARBERSHOP
   JAVASCRIPT
===================================== */


/* IMAGE SLIDER */

document.addEventListener("DOMContentLoaded", function () {

    const sliderTrack = document.querySelector(".slider-track");

    const slides = document.querySelectorAll(".about-slide");

    const dots = document.querySelectorAll(".slider-dot");

    const nextBtn = document.getElementById("nextBtn");

    const prevBtn = document.getElementById("prevBtn");

    let currentSlide = 0;

    let slideInterval;


    // DISPLAY SELECTED SLIDE

    function showSlide(index) {

        currentSlide = (index + slides.length) % slides.length;

        sliderTrack.style.transform =
            `translateX(-${currentSlide * 100}%)`;

        // UPDATE DOTS

        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }


    // NEXT SLIDE

    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    // PREVIOUS SLIDE

    function prevSlide() {

        showSlide(currentSlide - 1);

    }


    // AUTOMATIC SLIDER

    function startSlider() {

        stopSlider();

        slideInterval = setInterval(nextSlide, 4000);

    }


    // STOP AUTOMATIC SLIDER

    function stopSlider() {

        clearInterval(slideInterval);

    }


    // BUTTON EVENTS

    nextBtn.addEventListener("click", function () {

        nextSlide();

        startSlider();

    });


    prevBtn.addEventListener("click", function () {

        prevSlide();

        startSlider();

    });


    // DOT CLICK EVENTS

    dots.forEach((dot, index) => {

        dot.addEventListener("click", function () {

            showSlide(index);

            startSlider();

        });

    });


    // PAUSE WHEN MOUSE ENTERS SLIDER

    const slider = document.querySelector(".slider");

    slider.addEventListener("mouseenter", stopSlider);

    slider.addEventListener("mouseleave", startSlider);


    // START SLIDER

    showSlide(0);

    startSlider();



    /* =================================
       LIVE DATE AND TIME
    ================================= */

    const dateTimeElement =
        document.getElementById("liveDateTime");


    function updateDateTime() {

        const now = new Date();

        const options = {

            weekday: "long",

            year: "numeric",

            month: "long",

            day: "numeric",

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit"

        };

        dateTimeElement.textContent =
            now.toLocaleString("en-ZA", options);

    }


    updateDateTime();

    setInterval(updateDateTime, 1000);

});

/* =====================================
   THE ARCHITECT BARBERSHOP
   SHARED JAVASCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================
       LIVE DATE AND TIME
    ================================= */

    const dateTimeElement =
        document.getElementById("liveDateTime");

    if (dateTimeElement) {

        function updateDateTime() {

            const now = new Date();

            dateTimeElement.textContent =
                now.toLocaleString("en-ZA", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                });

        }

        updateDateTime();

        setInterval(updateDateTime, 1000);
    }



    /* =================================
       HOMEPAGE IMAGE SLIDER
    ================================= */

    const sliderTrack =
        document.querySelector(".slider-track");

    if (sliderTrack) {

        const slides =
            document.querySelectorAll(".about-slide");

        const dots =
            document.querySelectorAll(".slider-dot");

        const nextBtn =
            document.getElementById("nextBtn");

        const prevBtn =
            document.getElementById("prevBtn");

        const slider =
            document.querySelector(".slider");

        let currentSlide = 0;

        let slideInterval;


        function showSlide(index) {

            if (!slides.length) return;

            currentSlide =
                (index + slides.length) % slides.length;

            sliderTrack.style.transform =
                `translateX(-${currentSlide * 100}%)`;

            dots.forEach((dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === currentSlide
                );

            });

        }


        function startSlider() {

            clearInterval(slideInterval);

            slideInterval =
                setInterval(() => {
                    showSlide(currentSlide + 1);
                }, 4000);

        }


        if (nextBtn) {

            nextBtn.addEventListener("click", function () {

                showSlide(currentSlide + 1);

                startSlider();

            });

        }


        if (prevBtn) {

            prevBtn.addEventListener("click", function () {

                showSlide(currentSlide - 1);

                startSlider();

            });

        }


        dots.forEach((dot, index) => {

            dot.addEventListener("click", function () {

                showSlide(index);

                startSlider();

            });

        });


        if (slider) {

            slider.addEventListener(
                "mouseenter",
                () => clearInterval(slideInterval)
            );

            slider.addEventListener(
                "mouseleave",
                startSlider
            );

        }


        showSlide(0);

        startSlider();

    }



    /* =================================
       CUSTOMER LOCATION
    ================================= */

    const locationBtn =
        document.getElementById("getLocationBtn");

    const locationStatus =
        document.getElementById("locationStatus");

    const latitudeInput =
        document.getElementById("latitude");

    const longitudeInput =
        document.getElementById("longitude");

    const mapsLink =
        document.getElementById("mapsLink");


    if (locationBtn) {

        locationBtn.addEventListener("click", function () {

            if (!navigator.geolocation) {

                locationStatus.textContent =
                    "Your browser does not support location sharing.";

                return;

            }


            locationStatus.textContent =
                "Requesting your location permission...";

            locationBtn.disabled = true;


            navigator.geolocation.getCurrentPosition(

                function (position) {

                    const latitude =
                        position.coords.latitude;

                    const longitude =
                        position.coords.longitude;


                    latitudeInput.value = latitude;

                    longitudeInput.value = longitude;


                    const googleMapsURL =
                        `https://www.google.com/maps?q=${latitude},${longitude}`;


                    mapsLink.href = googleMapsURL;

                    mapsLink.hidden = false;


                    locationStatus.textContent =
                        "Location shared successfully!";


                    locationBtn.textContent =
                        "📍 Location Shared";


                    locationBtn.disabled = false;

                },


                function (error) {

                    let message =
                        "Unable to get your location.";

                    if (error.code === 1) {

                        message =
                            "Location permission was denied. Please allow location access in your browser settings.";

                    } else if (error.code === 2) {

                        message =
                            "Your location is currently unavailable.";

                    } else if (error.code === 3) {

                        message =
                            "Location request timed out. Please try again.";

                    }


                    locationStatus.textContent = message;

                    locationBtn.disabled = false;

                    locationBtn.textContent =
                        "📍 Try Again";

                },

                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0
                }

            );

        });

    }



    /* =================================
       CUSTOMER ORDER FORM
    ================================= */

    const orderForm =
        document.getElementById("orderForm");

    const orderResult =
        document.getElementById("orderResult");


    if (orderForm) {

        orderForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const customerName =
                document.getElementById("name").value.trim();

            const customerPhone =
                document.getElementById("phone").value.trim();

            const selectedCut =
                document.querySelector(
                    'input[name="cut"]:checked'
                );


            if (!selectedCut) {

                alert("Please select a haircut.");

                return;

            }


            if (!customerName || !customerPhone) {

                alert("Please enter your name and phone number.");

                return;

            }


            const haircut =
                selectedCut.value;

            const price =
                Number(selectedCut.dataset.price);


            const latitude =
                document.getElementById("latitude").value;

            const longitude =
                document.getElementById("longitude").value;


            let locationText =
                "Location not provided";


            let mapsURL = "";


            if (latitude && longitude) {

                mapsURL =
                    `https://www.google.com/maps?q=${latitude},${longitude}`;

                locationText = mapsURL;

            }


            const orderMessage =

                "THE ARCHITECT BARBERSHOP ORDER\n\n" +

                "Customer: " + customerName + "\n" +

                "Phone: " + customerPhone + "\n" +

                "Haircut: " + haircut + "\n" +

                "Price: R" + price + "\n" +

                "Customer Location: " + locationText;


            orderResult.innerHTML = "";


            const heading =
                document.createElement("h3");

            heading.textContent =
                "Your Order Summary";

            orderResult.appendChild(heading);


            const summary =
                document.createElement("pre");

            summary.textContent =
                orderMessage;

            orderResult.appendChild(summary);


            if (mapsURL) {

                const mapButton =
                    document.createElement("a");

                mapButton.href = mapsURL;

                mapButton.target = "_blank";

                mapButton.rel = "noopener noreferrer";

                mapButton.textContent =
                    "View Customer Location on Google Maps";

                orderResult.appendChild(mapButton);

            }


            const copyButton =
                document.createElement("button");

            copyButton.type = "button";

            copyButton.textContent =
                "Copy Order Details";


            copyButton.addEventListener("click", async function () {

                try {

                    await navigator.clipboard.writeText(orderMessage);

                    copyButton.textContent =
                        "Order Details Copied!";

                } catch (error) {

                    copyButton.textContent =
                        "Copy unavailable - select the order text manually.";

                }

            });


            orderResult.appendChild(copyButton);


            const notice =
                document.createElement("p");

            notice.textContent =
                "Your order summary is ready. Copy these details and send them to the barbershop to confirm your booking.";

            orderResult.appendChild(notice);

            orderResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }

});

/* =====================================================
   THE ARCHITECT BARBERSHOP
   BOOKING SYSTEM
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const bookingForm = document.getElementById("orderForm");

    if (!bookingForm) return;

    const dateInput = document.getElementById("bookingDate");
    const timeInput = document.getElementById("bookingTime");

    const locationButton = document.getElementById("getLocationBtn");
    const locationStatus = document.getElementById("locationStatus");

    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");

    const mapsLink = document.getElementById("mapsLink");

    const result = document.getElementById("orderResult");
    const copyButton = document.getElementById("copyBooking");

    let bookingDetails = "";


    // SET TODAY AS THE EARLIEST BOOKING DATE

    function getLocalDate() {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    dateInput.min = getLocalDate();


    // SHARE CUSTOMER LOCATION

    locationButton.addEventListener("click", function () {

        if (!navigator.geolocation) {

            locationStatus.textContent =
                "Your browser does not support location sharing.";

            return;
        }

        locationStatus.textContent =
            "Getting your location... Please allow location access.";

        locationButton.disabled = true;

        navigator.geolocation.getCurrentPosition(

            function (position) {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                latitudeInput.value = latitude;
                longitudeInput.value = longitude;

                const googleMapsURL =
                    `https://www.google.com/maps?q=${latitude},${longitude}`;

                mapsLink.href = googleMapsURL;
                mapsLink.hidden = false;

                locationStatus.textContent =
                    "Location successfully shared!";

                locationButton.textContent =
                    "📍 Location Shared";

                locationButton.disabled = false;
            },

            function (error) {

                locationButton.disabled = false;

                switch (error.code) {

                    case error.PERMISSION_DENIED:
                        locationStatus.textContent =
                            "Location permission was denied. Please allow location access.";
                        break;

                    case error.POSITION_UNAVAILABLE:
                        locationStatus.textContent =
                            "Your location is currently unavailable.";
                        break;

                    case error.TIMEOUT:
                        locationStatus.textContent =
                            "Location request timed out. Please try again.";
                        break;

                    default:
                        locationStatus.textContent =
                            "Unable to get your location.";
                }

            },

            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            }

        );

    });


    // FORMAT BOOKING DATE

    function formatDate(date) {

        const parts = date.split("-");

        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }


    // SUBMIT BOOKING REQUEST

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const selectedCut =
            document.querySelector('input[name="cut"]:checked');

        const customerName =
            document.getElementById("name").value.trim();

        const customerPhone =
            document.getElementById("phone").value.trim();

        const bookingDate = dateInput.value;
        const bookingTime = timeInput.value;

        const latitude = latitudeInput.value;
        const longitude = longitudeInput.value;

        // CHECK REQUIRED INFORMATION

        if (!selectedCut) {
            alert("Please select a haircut.");
            return;
        }

        if (!customerName || !customerPhone) {
            alert("Please enter your name and phone number.");
            return;
        }

        if (!bookingDate || !bookingTime) {
            alert("Please select a booking date and time.");
            return;
        }

        if (bookingDate < getLocalDate()) {
            alert("Please select a future date.");
            return;
        }

        if (!latitude || !longitude) {
            alert("Please share your location before booking.");
            return;
        }


        // GET HAIRCUT INFORMATION

        const haircut = selectedCut.value;
        const price = selectedCut.dataset.price;

        const mapsURL =
            `https://www.google.com/maps?q=${latitude},${longitude}`;


        // CREATE BOOKING SUMMARY

        bookingDetails = `
THE ARCHITECT MOBILE BARBERSHOP
BOOKING REQUEST

Customer: ${customerName}

Phone: ${customerPhone}

Haircut: ${haircut}

Price: R${price}

Date: ${formatDate(bookingDate)}

Time: ${bookingTime}

Customer Location:
${mapsURL}

Please confirm this booking request.
We come to you, you don't come to us!
        `.trim();


        // DISPLAY BOOKING DETAILS

        result.innerHTML = "";

        const heading = document.createElement("h3");
        heading.textContent = "Booking Request Ready!";

        const message = document.createElement("p");
        message.textContent =
            "Review your booking details below and copy them to send to our team.";

        const summary = document.createElement("pre");
        summary.textContent = bookingDetails;

        result.appendChild(heading);
        result.appendChild(message);
        result.appendChild(summary);

        copyButton.hidden = false;

        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });


    // COPY BOOKING DETAILS

    copyButton.addEventListener("click", async function () {

        if (!bookingDetails) return;

        try {

            await navigator.clipboard.writeText(bookingDetails);

            copyButton.textContent = "Booking Details Copied!";

        } catch (error) {

            const temporaryText = document.createElement("textarea");

            temporaryText.value = bookingDetails;

            document.body.appendChild(temporaryText);

            temporaryText.select();

            document.execCommand("copy");

            temporaryText.remove();

            copyButton.textContent = "Booking Details Copied!";

        }

    });

});

function sendBookingToWhatsApp() {

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const haircut = document.getElementById("cut").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value;

    const message = `
NEW BOOKING - THE ARCHITECT MOBILE BARBERSHOP

Customer Name: ${name}
Phone Number: ${phone}
Haircut: ${haircut}
Appointment Date: ${date}
Appointment Time: ${time}
Location: ${location}

Please confirm availability for this appointment.
    `;

    const whatsappNumber = "27820812668";

    const whatsappURL =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}
