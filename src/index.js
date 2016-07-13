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
  load.image('skillsPanelPurple','assets/skillsPanelPurple.png');
  load.image('skillsPanelTeal','assets/skillsPanelTeal.png');
  load.image('yellowButton','assets/yellowButton.png');

  load.image('certMedium', 'assets/certMedium.png');
  load.image('certStriped', 'assets/certStriped.png');
  load.image('blueButton', 'assets/blueButton.png');
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
    const levels = add.text(0, 0, i, style.chart);
    levels.setTextBounds(chartX-30, chartY+180, offset+=295, chartHeight);
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

  //Tool
  this.createBanner(4120, 60, pData.tools)
  const terminalWidth = 759, terminalHeight = 448, terminalX = 3895, terminalY =180;
  add.sprite(terminalX, terminalY, 'terminal').scale.setTo(1.1)
  this.termText = add.text(terminalX+60, terminalY+80, '', style.terminal)
  this.wordByWord = this.terminal()
  this.synHighlight()


  this.createMarker(5000,80, pData.markers[0] )
  this.createMarker(5000,3200, pData.markers[1] )
  this.createMarker(9900,3200, pData.markers[2] )



  //Skills Area


  //skills Panels
  const barWidth = {begin:230, fam:370, pro:510,exp:700}

  this.createBanner(5330, 950, pData.skills.banners[0])
  this.createPanel(5000,1100,'skillsPanelBlue', pData.skills.design)
  this.skillOneBar(1298,barWidth.fam,1400,barWidth.exp,1507,barWidth.pro,1300)


  this.createBanner(5330, 1750, pData.skills.banners[1])
  this.createPanel(5000,1900,'skillsPanelPurple',pData.skills.frontEnd)
  this.skillTwoBar(2100,barWidth.pro,2205,barWidth.exp,2307,barWidth.fam,2100)


  this.createBanner(5330, 2550, pData.skills.banners[2])
  this.createPanel(5000,2700,'skillsPanelTeal',pData.skills.backEnd)
  this.skillThreeBar(2900,barWidth.pro,3005,barWidth.pro,3107,barWidth.exp,2950)


  // Joe's Stuff

  //TODO: shift sprite to the left instead of cert to the right
  this.createYellowCert(9980, 2400, pData.formalEdu[0])
  this.createBlueCert(9980, 1400, pData.formalEdu[1])



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



    this.skillOneBar1()
    this.skillOneBar2()
    this.skillOneBar3()

    this.skillTwoBar1()
    this.skillTwoBar2()
    this.skillTwoBar3()

    this.skillThreeBar1()
    this.skillThreeBar2()
    this.skillThreeBar3()

},



render(){
  const {debug, renderer} =  resume
  debug.text("Currently in development. Please  use the right and left arrow keys to navigate.", 16, 16, style.blueGrey500[1])
  // debug.text(
  //   'x: ' + Math.round(this.charge.x) + ' y: ' + Math.round(this.charge.y)+ ', roundPixels ' + renderer.renderSession.roundPixels  , 32, 32,'black'
  // );
},

plotPath(){
  const {math, width} = resume
  const speed = 6
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
  bmd.shadow('rgba(0, 0, 0, 0.4)', 100  ,28,34);
  bmd.copy('cardMarker');
  const sprite1 = add.sprite(markerX ,markerY, bmd)
  const title = resume.add.text(0, 0, text, style.card);
  title.setTextBounds(markerX, markerY, markerWidth, markerHeight);

},

createPanel(x,y,image,skill){
  const {add} = resume
  const PanelWidth = 500, PanelHeight= 650, PanelX = x , PanelY = y;
  add.sprite(PanelX, PanelY, image).scale.setTo(1.4);


  let offset =0
  pData.skills.levels.forEach(i=>{
    const levels = add.text(0, 0, i, style.levels);
    levels.setTextBounds(PanelX+220, PanelY-240, offset+=300, PanelHeight);
  })
  let onset = 0
  skill.forEach(i=>{
    const levels = add.text(0, 0, i, style.skills);
    levels.setTextBounds(PanelX+150, PanelY+75, PanelWidth, onset+=210);
  })

},

skillOneBar(y1,l1,y2,l2,y3,l3,triggerY){

  const {add} = resume
  const vRadius =9

  const alphaBmd = add.bitmapData( l1, vRadius*6)
  const bravoBmd = add.bitmapData( l2, vRadius*6)
  const charlieBmd = add.bitmapData( l3, vRadius*6)
  add.sprite(5160,y1, alphaBmd)
  add.sprite(5160,y2, bravoBmd)
  add.sprite(5160,y3, charlieBmd)

  this.skillOneBar1 = this.horizBar( alphaBmd, style.yellow[1], l1, vRadius,triggerY);
  this.skillOneBar2 = this.horizBar( bravoBmd, style.yellow[1], l2, vRadius,triggerY);
  this.skillOneBar3 = this.horizBar( charlieBmd, style.yellow[1], l3, vRadius,triggerY);



},

