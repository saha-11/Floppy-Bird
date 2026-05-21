const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {

/* Always use phone ratio */

const ratio = 9 / 16;

/* available space */

let screenW =
window.innerWidth;

let screenH =
window.innerHeight;

/* fit inside screen */

if(
screenW / screenH >
ratio
){

canvas.height =
screenH - 20;

canvas.width =
canvas.height *
ratio;

}

else{

canvas.width =
screenW - 20;

canvas.height =
canvas.width /
ratio;

}

}

resizeCanvas();

window.addEventListener(
"resize",
resizeCanvas
);

let gameStarted = false;
let gameOver = false;

let score = 0;

let highScore =
Number(localStorage.getItem("highscore")) || 0;

let bgOffset = 0;
let trail=[];

let theme = "light";

/* rainbow sparkles */
let sparkles=[];

let tinyBirds=[

{x:200,y:120,s:0.6},
{x:600,y:220,s:0.8},
{x:1100,y:160,s:0.5},
{x:1600,y:90,s:0.7}

];

/* ---------------- MESSAGES ---------------- */

let popupText="";
let popupTimer=0;

const passMessages=[

"that wasn't awful",

"even the pipes looked surprised",

"doing all that for WHAT",

"bird discovered talent",

"okay diva keep going",

"you survived somehow",

"this isn't your calling",

"you kinda ate",

"don't let success change you",

"we're witnessing history",

"girl lock in",

"you moved with intention",

"your ancestors flapped too",

"pipe missed its chance",

"okay miss olympics",

"you look nervous",

"that was suspiciously good",

"nobody expected this",

"you got lucky",

"keep serving"
];

const roastMessages=[

"pipe saw you coming",

"that was ambitious",

"girl stand UP",

"bird folded instantly",

"confidence exceeded skill",

"you had a strategy??",

"interesting route",

"you got outplayed",

"that pipe cooked you",

"you moved like wifi lag",

"that wasn't elegant",

"bird lost sponsorship",

"even gravity laughed",

"you pressed buttons proudly",

"that looked intentional",

"you trained for this?",

"not the cinematic death",

"pipe owns real estate",

"performance issues",

"bird respectfully declined"
];

const groundMessages=[

"the floor wasn't attacking",

"gravity MVP",

"bird forgot its job",

"elite landing skills",

"you found the ground",

"sky rejected you",

"that was avoidable",

"girl the floor??",

"bird entered sleep mode",

"you landed emotionally",

"how did we end up THERE",

"that looked expensive",

"ground carried harder",

"you flew downward",

"professional crashing",

"that wasn't very bird",

"interesting use of wings",

"bird retired early",

"the ground sends regards",

"mission failed beautifully"
];

const rainbowColors = [

"#FF003C",

"#FF7A00",

"#FFD500",

"#00D95F",

"#00B7FF",

"#5A54FF",

"#D900FF"

];

function showMessage(text){

popupText=text;

popupTimer=120;

}

function drawMessage(){

if(
popupTimer<=0
)
return;

ctx.save();

ctx.globalAlpha=
Math.min(
popupTimer/30,
1
);

ctx.font=
'30px "Righteous"';

ctx.textAlign=
"center";

ctx.fillStyle=

theme==="gay"

?

"black"

:

"black";

ctx.shadowBlur=20;

ctx.shadowColor=
"rgba(255,255,255,.8)";

ctx.fillText(

popupText,

canvas.width/2,

140

);

ctx.restore();

popupTimer--;

}

let bird = {
x: 120,
y: 250,
radius: 22,
velocity: 0
};

let pipes = [];

let clouds = [

{x:100,y:80,s:1.1},
{x:450,y:160,s:1.5},
{x:850,y:260,s:1.3},
{x:1300,y:100,s:1.6},
{x:1700,y:320,s:1.2},
{x:2200,y:220,s:1.4},
{x:2600,y:120,s:1.3},
{x:3000,y:350,s:1.7}

];

