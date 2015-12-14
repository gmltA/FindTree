function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}

function createLine(x1, y1, x2, y2) {
    var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    var transform = 'rotate('+angle+'deg)';

    var line = $('<div>')
        .appendTo('.tree-container')
        .addClass('tree-line')
        .css({
          'position': 'absolute',
          'transform': transform
        })
        .width(length)
        .offset({left: x1, top: y1});

    return line;
}

function connectWithLine(first, second) {
    var element =  createLine($(first).offset().left + $(first).width() / 2, $(first).offset().top + $(first).height(), $(second).offset().left + $(second).width() / 2, $(second).offset().top - 5);
    
    $(element).addClass("data-branch-" + $(second).data("branch"))
    
    return element
}

function Line(first, second) {
    this.firstElement = first;
    this.secondElement = second;
    this.element = {}
    
    this.redraw();
}

Line.prototype.remove = function() {
    if (this.element)
        $(this.element).remove()
}

Line.prototype.redraw = function() {
    this.remove()
    this.element = connectWithLine(this.firstElement, this.secondElement);
}

function Tree() {
    this.lines = []
}

Tree.prototype.updateState = function(state) {
    var nodes = Array.from(document.querySelectorAll("tree-item"));
    nodes.forEach(function(element) {
        element.completed = true
    })
}

Tree.prototype.connectNodes = function(first, second) {
    this.lines.push(new Line(first, second))
}

Tree.prototype.redraw = function() {
    this.lines.forEach(function (line) {
        line.redraw()
    })
}

Tree.prototype.removeLines = function() {
    this.lines.forEach(function (line) {
        line.remove()
    })
}

var treeController = new Tree();

$(window).on('resize', function(){
    treeController.redraw()
});

window.addEventListener('WebComponentsReady', function(e) {
     treeController.updateState()
});

$(function() {
    treeController.connectNodes($("#tree-item-0"), $("#tree-item-1"))
    treeController.connectNodes($("#tree-item-0"), $("#tree-item-2"))
    treeController.connectNodes($("#tree-item-1"), $("#tree-item-3"))
    treeController.connectNodes($("#tree-item-1"), $("#tree-item-4"))
    treeController.connectNodes($("#tree-item-2"), $("#tree-item-5"))
    treeController.connectNodes($("#tree-item-2"), $("#tree-item-6"))
    
    treeController.connectNodes($("#tree-item-6"), $("#tree-item-8"))
    treeController.connectNodes($("#tree-item-5"), $("#tree-item-8"))
    treeController.connectNodes($("#tree-item-3"), $("#tree-item-7"))
    treeController.connectNodes($("#tree-item-4"), $("#tree-item-7"))
    
    treeController.connectNodes($("#tree-item-8"), $("#tree-item-9"))
    treeController.connectNodes($("#tree-item-7"), $("#tree-item-9"))
    $("tree-item").on({
        collapsed: function() {
            $(".tree-container, body").removeClass("zoomed");
            $(".blackout").fadeOut();
                setTimeout(function() {
                    treeController.redraw()
                }, 1000)
        },
        expanded: function() {
            $(".blackout").fadeIn();
            treeController.removeLines()
            setTimeout(function() {
                treeController.redraw()
            }, 1000)
            $(".tree-container, body").addClass("zoomed");
        }
    });
    $("tree-item").click(function() {
        //$(".tree-container").removeClass("branch-0").removeClass("branch-1").addClass("branch-"+$(this).data("branch"));
    })
});