function processLoading() {
    $(".button, .body-wrapper").addClass("loading");
    setTimeout(function() {
         $("form").submit();
    }, 1000)
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

var phrases = ["Покажи, что у тебя есть", "Сплошные раритеты по доступным ценам", "Сессия близко!", "Пофиг, пересдашь!",
                "На 4 курсе не отчисляют"]
var currentPhrase = 0
var index = 0

function appendNextLetter() {
    var phrase = phrases[currentPhrase];
    if (phrase.length > index) {
        var timeout = randomNumber(300, 1000);
        setTimeout(function() {
            appendNextLetter()
        }, timeout)
    }
    var text = $(".headline").text()
    var newText = text + phrase.charAt(index++)
    $(".headline").text(newText)
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
    
    currentPhrase = randomNumber(0, phrases.length - 1)
    appendNextLetter()
});