const groundHeight = 80;

function createPipe(){

if(!gameStarted||gameOver)
return;

/* Difficulty */

let gap;

if(score < 5){
  gap = Math.random() * 60 + 200;
}
else if(score < 10){
  gap = Math.random() * 50 + 190;
}
else{
  gap = Math.random() * 40 + 180;
}

/* random heights */

let top=

Math.random()

*

(

canvas.height
-
groundHeight
-
gap
-
180

)

+60;

pipes.push({

x:
canvas.width+100,

top,

bottom:
top+gap,

width:
Math.random()*20+70,

scored:false,

colorPhase:
Math.random() * rainbowColors.length,

colorSpeed:
Math.random() * 0.0012 + 0.0006

});

}

setInterval(createPipe, 1600);

/* ---------------- BACKGROUND ---------------- */

function drawBackground(){

/* SKY */

ctx.fillStyle =
theme==="gay"
?
"#8EE6FF"
:
"#87CEEB";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

/* move screen */

bgOffset += 0.8;

/* ---------------- */
/* LIGHT MODE */
/* ---------------- */

if(theme==="light"){

ctx.shadowColor="#FFF59D";
ctx.shadowBlur=40;

ctx.fillStyle="#FFE066";

ctx.beginPath();

ctx.arc(
canvas.width-120,
90,
55,
0,
Math.PI*2
);

ctx.fill();

ctx.shadowBlur=0;

/* moving clouds */

clouds.forEach(c=>{

let x=

(c.x-bgOffset)

%

(canvas.width+900);

if(x<-150)
x+=canvas.width+900;

ctx.fillStyle="white";

ctx.beginPath();

ctx.arc(
x,
c.y,
28*c.s,
0,
Math.PI*2
);

ctx.arc(
x+40*c.s,
c.y-8,
25*c.s,
0,
Math.PI*2
);

ctx.arc(
x+78*c.s,
c.y,
22*c.s,
0,
Math.PI*2
);

ctx.fill();

});

}

/* ---------------- */
/* GAY MODE 🌈 */
/* ---------------- */

else{

/* sun */

ctx.shadowColor="#FFF5A3";

ctx.shadowBlur=50;

ctx.fillStyle="#FFE066";

ctx.beginPath();

ctx.arc(
canvas.width-150,
110,
70,
0,
Math.PI*2
);

ctx.fill();

ctx.shadowBlur=0;

/* BIG RAINBOW */

const colors=[

"#FF003C",
"#FF7A00",
"#FFD500",
"#00D95F",
"#00B7FF",
"#5A54FF",
"#D900FF"

];

colors.forEach((c,i)=>{

ctx.strokeStyle=c;

ctx.lineWidth=28;

ctx.beginPath();

ctx.arc(

canvas.width/2,

canvas.height+320,

760-(i*35),

Math.PI,

Math.PI*2

);

ctx.stroke();

});

/* CLOUDS */

clouds.forEach(c=>{

let x=

(c.x-bgOffset)

%

(canvas.width+1000);

if(x<-180)
x+=canvas.width+1000;

ctx.fillStyle="white";

ctx.beginPath();

ctx.arc(x,c.y,32,0,Math.PI*2);

ctx.arc(x+45,c.y-10,28,0,Math.PI*2);

ctx.arc(x+85,c.y,30,0,Math.PI*2);

ctx.fill();

});

/* flying birds */

for(let i=0;i<12;i++){

let x=

(

i*280

-

bgOffset*2

)

%

(

canvas.width+500

);

if(x<0)
x+=canvas.width+500;

let y=
90+
Math.sin(
Date.now()*0.001+
i
)
*
40+
i*20;

ctx.strokeStyle="#FF69B4";

ctx.lineWidth=4;

/* left wing */

ctx.beginPath();

ctx.arc(
x,
y,
10,
Math.PI,
0
);

ctx.stroke();

/* right wing */

ctx.beginPath();

ctx.arc(
x+18,
y,
10,
Math.PI,
0
);

ctx.stroke();

}

/* sparkles */

for(

let i=0;

i<80;

i++

){

let x=

(

i*193

-

bgOffset*1.5

)

%

canvas.width;

if(x<0)
x+=canvas.width;

let y=

(i*113)

%

(

canvas.height-
150

);

let s=

Math.sin(
Date.now()*0.004+i
)

+2;

ctx.fillStyle=

`rgba(
255,
255,
255,
${
0.4+
Math.sin(
Date.now()*0.003+i
)
*0.5
}
)`;

/* sparkle */

ctx.beginPath();

ctx.arc(
x,
y,
s,
0,
Math.PI*2
);

ctx.fill();

}

}

}
/* ---------------- GROUND ---------------- */