skillTwoBar(y1,l1,y2,l2,y3,l3,triggerY){

  const {add} = resume
  const vRadius =9

  const alphaBmd = add.bitmapData( l1, vRadius*6)
  const bravoBmd = add.bitmapData( l2, vRadius*6)
  const charlieBmd = add.bitmapData( l3, vRadius*6)
  add.sprite(5160,y1, alphaBmd)
  add.sprite(5160,y2, bravoBmd)
  add.sprite(5160,y3, charlieBmd)

  this.skillTwoBar1 = this.horizBar( alphaBmd, style.yellow[1], l1, vRadius,triggerY);
  this.skillTwoBar2 = this.horizBar( bravoBmd, style.yellow[1], l2, vRadius,triggerY);
  this.skillTwoBar3 = this.horizBar( charlieBmd, style.yellow[1], l3, vRadius,triggerY);



},

skillThreeBar(y1,l1,y2,l2,y3,l3,triggerY){

  const {add} = resume
  const vRadius =9

  const alphaBmd = add.bitmapData( l1, vRadius*6)
  const bravoBmd = add.bitmapData( l2, vRadius*6)
  const charlieBmd = add.bitmapData( l3, vRadius*6)
  add.sprite(5160,y1, alphaBmd)
  add.sprite(5160,y2, bravoBmd)
  add.sprite(5160,y3, charlieBmd)

  this.skillThreeBar1 = this.horizBar( alphaBmd, style.yellow[1], l1, vRadius,triggerY);
  this.skillThreeBar2 = this.horizBar( bravoBmd, style.yellow[1], l2, vRadius,triggerY);
  this.skillThreeBar3 = this.horizBar( charlieBmd, style.yellow[1], l3, vRadius,triggerY);



},



horizBar(bmd, color, barWidth, radius,triggerY){

   let bp=0, speed=0.4

   return function(){

     const {context} = bmd
      context.lineJoin = "round"
      context.lineWidth = radius

     if(bp < barWidth && this.charge.y > triggerY){
       context.strokeStyle = color;
       context.strokeRect(0, radius/2, bp, 5);
       bp += resume.time.elapsedMS*speed
     }


    }
},
createYellowCert(x,y, text){
  const keys = Object.keys(text)
  const {add} =resume
  const certWidth = 950, certHeight = 570, certX = x, certY = y;
  const bmd = add.bitmapData(certWidth, certHeight);
  bmd.copy('certMedium');
  const sprite1 = add.sprite(certX ,certY, bmd)
  const title = add.text(0, 0, text.degreeTitle, style.degreeTitle);
  title.setTextBounds(certX+100, certY+100, certWidth, certHeight);
  const year = add.text(0, 0, text.year, style.year);
  year.setTextBounds(certX-98, certY+100, certWidth, certHeight);

  let bullets
  if(text.Specialization===undefined){
    bullets = add.text(0, 0, `\n•\t\t\t${keys[2]}:  ${text.Institution}`, style.bullets);
  }else{
    bullets = add.text(0, 0, `\n•\t\t\t${keys[2]}:  ${text.Institution}\n\n•\t\t\t${keys[3]}: ${text.Specialization}`, style.bullets);
  }
  bullets.setTextBounds(certX, certY, certWidth, certHeight)
  this.createButton(certX, certY, 'verfiy this','yellowButton',  'http://www.google.com')
},
createBlueCert(x,y, text){
  const keys = Object.keys(text)
  const {add} =resume
  const certWidth = 950, certHeight = 600, certX = x, certY = y;
  const bmd = add.bitmapData(certWidth, certHeight);
  bmd.copy('certStriped');
  const sprite1 = add.sprite(certX ,certY, bmd)
  const title = add.text(0, 0, 'Certifications', style.certifications);
  title.setTextBounds(certX+100, certY+100, certWidth, certHeight);

  const bullets = add.text(0, 0, `\n•\t\t\t${keys[2]}:  ${text.Institution}`, style.bullets);
  bullets.setTextBounds(certX, certY, certWidth, certHeight)
  this.createButton(certX, certY, 'verfiy this','blueButton',  'http://www.google.com')
},
createButton(x,y,label, image, url){

  const {add} =resume
  var buttonBmd = add.bitmapData(124, 52);
  buttonBmd.shadow('rgba(0, 0, 0, 0.2)', 0.0001, 0.0001, 0.0001);
  buttonBmd.copy(image);
  add.button(x+420, y+440,buttonBmd, animate, this);
  const text = add.text(x+420+20 , y+440+12 , label, {font : '20px lintelregular', fill: 'white'});

  let i = 0;
  function animate () {
    var arr = [ 0.0001, 1,2,3,4,4,3,2,1, 0.0001 ];
    setTimeout(function () {
      i++;
      buttonBmd.clear();
      buttonBmd.copy(image);
      buttonBmd.shadow('rgba(0, 0, 0, 0.2)', arr[i], 0.0001, arr[i]);

      if (i < arr.length) {
         animate();
      }else{
        i = 1;
        // ( ()=> window.location.href = url)()
        buttonBmd.shadow('rgba(0, 0, 0, 0.2)', 0.0001, 0.0001, 0.0001)

      }

     }, 80);

  }
},


}

const resume = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'resume', methods)
