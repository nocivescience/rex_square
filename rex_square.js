let keys={};
const gameSpeed = 3;
const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");

let rocks=[];
class TRex{
    constructor(x,y,w,h,c){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.dx = 2;
        this.dy = 2;
        this.playing = false;
        this.movingWheels = true;
        this.verticalEngine=false;
        this.horizontalEngine=false;
        this.cloudAsteroides=[
            {
                x:canvas.width/2+Math.random()*canvas.width/2,
                y:canvas.height/2+Math.random()*canvas.height/2,
                r:Math.random()*100
            },
            {
                x:canvas.width/2+Math.random()*canvas.width/2,
                y:canvas.height/2+Math.random()*canvas.height/2,
                r:Math.random()*100
            },
            {
                x:canvas.width/2+Math.random()*canvas.width/2,
                y:canvas.height/2+Math.random()*canvas.height/2,
                r:Math.random()*100
            },
            {
                x:canvas.width/2+Math.random()*canvas.width/2,    
                y:canvas.height/2+Math.random()*canvas.height/2,
                r:Math.random()*100
            },
            {
                x:canvas.width/2+Math.random()*canvas.width/2,
                y:canvas.height/2+Math.random()*canvas.height/2,
                r:Math.random()*100
            },
        ]
    };
    setCloudAsteroides(){
        
    };
    draw(){
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h/2);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.x+this.w/2-30,this.y+this.h/2+5+((this.movingWheels&&this.playing)?Math.random()*10:0),this.w/2/4,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.x+this.w/2+30,this.y+this.h/2+5+((this.movingWheels&&this.playing)?Math.random()*10:0),this.w/2/4,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(this.x-22,this.y+10,60/3,30);
        ctx.closePath();
        if(this.verticalEngine){
            ctx.beginPath();
            ctx.lineWidth=5;
            ctx.strokeStyle="red";
            ctx.fillStyle="yellow";
            ctx.moveTo(this.x-20,this.y+40);
            ctx.lineTo(this.x-12,this.y+60+Math.random()*15);
            ctx.lineTo(this.x-5,this.y+40);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        if(this.horizontalEngine){
            ctx.beginPath();
            ctx.lineWidth=6;
            ctx.strokeStyle="red";
            ctx.fillStyle="yellow";
            ctx.moveTo(this.x-22,this.y+15);
            ctx.lineTo(this.x-70*Math.random()-30,this.y+27);
            ctx.lineTo(this.x-22,this.y+35);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        };
    };
    falling(){
        this.y += Math.pow((this.y+2)/10,1.1);
    };
    drawing(){
        if(this.y>canvas.height-this.h*2){
            this.y=canvas.height-this.h*2;
            this.playing=true;
            this.movingWheels=true;
        }
        this.falling();
        if(keys['KeyD']&&this.playing){
            this.x += gameSpeed;
            this.horizontalEngine=true;
            if(this.x>canvas.width-this.w){
                this.x=canvas.width-this.w;
            }
        }else{
            this.horizontalEngine=false;
        }
        if(keys['KeyA']&&this.playing){
            this.x -= gameSpeed;
            if(this.x<0){
                this.x=0;
            }
        }
        if(keys['KeyW']&&this.playing){
            this.y -= Math.pow((this.y)/9,1.1)-10;
            this.movingWheels=false;
            this.verticalEngine=true;
        }else{
            this.verticalEngine=false;
        }
        if(keys['KeyS']&&this.playing){
            this.y += gameSpeed;
            this.movingWheels=false;
        }
    };
    soilDraw(){
        for(let i=0;i<canvas.width;i+=10){
            ctx.strokeStyle="grey";
            ctx.lineWidth=10;
            ctx.beginPath();
            ctx.moveTo(i,canvas.height-60);
            ctx.lineTo(i,canvas.height-10*Math.random()-60);
            ctx.closePath();
            ctx.stroke();
        }
    }
    drawAsteroides(){
        for(let i=0;i<this.cloudAsteroides.length;i++){
            ctx.beginPath();
            ctx.fillStyle="rgb(0, 170, 255)";
            ctx.strokeStyle="black";
            ctx.lineWidth=3;
            ctx.arc(this.cloudAsteroides[i].x-=Math.random(),this.cloudAsteroides[i].y,this.cloudAsteroides[i].r,0,2*Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    };
}
const tiranoRex = new TRex(0,0,100,100,"red");
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    tiranoRex.soilDraw();
    tiranoRex.drawAsteroides();
    tiranoRex.drawing();
    tiranoRex.draw();
    requestAnimationFrame(update);
}
update();
document.addEventListener("keydown",function(e){
    keys[e.code]=true;
});
document.addEventListener("keyup",function(e){
    keys[e.code]=false;
});