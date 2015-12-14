$(function() {
    $(".inp").on({
        focus: function () {
            $(this).parent().addClass("focused");
        },
        blur: function() {
            $(this).parent().removeClass("focused");
        }
    })
    
    $(".button").on("click", function() {
        $(".inp").attr("disabled", true)
        $(".button, .body-wrapper").addClass("loading");
        setTimeout(function() {
            $(".form").submit();
        }, 1000)
    })
});