function drawGround(){

ctx.fillStyle=

theme==="gay"

?

"#FF9ED6"

:

"#C68642";

ctx.fillRect(
0,
canvas.height-groundHeight,
canvas.width,
groundHeight
);

/* top grass */

ctx.fillStyle=

theme==="gay"

?

"#FF5FB7"

:

"#8BC34A";

ctx.fillRect(
0,
canvas.height-groundHeight,
canvas.width,
10
);

/* soft glitter */

if(theme==="gay"){

for(let i=0;i<18;i++){

let x=

(
i*170
-
bgOffset*0.15
)

%

canvas.width;

let y=

canvas.height
-
groundHeight
+
(
i*11
%
60
);

ctx.globalAlpha=

0.25+

Math.sin(
Date.now()*0.001
+
i
)
*
0.15;

ctx.fillStyle=
"#FFFFFF";

ctx.beginPath();

ctx.arc(
x,
y,
2,
0,
Math.PI*2
);

ctx.fill();

}

ctx.globalAlpha=1;

}

}

/* ---------------- BIRD ---------------- */

function drawBird(){

/* sparkle trail */

if(theme==="gay"){

trail.push({

x:
bird.x-15,

y:
bird.y+

(Math.random()*18-9),

size:
Math.random()*4+2,

alpha:1

});

}

trail=
trail.filter(
t=>
t.alpha>0
);

trail.forEach(t=>{

t.alpha-=0.03;

ctx.globalAlpha=
t.alpha;

/* sparkle */

ctx.fillStyle=
[
"#FFFFFF",
"#FFE6FA",
"#FFF8B3"
]
[
Math.floor(
Math.random()*3
)
];

ctx.beginPath();

ctx.arc(
t.x,
t.y,
t.size,
0,
Math.PI*2
);

ctx.fill();

/* glow */

ctx.shadowColor=
"white";

ctx.shadowBlur=
14;

ctx.fill();

});

ctx.globalAlpha=1;

ctx.shadowBlur=0;

ctx.globalAlpha=1;

/* bird */

ctx.save();

ctx.translate(
bird.x,
bird.y
);

ctx.rotate(
bird.velocity*0.03
);

let flap=

Math.sin(
Date.now()*0.02
)*6;

ctx.fillStyle=

theme==="gay"

?

"#FF74C8"

:

"#FFD43B";

ctx.beginPath();

ctx.ellipse(
0,
0,
26,
20,
0,
0,
Math.PI*2
);

ctx.fill();

/* wing */

ctx.fillStyle=

theme==="gay"

?

"#FFB3E6"

:

"#F59F00";

ctx.beginPath();

ctx.ellipse(
-8,
flap,
14,
8,
0.5,
0,
Math.PI*2
);

ctx.fill();

/* eye */

ctx.fillStyle="white";

ctx.beginPath();

ctx.arc(
10,
-8,
6,
0,
Math.PI*2
);

ctx.fill();

ctx.fillStyle="black";

ctx.beginPath();

ctx.arc(
12,
-8,
2,
0,
Math.PI*2
);

ctx.fill();

/* beak */

ctx.fillStyle="#FF9500";

ctx.beginPath();

ctx.moveTo(22,0);

ctx.lineTo(38,-5);

ctx.lineTo(22,6);

ctx.fill();

ctx.restore();

}

