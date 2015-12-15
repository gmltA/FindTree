function processLoading() {
    $(".button, .body-wrapper").addClass("loading");
    setTimeout(function() {
         $("form").submit();
    }, 1000)
}

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
        processLoading()
    })
    
    $("input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            processLoading()
        }
    });
});