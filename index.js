import * as pData from './professionalData'
import * as style from './style'


const methods = {

init(){

  const {world, stage, physics, renderer} = resume

  this.pathBMD = null;
  this.charge = null;
  this.cursors = null;
  this.xi = 100;
  this.yi = 100;
  this.points = {
    'x': [ this.xi, 100,1000,2000,3000,4000, 4900, 4900, 4900, 4900, 5900, 6900, 7900, 8900, 9900, 9900, 9900,9900 ],
    'y': [ this.yi, 750,750, 750, 750, 750,  750,  2000, 3000, 3900, 3900, 3900, 3900, 3900,3900, 3000, 2000, 750  ]
  };
  this.pos = 0;
  this.path = [];
  this.worldWidth = 1920*8;
  this.worldHeight= 1080*6;


  //terminal variables
  this.wordIndex = 0;
  this.lineIndex = 0;
  this.wordDelay = 120;
  this.lineDelay = 300;

  // renderer.renderSession.roundPixels = true;
  world.setBounds(0, 0, this.worldWidth, this.worldHeight); //
  stage.backgroundColor = '#fafafa';
  physics.startSystem(Phaser.Physics.ARCADE);
},

preload(){
  const {load} =resume
  load.image('charge', 'assets/charge.png');
  load.image('bizcard', 'assets/bizcard.png');
  load.image('banner', 'assets/banner.png');
  load.image('chart', 'assets/chart.png');
  load.image('purpleCard', 'assets/purpleCard.png');
  load.image('yellowCard', 'assets/yellowCard.png');
  load.image('blueCard', 'assets/blueCard.png');
  load.image('redCard', 'assets/redCard.png');
  load.image('tealCard', 'assets/tealCard.png');
  load.image('terminal', 'assets/terminal.png');
  load.image('cardMarker', 'assets/cardMarker.png');

  load.image("share","assets/shareButton.png");
  load.image("modalBG","assets/modalDialog.png");
  load.image("facebook","assets/facebook.png");
  load.image("twitter","assets/twitter.png");
  load.image("instagram","assets/instagram.png");
  load.image("linkedIn","assets/linkedIn.png");
  load.image("dribbble","assets/dribbble.png");
  load.image("Pinterest","assets/Pinterest.png");

  load.image('skillsPanelBlue','assets/skillsPanelBlue.png');
  load.image('yellowButton','assets/yellowButton.png');
},

create(){
  const {add, width, height, input} = resume

  this.pathBMD = add.bitmapData( width, height);
  this.pathBMD.addToWorld();

  this.charge = add.sprite(this.xi,this.yi, 'charge');
  this.charge.anchor.set(0.5);
  this.cursors = input.keyboard.createCursorKeys();
  this.plotPath()



  // Introduction
  this.createBanner(510, 60, pData.introLabel)
  const cardWidth = 1000, cardHeight = 700, cardX = 200, cardY = 80;
  this.bizCardBmd = add.bitmapData(cardWidth, cardHeight);
  this.bizCardBmd.shadow('rgba(0, 0, 0, 0.4)', 100  ,28,34);
  this.bizCardBmd.copy('bizcard');
  this.bizCard = add.sprite(cardX ,cardY, this.bizCardBmd);
  const name = add.text(0, 0, pData.name, style.name);
  name.setTextBounds(cardX, cardY-30, cardWidth, cardHeight);
  const title = add.text(0, 0, pData.title, style.title);
  title.setTextBounds(cardX, cardY+50, cardWidth, cardHeight);

  // Overview
  this.createBanner(1650, 60, pData.overview)
  const chartWidth = 667, chartHeight = 496, chartX = 1500, chartY =170;
  add.sprite(chartX, chartY, 'chart');

  let offset =0
  pData.chartLabels.forEach(i=>{
    const chartLabels = add.text(0, 0, i, style.chart);
    chartLabels.setTextBounds(chartX-30, chartY+180, offset+=295, chartHeight);
  })

  //progress bars
  const radius = 9   //width
  const barHeight = {mid:135, high:278}
  const barPosition = [1612, 1758, 1905, 2052]

  const redBmd = add.bitmapData(radius*4, barHeight.mid+radius*2);
  add.sprite(barPosition[0], 528-barHeight.mid, redBmd)
  this.redBarUpdater = this.vertBar(redBmd,style.red[1], barHeight.mid, radius,1300 )

  const tealBmd = add.bitmapData(radius*4, barHeight.high+radius*2);
  add.sprite(barPosition[1], 528-barHeight.high, tealBmd)
  this.tealBarUpdater = this.vertBar(tealBmd,style.teal[1], barHeight.high, radius,1346 )

  const yellowBmd = add.bitmapData(radius*4, barHeight.mid+radius*2)
  add.sprite(barPosition[2], 528-barHeight.mid, yellowBmd)
  this.yellowBarUpdater = this.vertBar(yellowBmd,style.yellow[1], barHeight.mid, radius,1492)

  const greenBmd = add.bitmapData(radius*4, barHeight.high+radius*2)
  add.sprite(barPosition[3], 528-barHeight.high, greenBmd)
  this.greenBarUpdater = this.vertBar(greenBmd,style.green[1], barHeight.high, radius,1642)

  // Professional Values
  this.createBanner(2810, 60, pData.values)
  this.createCard(2550,500,'purpleCard',pData.ee.h1,pData.ee.h2  )
  this.createCard(3000,480,'tealCard',pData.agile.h1,pData.agile.h2  )
  this.createCard(2500,170,'blueCard',pData.tdd.h1,pData.tdd.h2  )
  this.createCard(2800,320,'redCard',pData.mr.h1,pData.mr.h2  )
  this.createCard(3030,160,'yellowCard',pData.lifeLearn.h1,pData.lifeLearn.h2 )

  this.createBanner(4100, 60, pData.tools)
  const terminalWidth = 759, terminalHeight = 448, terminalX = 3895, terminalY =210;
  add.sprite(terminalX, terminalY, 'terminal').scale.setTo(1.1)
  this.termText = add.text(terminalX+60, terminalY+80, '', style.terminal)
  this.wordByWord = this.terminal()
  this.synHighlight()

  this.createMarker(5000,80, pData.markers[0] )
  this.createMarker(5000,3200, pData.markers[1] )
  this.createMarker(9900,3200, pData.markers[2] )

  // Prueba de Circulo
  let lastPosition = 0;
  const slices = [1/3, .33, .34]
  const data = ['React', 'Canvas', 'React-native']
  const colors = [style.blue[1], style.yellow[1], style.red[1]]
  const mp = 250
  const circleBmd = add.bitmapData(700, 700);
  // circleBmd.shadow('rgba(0, 0, 0, 0.4)', 100,28,34);
  const pie = add.sprite(4900, 2094, circleBmd)
  for (let i = 0; i < slices.length; i++) {
    const {context} = circleBmd;
    context.beginPath();
    context.arc(mp, mp, mp, lastPosition,  Math.PI*2*slices[i] + lastPosition );
    context.lineTo(mp,mp);
    context.fillStyle = colors[i];
    context.fill();
    context.font = "20pt Roboto"
    context.fillStyle = 'white'


    circleBmd.context.fillText( Math.floor(slices[0] *100).toString()+ '%'   , mp+mp/4, mp+mp/2);
    circleBmd.context.fillText(data[0], mp+mp/4, 20+mp+mp/2);


    const val1 = data[1] + ' ' + Math.floor(slices[1] *100).toString()+ '%'
    circleBmd.context.fillText(val1, mp/4, mp);

    const val2 = data[2] + ' ' + Math.floor(slices[2] *100).toString()+ '%'
    circleBmd.context.fillText(val2, mp, mp/2);


    lastPosition += Math.PI*2*slices[i];
}




},
update(){

    const {camera} = resume

    camera.focusOnXY(this.charge.x+500, this.charge.y-600);

    if(this.charge.x === 4900){
      camera.focusOnXY(this.charge.x+500, this.charge.y-300);
    }

    if(this.charge.y === 3900){
      camera.focusOnXY(this.charge.x+500, this.charge.y-300);
    }

    if(this.charge.x === 9900){
      camera.focusOnXY(this.charge.x+500, this.charge.y-300);
    }



    if(this.cursors.right.isDown){
      this.charge.x = this.path[this.pos].x;
      this.charge.y = this.path[this.pos].y;
      this.pos++;
    }else if(this.cursors.left.isDown){
      this.charge.x = this.path[this.pos].x;
      this.charge.y = this.path[this.pos].y;
      this.pos--;
    }

    if (this.pos <0){
      this.pos = 0;
    }else if (this.pos >= this.path.length) {
      this.pos = this.path.length -1;
    }

    this.dynShadow(this.bizCardBmd, this.bizCard, 'bizcard')

    this.redBarUpdater()
    this.tealBarUpdater()
    this.yellowBarUpdater()
    this.greenBarUpdater()

    if(this.charge.x > 3600){
      this.wordByWord();
    }


},

render(){
  const {debug, renderer} =  resume
  debug.text(
    'x: ' + Math.round(this.charge.x) + ' y: ' + Math.round(this.charge.y)+ ', roundPixels ' + renderer.renderSession.roundPixels  , 32, 32,'black'
  );
},

plotPath(){
  const {math, width} = resume
  const speed = 20
  for (var i = 0; i <= 1; i += speed/width) {
    var px = math.linearInterpolation(this.points.x, i)
    var py = math.linearInterpolation(this.points.y, i)
    this.path.push( { x:px, y:py } )
    this.pathBMD.rect(px,py, 1,1, 'black')
  }
},

createBanner(x, y, text){
  const {add} = resume
  const LabelWidth = 370, LabelHeight = 90, LabelX = x, LabelY = y;
  resume.add.sprite(LabelX, LabelY, 'banner')//.scale.setTo(0.9)
  const Label = add.text(0, 0, text, style.banner)
  Label.setTextBounds(LabelX, LabelY+5, LabelWidth,  LabelHeight)
},

moveToXY(displayObject, x, y, speed) {

    const _angle = Math.atan2(y - displayObject.y, x - displayObject.x);
    const x2 = Math.cos(_angle) * speed;
    const y2 = Math.sin(_angle) * speed;
    return { x: x2, y: y2 };

},

dynShadow(bmd, sprite, image){
  const offset = this.moveToXY(this.charge, sprite.x, sprite.y, 20);
  bmd.clear();
  bmd.shadow( 'rgba(0, 0, 0, 0.4)', 100  , offset.x, offset.y+50);
  bmd.copy(image);

},

vertBar(bmd, color, fHeight, radius, triggerX){

 let bp=0, speed=0.2

 return function(){

   const {context, height} = bmd

   context.lineJoin = "round"
   context.lineWidth = radius

   if(this.charge.x > triggerX && fHeight >= bp){
     context.strokeStyle = color;
     context.strokeRect(radius/2, height-10,radius,-bp);
     bp += resume.time.elapsedMS*speed

    }
  }
},

createCard(x, y, image, h1, h2){
  const {add} = resume
  const CardWidth = 399, CardHeight = 229, CardX = x  , CardY=y;
  add.sprite(CardX, CardY, image).scale.setTo(0.9);
  const H1 = add.text(0,0, h1, style.h1);
  H1.setTextBounds(CardX+35, CardY-15, CardWidth,CardHeight);
  const H2 = add.text(0,0, h2, style.h2);
  H2.setTextBounds(CardX+35, CardY+60, CardWidth,CardHeight);
},
terminal(){
  let executed = false
  return function(){
    if(!executed){
      executed= true
      this.nextLine()
    }

  }
},

nextLine() {

    if (this.lineIndex === pData.termContent.length){
        //  We're finished
        return;
    }


    //  Split the current line on spaces, so one word per array element
    this.line = pData.termContent[this.lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    this.wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    resume.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);

    //  Advance to the next line
    this.lineIndex++;


},
nextWord() {
  this.termText.text = this.termText.text.concat(this.line[this.wordIndex] + " ");

  //  Advance the word index to the next word in the line
  this.wordIndex++;


  //  Last word?
  if (this.wordIndex === this.line.length)
  {
      //  Add a carriage return
      this.termText.text = this.termText.text.concat("\n");

      //  Get the next line after the lineDelay amount of ms has elapsed
      resume.time.events.add(this.lineDelay, this.nextLine, this);
  }
},
synHighlight(){

  const text = pData.termContent.join(' ')
  for (let i = 0; i < text.length; i++) {
    if( text[i] === '='){
      this.termText.addColor(style.teal[1], i)
      this.termText.addColor(style.green[1], i+1)
    }else if(text[i]==='{' || text[i]==='}' || text[i]==='[' ||text[i]===']' || text[i]===',' || text[i]===':' ){
      this.termText.addColor(style.lightGrey[1], i)
      this.termText.addColor(style.green[1], i+1)
    }
  }
},
createMarker(x, y, text){
  const {add} =resume
  const markerWidth = 1000, markerHeight = 700, markerX = x, markerY = y;
  const bmd = add.bitmapData(markerWidth, markerHeight);
  bmd.shadow('rgba(0, 0, 0, 0.4)', 100,28,34);
  bmd.copy('cardMarker');
  const sprite1 = add.sprite(markerX ,markerY, bmd)
  const title = resume.add.text(0, 0, text, style.card);
  title.setTextBounds(markerX, markerY, markerWidth, markerHeight);

},



}

const resume = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'resume', methods)
