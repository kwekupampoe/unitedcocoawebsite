$(window).on("load", function () {
    function preloader() {
        if ($("#smoothpreloader").length) {
            $("#smoothpreloader").delay(2000).fadeOut("slow", function () {
                $(this).remove();
            });
        }
    }
    preloader();
});

$(document).ready(function () {
    $(".showCurrentYear").html(new Date().getFullYear());
});

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});