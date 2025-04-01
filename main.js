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

$(document).ready(function(){
    $(".showCurrentYear").html(new Date().getFullYear());
});