

class Tomato{
    constructor(x, y){
        this.trunk = [];
        this.fruits = [];
        this.root = createVector(x, y);
        this.fill_trunk(x, y);
    }

    fill_trunk(x, y){
        for (let i = 0; i < windowHeight - 200; i++) {
            this.trunk
                .push(createVector(x + (sin(i/60) * 300), map(i, 0, windowHeight - 200, y, 200)))
        }
    }

    grow(g){
        this.fruits = [];
        for (let i = 0; i < this.trunk.length; i++) {
            this.trunk[i] = createVector(this.root.x + (sin(i/60) * (50 + noise(g) * 100 - i * noise(g)/ 10)), map(i, 0, this.trunk.length, this.root.y, 200));

            if(i % 200 == 0 && i > 100){
                this.fruits.push(createVector(this.trunk[i].x, this.trunk[i].y));
            }
        }
    }

    show(){
        strokeWeight(10);
        stroke(50);

        this.show_trunk();
        this.show_fruits();
    }

    show_trunk(){
        strokeWeight(10);
        stroke(150, 180, 50);

        beginShape();
        noFill();
        for(let i = 0; i < this.trunk.length; i++){
            vertex(this.trunk[i].x,this.trunk[i].y);
        }
        endShape();
    }

    show_fruits(){
        for(let i = 0; i < this.fruits.length; i++){
            noStroke();
            let s = max(30, 100 - i * 30)
            fill(200, 100, 20);
            ellipse(this.fruits[i].x + 0, this.fruits[i].y + 0, s);
            ellipse(this.fruits[i].x + 30, this.fruits[i].y + 20, s);
            ellipse(this.fruits[i].x - 10, this.fruits[i].y + 50, s);
            ellipse(this.fruits[i].x + 40, this.fruits[i].y + 40, s);
        }
    }
}






let left_tomato;
let grow_amount = 0;
let grow_dir = false;

function setup() {
    createCanvas(800, 1600);

    slider1 = createSlider(1, 1000, 1);

    left_tomato = new Tomato(400, 1500);
}

function draw_ground(){
    background(250);

    noStroke();
    fill(50);
    ellipse(400, 1500 + 1400, 3000);

}

  
function draw() {
    draw_ground();
    left_tomato.grow(grow_amount);
    left_tomato.show();

    if(!grow_dir){
        grow_amount = grow_amount + 1/100;
        if (grow_amount > 600) grow_dir = !grow_dir;
    }else{
        grow_amount = grow_amount - 1/100;
        if(grow_amount < 1) grow_dir = !grow_dir;
    }
    }