//Global Variables
var turn = 0;
var context;
var c;
var painted;
var content;
var winningCombinations;
var canvas;
var box;

window.onload = function()
{
    painted = new Array();
    content = new Array();
    winningCombinations = [[0,1,2],[0,3,6], [0,4,8], [1,4,7], [2,4,6], [2,5,8], [3,4,5], [6,7,8]]

    for(var i = 0; i<=8; i++)
    {
        painted[i] = false;
        content[i] = '';
    }

}
function reset()
{
    i = confirm("Confirm if you want to play again!")
    if(i==true)
    {
        alert("Okay reseting the game!");
        location.reload();
    }
    else
    {
        alert("Please try again!")
    }
}
function canvasClicked(canvasNum)
{
    canvas = "canvas"+canvasNum;

    var c = document.getElementById(canvas);
    context = c.getContext("2d");
    if(painted[canvasNum-1] == false)
    {
        if (turn % 2 == 0) {
            // var image = new Image();
            // image.src = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwig2JrOw8jUAhWG0iYKHSHGD2IQjRwIBw&url=https%3A%2F%2Fthecliparts.com%2Fthe-best-free-clipart-25337%2F&psig=AFQjCNHihrjA8CeXj6iE1hjVHRjjB-5WXA&ust=1497914262252909";
            // context.drawImage(image, 50, 50);

            context.beginPath();
            context.moveTo(10,10);
            context.lineTo(40,40);
            context.moveTo(40,10);
            context.lineTo(10,40);
            context.stroke();
            context.closePath();
            content[canvasNum-1] = "X";
        }
        else
        {
            context.beginPath();
            context.arc(25,25,20,0,Math.PI*2, true);
            context.stroke();
            context.closePath();
            content[canvasNum-1] = "O";
        }
        turn++;
        painted[canvasNum-1] = true;
        box++;
        alert(content[canvasNum-1]);
        results(content[canvasNum-1]);

        if(box == 9)
        {
            alert("End of the game");
            location.reload(true);
        }
    }
    else
    {
        alert("The box is already used!");
    }
}

function results(player)
{
    alert(player);
    for(var i = 0; i< winningCombinations.length; i ++)
    {
        if(content[winningCombinations[i][0]]==player
            && content[winningCombinations[i][1]]==player
            && content[winningCombinations[i][2]]==player)
        {
            alert(player + " WON!");
            reset();
        }
    }
}


