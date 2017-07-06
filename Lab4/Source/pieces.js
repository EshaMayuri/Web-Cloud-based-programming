//Function to print LSymbol
function LSymbol()
{
	this.first = [[1, 0],[1, 0],[1, 1]];
	this.second = [[0, 0, 1],[1, 1, 1]];
	this.third = [[1, 1],[0, 1],[0, 1]];
	this.fourth = [[1, 1, 1],[1, 0, 0]];
	this.blocks = [this.first,this.second,this.third,this.fourth];
	this.cur = 0;
	this.color = 0;
	this.x = 4;
	this.y = -3;
}
//Function to print ReverseLSymbol
function ReverseLSymbol()
{
	this.first = [[0, 1],[0, 1],[1, 1]];
	this.second = [[1, 1, 1],[0, 0, 1]];
	this.third = [[1, 1],[1, 0],[1, 0]];
	this.fourth = [[1, 0, 0],[1, 1, 1]];
	this.blocks = [this.first, this.second, this.third, this.fourth];
	this.cur = 0;
	this.color = 0;
	this.x = 4;
	this.y = -3;
}
//Function to print BlockSymbol
function BlockSymbol()
{
	this.first = [[1, 1],[1, 1]];
	this.blocks = [this.first];
	this.cur = 0;
	this.color = 0;
	this.x = 4;
	this.y = -2;
}
//Function to print LineSymbol
function LineSymbol()
{
	this.first = [[1],[1],[1],[1]];
	this.second = [[1,1,1,1]];
	this.blocks = [this.first,this.second];
	this.cur = 0;
	this.color = 0;
	this.x = 5;
	this.y = -4;
}
//Function to print TSymbol
function TSymbol()
{
	this.first = [[1, 1, 1],[0, 1, 0]];
	this.second = [[1, 0],[1, 1],[1, 0]];
	this.third = [[0, 1, 0],[1, 1, 1]];
	this.fourth = [[0, 1],[1, 1],[0, 1]];
	this.blocks = [this.first, this.second, this.third, this.fourth];
	this.cur = 0;
	this.color = 0;
	this.x = 4;
	this.y = -2;
}
//Function to print ZSymbol
function ZSymbol()
{
	this.first = [[1, 1, 0],[0, 1, 1]];
	this.second = [[0, 1],[1, 1],[1, 0]];
	this.blocks = [this.first,this.second];
	this.cur = 0;
	this.color = 0;
	this.x = 4;
	this.y = -2;
}
//Function to print ReverseZSymbol
function ReverseZSymbol()
{
	this.first = [[0, 1, 1],[1, 1, 0]];
	this.second = [[1, 0],[1, 1],[0, 1]];
	this.blocks = [this.first, this.second];
	this.cur = 0;
	this.color = 0;
	this.x = 4;
	this.y = -2;
}
//Function to pick a random block
function getRandomPiece()
{
	var result = Math.floor( Math.random() * 7 );
	var piece;
	if(result == 0)
	{
		piece = new LSymbol();
	}
    else if(result == 1)
    {
        piece = new BlockSymbol();
    }
    else if(result == 2)
    {
        piece = new ZSymbol();
    }
    else if(result == 3)
    {
        piece = new TSymbol();
    }
    else if(result == 4)
    {
        piece = new ReverseLSymbol();
    }
    else if(result == 5)
    {
        piece = new ReverseZSymbol();
    }
    else
    {
        piece = new LineSymbol();
    }
	piece.color = Math.floor(Math.random() * 8);
	return piece;
}