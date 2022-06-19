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
            this.y=canvas.height-this.h;
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
        ctx.fillText(this.text,this.x,this.y);
        ctx.closePath();
    }
}
function SpawnObstacle(){
    let size=RandomIntInRange(20,70);
    let type=RandomIntInRange(0,1);
    let obstacle= new Obstacle(canvas.width+size,canvas.height-size,size,size,'red');
    if(type==1){
        obstacle.y-=player.originalHeight;
    }
    obstacles.push(obstacle);
}
function RandomIntInRange(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function Start(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    ctx.font='30px Arial';
    gameSpeed=5;
    gravity=1;
    score=0;
    highScore=0;
    if(localStorage.getItem('highScore')){
        highScore=localStorage.getItem('highScore');
    };
    player=new Player(25,0,50,50,'blue');
    socreText=new Text('Score: '+score,10,30,'left','white',30);
    highScoreText=new Text('High Score: '+highScore,10,60,'left','white',30);
    requestAnimationFrame(Update);
}
let initialSpawnTimer=200;
let spawnTimer=initialSpawnTimer;
function Update(){
    requestAnimationFrame(Update);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    spawnTimer--;
    if(spawnTimer<=0){
        SpawnObstacle();
        console.log(obstacles);
        spawnTimer=initialSpawnTimer-gameSpeed*8;
        if(spawnTimer<60){
            spawnTimer=60;
        };
    };
    //Spawn Enemies
    for(let i=0;i<obstacles.length;i++){
        let o=obstacles[i];
        if(o.x+o.w<0){
            obstacles.splice(i,1);
        }
        if(
            player.x<o.x+o.w&&
            player.x+player.width>o.x&&
            player.y<o.y+o.h&&
            player.y+player.h>o.y
        ){
            obstacles=[];
            score=0;
            spawnTimer=initialSpawnTimer;
            gameSpeed=5;
            window.localStorage.setItem('highScore',highScore);
        }
        o.Update();
    };
    player.Animate();
    score++;
    socreText.text='Score: '+score;
    socreText.Draw();
    if(score>highScore){
        highScore=score;
        highScoreText.text='High Score: '+highScore;
    };
    highScoreText.Draw();
    gameSpeed+=0.003;
};
Start();