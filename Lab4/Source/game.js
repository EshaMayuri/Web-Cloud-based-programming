/**
 * Created by Esha Mayuri on 7/2/2017.
 */
// initializing variables
var horiz = 20;
var verti = 10;
var s = 32;
var canvas;
var context;
var blockImg;
var bgImg;
var gameOver;
var curPiece;
var data;
var imgLoader;
var isGameOver;
var line;
var curLines;
var X;
var Y;
var Id;
var prevTime;
var curTime;
window.onload = onReady;

document.body.addEventListener('touchmove', function(e)
{
    e.preventDefault();

    var difY = e.touches[0].pageY - Y;

    if(difY > 60)
    {
        if( checkMove(curPiece.x, curPiece.y + 1, curPiece.cur) )
            curPiece.y++;
    }

} );

document.body.addEventListener('touchstart', function(e)
{
    e.preventDefault();

    X = e.touches[0].pageX;
    Y = e.touches[0].pageY;
    Id = e.touches[0].identifier;

} );

document.body.addEventListener('touchend', function(e)
{
    e.preventDefault();
    var touchEndX;
    var touchEndY;

    var touch = e.changedTouches.item(0);

    try
    {
        touchEndX = touch.pageX;
        touchEndY = touch.pageY;
    }
    catch(err)
    {
        alert(err);
        return;
    }

    var difX = Math.abs(touchEndX - X);
    var difY = Math.abs(touchEndY - Y);

    if(difX < 10 && difY < 10)
    {
        var newState = curPiece.cur - 1;
        if(newState < 0)
            newState = curPiece.blocks.length - 1;

        if( checkMove(curPiece.x, curPiece.y, newState) )
            curPiece.cur = newState;
    }
    else
    if(difX > difY)
    {
        if(touchEndX < X)
        {
            if( checkMove(curPiece.x - 1, curPiece.y, curPiece.cur) )
                curPiece.x--;
        }
        else
        {
            if( checkMove(curPiece.x + 1, curPiece.y, curPiece.cur) )
                curPiece.x++;
        }
    }

});

function onReady()
{
    imgLoader = new ImageLoader();
    imgLoader.addingImage("blocks.png", "blocks");
    imgLoader.addingImage("bg.png", "bg");
    imgLoader.addingImage("over.png", "gameover");
    imgLoader.onReadyCallback = onImagesLoaded;
    imgLoader.loadingImages();

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    line = document.getElementById('rows');

    prevTime = curTime = 0;

    document.onkeydown = getInput;
}

function getInput(e)
{
    if(!e) { var e = window.event; }

    e.preventDefault();

    if(isGameOver != true)
    {
        switch(e.keyCode)
        {
            case 37:
            {
                if( checkMove(curPiece.x - 1, curPiece.y, curPiece.cur) )
                    curPiece.x--;
            }
                break;

            case 39:
            {
                if( checkMove(curPiece.x + 1, curPiece.y, curPiece.cur) )
                    curPiece.x++;
            }
                break;

            case 38:
            {
                var newState = curPiece.cur - 1;
                if(newState < 0)
                    newState = curPiece.blocks.length - 1;

                if( checkMove(curPiece.x, curPiece.y, newState) )
                    curPiece.cur = newState;
            }
                break;

            case 40:
            {
                if( checkMove(curPiece.x, curPiece.y + 1, curPiece.cur) )
                    curPiece.y++;
            }
                break;
        }
    }
    else
    {
        initGame();
    }
}

function onImagesLoaded(e)
{
    blockImg = imgLoader.getImage_index(0);
    bgImg = imgLoader.getImage_index(1);
    gameOver = imgLoader.getImage_index(2);
    initGame();
}

function initGame()
{
    var r, c;
    curLines = 0;
    isGameOver = false;

    if(data == undefined)
    {
        data = new Array();

        for(r = 0; r < horiz; r++)
        {
            data[r] = new Array();
            for(c = 0; c < verti; c++)
            {
                data[r].push(0);
            }
        }
    }
    else
    {
        for(r = 0; r < horiz; r++)
        {
            for(c = 0; c < verti; c++)
            {
                data[r][c] = 0;
            }
        }
    }

    curPiece = getRandomPiece();

    line.innerHTML = curLines.toString();

    var requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    window.requestAnimationFrame = requestAnimFrame;

    requestAnimationFrame(update);
}

