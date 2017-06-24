//1.create an array of colors and assign it to a variable colors
var colors = [ "red", "yellow", "green", "blue", "purple", "pink", "orange", "violet" ]

// 2.set the preview color to the one entered in the input and display its color code using setPreviewColor function
function setPreviewColor(color) {
    $('.preview').css('background-color', color);
    $('.color-code').text($('.preview').css('background-color'));
}

//adds color boxes to the favorite colors
function addBox(color) {
    $('#colors').prepend("<div class='item' style='background-color: " + color + ";'><div>");
}

//3.As the page loads add each color in the colors array to the div '#colors'
$(document).ready(function(){
    $.each(colors, function(index, color) {
        addBox(color);
    });

//4.set the preview color to one of the colors in the colors array randomly
    setPreviewColor("red");//colors[Math.floor(Math.random()*colors.length)]);

//5.Write an event handler for the key up event i.e. when the user types the color in the input and releases the key on the keyboard
//The event should set the preview color to the color typed in the input

    $(document).on('keydown keyup keypress', '#color', function(){
        color = $(this).val();
        setPreviewColor(color);
    })

//6.Write an event handler to handle the click the event on the add to favorite button so that the color gets added to the list of favorite colors,
// the content of the input gets cleared and the focus gets back on the input
    $(document).on('click','#add-to-favorite', function(){
        var color = $('#color').val();
        if ($("#colors .item").length == 16) {
            $('#colors .item').last().remove();
        }
        addBox(color);
        $("#color").val("");
        $("#color").focus();
    })

//7.Write events handlers such that whenever any item in the favorite colors is clicked or hovered, the color gets displayed in the preview div

    $(document).on('click','.item', function(){
        setPreviewColor($(this).css('background-color'));
        previewColor = $('.preview').css('background-color');
    });

    var previewColor;
    $(document).on('mouseenter', '.item',  function(){
        previewColor = $('.preview').css('background-color');

        setPreviewColor($(this).css('background-color'));
    }).on('mouseleave', '.item', function() {
        setPreviewColor(previewColor);
    });
});











