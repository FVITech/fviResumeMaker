/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _professionalData = __webpack_require__(1);

	var pData = _interopRequireWildcard(_professionalData);

	var _style = __webpack_require__(2);

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
	    this.xi = 100;
	    this.yi = 100;
	    this.points = {
	      'x': [this.xi, 100, 1000, 2000, 3000, 4000, 4900, 4900, 4900, 4900, 5900, 6900, 7900, 8900, 9900, 9900, 9900, 9900],
	      'y': [this.yi, 750, 750, 750, 750, 750, 750, 2000, 3000, 3900, 3900, 3900, 3900, 3900, 3900, 3000, 2000, 750]
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
	    load.image('skillsPanelPurple', 'assets/skillsPanelPurple.png');
	    load.image('skillsPanelTeal', 'assets/skillsPanelTeal.png');
	    load.image('yellowButton', 'assets/yellowButton.png');

	    load.image('certMedium', 'assets/certMedium.png');
	    load.image('certStriped', 'assets/certStriped.png');
	    load.image('blueButton', 'assets/blueButton.png');
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
	      var levels = add.text(0, 0, i, style.chart);
	      levels.setTextBounds(chartX - 30, chartY + 180, offset += 295, chartHeight);
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

	    //Tool
	    this.createBanner(4120, 60, pData.tools);
	    var terminalWidth = 759,
	        terminalHeight = 448,
	        terminalX = 3895,
	        terminalY = 180;
	    add.sprite(terminalX, terminalY, 'terminal').scale.setTo(1.1);
	    this.termText = add.text(terminalX + 60, terminalY + 80, '', style.terminal);
	    this.wordByWord = this.terminal();
	    this.synHighlight();

	    this.createMarker(5000, 80, pData.markers[0]);
	    this.createMarker(5000, 3200, pData.markers[1]);
	    this.createMarker(9900, 3200, pData.markers[2]);

	    //Skills Area

	    //skills Panels
	    var barWidth = { begin: 230, fam: 370, pro: 510, exp: 700 };

	    this.createBanner(5330, 950, pData.skills.banners[0]);
	    this.createPanel(5000, 1100, 'skillsPanelBlue', pData.skills.design);
	    this.skillOneBar(1298, barWidth.fam, 1400, barWidth.exp, 1507, barWidth.pro, 1300);

	    this.createBanner(5330, 1750, pData.skills.banners[1]);
	    this.createPanel(5000, 1900, 'skillsPanelPurple', pData.skills.frontEnd);
	    this.skillTwoBar(2100, barWidth.pro, 2205, barWidth.exp, 2307, barWidth.fam, 2100);

	    this.createBanner(5330, 2550, pData.skills.banners[2]);
	    this.createPanel(5000, 2700, 'skillsPanelTeal', pData.skills.backEnd);
	    this.skillThreeBar(2900, barWidth.pro, 3005, barWidth.pro, 3107, barWidth.exp, 2950);

	    //Rancels Stuff

	    // Prueba de Circulo
	    var lastPosition = 0;
	    var slices = [1 / 3, .33, .34];
	    var data = ['React', 'Canvas', 'React-native'];
	    var colors = [style.blue[1], style.yellow[1], style.red[1]];
	    var mp = 250;
	    var circleBmd = add.bitmapData(700, 700);
	    // circleBmd.shadow('rgba(0, 0, 0, 0.4)', 100,28,34);
	    var pie = add.sprite(6400, 3300, circleBmd);
	    for (var i = 0; i < slices.length; i++) {
	      var context = circleBmd.context;

	      context.beginPath();
	      context.arc(mp, mp, mp, lastPosition, Math.PI * 2 * slices[i] + lastPosition);
	      context.lineTo(mp, mp);
	      context.fillStyle = colors[i];
	      context.fill();
	      context.font = "20pt Roboto";
	      context.fillStyle = 'white';

	      circleBmd.context.fillText(Math.floor(slices[0] * 100).toString() + '%', mp + mp / 4, mp + mp / 2);
	      circleBmd.context.fillText(data[0], mp + mp / 4, 20 + mp + mp / 2);

	      var val1 = data[1] + ' ' + Math.floor(slices[1] * 100).toString() + '%';
	      circleBmd.context.fillText(val1, mp / 4, mp);

	      var val2 = data[2] + ' ' + Math.floor(slices[2] * 100).toString() + '%';
	      circleBmd.context.fillText(val2, mp, mp / 2);

	      lastPosition += Math.PI * 2 * slices[i];
	    }

	    // Joe's Stuff

	    //TODO: shift sprite to the left instead of cert to the right
	    this.createYellowCert(9980, 2400, pData.formalEdu[0]);
	    this.createBlueCert(9980, 1400, pData.formalEdu[1]);
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

	    if (this.charge.x === 9900) {
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

	    this.skillOneBar1();
	    this.skillOneBar2();
	    this.skillOneBar3();

	    this.skillTwoBar1();
	    this.skillTwoBar2();
	    this.skillTwoBar3();

	    this.skillThreeBar1();
	    this.skillThreeBar2();
	    this.skillThreeBar3();
	  },
	  render: function render() {
	    var debug = resume.debug;
	    var renderer = resume.renderer;
	    // debug.text("Currently in development. Please  use the right and left arrow keys to navigate.", 16, 16, style.blueGrey500[1])

	    debug.text('x: ' + Math.round(this.charge.x) + ' y: ' + Math.round(this.charge.y) + ', roundPixels ' + renderer.renderSession.roundPixels, 32, 32, 'black');
	  },
	  plotPath: function plotPath() {
	    var math = resume.math;
	    var width = resume.width;

	    var speed = 6;
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
	  },
	  createPanel: function createPanel(x, y, image, skill) {
	    var add = resume.add;

	    var PanelWidth = 500,
	        PanelHeight = 650,
	        PanelX = x,
	        PanelY = y;
	    add.sprite(PanelX, PanelY, image).scale.setTo(1.4);

	    var offset = 0;
	    pData.skills.levels.forEach(function (i) {
	      var levels = add.text(0, 0, i, style.levels);
	      levels.setTextBounds(PanelX + 220, PanelY - 240, offset += 300, PanelHeight);
	    });
	    var onset = 0;
	    skill.forEach(function (i) {
	      var levels = add.text(0, 0, i, style.skills);
	      levels.setTextBounds(PanelX + 150, PanelY + 75, PanelWidth, onset += 210);
	    });
	  },
	  skillOneBar: function skillOneBar(y1, l1, y2, l2, y3, l3, triggerY) {
	    var add = resume.add;

	    var vRadius = 9;

	    var alphaBmd = add.bitmapData(l1, vRadius * 6);
	    var bravoBmd = add.bitmapData(l2, vRadius * 6);
	    var charlieBmd = add.bitmapData(l3, vRadius * 6);
	    add.sprite(5160, y1, alphaBmd);
	    add.sprite(5160, y2, bravoBmd);
	    add.sprite(5160, y3, charlieBmd);

	    this.skillOneBar1 = this.horizBar(alphaBmd, style.yellow[1], l1, vRadius, triggerY);
	    this.skillOneBar2 = this.horizBar(bravoBmd, style.yellow[1], l2, vRadius, triggerY);
	    this.skillOneBar3 = this.horizBar(charlieBmd, style.yellow[1], l3, vRadius, triggerY);
	  },
	  skillTwoBar: function skillTwoBar(y1, l1, y2, l2, y3, l3, triggerY) {
	    var add = resume.add;

	    var vRadius = 9;

	    var alphaBmd = add.bitmapData(l1, vRadius * 6);
	    var bravoBmd = add.bitmapData(l2, vRadius * 6);
	    var charlieBmd = add.bitmapData(l3, vRadius * 6);
	    add.sprite(5160, y1, alphaBmd);
	    add.sprite(5160, y2, bravoBmd);
	    add.sprite(5160, y3, charlieBmd);

	    this.skillTwoBar1 = this.horizBar(alphaBmd, style.yellow[1], l1, vRadius, triggerY);
	    this.skillTwoBar2 = this.horizBar(bravoBmd, style.yellow[1], l2, vRadius, triggerY);
	    this.skillTwoBar3 = this.horizBar(charlieBmd, style.yellow[1], l3, vRadius, triggerY);
	  },
	  skillThreeBar: function skillThreeBar(y1, l1, y2, l2, y3, l3, triggerY) {
	    var add = resume.add;

	    var vRadius = 9;

	    var alphaBmd = add.bitmapData(l1, vRadius * 6);
	    var bravoBmd = add.bitmapData(l2, vRadius * 6);
	    var charlieBmd = add.bitmapData(l3, vRadius * 6);
	    add.sprite(5160, y1, alphaBmd);
	    add.sprite(5160, y2, bravoBmd);
	    add.sprite(5160, y3, charlieBmd);

	    this.skillThreeBar1 = this.horizBar(alphaBmd, style.yellow[1], l1, vRadius, triggerY);
	    this.skillThreeBar2 = this.horizBar(bravoBmd, style.yellow[1], l2, vRadius, triggerY);
	    this.skillThreeBar3 = this.horizBar(charlieBmd, style.yellow[1], l3, vRadius, triggerY);
	  },
	  horizBar: function horizBar(bmd, color, barWidth, radius, triggerY) {

	    var bp = 0,
	        speed = 0.4;

	    return function () {
	      var context = bmd.context;

	      context.lineJoin = "round";
	      context.lineWidth = radius;

	      if (bp < barWidth && this.charge.y > triggerY) {
	        context.strokeStyle = color;
	        context.strokeRect(0, radius / 2, bp, 5);
	        bp += resume.time.elapsedMS * speed;
	      }
	    };
	  },
	  createYellowCert: function createYellowCert(x, y, text) {
	    var keys = Object.keys(text);
	    var add = resume.add;

	    var certWidth = 950,
	        certHeight = 570,
	        certX = x,
	        certY = y;
	    var bmd = add.bitmapData(certWidth, certHeight);
	    bmd.copy('certMedium');
	    var sprite1 = add.sprite(certX, certY, bmd);
	    var title = add.text(0, 0, text.degreeTitle, style.degreeTitle);
	    title.setTextBounds(certX + 100, certY + 100, certWidth, certHeight);
	    var year = add.text(0, 0, text.year, style.year);
	    year.setTextBounds(certX - 98, certY + 100, certWidth, certHeight);

	    var bullets = void 0;
	    if (text.Specialization === undefined) {
	      bullets = add.text(0, 0, '\n•\t\t\t' + keys[2] + ':  ' + text.Institution, style.bullets);
	    } else {
	      bullets = add.text(0, 0, '\n•\t\t\t' + keys[2] + ':  ' + text.Institution + '\n\n•\t\t\t' + keys[3] + ': ' + text.Specialization, style.bullets);
	    }
	    bullets.setTextBounds(certX, certY, certWidth, certHeight);
	    this.createButton(certX, certY, 'verfiy this', 'yellowButton', 'http://www.google.com');
	  },
	  createBlueCert: function createBlueCert(x, y, text) {
	    var keys = Object.keys(text);
	    var add = resume.add;

	    var certWidth = 950,
	        certHeight = 600,
	        certX = x,
	        certY = y;
	    var bmd = add.bitmapData(certWidth, certHeight);
	    bmd.copy('certStriped');
	    var sprite1 = add.sprite(certX, certY, bmd);
	    var title = add.text(0, 0, 'Other Education', style.certifications);
	    title.setTextBounds(certX + 100, certY + 100, certWidth, certHeight);

	    var bullets = add.text(0, 0, '\n•\t\t\t' + keys[2] + ':  ' + text.Institution, style.bullets);
	    bullets.setTextBounds(certX - 30, certY - 90, certWidth, certHeight);
	    this.createButton(certX, certY, 'verfiy this', 'blueButton', 'http://www.google.com');
	  },
	  createButton: function createButton(x, y, label, image, url) {
	    var add = resume.add;

	    var buttonBmd = add.bitmapData(124, 52);
	    buttonBmd.shadow('rgba(0, 0, 0, 0.2)', 0.0001, 0.0001, 0.0001);
	    buttonBmd.copy(image);
	    add.button(x + 420, y + 440, buttonBmd, animate, this);
	    var text = add.text(x + 420 + 20, y + 440 + 12, label, { font: '20px lintelregular', fill: 'white' });

	    var i = 0;
	    function animate() {
	      var arr = [0.0001, 1, 2, 3, 4, 4, 3, 2, 1, 0.0001];
	      setTimeout(function () {
	        i++;
	        buttonBmd.clear();
	        buttonBmd.copy(image);
	        buttonBmd.shadow('rgba(0, 0, 0, 0.2)', arr[i], 0.0001, arr[i]);

	        if (i < arr.length) {
	          animate();
	        } else {
	          i = 1;
	          // ( ()=> window.location.href = url)()
	          buttonBmd.shadow('rgba(0, 0, 0, 0.2)', 0.0001, 0.0001, 0.0001);
	        }
	      }, 80);
	    }
	  }
	};

	var resume = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'resume', methods);

