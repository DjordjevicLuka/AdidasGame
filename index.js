// Setup all of the objects in the game.
var instagram = document.getElementById('isInstagram');
var str = navigator.userAgent;
var i = str.indexOf("Instagram");
if (i !== -1) {
  instagram.style.display = 'block';
}

// console.log(!navigator.userAgent.match(/Instagram/i))

var menu;
var canvas = document.getElementsByTagName('canvas');
document.getElementById('myModalInfo0').style.display = "block";
const Http = new XMLHttpRequest();
const url='https://sportvisionigrica.azurewebsites.net/api/player';
Http.open("GET", url);
Http.send();
Http.onloadend = (e) =>{
  var result = JSON.parse(e.srcElement.response);
  result.sort(function(a, b) {
    return b.rezultat - a.rezultat;
});
}

var onSubmit = function() {
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var tel = document.getElementById('tel').value;
    menu = new Menu();
    modal.style.display = "none";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://sportvisionigrica.azurewebsites.net/api/player', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        Ime: username,
        Email: email,
        Rezultat: window.score,
        Tel: tel,
        Kopacka: window.ultimate,
        BoyOrGirl: window.gender
    }));
    this.isplaying = true;
}

var closeMe = function(modal, num) {
  if (modal+(num+1) === 'myModalInfo2') {
    PIXI.loader.resources = {}
    menu = null;
    menu = new Menu();
  }
var MyModal = document.getElementById(modal+num);
var NextModal = document.getElementById(modal+(num+1))
MyModal.style.display = "none";
NextModal.style.display = "block";
}


var refresh = document.getElementById('refresh');
refresh.onclick = function() {
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
    // document.body.removeChild(canvas[0]);
    menu = null;
    game = null;
    game = new Game();
    modal.style.display = "none";
    // this.isplaying = true;
}

var newGame = document.getElementById('new');
newGame.onclick = function() {
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
    // document.body.removeChild(canvas[0]);
    game = null;
    menu = null;
    menu = new Menu();
    modal.style.display = "none";
    this.isplaying = true;
}