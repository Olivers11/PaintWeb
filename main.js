let mode = 0;

function changeMode(element){
  console.log(element.id);
  mode = element.id;
}


function init() {
  let mouse = {
    click: false,
    mode: false,
    pos: { x: 0, y: 0 },
    pos_prev: false,
  };

  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  let color = "#101010";
  
  canvas.width = width;
  canvas.height = height;

  canvas.addEventListener("mousedown", (e) => {
    mouse.click = true;
    mouse.pos_prev = {x:e.clientX / width, y: e.clientY / height}
    if(e.button == 2)
    {
        color = "#ffffff";
        mode = 1;
    }
    else if(e.button == 0){
        color = "#101010";
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    mouse.click = false;
  });

  canvas.addEventListener("mousemove", (e) => {
    if(mode == 3)
    {
      DrawSquare([mouse.pos, mouse.pos_prev], "white");
      mouse.pos.x = e.clientX / width;
      mouse.pos.y = e.clientY / height;
      mouse.move = true;
      DrawSquare([mouse.pos, mouse.pos_prev], "black");
    }
    else{
      mouse.pos.x = e.clientX / width;
      mouse.pos.y = e.clientY / height;
      mouse.move = true;
    }
    
  });

  function DrawLine(line) {
    context.beginPath();
    context.lineWidth = 4;
    context.strokeStyle   = color;
    context.moveTo(line[0].x * width, line[0].y * height-24);
    context.lineTo(line[1].x * width, line[1].y * height-24);
    context.stroke();
  }


  function DrawCircle(line, radio){
    context.beginPath();
    context.arc(line[0].x * width, line[0].y * height-30, radio, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke();
  }


  function DrawSquare(line, c){
    context.beginPath();
    context.lineWidth = 4;
    context.strokeStyle   = c;
    context.moveTo(line[1].x * width, line[1].y * height-24);
    context.lineTo(line[0].x * width, line[0].y * height-24);
    context.stroke();
  }







  function mainLoop() {
    if (mouse.click && mouse.move && mouse.pos_prev) {
        console.log(mode);
          if(mode == 0)
          {
              DrawCircle([mouse.pos, mouse.pos_prev],4);
          }
          else if(mode == 1){
              DrawCircle([mouse.pos, mouse.pos_prev], 20);
          }
          
          
          mouse.move = false;
    }
    
    
    setTimeout(mainLoop, 25);
  }

  mainLoop();
}

window.oncontextmenu = function () {
    return false;
}

document.addEventListener("DOMContentLoaded", init);