/***/ },
/* 1 */
/***/ function(module, exports) {

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
	  frontEnd: ['React', 'BootStrap', 'jQuery'],
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

	var formalEdu = exports.formalEdu = [{ 'degreeTitle': 'Web Application Engineer', 'year': 2016, 'Institution': 'Florida Vocational Institute', 'Specialization': 'Data Visualization' }, { 'degreeTitle': 'High School Diploma', 'year': 2006, 'Institution': 'Westchester Senior High' }];

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

/***/ },
/* 2 */
/***/ function(module, exports) {

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
	var levels = exports.levels = { font: "20px Roboto", fill: 'white', boundsAlignH: "center", boundsAlignV: "middle" };
	var skills = exports.skills = { font: "25px Roboto", fill: 'white', boundsAlignH: "left", boundsAlignV: "middle" };
	var degreeTitle = exports.degreeTitle = { font: "45px lintelregular", fill: yellow[1], boundsAlignH: "left", boundsAlignV: "top" };
	var certifications = exports.certifications = { font: "45px lintelregular", fill: blue[1], boundsAlignH: "left", boundsAlignV: "top" };
	var year = exports.year = { font: "45px lintelregular", fill: blueGrey600[1], boundsAlignH: "right", boundsAlignV: "top" };
	var bullets = exports.bullets = { font: "30px Roboto", fill: blueGrey600[1], boundsAlignH: "center", boundsAlignV: "middle" };

/***/ }
/******/ ]);