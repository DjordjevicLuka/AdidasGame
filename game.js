var player, playerGraphics, playerShape, isPlaying, score, setScore, toucheMove, sheet, timer, removableObjs,
    power, powerOn, ballBodies, ballGraphics, removeBalls, left, right, gender, ultimate, ultimateImg, destroyable, circle,
    direction, collision, start, ballTime, like1, sv, adidas, adidasLeft, like2, like3, rectLeft, rectRight, field;
window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var Game = function() {
  // Set the width and height of the scene.
  this._width = 1920;
  this._height = 1080;

  window.addEventListener('resize', function(){
    this.resize();
  }.bind(this), false);

  window.addEventListener('orientationchange', this.orientation.bind(this), false);

  this.collision = false;
  window.score = 0;
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  // window.ultimate = localStorage.getItem('chosenPower');
  window.ultimateImg = window.ultimate+'Shoe.png';


  // Setup the rendering surface.
  this.renderer = new PIXI.CanvasRenderer(this._width, this._height, {clearBeforeRender: true});
  document.body.appendChild(this.renderer.view);

  // Create the main stage to draw on.
  this.stage = new PIXI.Container();
  this.stage.interactive = true;


  // Setup physics
  this.world = new p2.World({
    gravity: [0,50]
  });  

  this.speed = 100000;
  this.timer = 2000;
  this.ballTime = 1000;
  this.destroyable = true;
  this.powerOn = false;
  this.direction = false;

  window.addEventListener('keydown', function(event) {
    if(!this.collision){
    this.handleKeys(event.keyCode, true)
    }
  }.bind(this), false);

  window.addEventListener('keyup', function(event) {
    this.handleKeysUp(event.keyCode, true)
  }.bind(this), false);

  window.enemyBodies = [];
  window.enemyGraphics = [];
  window.ballBodies = [];
  window.ballGraphics = [];
  window.removableObjs = [];

  // Start running the game.
    PIXI.loader
    .add("sprite.json",)
    .load(() => this.build());  
};

