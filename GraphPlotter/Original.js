var SIZE = 500;
var data_length = 10000;
float[] x_data = new float[data_length];
float[] y_data = new float[data_length];

void setup() {  //setup function called initially, only once
  size(SIZE,SIZE);
  background(255);  //set background white
  textSize(60);
  frameRate(1);//doesnt need to update
  text("loading data",SIZE/2,SIZE/2);
  make_data();//call the make data function once
}

void draw() {  //draw function loops
    background(255);//refresh
    //graph lines
    stroke(30);
    line(0,SIZE/2,SIZE,SIZE/2);
    line(SIZE/2,0,SIZE/2,SIZE);
    //graph dots
    fill(30);//black
    plot(x_data,y_data);
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    //title if wanted    (modify below)
    fill(30);
    textSize(20);
    text("",SIZE/10,SIZE/10);
    //text('title',xpos,ypos);
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
}

void make_data() {
    //make x_data and y_data
    float start_x = -9;
    float end_x = 9;
    float increment = .005;
    float i = start_x;
    int count = 0;
    float x;
    float y;
    while (i < end_x) {
        if (count < data_length) {
            x_data[count] = i;
            x = i;
            //////////////////////////////////////////////
            /////////////////Place function here (modify below) //////////
            y = x*cos(x)+5;
            //////////////////////////////////////////////
            //////////////////////////////////////////////
            y_data[count] = y;
        }
        count = count + 1;
        i = i + increment;
    }
}


void plot(float[] x_data,float[] y_data) {
    //display data in small ellipse
    float minx = min(x_data);
    float maxx = max(x_data);
    float miny = min(y_data);
    float maxy = max(y_data);
    if (abs(maxx) >= abs(minx)) {
        float scaling_factor_x = (SIZE/2)*.95/(maxx);
    }
    if (abs(maxx) < abs(minx)) {
        float scaling_factor_x = (SIZE/2)*.95/(abs(minx));
    }
    if (abs(maxy) >= abs(miny)) {
        float scaling_factor_y = (SIZE/2)*.95/(maxy);
    }
    if (abs(maxy) < abs(miny)) {
        float scaling_factor_y = (SIZE/2)*.95/(abs(miny));
    }
    for (int i = 0; i < data_length; i = i + 1) {
        if (x_data[i] != 0 && y_data[i] != 0) {
            ellipse(SIZE/2 + int(x_data[i]*scaling_factor_x),SIZE/2 - int(y_data[i]*scaling_factor_y),2,2);
        }
    }
    //numbers given as min and max
    textSize(15);
    fill(0,200,100);
    float big_x;
    float big_y;
    if (abs(maxx) >= abs(minx)) {
        big_x = maxx;
    }
    else {
        big_x = abs(minx);
    }
    if (abs(maxy) >= abs(miny)) {
        big_y = maxy;
    }
    else {
        big_y = miny;
    }
    text(round(big_x*100)/100,SIZE-20,SIZE/2 +16);
    text(-round(big_x*100)/100,10,SIZE/2 +16);
    text(round(big_y*100)/100,SIZE/2 +2,20);
    text(-round(big_y*100)/100,SIZE/2 +2,SIZE-10);
    text("0",SIZE/2 +2,SIZE/2+16);
}