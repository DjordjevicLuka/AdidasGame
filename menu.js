var boy, girl, copa, x, nemesis, predator, chosenPlayer, chosenPower, playButt, full, copaShoe, predatorShoe, xShoe, nemesisShoe;
var playerChosen, headline, setheadline;
var butt = document.getElementsByTagName('button');
      for (let i = 0; i < butt.length; i++) {
        if(butt[i].id !== 'refresh' && butt[i].id !== 'new'){
          document.body.removeChild(butt[i]);
        }
      }
window.onclick = function(event) {
  var modal = document.getElementById('myModalInfo');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var Menu = function() {
  // Set the width and height of the scene.
  this._width = 1920;
  this._height = 1080;
  

  window.addEventListener('resize', function(){
    this.resize();
  }.bind(this), false);

  window.addEventListener('orientationchange', this.orientation.bind(this), false);
  
  // Setup the rendering surface.
  this.renderer = new PIXI.CanvasRenderer(this._width, this._height, null, true);
  document.body.appendChild(this.renderer.view);

  // Create the main stage to draw on.
  this.stage = new PIXI.Container();

  // Start running the game.
  PIXI.loader
    .add("sprite.json",)
    .load(() => this.build());
};

Menu.prototype = {
  /**
   * Build the scene and begin animating.
   */
  build: function() {
    this.resize();

    this.orientation();
  },

  /**
   * Draw Background behind all of the action.
   */
  drawBackground: function() {
    var field = new PIXI.Sprite.fromImage("field.png");
    field.width = this._width;
    field.height = this._height;
    this.stage.addChild(field);
  },

  createLogo: function() {
    var sv = new PIXI.Sprite.fromImage('svBijeli.png');
    sv.x = this._width - 270;
    sv.y = this._height/2 + 10;
    sv.scale.x = .12;
    sv.scale.y = .12;
    this.stage.addChild(sv);
    var svLeft = new PIXI.Sprite.fromImage('svBijeli.png');
    svLeft.x = this._width/16 -110;
    svLeft.y = this._height/2 + 10;
    svLeft.scale.x = .12;
    svLeft.scale.y = .12;
    this.stage.addChild(svLeft);
    var adidas = new PIXI.Sprite.fromImage('adidasLogo.png');
    adidas.x = this._width/2 -105;
    adidas.y = 215;
    adidas.scale.x = .3;
    adidas.scale.y = .3;
    this.stage.addChild(adidas);
  },

  createHeadline: function(font) {
    this.setheadline = new PIXI.Text('Odaberi igrača', {
      fontFamily: 'Arial',
      fontSize: font,
      fontWeight: 'bold',
      fill: 'white',
      align: 'center'
    });
    this.setheadline.x = 750;
    this.setheadline.y = 50;
    this.stage.addChild(this.setheadline);
  },

  createBoy: function() {
    this.sheet = PIXI.loader.resources["sprite.json"].spritesheet;
    this.boy = new PIXI.extras.AnimatedSprite(this.sheet.animations["BoyIdle"]);
    this.boy.x = this._width/3;
    this.boy.y = this._height/3.05 -50;
    this.boy.animationSpeed = 0.1; 
    this.boy.play();
    this.boy.scale.x = 1.5;
    this.boy.scale.y = 1.5;
    this.boy.buttonMode = true;
    this.boy.interactive = true;
    this.boy.on('pointerdown', () => this.renderBoy(), false);
    this.boy.on('touchstart', () => this.renderBoy(), false);
    this.stage.addChild(this.boy);
  },

  createGirl: function() {
    this.girl = new PIXI.extras.AnimatedSprite(this.sheet.animations["GirlIdle"]);
    this.girl.x = this._width/2;
    this.girl.y = this._height/3.5 -50;
    this.girl.animationSpeed = 0.1; 
    this.girl.play();
    this.girl.scale.x = .6;
    this.girl.scale.y = .6;
    this.girl.buttonMode = true;
    this.girl.interactive = true;
    this.girl.on('pointerdown', () => this.renderGirl(), false);
    this.girl.on('touchstart', () => this.renderGirl(), false);
    this.stage.addChild(this.girl);
  },

  renderBoy: function() {
    this.boy.scale.x = 2;
    this.boy.scale.y = 2;
    this.chosenPlayer = 'Boy';
    this.girl.scale.x = 0.6;
    this.girl.scale.y = 0.6;
  },

  renderGirl: function() {
    this.girl.scale.x = .76;
    this.girl.scale.y = .76;
    this.chosenPlayer = 'Girl';
    this.boy.scale.x = 1.5;
    this.boy.scale.y = 1.5;
  },

  createCopa: function() {
    var texture = PIXI.Texture.fromImage("copa.png");
    this.copa = new PIXI.Sprite(texture);
    this.copa.scale.x = .6;
    this.copa.scale.y = .6;
    this.copa.y = this._height/7 + 500;
    this.copa.x = this._width/10;
    this.copa.buttonMode = true;
    this.copa.interactive = true;
    this.copa.on('pointerdown', () => this.renderCopa());
    this.stage.addChild(this.copa);
  },

  renderCopa: function() {
    if (this.chosenPower !== 'copa') {
    this.chosenPower = 'copa';
        var texture = PIXI.Texture.fromImage("copaShoe.png");
        this.copaShoe = new PIXI.Sprite(texture);
        this.copaShoe.y = this._height/7 + 350;
        this.copaShoe.x = this._width/10;
        this.copaShoe.scale.x = 0.2;
        this.copaShoe.scale.y = 0.2;
        this.stage.addChild(this.copaShoe);
        this.stage.removeChild(this.predatorShoe);
        this.stage.removeChild(this.nemesisShoe);
        this.stage.removeChild(this.xShoe);
      }
  },

  renderX: function() {
    if(this.chosenPower !== 'x') {
      this.chosenPower = 'x';
      this.xShoe = new PIXI.Sprite.fromImage('xShoe.png');
      this.xShoe.y = this._height/7 + 350;
      this.xShoe.x = this._width - 780;
      this.xShoe.scale.x = 0.2;
      this.xShoe.scale.y = 0.2;
      this.stage.addChild(this.xShoe);
      this.stage.removeChild(this.predatorShoe);
      this.stage.removeChild(this.nemesisShoe);
      this.stage.removeChild(this.copaShoe);
    }
  },

  renderPredator: function() {
      if(this.chosenPower !== 'predator') {
        this.chosenPower = 'predator';
        this.predatorShoe = new PIXI.Sprite.fromImage('predatorShoe.png');
        this.predatorShoe.y = this._height/7 + 350;
        this.predatorShoe.x = this._width/2 + 450;
        this.predatorShoe.scale.x = 0.2;
        this.predatorShoe.scale.y = 0.2;
        this.stage.addChild(this.predatorShoe);
        this.stage.removeChild(this.copaShoe);
        this.stage.removeChild(this.nemesisShoe);
        this.stage.removeChild(this.xShoe);
      }
  },

  renderNemesis: function() {
    if(this.chosenPower !== 'nemesis') {
      this.chosenPower = 'nemesis';
      this.nemesisShoe = new PIXI.Sprite.fromImage('nemesisShoe.png');
      this.nemesisShoe.y = this._height/7 + 350;
      this.nemesisShoe.x = this._width/4 + 250;
      this.nemesisShoe.scale.x = 0.2;
      this.nemesisShoe.scale.y = 0.2;
      this.stage.addChild(this.nemesisShoe);
      this.stage.removeChild(this.predatorShoe);
      this.stage.removeChild(this.copaShoe);
      this.stage.removeChild(this.xShoe);
      }
  },

  createNemesis: function() {
    this.nemesis = new PIXI.Sprite.fromImage('nemesis.png');
    this.nemesis.scale.x = .8;
    this.nemesis.scale.y = .8;
    this.nemesis.y = this._height/7 +  485;
    this.nemesis.x = this._width/4 + 80;
    this.nemesis.buttonMode = true;
    this.nemesis.interactive = true;
    this.nemesis.on('pointerdown', () => this.renderNemesis());
    this.stage.addChild(this.nemesis);
  },

  createX: function() {
    this.x = new PIXI.Sprite.fromImage('x.png');
    this.x.scale.x = .6;
    this.x.scale.y = .6;
    this.x.y = this._height/7 + 500;
    this.x.x = this._width/2 + 260;
    this.x.buttonMode = true;
    this.x.interactive = true;
    this.x.on('pointerdown', () => this.renderX());
    this.stage.addChild(this.x);
  },

  createPredator: function() {
    this.predator = new PIXI.Sprite.fromImage('predator.png');
    this.predator.scale.x = .6;
    this.predator.scale.y = .6;
    this.predator.y = this._height/6 + 490;
    this.predator.x = this._width/2 + 420;
    this.predator.buttonMode = true;
    this.predator.interactive = true;
    this.predator.on('pointerdown', () => this.renderPredator());
    this.stage.addChild(this.predator);
  },

  createPlayButt: function() {
    this.playButt = new PIXI.Sprite.fromImage('play.png');
    this.playButt.x = this._width/2;
    this.playButt.y = this._height - 250;
    this.playButt.scale.x = 1.6;
    this.playButt.scale.y = 1.6;
    this.playButt.buttonMode = true;
    this.playButt.interactive = true;
    this.playButt.on('pointerdown', () => this.startGame());
    this.stage.addChild(this.playButt);
  },

  createInfo: function() {
    this.info = new PIXI.Sprite.fromImage('info.png');
    this.info.x = this._width/2 + 720;
    this.info.y = this._height/6 -110;
    this.info.scale.x = 1.6;
    this.info.scale.y = 1.6;
    this.info.buttonMode = true;
    this.info.interactive = true;
    this.info.on('pointerdown', () => this.displayInfo());
    this.stage.addChild(this.info);
  },

  createFullScreen: function() {
    this.full = new PIXI.Sprite.fromImage('full.png');
    this.full.x = this._width/2 + 720;
    this.full.y = this._height/5;
    this.full.scale.x = 1.6;
    this.full.scale.y = 1.6;
    this.full.buttonMode = true;
    this.full.interactive = true;
    this.full.on('pointerdown', function(){
      if(document.fullscreenElement === null){
        document.body.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
    this.stage.addChild(this.full);
  },

  createVolumeScreen: function() {
    this.stage.removeChild(this.volumeIcon);
    window.volume = 0.7
    this.volumeIcon = new PIXI.Sprite.fromImage('volumeUp.png');
    this.volumeIcon.x = this._width/2 + 720;
    this.volumeIcon.y = this._height/3;
    this.volumeIcon.scale.x = 1.6;
    this.volumeIcon.scale.y = 1.6;
    this.volumeIcon.buttonMode = true;
    this.volumeIcon.interactive = true;
    this.stage.addChild(this.volumeIcon);
    this.volumeIcon.on('pointerdown', function(){
      if (window.volume === 0.7) {
        this.stage.removeChild(this.volumeIcon);
        this.volumeIcon = new PIXI.Sprite.fromImage('volumeOff.png');
        this.volumeIcon.x = this._width/2 + 720;
        this.volumeIcon.y = this._height/3;
        this.volumeIcon.scale.x = 1.6;
        this.volumeIcon.scale.y = 1.6;
        this.volumeIcon.buttonMode = true;
        this.volumeIcon.interactive = true;
        this.volumeIcon.on('pointerdown', () => this.createVolumeScreen())
        this.stage.addChild(this.volumeIcon);
        window.volume = 0;
      }
      }.bind(this));
  },

  displayInfo: function() {
    var modal = document.getElementById('myModalInfo0');
      modal.style.display = "block";
  },

  endVideo: function() {
    window.gender = this.chosenPlayer;
    window.ultimate = this.chosenPower;
    var video = document.getElementById('video');
    frame.src = ""
      video.style.display = 'none';
    this.createHeadline(120);
    this.setheadline.y = this.setheadline.y + 700;
    this.setheadline.x = this.setheadline.x -370;
    this.setheadline.text = 'Tvoja igra počinje za:'
    setTimeout(() => {
    this.setheadline.x = this.setheadline.x  + 570;
    this.setheadline.text = '3'
      setTimeout(() => {
      this.setheadline.text = '2'
        setTimeout(() => {
      this.setheadline.text = '1'
          setTimeout(() => {
            var canvas = document.getElementsByTagName('canvas');
    var butt = document.getElementsByTagName('button');
      for (let i = 0; i < butt.length; i++) {
        if(butt[i].id !== 'refresh' && butt[i].id !== 'new'){
          document.body.removeChild(butt[i]);
        }
      }
    PIXI.loader.resources = {}
    this.renderer.destroy({removeView:true, stageOptions:true});
    this.game = null;
    this.game = new Game();
    this.playerChosen = 'unchosen'
    return this.renderer = new PIXI.CanvasRenderer();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  },

  startGame: function() {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (this.playerChosen === 'unchosen') {

      this.setheadline.text = 'Odaberi svoju kopačku'
      this.setheadline.x = 600;

      this.renderCopa()

      this.createCopa();

      this.createNemesis();
  
      this.createX();
  
      this.createPredator();
      
      this.stage.removeChild(this.girl);
      
      this.stage.removeChild(this.boy);
      this.playerChosen = 'start';
      } else if(this.playerChosen === 'start') {
        if(!iOS){
          document.body.requestFullscreen();          
        }
        this.stage.removeChildren();
        this.drawBackground();
        var video = document.getElementById('video');
        video.style.display = 'block';
        var frame = document.getElementById('frame');
        switch (this.chosenPower) {
          case this.chosenPower = 'copa':
          frame.src = "https://www.youtube.com/embed/yJLjUQFrOUE?autoplay=1";
          break;
          case this.chosenPower = 'nemesis':
          frame.src= "https://www.youtube.com/embed/gGTqIlVjne8?autoplay=1";
          break;
          case this.chosenPower = 'predator':
          frame.src= "https://www.youtube.com/embed/nq5P2HTnF40?autoplay=1";
          break;
          case this.chosenPower = 'x':
          frame.src= "https://www.youtube.com/embed/AZDhQpIhqdQ?autoplay=1";
          break;
          default:
            break;
        }
    }
  },

  resize: function() {
    var ratio = 1080/1920;
    var docWidth = window.innerWidth;
    var docHeight = window.innerHeight;

    if(docHeight / docWidth < ratio) {
      this.renderer.view.style.width = 'auto';
      this.renderer.view.style.height = '100%';
    } else {
      this.renderer.view.style.width = '100%';
      this.renderer.view.style.height = 'auto';
    }
  },

  orientation: function() {
    setTimeout(function() {
      var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if(!iOS) {
        var w = screen.width;
        var h = screen.height;
      }else {
        var w = window.innerWidth;
      var h = window.innerHeight;
      }

      // Update the display based on orientation.
      if (w < h) {
        
        this.stage.removeChildren();
        this.setScore = new PIXI.Text('Zarotirajte ekran', {
          fontFamily: 'Arial',
          fontSize: 120,
          fontWeight: 'bold',
          fill: 'white',
          align: 'left',
          wordWrap : true,
          wordWrapWidth: 200
        });
        this.setScore.x = 800;
        this.setScore.y = 500;
        this.stage.addChild(this.setScore);
        this.renderer.render(this.stage);

      } else {
        this.resize();
        this.playerChosen  = 'unchosen';
        window.volume = 0;
        window.isPlaying = false  
        this.drawBackground();
    
        this.createBoy();
    
        this.createGirl();

        this.renderBoy();
    
        this.createFullScreen();
    
        this.createVolumeScreen();
        
        this.createLogo();
    
        this.createInfo();
    
        this.createPlayButt();
    
        this.createHeadline(56)
    
        // Begin the first frame.
        this.continuePlaying();
      }
    }.bind(this), 0);
  },

  continuePlaying: function() {
    if(!window.isPlaying) {
      requestAnimationFrame(this.tick.bind(this));
    }
  },

  /**
   * Fires at the end of the gameloop to reset and redraw the canvas.
   */
  tick: function() {
    // Render the stage for the current frame.
    this.renderer.render(this.stage);
    // Begin the next frame.
    this.continuePlaying();
  }
};