(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _professionalData = require('./professionalData');

var pData = _interopRequireWildcard(_professionalData);

var _style = require('./style');

var style = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var methods = {
  init: function init() {
    var world = resume.world;
    var stage = resume.stage;
    var physics = resume.physics;
    var renderer = resume.renderer;


    this.pathBMD = null;
    this.charge = null;
    this.cursors = null;
    this.xi = 6497;
    this.yi = 3900;
    this.points = {
      'x': [this.xi, 100, 1000, 2000, 3000, 4000, 4900, 4900, 4900, 4900, 5900, 6900, 7900, 8900, 9900],
      'y': [this.yi, 750, 750, 750, 750, 750, 750, 2000, 3000, 3900, 3900, 3900, 3900, 3900, 3900]
    };
    this.pos = 0;
    this.path = [];
    this.worldWidth = 1920 * 8;
    this.worldHeight = 1080 * 6;

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
  preload: function preload() {
    var load = resume.load;

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

    load.image("share", "assets/shareButton.png");
    load.image("modalBG", "assets/modalDialog.png");
    load.image("facebook", "assets/facebook.png");
    load.image("twitter", "assets/twitter.png");
    load.image("instagram", "assets/instagram.png");
    load.image("linkedIn", "assets/linkedIn.png");
    load.image("dribbble", "assets/dribbble.png");
    load.image("Pinterest", "assets/Pinterest.png");

    load.image('skillsPanelBlue', 'assets/skillsPanelBlue.png');
    load.image('yellowButton', 'assets/yellowButton.png');
  },
  create: function create() {
    var add = resume.add;
    var width = resume.width;
    var height = resume.height;
    var input = resume.input;


    this.pathBMD = add.bitmapData(width, height);
    this.pathBMD.addToWorld();

    this.charge = add.sprite(this.xi, this.yi, 'charge');
    this.charge.anchor.set(0.5);
    this.cursors = input.keyboard.createCursorKeys();
    this.plotPath();

    // Introduction
    this.createBanner(510, 60, pData.introLabel);
    var cardWidth = 1000,
        cardHeight = 700,
        cardX = 200,
        cardY = 80;
    this.bizCardBmd = add.bitmapData(cardWidth, cardHeight);
    this.bizCardBmd.shadow('rgba(0, 0, 0, 0.4)', 100, 28, 34);
    this.bizCardBmd.copy('bizcard');
    this.bizCard = add.sprite(cardX, cardY, this.bizCardBmd);
    var name = add.text(0, 0, pData.name, style.name);
    name.setTextBounds(cardX, cardY - 30, cardWidth, cardHeight);
    var title = add.text(0, 0, pData.title, style.title);
    title.setTextBounds(cardX, cardY + 50, cardWidth, cardHeight);

    // Overview
    this.createBanner(1650, 60, pData.overview);
    var chartWidth = 667,
        chartHeight = 496,
        chartX = 1500,
        chartY = 170;
    add.sprite(chartX, chartY, 'chart');

    var offset = 0;
    pData.chartLabels.forEach(function (i) {
      var chartLabels = add.text(0, 0, i, style.chart);
      chartLabels.setTextBounds(chartX - 30, chartY + 180, offset += 295, chartHeight);
    });

    //progress bars
    var radius = 9; //width
    var barHeight = { mid: 135, high: 278 };
    var barPosition = [1612, 1758, 1905, 2052];

    var redBmd = add.bitmapData(radius * 4, barHeight.mid + radius * 2);
    add.sprite(barPosition[0], 528 - barHeight.mid, redBmd);
    this.redBarUpdater = this.vertBar(redBmd, style.red[1], barHeight.mid, radius, 1300);

    var tealBmd = add.bitmapData(radius * 4, barHeight.high + radius * 2);
    add.sprite(barPosition[1], 528 - barHeight.high, tealBmd);
    this.tealBarUpdater = this.vertBar(tealBmd, style.teal[1], barHeight.high, radius, 1346);

    var yellowBmd = add.bitmapData(radius * 4, barHeight.mid + radius * 2);
    add.sprite(barPosition[2], 528 - barHeight.mid, yellowBmd);
    this.yellowBarUpdater = this.vertBar(yellowBmd, style.yellow[1], barHeight.mid, radius, 1492);

    var greenBmd = add.bitmapData(radius * 4, barHeight.high + radius * 2);
    add.sprite(barPosition[3], 528 - barHeight.high, greenBmd);
    this.greenBarUpdater = this.vertBar(greenBmd, style.green[1], barHeight.high, radius, 1642);

    // Professional Values
    this.createBanner(2810, 60, pData.values);
    this.createCard(2550, 500, 'purpleCard', pData.ee.h1, pData.ee.h2);
    this.createCard(3000, 480, 'tealCard', pData.agile.h1, pData.agile.h2);
    this.createCard(2500, 170, 'blueCard', pData.tdd.h1, pData.tdd.h2);
    this.createCard(2800, 320, 'redCard', pData.mr.h1, pData.mr.h2);
    this.createCard(3030, 160, 'yellowCard', pData.lifeLearn.h1, pData.lifeLearn.h2);

    this.createBanner(4100, 60, pData.tools);
    var terminalWidth = 759,
        terminalHeight = 448,
        terminalX = 3895,
        terminalY = 210;
    add.sprite(terminalX, terminalY, 'terminal').scale.setTo(1.1);
    this.termText = add.text(terminalX + 60, terminalY + 80, '', style.terminal);
    this.wordByWord = this.terminal();
    this.synHighlight();

    this.createMarker(5000, 80, pData.markers[0]);
    this.createMarker(5000, 3200, pData.markers[1]);
    this.createMarker(9800, 3200, pData.markers[2]);

    // Prueba de Circulo
    var circleBmd = add.bitmapData(700, 700);
    add.sprite(6100, 3200, circleBmd);
    circleBmd.context.beginPath();
    circleBmd.context.arc(100, 100, 100, 0, Math.PI * 2, false);
    circleBmd.context.fillStyle = "lightBlue";
    circleBmd.context.fill();
    circleBmd.context.stroke();
  },
  update: function update() {
    var camera = resume.camera;


    camera.focusOnXY(this.charge.x + 500, this.charge.y - 600);

    if (this.charge.x === 4900) {
      camera.focusOnXY(this.charge.x + 500, this.charge.y - 300);
    }

    if (this.charge.y === 3900) {
      camera.focusOnXY(this.charge.x + 500, this.charge.y - 300);
    }

    if (this.cursors.right.isDown) {
      this.charge.x = this.path[this.pos].x;
      this.charge.y = this.path[this.pos].y;
      this.pos++;
    } else if (this.cursors.left.isDown) {
      this.charge.x = this.path[this.pos].x;
      this.charge.y = this.path[this.pos].y;
      this.pos--;
    }

    if (this.pos < 0) {
      this.pos = 0;
    } else if (this.pos >= this.path.length) {
      this.pos = this.path.length - 1;
    }

    this.dynShadow(this.bizCardBmd, this.bizCard, 'bizcard');

    this.redBarUpdater();
    this.tealBarUpdater();
    this.yellowBarUpdater();
    this.greenBarUpdater();

    if (this.charge.x > 3600) {
      this.wordByWord();
    }
  },
  render: function render() {
    var debug = resume.debug;
    var renderer = resume.renderer;

    debug.text('x: ' + Math.round(this.charge.x) + ' y: ' + Math.round(this.charge.y) + ', roundPixels ' + renderer.renderSession.roundPixels, 32, 32, 'black');
  },
  plotPath: function plotPath() {
    var math = resume.math;
    var width = resume.width;

    var speed = 20;
    for (var i = 0; i <= 1; i += speed / width) {
      var px = math.linearInterpolation(this.points.x, i);
      var py = math.linearInterpolation(this.points.y, i);
      this.path.push({ x: px, y: py });
      this.pathBMD.rect(px, py, 1, 1, 'black');
    }
  },
  createBanner: function createBanner(x, y, text) {
    var add = resume.add;

    var LabelWidth = 370,
        LabelHeight = 90,
        LabelX = x,
        LabelY = y;
    resume.add.sprite(LabelX, LabelY, 'banner'); //.scale.setTo(0.9)
    var Label = add.text(0, 0, text, style.banner);
    Label.setTextBounds(LabelX, LabelY + 5, LabelWidth, LabelHeight);
  },
  moveToXY: function moveToXY(displayObject, x, y, speed) {

    var _angle = Math.atan2(y - displayObject.y, x - displayObject.x);
    var x2 = Math.cos(_angle) * speed;
    var y2 = Math.sin(_angle) * speed;
    return { x: x2, y: y2 };
  },
  dynShadow: function dynShadow(bmd, sprite, image) {
    var offset = this.moveToXY(this.charge, sprite.x, sprite.y, 20);
    bmd.clear();
    bmd.shadow('rgba(0, 0, 0, 0.4)', 100, offset.x, offset.y + 50);
    bmd.copy(image);
  },
  vertBar: function vertBar(bmd, color, fHeight, radius, triggerX) {

    var bp = 0,
        speed = 0.2;

    return function () {
      var context = bmd.context;
      var height = bmd.height;


      context.lineJoin = "round";
      context.lineWidth = radius;

      if (this.charge.x > triggerX && fHeight >= bp) {
        context.strokeStyle = color;
        context.strokeRect(radius / 2, height - 10, radius, -bp);
        bp += resume.time.elapsedMS * speed;
      }
    };
  },
  createCard: function createCard(x, y, image, h1, h2) {
    var add = resume.add;

    var CardWidth = 399,
        CardHeight = 229,
        CardX = x,
        CardY = y;
    add.sprite(CardX, CardY, image).scale.setTo(0.9);
    var H1 = add.text(0, 0, h1, style.h1);
    H1.setTextBounds(CardX + 35, CardY - 15, CardWidth, CardHeight);
    var H2 = add.text(0, 0, h2, style.h2);
    H2.setTextBounds(CardX + 35, CardY + 60, CardWidth, CardHeight);
  },
  terminal: function terminal() {
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        this.nextLine();
      }
    };
  },
  nextLine: function nextLine() {

    if (this.lineIndex === pData.termContent.length) {
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
  nextWord: function nextWord() {
    this.termText.text = this.termText.text.concat(this.line[this.wordIndex] + " ");

    //  Advance the word index to the next word in the line
    this.wordIndex++;

    //  Last word?
    if (this.wordIndex === this.line.length) {
      //  Add a carriage return
      this.termText.text = this.termText.text.concat("\n");

      //  Get the next line after the lineDelay amount of ms has elapsed
      resume.time.events.add(this.lineDelay, this.nextLine, this);
    }
  },
  synHighlight: function synHighlight() {

    var text = pData.termContent.join(' ');
    for (var i = 0; i < text.length; i++) {
      if (text[i] === '=') {
        this.termText.addColor(style.teal[1], i);
        this.termText.addColor(style.green[1], i + 1);
      } else if (text[i] === '{' || text[i] === '}' || text[i] === '[' || text[i] === ']' || text[i] === ',' || text[i] === ':') {
        this.termText.addColor(style.lightGrey[1], i);
        this.termText.addColor(style.green[1], i + 1);
      }
    }
  },
  createMarker: function createMarker(x, y, text) {
    var add = resume.add;

    var markerWidth = 1000,
        markerHeight = 700,
        markerX = x,
        markerY = y;
    var bmd = add.bitmapData(markerWidth, markerHeight);
    bmd.shadow('rgba(0, 0, 0, 0.4)', 100, 28, 34);
    bmd.copy('cardMarker');
    var sprite1 = add.sprite(markerX, markerY, bmd);
    var title = resume.add.text(0, 0, text, style.card);
    title.setTextBounds(markerX, markerY, markerWidth, markerHeight);
  }
};

var resume = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'resume', methods);

},{"./professionalData":2,"./style":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = exports.name = 'FVI Student';
var title = exports.title = 'Javascript Ninja';
var introLabel = exports.introLabel = 'The Interactive Resume Of';
var overview = exports.overview = 'Overview';
var chartLabels = exports.chartLabels = ['Design', 'DOM', 'CSS', 'APIs'];
var values = exports.values = 'Professional Values';
var lifeLearn = exports.lifeLearn = { h1: 'Life Long \nLearning ', h2: 'Consistent analysis of innovation and \nself-motivated pursuit of knowledge.' };
var tdd = exports.tdd = { h1: 'Test Driven \nDevelopment', h2: 'All code is innocent until proven guilty.' };
var mr = exports.mr = { h1: 'Modularity + \nReusabilty', h2: 'Design components/systems \nto be useful  in multple scenarios.' };
var agile = exports.agile = { h1: 'Agile Methods', h2: 'Evolutionary development, continuous \nintegration, flexible response to change.' };
var ee = exports.ee = { h1: 'Engineering \nElegance', h2: 'The most effective solutions are often \nthe most minimal' };
var tools = exports.tools = 'Tools';
var termContent = exports.termContent = ["favoriteTools = {", "\t\t\t'Mobile':['React Native', 'Ionic']", "\t\t\t'Gaming/High Interactivty': ['Phaser.io', 'Canvas API']", "\t\t\t'DOM Manipulation' : ['jQuery', 'Angular', 'pHp'],", "\t\t\t'CSS Frameworks' : ['MaterializeCSS', 'Bootstrap'],", "\t\t\t'Back End' : ['Express','Socket.io'],", "\t\t\t'Database' : ['Mongo DB', 'MySQL'],", "\t\t\t'User Interface' : ['Balsamiq’,'Sketch','Photoshop']", "\t}"];

var markers = exports.markers = ['Skills', 'Projects', 'Credentials'];

var skills = exports.skills = {
  banners: ['Design', 'Front End', 'Back End', 'Electrical Engineering'],
  levels: ['beginner', 'familiar', 'proficient', 'expert'],
  design: ['Illustrator', 'Photoshop', 'Balsamiq'],
  frontEnd: ['React', 'BootStrap', 'jQuery', 'D3'],
  backEnd: ['Flask', 'Node/Express', 'MongoDB'],
  dataScience: ['Scipy/Numpy', 'pandas', 'Econometrics'],
  electricalEngineering: ['Embedded C', 'Schematic Development', 'PCB Routing', 'Seeed Studio Production Cycle', 'System Simulation', 'Sensors and Actuators']
};

var projects = exports.projects = {
  labels: ['SHARE', 'LEARN MORE'],
  'bitFarm': {
    tagline: 'Grow food from your phone.',
    chart: {
      'Mechanical Engineering': 0.2,
      'Sensors & Actuators': 0.3,
      'Hardware Development': 0.3,
      'User Experience': 0.2
    }
  },
  'comSim': {
    tagline: 'Model digital communication systems.',
    chart: {
      'User Interface': 0.2,
      'Data Visualization': 0.3,
      'Numerical Computing': 0.3,
      'Electrical Engineering': 0.3
    }
  },
  'Parity': {
    tagline: 'Simplifying randomized control trials for social programs',
    chart: {
      'User Interface': 0.3,
      'Data Visualization': 0.2,
      'Numerical Computing': 0.3,
      'Econometrics': 0.3
    }
  }
};

var credentials = exports.credentials = {
  button: 'verify this',
  'Formal Education': {
    degree: ['BS Electrical Engineering', 'BA Communication'],
    year: [2006, 2014],
    school: ['Loyola University Chicago', 'Oregon Institute of Technology'],
    minors: ['Mechanical Engineering', 'Conflict Resolution']
  },
  'Continuing Education': {
    course: ['Embedded Systems', 'Introduction to Computer Science', 'MongoDB for Developers', 'jQuery Fundamentals', 'Systems View of Communication (3 Part Series)', 'HTML5 Essentials and Best Practices', 'Front-End Web UI Frameworks and Tools'],
    provider: ['UT Austin - edX', 'MIT - edX', 'MongoDB University', 'Microsoft - edX', 'W3C - edX', 'HKUST - Coursera']
  },
  'Certifications': {
    title: ['Engineer In Training', 'Ceritified Associate in Project Management', 'Green Associate'],
    provider: ['California Board for Professional Engineers', 'Project Management Institute', 'US GreenBuild Council']
  }
};

var contactMsg = exports.contactMsg = 'If you have a project similar to mine or would like to help me, I would love to receive your message.  I am also interested in finding a mentor or mentoring.  No recruiters please.';

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//color scheme
var lightGrey = exports.lightGrey = [0xCFD6DA, '#CFD6DA'];
var teal = exports.teal = [0x80cbc4, '#80cbc4'];
var blue = exports.blue = [0x81B0F1, '#81B0F1'];
var yellow = exports.yellow = [0xE5B168, '#E5B168'];
var green = exports.green = [0x92CB86, '#92CB86'];
var red = exports.red = [0xF17077, '#F17077'];
var blueGrey500 = exports.blueGrey500 = [0x607d8b, '#607d8b'];
var blueGrey600 = exports.blueGrey600 = [0x546e7a, '#546e7a'];
var grey = exports.grey = [0x666666, '#666666'];
var name = exports.name = { font: "90px lintelregular", fill: blueGrey600[1], boundsAlignH: "center", boundsAlignV: "middle" };
var title = exports.title = { font: "30px lintelregular", fill: green[1], boundsAlignH: "center", boundsAlignV: "middle" };
var banner = exports.banner = { font: "20px lintelregular", fill: 'grey', boundsAlignH: "center", boundsAlignV: "middle" };
var chart = exports.chart = { font: "25px Roboto", fill: blueGrey500[1], boundsAlignH: "center", boundsAlignV: "middle" };
var h1 = exports.h1 = { font: "30px Roboto", fill: 'white', boundsAlignH: "left", boundsAlignV: "middle" };
var h2 = exports.h2 = { font: "15px Roboto", fill: 'grey', boundsAlignH: "left", boundsAlignV: "middle" };
var terminal = exports.terminal = { font: "20px Roboto Mono", fill: red[1] };
var card = exports.card = { font: "120px Electrolize", fill: blueGrey600[1], boundsAlignH: "center", boundsAlignV: "middle" };

},{}]},{},[1]);
