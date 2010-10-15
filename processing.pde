// Global variables
float radius = 50.0;
int X, Y;
int nX, nY;
int delay = 16;

fill_r = 0;
fill_decrement = 50;

// Setup the Processing Canvas
void setup(){
	size( 400, 400 );
	strokeWeight( 10 );
	frameRate( 15 );
	X = width / 2;
	Y = width / 2;
	nX = X;
	nY = Y;  
}

// Main draw loop
void draw(){
	radius = radius + sin( frameCount / 4 );

	// Track circle to new destination
	X+=(nX-X)/delay;
	Y+=(nY-Y)/delay;

	// Fill canvas grey
	background( 100 );
  
	// Set fill-color to blue
	fill( fill_r, 121, 184 );

	// Set stroke-color white
	stroke(255); 
  
	// Draw circle
	ellipse( X, Y, radius, radius );

	if (fill_r < fill_decrement)
		fill_r = 0;
	else
		fill_r = fill_r - fill_decrement;
}

// Set circle's next destination
void mouseMoved(){
	nX = mouseX;
	nY = mouseY;  
}

void beat()
{
	fill_r = 200;
}

void tatum()
{
}