/* ---------------- PIPES ---------------- */

function drawPipes(){

pipes.forEach(pipe=>{

pipe.x -= 3;

/* score */
if(
!pipe.scored &&
pipe.x+
pipe.width<
bird.x
){

pipe.scored=true;

score++;

if(theme==="gay"){

gayScoreSound.currentTime=0;

gayScoreSound.play();

}

else{

scoreSound.currentTime=0;

scoreSound.play();

}

if(
score%3===0
){

showMessage(

passMessages[

Math.floor(
Math.random()
*
passMessages.length
)

]

);

}

if(
score>
highScore
){

highScore=
score;

localStorage.setItem(
"highscore",
highScore
);

}

}

/* pipe color */

if(theme==="gay"){

let colorIndex =

Math.abs(
Math.floor(
pipe.colorPhase +
Date.now() *
pipe.colorSpeed
)
)

%

rainbowColors.length;

ctx.fillStyle =
rainbowColors[colorIndex];

ctx.shadowColor =
rainbowColors[colorIndex];

}

else{

ctx.fillStyle =
"#1B5E20";

ctx.shadowColor =
"#1E8449";

}

ctx.shadowBlur=20;

ctx.beginPath();

ctx.roundRect(
pipe.x,
0,
pipe.width,
pipe.top,
[20]
);

ctx.fill();

ctx.beginPath();

ctx.roundRect(
pipe.x,
pipe.bottom,
pipe.width,
600,
[20]
);

ctx.fill();

/* glossy effect */

ctx.fillStyle=
"rgba(255,255,255,.18)";

ctx.fillRect(
pipe.x+10,
0,
8,
pipe.top
);

ctx.fillRect(
pipe.x+10,
pipe.bottom,
8,
canvas.height
);

ctx.shadowBlur=0;

/* collision */

if(

bird.x+
bird.radius>

pipe.x

&&

bird.x-
bird.radius<

pipe.x+
pipe.width

&&

(

bird.y-
bird.radius<
pipe.top

||

bird.y+
bird.radius>
pipe.bottom

)

){

if(!gameOver){

showMessage(

roastMessages[

Math.floor(

Math.random()

*

roastMessages.length

)

]

);

gameOver=true;
/* PLAY HIT */

if(theme==="gay"){

gayHitSound.currentTime=0;

gayHitSound.play();

}

else{

hitSound.currentTime=0;

hitSound.play();

}

}

}

});

/* remove offscreen pipes */

pipes=
pipes.filter(
p=>
p.x+p.width>-50
);

}

/* ---------------- SCREENS ---------------- */

function startScreen() {

ctx.fillStyle = "black";
ctx.shadowColor = "rgba(255,255,255,.5)";
ctx.shadowBlur = 6;

ctx.textAlign = "center";

/* TITLE */

ctx.font = '48px "Righteous"';

ctx.fillText(
"FLOPPY BIRD",
canvas.width / 2,
220
);

/* START */

ctx.font = '24px "Righteous"';

ctx.fillText(
"TAP TO START",
canvas.width / 2,
320
);

/* COPYRIGHT */

ctx.font =
'14px "Righteous"';

ctx.shadowBlur=0;

ctx.fillStyle=
"rgba(0,0,0,.7)";

ctx.fillText(

"© 2026 Sahana Sharon A",

canvas.width/2,

canvas.height-30

);

ctx.textAlign = "left";

}