Game.prototype = {
  /**
   * Build the scene and begin animating.
   */
  build: function() {
    // Set game resolution
    this.resize()
    
    this.orientation();
    
    // Set game background
  },

  /**
   * Draw the field of stars behind all of the action.
   */
  drawStars: function() {
    // Draw randomly positioned stars.
    this.field = new PIXI.Sprite.fromImage("field.png");
    this.field.width = this._width;
    this.field.height = this._height;
      // Attach the star to the stage.
      this.stage.addChild(this.field);
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

  createCharacter: function() {
    // Create character object
    this.player = new p2.Body({
      mass: 1,
      angularVelocity: 1,
      damping: 1,
      angularDamping: 1,
      position: [Math.round(this._width / 2), Math.round(this._height)]
    });
    this.playerShape = new p2.Box({width: 100, height: 220});
    this.player.addShape(this.playerShape);
    this.world.addBody(this.player);
    this.sheet = PIXI.loader.resources["sprite.json"].spritesheet;

    // Render stripe for player anmation
    this.playerGraphics = new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "Idle"]);
    this.playerGraphics.anchor.set(0.5);
    this.playerGraphics.animationSpeed = 0.1; 
    this.playerGraphics.play();
    switch (window.gender) {
      case window.gender = 'Boy':
        this.playerGraphics.scale.x = 1;
        this.playerGraphics.scale.y = 1;
        break;
      case window.gender = 'Girl':
        this.playerGraphics.scale.x = .4;
        this.playerGraphics.scale.y = .4;
        break;
      default:
        break;
    }
    
    this.stage.addChild(this.playerGraphics);

    this.world.on('beginContact', function(event){
      if (event.bodyA.id === this.player.id && event.bodyB.id === 'enemy' && this.destroyable === true) {
        this.collision = true;        
        this.direction ? this.youDeadLeft() : this.youDead();
        this.sounds.play('whistle');
        setTimeout(() => {
        window.isPlaying = false;          
        }, 500);
      } else if (event.bodyA.id === this.player.id && event.bodyB.id === 'ball') {
            window.score ++;
            this.setScore.text = 'Rezultat: ' + window.score;
            this.setScore.style.fontSize = 120;
            setTimeout(() => {
            this.setScore.style.fontSize = 36;              
            }, 100);
            // Remove ball from stage on contact
            for (i=0; i<window.ballGraphics.length; i++) {
              if (event.bodyB.position[0] === window.ballGraphics[i].x && event.bodyB.position[1] === window.ballGraphics[i].y) {
                this.stage.removeChild(window.ballGraphics[i])
                window.ballGraphics.splice(i,1);
                this.world.removeBody(event.bodyB);
                window.ballBodies.splice(i,1);
              }
            }
            this.sounds.play('ball1');
          }
    }.bind(this));
  },

  createPower: function() {
    switch (window.ultimate) {
      case window.ultimate === 'x':
    window.ultimateImg = 'xShoe.png';
        break;
      case window.ultimate === 'copa':
    window.ultimateImg = 'copaShoe.png';
        break;
      case window.ultimate === 'predator':
    window.ultimateImg = 'predatorShoe.png';
        break;
      case window.ultimate === 'nemesis':
    window.ultimateImg = 'nemesisShoe.png';
        break;
      default:
        break;
    }
    this.power = new PIXI.Sprite.fromImage(window.ultimateImg);
    this.power.scale.x = 0.2;
    this.power.scale.y = 0.2;
    this.power.x = this._width - 350;
    this.power.y = this._height/4-200;
    this.power.buttonMode = true;
    this.power.interactive = true;

    // Add event listeners to power
    this.power.on('pointerdown', () => this.choosePower(), false);
    // this.power.on('touchstart', () => this.choosePower(), false);


    // Add power to the game scene
    this.stage.addChild(this.power);
  },

  createLeftSteer: function() {
    this.left = new PIXI.Sprite.fromImage("left.png");
    this.left.scale.x = 4;
    this.left.scale.y = 4;
    this.rectLeft = new PIXI.Graphics();
          this.rectLeft.lineStyle(0);
          this.rectLeft.beginFill(0xFFFF0B, 0);
          this.rectLeft.drawRect(0,400, 300, 800);
          this.rectLeft.endFill();
          this.stage.addChild(this.rectLeft);
    // if (document.body.clientWidth > 980){
    // this.left.x = 170;
    // } else {
    this.left.x = -50;
    // }
    this.left.y = this._height/2.5;
    this.rectLeft.buttonMode = true;
    this.rectLeft.interactive = true;

    // Add event listeners to left
    this.rectLeft.on('pointerdown', () => this.handleKeys(37, true), false);
    this.rectLeft.on('pointerup', () => this.handleKeys(37, false), false);

    // Add left to the game scene
    this.rectLeft.addChild(this.left);
  },

  createRightSteer: function() {
    this.right = new PIXI.Sprite.fromImage("right.png");
    this.right.scale.x = 4;
    this.right.scale.y = 4;
    this.right.x = this._width - 320;
    this.right.y = this._height/2.5;

    this.rectRight = new PIXI.Graphics();
    this.rectRight.lineStyle(0);
    this.rectRight.beginFill(0xFFFF0B, 0);
    this.rectRight.drawRect(1620,400, 300, 800);
    this.rectRight.endFill();
    this.stage.addChild(this.rectRight);

    this.rectRight.buttonMode = true;
    this.rectRight.interactive = true;

    

    // Add event listeners to right
    this.rectRight.on('pointerdown', () => this.handleKeys(39, true));
    this.rectRight.on('pointerup', () => this.handleKeys(39, false));

    // Add right to the game scene
    this.rectRight.addChild(this.right);
  },

  createEnemies: function() {
    // Create random interval to generate new enemies.
    this.enemyTimer = setInterval(function() {
      // Create the enemy physics body
      var x = Math.round(Math.random() * this._width);
      var enemy = new p2.Body({
        position: [x, -100],
        mass: 1,
        damping: 0,
        angularDamping: 1,
        velocity: [200, 0],
        id: 'enemy'
      });
      var enemyShape = new p2.Box({width: 100, height: 140});
      enemyShape.sensor = true;
      enemy.addShape(enemyShape);
      this.world.addBody(enemy);

      // Create Graphics object
      var texture = PIXI.Texture.fromImage("slideBoy.png");
      var enemyGraphics = new PIXI.Sprite(texture);
      enemyGraphics.anchor.set(0.5);
      enemyGraphics.scale.x = 0.8;
      enemyGraphics.scale.y = 0.8;
      enemyGraphics.x = x;
      enemyGraphics.y = 0;

      // Add enemy to the game scene
      this.stage.addChild(enemyGraphics);

      // Keep track of enemies
      window.enemyBodies.push(enemy);
      window.enemyGraphics.push(enemyGraphics);
      if (this.world.gravity[1] <= 1200) {
        this.world.gravity[1]+=10;
      }
    }.bind(this), this.timer + 300);
    
    // Listen for contact between enemy and player
    this.world.on('beginContact', function(event){
      if (event.bodyB.id === this.player.id && event.bodyA.id === 'enemy' && this.destroyable === true) {
        this.collision = true;        
        this.direction ? this.youDeadLeft() : this.youDead();
        this.sounds.play('whistle');
        setTimeout(() => {
        window.isPlaying = false;          
        }, 500);
      }
    }.bind(this));
  },

  createEnemiesLeft: function() {
    // Create random interval to generate new enemies.
    this.enemyLeftTimer = setInterval(function() {
      // Create the enemyLeft physics body
      var x = Math.round(Math.random() * this._width);
      var enemyLeft = new p2.Body({
        position: [x, -100],
        mass: 1,
        damping: 0,
        angularDamping: 1,
        velocity: [-200, 0],
        id: 'enemy'
      });
      var enemyLeftShape = new p2.Box({width: 100, height: 140});
      enemyLeftShape.sensor = true;
      enemyLeft.addShape(enemyLeftShape);
      this.world.addBody(enemyLeft);

      // Create Graphics object
      var texture = PIXI.Texture.fromImage("slideBoyleft.png");
      var enemyLeftGraphics = new PIXI.Sprite(texture);
      enemyLeftGraphics.anchor.set(0.5);
      enemyLeftGraphics.scale.x = 0.8;
      enemyLeftGraphics.scale.y = 0.8;
      enemyLeftGraphics.x = x;
      enemyLeftGraphics.y = 0;

      // Add enemyLeft to the game scene
      this.stage.addChild(enemyLeftGraphics);

      // Keep track of enemies
      window.enemyBodies.push(enemyLeft);
      window.enemyGraphics.push(enemyLeftGraphics);
    }.bind(this), this.timer + 300);
    
    // Listen for contact between enemy and player
    this.world.on('beginContact', function(event){
      if (event.bodyB.id === this.player.id && event.bodyA.id === 'enemy' && this.destroyable === true) {
        this.collision = true;       
        this.direction? this.youDeadLeft() : this.youDead();
        this.sounds.play('whistle');
        setTimeout(() => {
        window.isPlaying = false;          
        }, 500);
      }
    }.bind(this));
  },

  createGoals: function() {
    // Create random interval to generate new enemies.
    this.goalTimer = setInterval(function() {
      // Create the goal physics body
      var x = Math.round(Math.random() * this._width);
      var goal = new p2.Body({
        position: [x, -100],
        mass: 1,
        damping: 0,
        angularDamping: 1,
        velocity: [1, 1],
        // angularVelocity: 0
        id: 'enemy'
      });
      var goalShape = new p2.Box({width: 220, height: 70});
      goalShape.sensor = true;
      goal.addShape(goalShape);
      this.world.addBody(goal);

      // Create Graphics object
      var texture = PIXI.Texture.fromImage("goal.png");
      var goalGraphics = new PIXI.Sprite(texture);
      goalGraphics.anchor.set(0.5, .7);
      goalGraphics.scale.x = 0.1;
      goalGraphics.scale.y = 0.1;
      goalGraphics.x = x;
      goalGraphics.y = 0;

      // Add goal to the game scene
      this.stage.addChild(goalGraphics);

      // Keep track of enemies
      window.enemyBodies.push(goal);
      window.enemyGraphics.push(goalGraphics);
    }.bind(this), this.timer + 300);
    
    // Listen for contact between enemy and player
    this.world.on('beginContact', function(event){
      if (event.bodyB.id === this.player.id && event.bodyA.id === 'enemy' && this.destroyable === true) {
        this.collision = true;       
        this.direction? this.youDeadLeft() : this.youDead();
        this.sounds.play('whistle');
        setTimeout(() => {
        window.isPlaying = false;          
        }, 500);
      }
    }.bind(this));
  },

  createCards: function() {
    // Create random interval to generate new enemies.
    this.cardTimer = setInterval(function() {
      // Create the card physics body
      var x = Math.round(Math.random() * this._width);
      var card = new p2.Body({
        position: [x, -100],
        mass: 1,
        damping: 0,
        angularDamping: 1,
        velocity: [1, 1],
        // angularVelocity: 0
        id: 'enemy'
      });
      var cardShape = new p2.Box({width: 20, height: 30});
      cardShape.sensor = true;
      card.addShape(cardShape);
      this.world.addBody(card);

      // Create Graphics object
      var texture = PIXI.Texture.fromImage("redCard.png");
      var cardGraphics = new PIXI.Sprite(texture);
      cardGraphics.anchor.set(0.5, 1.1);
      cardGraphics.scale.x = 0.3;
      cardGraphics.scale.y = 0.3;
      cardGraphics.x = x;
      cardGraphics.y = 0;

      // Add card to the game scene
      this.stage.addChild(cardGraphics);

      // Keep track of enemies
      window.enemyBodies.push(card);
      window.enemyGraphics.push(cardGraphics);
      this.timer > 100 ? this.timer-=5: '';

    }.bind(this), this.timer);
    
    // Listen for contact between enemy and player
    this.world.on('beginContact', function(event){
      if (event.bodyB.id === this.player.id && event.bodyA.id === 'enemy' && this.destroyable === true) {
        this.collision = true;       
        this.direction? this.youDeadLeft() : this.youDead();
        this.sounds.play('whistle');
        setTimeout(() => {
        window.isPlaying = false;          
        }, 500);
      }
    }.bind(this));
  },

  createBalls: function() {
    // Create random interval to generate new enemies.
    this.ballTimer = setInterval(function() {
      // Create the ball physics body
      var x = Math.round(Math.random() * this._width);
      var ball = new p2.Body({
        position: [x, -100],
        mass: 100,
        damping: 0,
        angularDamping: 0,
        velocity: [1, 500],
        // angularVelocity: 0
        id: 'ball'
      });
      var ballShape = new p2.Circle({radius: 20});
      ballShape.sensor = true;
      ball.addShape(ballShape);
      this.world.addBody(ball);

      // Create Graphics object
      var texture = PIXI.Texture.fromImage("ball.png");
      var ballGraphics = new PIXI.Sprite(texture);
      ballGraphics.anchor.set(0.5, 2.3);
      ballGraphics.scale.x = 0.2;
      ballGraphics.scale.y = 0.2;
      ballGraphics.x = x;
      ballGraphics.y = 0;

      this.stage.addChild(ballGraphics);

      // Keep track of balls

      window.ballBodies.push(ball);
      window.ballGraphics.push(ballGraphics);
    }.bind(this), this.ballTime);
    
    // Listen for contact between ball and player
    this.world.on('beginContact', function(event){
      if (event.bodyB.id === this.player.id && event.bodyA.id === 'ball') {
        window.score ++;
        this.setScore.text = 'Rezultat: ' + window.score;
        this.setScore.style.fontSize = 120;
            setTimeout(() => {
            this.setScore.style.fontSize = 36;              
            }, 100);
        // Remove ball from stage on contact
        for (i=0; i<window.ballGraphics.length; i++) {
          if (event.bodyA.position[0] === window.ballGraphics[i].x && event.bodyA.position[1] === window.ballGraphics[i].y) {
            this.stage.removeChild(window.ballGraphics[i])
            window.ballGraphics.splice(i,1);
            this.world.removeBody(event.bodyA);
            window.ballBodies.splice(i,1);
          }
        }
        this.sounds.play('ball1');
      }
    }.bind(this));
  },

  handleKeys: function(code, state) {
    switch (code) {
      case 37:
        if (!this.collision) {
          this.keyLeft = state;
          this.direction = true;
          this.animatePlayerLeft();
        } else {
          this.youDeadLeft();
          this.speed = 0;
        }
        break;
      case 39:
        if (!this.collision) {
          this.keyRight = state;
          this.direction = false;
          this.animatePlayerRight();
        } else {
          this.keyRight = false;
          this.youDead();
          this.speed = 0;
        }       
        break;
        case 32:
        this.choosePower();
        break;
      default:
        break;
    }
  },

  handleKeysUp: function(code, state) {
    switch (code) {
      case 37:
        if(this.collision) {
          this.youDeadLeft();
          this.speed = 0;
        } else {
          this.keyLeft = false;
          this.stopAnimationLeft();
        }
        break;
      case 39:
      if(this.collision) {
        this.youDead();
        this.speed = 0;
      } else {
        this.keyRight = false;
        this.stopAnimation();
      }
        break;
      default:
        break;
    }
  },

  animatePlayerLeft: function() {
    if (this.playerGraphics !== new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "RunLeft"]))
    this.stage.removeChild(this.playerGraphics)
    if(!this.collision) {
      this.playerGraphics = new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "RunLeft"]);
    } else {
      this.playerGraphics = new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "FaintLeft"]);
    }
    this.playerGraphics.animationSpeed = 0.2; 
    this.playerGraphics.play();
    this.playerGraphics.anchor.set(0.5);
    switch (window.gender) {
      case window.gender = 'Boy':
        this.playerGraphics.scale.x = 1;
        this.playerGraphics.scale.y = 1;
        break;
      case window.gender = 'Girl':
        this.playerGraphics.scale.x = .4;
        this.playerGraphics.scale.y = .4;
        break;
      default:
        break;
    }
    this.stage.addChild(this.playerGraphics);
  },

  animatePlayerRight: function() {
    if (this.playerGraphics !== new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "RunRight"]) && !this.collision)
    this.stage.removeChild(this.playerGraphics)
    this.playerGraphics = new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "RunRight"]);
    this.playerGraphics.animationSpeed = 0.2; 
    this.playerGraphics.play();
    this.playerGraphics.anchor.set(0.5);
    switch (window.gender) {
      case window.gender = 'Boy':
        this.playerGraphics.scale.x = 1;
        this.playerGraphics.scale.y = 1;
        break;
      case window.gender = 'Girl':
        this.playerGraphics.scale.x = .4;
        this.playerGraphics.scale.y = .4;
        break;
      default:
        break;
    }
    this.stage.addChild(this.playerGraphics);
  },

  stopAnimation: function() {
    if (this.playerGraphics !== new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "Idle"]))
    this.stage.removeChild(this.playerGraphics)
    this.playerGraphics = new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "Idle"]);
    this.playerGraphics.animationSpeed = 0.1; 
    this.playerGraphics.play();
    this.playerGraphics.anchor.set(0.5);
    switch (window.gender) {
      case window.gender = 'Boy':
        this.playerGraphics.scale.x = 1;
        this.playerGraphics.scale.y = 1;
        break;
      case window.gender = 'Girl':
        this.playerGraphics.scale.x = .4;
        this.playerGraphics.scale.y = .4;
        break;
      default:
        break;
    }
    this.stage.addChild(this.playerGraphics);
  },

  stopAnimationLeft: function() {
    if (this.playerGraphics !== new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "IdleLeft"]))
    this.stage.removeChild(this.playerGraphics)
    this.playerGraphics = new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "IdleLeft"]);
    this.playerGraphics.animationSpeed = 0.1; 
    this.playerGraphics.play();
    this.playerGraphics.anchor.set(0.5);
    switch (window.gender) {
      case window.gender = 'Boy':
        this.playerGraphics.scale.x = 1;
        this.playerGraphics.scale.y = 1;
        break;
      case window.gender = 'Girl':
        this.playerGraphics.scale.x = .4;
        this.playerGraphics.scale.y = .4;
        break;
      default:
        break;
    }
    this.stage.addChild(this.playerGraphics);
  },

  youDeadLeft: function() {
    if (this.playerGraphics !== new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "FaintLeft"]))
    this.stage.removeChild(this.playerGraphics)
    this.playerGraphics = new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "FaintLeft"]);
    this.playerGraphics.animationSpeed = 0.1; 
    this.playerGraphics.play();
    this.playerGraphics.anchor.set(0.5);
    switch (window.gender) {
      case window.gender = 'Boy':
        this.playerGraphics.scale.x = 1;
        this.playerGraphics.scale.y = 1;
        break;
      case window.gender = 'Girl':
        this.playerGraphics.scale.x = .4;
        this.playerGraphics.scale.y = .4;
        break;
      default:
        break;
    }
    this.stage.addChild(this.playerGraphics);
  },

  youDead: function() {
    if (this.playerGraphics !== new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "Faint"]))
    this.stage.removeChild(this.playerGraphics)
    this.playerGraphics = new PIXI.extras.AnimatedSprite(this.sheet.animations[window.gender + "Faint"]);
    this.playerGraphics.animationSpeed = 0.1; 
    this.playerGraphics.play();
    this.playerGraphics.anchor.set(0.5);
    switch (window.gender) {
      case window.gender = 'Boy':
        this.playerGraphics.scale.x = 1;
        this.playerGraphics.scale.y = 1;
        break;
      case window.gender = 'Girl':
        this.playerGraphics.scale.x = .4;
        this.playerGraphics.scale.y = .4;
        break;
      default:
        break;
    }
    this.stage.addChild(this.playerGraphics);
  },

  slowEnemies: function() {
    this.world.gravity[1] = this.world.gravity[1]/2;
  },

  destroyEnemies: function() {
      window.removableObjs = window.enemyBodies;
      for (i=0; i<window.removableObjs.length; i++) {
        var index = window.enemyBodies.indexOf(window.removableObjs[i]);
        if (index) {
          this.stage.removeChild(window.enemyGraphics[index]);
          window.enemyGraphics.splice(index,1);
          this.world.removeBody(window.enemyBodies[index]);
          window.enemyBodies.splice(index,1);
        }
      }
      window.removableObjs = [];
  },

  choosePower: function() {
    if (!this.powerOn) {
      switch (window.ultimate) {
        case window.ultimate = 'predator':
          this.destroyEnemies()
          break;
        case window.ultimate = 'nemesis':
          this.slowEnemies()
          break;
        case window.ultimate = 'copa':
          this.destroyable = false;
          this.circle = new PIXI.Graphics();
          this.circle.lineStyle(0);
          this.circle.beginFill(0xFFFF0B, 0.5);
          this.circle.drawCircle(470, 90,160);
          this.circle.endFill();
          this.stage.addChild(this.circle);
          setTimeout(() => {
            this.destroyable = true;
            this.stage.removeChild(this.circle)
          }, 15000);
          break;
        case window.ultimate = 'x':
        clearInterval(this.ballTimer)
        this.ballTime = 100;
        this.createBalls();
        setTimeout(() => {
          clearInterval(this.ballTimer)
        this.ballTime = 500;
        this.createBalls();
        }, 10000);
          break;
        default:
          break;
      }
      this.powerOn = true;
      this.stage.removeChild(this.power);
    }
  },

  setupAudio: function() {
    this.music = new Howl({
      src: ['Dokken.ogg', 'Dokken.mp3'],
      buffer: true,
      autoplay: true,
      loop: true,
      volume: 0.7
    })
    this.sounds = new Howl({
      src: ['sounds.ogg', 'sounds.mp3'],
      sprite: {
        ball1: [0, 104],
        ball2: [1000, 1004],
        whistle: [3000, 1200],
      }
    })
    this.sounds.volume(0.1);
  },

  setupScore: function() {
    this.setScore = new PIXI.Text('Rezultat: ' + window.score, {
      fontFamily: 'Arial',
      fontSize: 36,
      fontWeight: 'bold',
      fill: 'white',
      align: 'left'
    });
    this.setScore.x = 50;
    this.setScore.y = 30;
    this.stage.addChild(this.setScore);
  },

  updatePhysics: function() {
    // Update player movement
    if (this.keyLeft && !this.collision) {
      this.player.force[0] -=this.speed;
    } else if (this.keyRight && !this.collision) {
      this.player.force[0] +=this.speed;
    }

    // Place player to the other side if it is out of boundaries
    if(this.player.position[0] > this._width) {
      this.player.position[0] = this._width - 50;
    } else if(this.player.position[0] < 0) {
      this.player.position[0] = 50;
    }
    
    // Update enemy position
    for (var i = 0; i < window.enemyBodies.length; i++) {
        window.enemyGraphics[i] ? window.enemyGraphics[i].y = window.enemyBodies[i].position[1] : ''
        window.enemyGraphics[i] ? window.enemyGraphics[i].x = window.enemyBodies[i].position[0] : ''
      if (window.enemyBodies[i].position[0] > this._width) {
      window.removableObjs.push(window.enemyBodies[i]);
      } else if (window.enemyBodies[i].position[1] > this._height) {
        window.removableObjs.push(window.enemyBodies[i]);
      }
    }

    for (var i = 0; i < window.ballBodies.length; i++) {
      window.ballGraphics[i].x = window.ballBodies[i].position[0];
      window.ballGraphics[i].y = window.ballBodies[i].position[1];
    }

    // keep player on bottom
    switch (window.gender) {
      case window.gender = 'Girl':
        this.player.position[1] = this._height;
        break;
      case window.gender = 'Boy':
        this.player.position[1] = this._height;
        break;
      default:
        break;
    }
    // Update the position of the graphics based on
    // physics simulation position.
    this.playerGraphics.x = this.player.position[0];
    this.playerGraphics.y = 990 ;
    if(this.circle) {
      this.circle.x = this.player.position[0] -480;
      this.circle.y = 900 ;
    }
    // Step the physics simulation forward.
    this.world.step(1/60);
    
    // destroy enemies
    for (i=0; i<window.removableObjs.length; i++) {
      var index = window.enemyBodies.indexOf(window.removableObjs[i]);
      if (index) {
        this.stage.removeChild(window.enemyGraphics[index]);
        window.enemyGraphics.splice(index,1);
        this.world.removeBody(window.enemyBodies[index]);
        window.enemyBodies.splice(index,1);
      }
    }
    window.removableObjs = [];
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
        this.world = null;
        clearInterval(this.enemyTimer);
        clearInterval(this.enemyLeftTimer );
        clearInterval(this.goalTimer);
        clearInterval(this.cardTimer);
        clearInterval(this.ballTimer);
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
        this.music.stop();
        this.renderer.render(this.stage);

      } else {
        this.world = new p2.World({
          gravity: [0,50]
        });  
      window.isPlaying = true;

      this.drawStars();

      // Setup the audio of the game.
      this.setupAudio();

      if(window.volume === 0.7) {
        this.sounds.mute(false)
        this.music.mute(false)
      } else {
        this.sounds.mute(true);
        this.music.stop()
      }

      this.createLogo();
  
      // Draw player to the scene
      this.createCharacter();

      // this.lifeCounter();
  
      // Display power button on scene.
      this.createPower();
  
      if(window.mobilecheck()) {
        // Display LeftSteer button on scene.
        this.createLeftSteer();
  
        // Display RightSteer button on scene.
        this.createRightSteer()
      }
  
      // Draw enemies to the scene
      this.createEnemies();
  
      this.createEnemiesLeft();
  
      this.createGoals();
  
      this.createCards();
  
      // Create player friendly objects
      this.createBalls();
  
      this.setupScore();
      // Begin the first frame.
      this.continuePlaying();
    }
    }.bind(this), 0);
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

  continuePlaying: function() {
    if(window.isPlaying) {
      requestAnimationFrame(this.tick.bind(this));
    }
  },

  /**
   * Fires at the end of the gameloop to reset and redraw the canvas.
   */
  tick: function() {

    this.updatePhysics();
    // Render the stage for the current frame.
    this.renderer.render(this.stage);

    if (!window.isPlaying) {
      var result = document.getElementById('result');
      result.innerText = 'Vaš rezultat je: ' + window.score;
      modal.style.display = "block";
      this.music.unload();
      this.sounds.unload();
      clearInterval(this.enemyTimer);
      clearInterval(this.enemyLeftTimer);
      clearInterval(this.goalTimer);
      clearInterval(this.cardTimer);
      clearInterval(this.ballTimer);
      this.enemyTimer = null;
      this.enemyLeftTimer = null;
      this.goalTimer = null;
      this.cardTimer = null;
      this.ballTimer = null;
      var butt = document.getElementsByTagName('button');
      for (let i = 0; i < butt.length; i++) {
        if(butt[i].id !== 'refresh' && butt[i].id !== 'new'){
          document.body.removeChild(butt[i]);
        }
      }
      window.enemyBodies = [];
      window.enemyGraphics = [];
      window.ballBodies = [];
      window.ballGraphics = [];
      window.removableObjs = [];
      document.body.removeChild(canvas[0]);
      PIXI.loader.resources = {}
      this.stage.removeChildren();
      this.renderer.clear();
      this.stage.destroy();
      this.renderer.destroy({removeView:true, stageOptions:true});
      this.renderer = null;
      this.stage = null;

      this.player, this.playerGraphics, this.playerShape, this.isPlaying, this.score, this.setScore, this.toucheMove, this.sheet, this.timer, this.removableObjs,this.power, this.powerOn, this.ballBodies, this.ballGraphics, this.removeBalls, this.left, this.right, this.gender, this.ultimate, this.ultimateImg, this.destroyable, this.circle,
    this.direction, this.collision, this.start, this.ballTime, this.like1, this.sv, this.adidas, this.adidasLeft, this.like2, this.like3, this.rectLeft, this.rectRight, this.field = null;

      this.createEnemies = null;
      // return this.renderer = new PIXI.CanvasRenderer();
    }
 
    // Begin the next frame.
    this.continuePlaying();
  }
};