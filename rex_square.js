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
        this.backingEngine=false;
        this.coordinatingAsteroides=this.coordinatingAsteroides();
    };
    setCloudAsteroides(x,y,r){
        var roid = {x,y,r}
        return roid
    };
    coordinatingAsteroides(){
        let cloudAsteroides=[];
        const totalRoids=5;
        var x,y;
        for(let i=0;i<totalRoids;i++){
            do{
                x=Math.random()*canvas.width;
                y=Math.random()*canvas.height-100;
            }while(
                Math.pow(x-this.x,2)+Math.pow(y-this.y,2)<Math.pow(100,2)
            )
            cloudAsteroides.push(this.setCloudAsteroides(x,y,Math.random()*20+10));
        };
        return cloudAsteroides;
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
            ctx.lineTo(this.x-(!this.backingEngine?12:3),this.y+60+Math.random()*15);
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
            this.backingEngine=true;
            if(this.x<0){
                this.x=0;
            }
        }else{
            this.backingEngine=false;
        };
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
    for(let i=0;i<this.coordinatingAsteroides.length;i++){
        if(this.coordinatingAsteroides[i].x<0){
            this.coordinatingAsteroides[i].x=canvas.width;
            this.coordinatingAsteroides[i].y=canvas.height*Math.random()-100;
        };
        ctx.beginPath();
            ctx.fillStyle="rgb(0, 170, 255)";
            ctx.strokeStyle="black";
            ctx.lineWidth=3;
            ctx.arc(this.coordinatingAsteroides[i].x-=Math.random(),this.coordinatingAsteroides[i].y,this.coordinatingAsteroides[i].r,0,2*Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    };
    drawDino(){
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+20,this.y-5,70,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+35,this.y-10,55,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+40,this.y-15,50,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+45,this.y-20,45,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+50,this.y-25,40,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+55,this.y-30,60,5);
        ctx.fill();
        ctx.closePath();
        //manita
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+105,this.y-25,10,5);
        ctx.fill();
        ctx.closePath();
        //manita
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+60,this.y-35,30,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+65,this.y-40,25,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+70,this.y-45,20,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+75,this.y-50,45,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+80,this.y-55,40,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+85,this.y-60,10,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+90,this.y-65,40,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+90,this.y-70,40,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+90,this.y-75,40,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+90,this.y-80,40,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+90,this.y-85,40,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+80,this.y-90,40,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+70,this.y-95,40,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="rgba(255, 255, 255, 1)";
        ctx.strokeStyle="black";
        ctx.lineWidth=3;
        ctx.strokeRect(this.x+100,this.y-80,10,5);
        ctx.fillRect(this.x+100,this.y-80,10,5);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+10,this.y-10,25,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x+5,this.y-15,15,5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.x,this.y-20,10,5);
        ctx.fill();
        ctx.closePath();
      };
}
const tiranoRex = new TRex(0,0,100,100,"red");
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    tiranoRex.soilDraw();
    tiranoRex.drawing();
    tiranoRex.draw();
    tiranoRex.drawDino();
    tiranoRex.drawAsteroides();
    requestAnimationFrame(update);
}
update();
document.addEventListener("keydown",function(e){
    keys[e.code]=true;
});
document.addEventListener("keyup",function(e){
    keys[e.code]=false;
});