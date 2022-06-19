const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let score;
let socreText;
let highScore;
let highScoreText;
let player;
let gravity;
let obstacles=[];
let gameSpeed;
let keys={};
// even linsters
document.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
});
document.addEventListener('keyup', function(e){
    keys[e.keyCode] = false;
});
class Player{
    constructor(x,y,width,height,color){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.color=color;
        this.dy=0;
        this.jumpForce=15;
        this.grounded=false;
        this.jumpTimer=0;
    }
    Animate(){
        if(keys['Space']||keys['KeyW']){
            this.jump();
        }else{
            this.jumpTimer=0;
        }
        if(keys['ShiftLeft']||keys['KeyS']){
            this.h=this.originalHeight/2;
        }else{
            this.h=this.originalHeight;
        }
        this.y+=this.dy;
        //gravity
        if(this.y+this.h>canvas.height){
            this.dy+=gravity;
            this.grounded=false;
        }else{
            this.dy=0;
            this.grounded=true;
            this.canvas.height=canvas.height;
        }
        this.Draw();
    }
    Jump(){
        if(this.grounded&&this.jumpTimer==0){
            this.dy=-this.jumpForce;
            this.jumpTimer=1;
        }else if(this.jumpTimer>0&&this.jumpTimer<=15){
            this.jumpTimer++;
            this.dy=-this.jumpForce-(this.jumpTimer/50);
        }
    }
    Draw(){
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.width,this.h);
    };
}
class Obstacle{
    constructor(x,y,width,height,color){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.color=color;
        this.dx=-gameSpeed;
    }
    Update(){
        this.x+=this.dx;
        this.Draw();
        this.dx=-gameSpeed;
    };
    Draw(){
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.closePath();
    }
}
class Text{
    constructor(t,x,y,a,color,s){
        this.text=t;
        this.x=x;
        this.y=y;
        this.color=color;
        this.s=s;
    }
    Draw(){
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.font=this.s+'px Arial';
        ctx.textAlign=this.a;
        ctx
    }
}