function gameOverScreen() {

ctx.fillStyle = "black";
ctx.shadowColor = "rgba(255,255,255,.5)";
ctx.shadowBlur = 6;

ctx.textAlign = "center";

ctx.font = '46px "Righteous"';
ctx.fillText("GAME OVER", canvas.width / 2, 260);

ctx.font = '22px "Righteous"';
ctx.fillText("TAP TO RESTART", canvas.width / 2, 320);

ctx.textAlign = "left";
ctx.shadowBlur = 0;

}

/* ---------------- UPDATE LOOP ---------------- */

function update() {

ctx.clearRect(0, 0, canvas.width, canvas.height);

drawBackground();
drawGround();

if (!gameStarted) {
drawBird();
startScreen();
requestAnimationFrame(update);
return;
}

if(gameOver){

gameOverScreen();

/* show roast */
drawMessage();

requestAnimationFrame(
update
);

return;

}

bird.velocity += theme==="gay" ? 0.38 : 0.42;

bird.y += bird.velocity;

if(

bird.y+
bird.radius>

canvas.height-
groundHeight

){

if(
!gameOver
){

showMessage(

groundMessages[

Math.floor(

Math.random()

*

groundMessages.length

)

]

);

}


gameOver=true;

if(theme==="gay"){

gayHitSound.currentTime=0;

gayHitSound.play();

}

else{

hitSound.currentTime=0;

hitSound.play();

}
}

drawPipes();

ctx.fillStyle = theme === "gay" ? "black" : "black";
ctx.shadowColor = theme === "gay" ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.5)";
ctx.shadowBlur = 6;
ctx.font = '22px "Righteous"';

ctx.fillText("Score: " + score, 20, 40);
ctx.fillText("Best: " + highScore, 20, 75);

ctx.shadowBlur = 0;

drawBird();
drawMessage();

requestAnimationFrame(update);

}

/* ---------------- CONTROLS ---------------- */

function flap() {

if (gameOver) {
location.reload();
return;
}

gameStarted = true;

bird.velocity =
theme==="gay"
?
-10.5
:
-10;

/* PLAY FLAP SOUND */

flapSound.currentTime=0;

flapSound.play();

}

/* desktop */
document.addEventListener("keydown", e => {
if (e.code === "Space") flap();
});

/* mobile */
canvas.addEventListener("touchstart", e => {
e.preventDefault();
flap();
});

/* mouse */
canvas.addEventListener("click", flap);

/* ---------- SOUNDS ---------- */

const flapSound =
new Audio(
"flap.mp3"
);

const scoreSound =
new Audio(
"score.mp3"
);

const hitSound =
new Audio(
"hit.mp3"
);

const gayScoreSound =
new Audio(
"gayScore.mp3"
);

const gayHitSound =
new Audio(
"gayHit.mp3"
);

gayScoreSound.volume=0.7;

gayHitSound.volume=0.8;

/* volume */

flapSound.volume=0.5;
scoreSound.volume=0.6;
hitSound.volume=0.7;

/* ---------------- THEME ---------------- */

const btn =
document.getElementById(
"themeBtn"
);

const menu =
document.getElementById(
"themeMenu"
);

btn.onclick=()=>{

menu.style.display=

menu.style.display==="block"

?

"none"

:

"block";

};

/* LIGHT MODE */

document
.getElementById(
"lightMode"
)

.onclick=()=>{

theme="light";

document.body.style.background=
"#DDF4FF";

btn.style.background=
"white";

btn.style.color=
"black";

menu.style.background=
"white";

menu.style.color=
"black";

menu.style.display=
"none";

};

/* GAY MODE (replaces night) */

document
.getElementById(
"gayMode"
)

.onclick=()=>{

theme="gay";

document.body.style.background=
"#DDF4FF";

btn.style.background=
"linear-gradient(90deg,#FF003C,#FFD500,#00D95F,#00B7FF,#D900FF)";

btn.style.color=
"black";

menu.style.background=
"linear-gradient(180deg,#FFB3D9,#D5B3FF,#B3E5FF)";

menu.style.color=
"black";

menu.style.display=
"none";

};

update();
