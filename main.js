

function changeMode(element) {
  console.log(element.id);
  mode = element.id;
}

function init() {
  let mouse = {
    drawing: false,
    click:false,
    pos: { x: 0, y: 0 },
  };

  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  canvas.addEventListener("mousedown", (e) => {
    mouse.drawing = true;
    mouse.click = true;
    mouse.pos.x = e.clientX;
    mouse.pos.y = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    mouse.drawing = false;
    mouse.click = false;
  });

  canvas.addEventListener("mousemove", (e) => {
    mouse.pos.x = e.clientX;
    mouse.pos.y = e.clientY;
    if(mouse.click)mouse.drawing = true;
  });

  function Draw(x, y, radius) {
    context.beginPath();
    context.arc(x, y-52, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'black';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();

  }


  function mainLoop() {
    if(mouse.drawing){
      Draw(mouse.pos.x, mouse.pos.y, 3);
      mouse.drawing = false;
    }
    setTimeout(mainLoop, 15);
  } 
  
  mainLoop();
}

window.oncontextmenu = function () {
  return false;
};

document.addEventListener("DOMContentLoaded", init);