function update()
{
    curTime = new Date().getTime();

    if(curTime - prevTime > 500)
    {
        // update the game piece
        if( checkMove(curPiece.x, curPiece.y + 1, curPiece.cur) )
        {
            curPiece.y += 1;
        }
        else
        {
            copyData(curPiece);
            curPiece = getRandomPiece();
        }

        // update time
        prevTime = curTime;
    }

    context.clearRect(0, 0, 320, 640);
    drawBoard();
    drawPiece(curPiece);

    if(isGameOver == false)
    {
        requestAnimationFrame(update);
    }
    else
        context.drawImage(gameOver, 0, 0, 320, 640, 0, 0, 320, 640);
}

function copyData(p)
{
    var xpos = p.x;
    var ypos = p.y;
    var state = p.cur;

    for(var r = 0, len = p.blocks[state].length; r < len; r++)
    {
        for(var c = 0, len2 = p.blocks[state][r].length; c < len2; c++)
        {
            if(p.blocks[state][r][c] == 1 && ypos >= 0)
            {
                data[ypos][xpos] = (p.color + 1);
            }

            xpos += 1;
        }

        xpos = p.x;
        ypos += 1;
    }

    checkLines();

    if(p.y < 0)
    {
        isGameOver = true;
    }
}

function checkLines()
{
    var lineFound = false;
    var fullRow = true;
    var r = horiz - 1;
    var c = verti - 1;

    while(r >= 0)
    {
        while(c >= 0)
        {
            if(data[r][c] == 0)
            {
                fullRow = false;
                c = -1;
            }
            c--;
        }

        if(fullRow == true)
        {
            zeroRow(r);
            r++;
            lineFound = true;
            curLines++;
        }

        fullRow = true;
        c = verti - 1;
        r--;
    }

    if(lineFound)
    {
        line.innerHTML = curLines.toString();
    }
}

function zeroRow(row)
{
    var r = row;
    var c = 0;

    while(r >= 0)
    {
        while(c < verti)
        {
            if(r > 0)
                data[r][c] = data[r-1][c];
            else
                data[r][c] = 0;

            c++;
        }

        c = 0;
        r--;
    }
}

function drawBoard()
{
    context.drawImage(bgImg, 0, 0, 320, 640, 0, 0, 320, 640);

    for(var r = 0; r < horiz; r++)
    {
        for(var c = 0; c < verti; c++)
        {
            if(data[r][c] != 0)
            {
                context.drawImage(blockImg, (data[r][c] - 1) * s, 0, s, s, c * s, r * s, s, s);
            }
        }
    }
}

function drawPiece(p)
{
    var drawX = p.x;
    var drawY = p.y;
    var state = p.cur;

    for(var r = 0, len = p.blocks[state].length; r < len; r++)
    {
        for(var c = 0, len2 = p.blocks[state][r].length; c < len2; c++)
        {
            if(p.blocks[state][r][c] == 1 && drawY >= 0)
            {
                context.drawImage(blockImg, p.color * s, 0, s, s, drawX * s, drawY * s, s, s);
            }

            drawX += 1;
        }

        drawX = p.x;
        drawY += 1;
    }
}

function checkMove(xpos, ypos, newState) {
    var result = true;
    var newx = xpos;
    var newy = ypos;

    for (var r = 0, len = curPiece.blocks[newState].length; r < len; r++) {
        for (var c = 0, len2 = curPiece.blocks[newState][r].length; c < len2; c++) {
            if (newx < 0 || newx >= verti) {
                result = false;
                c = len2;
                r = len;
            }

            if (data[newy] != undefined && data[newy][newx] != 0
                && curPiece.blocks[newState][r] != undefined && curPiece.blocks[newState][r][c] != 0) {
                result = false;
                c = len2;
                r = len;
            }

            newx += 1;
        }

        newx = xpos;
        newy += 1;

        if (newy > horiz) {
            r = len;
            result = false;
        }
    }

    return result;
}