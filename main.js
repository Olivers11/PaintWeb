let mode = 0;




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
    if(e.button == 2)
    {
        color = "#ffffff";
        mode = 1;
    }
    else{
        color = "#101010";
        mode = 0;
    }
    console.log(e);
  });

  canvas.addEventListener("mouseup", (e) => {
    mouse.click = false;
    e.preventDefault();
  });

  canvas.addEventListener("mousemove", (e) => {
    mouse.pos.x = e.clientX / width;
    mouse.pos.y = e.clientY / height;
    mouse.move = true;
  });

  function DrawLine(line) {
    context.beginPath();
    context.lineWidth = 4;
    context.strokeStyle   = color;
    context.moveTo(line[0].x * width, line[0].y * height-24);
    context.lineTo(line[1].x * width, line[1].y * height-24);
    context.stroke();
  }


  function DrawCircle(line){
    context.beginPath();
    context.arc(line[0].x * width, line[0].y * height, 20, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke();
  }

  function mainLoop() {
    if (mouse.click && mouse.move && mouse.pos_prev) {
        if(mode == 0)
        {
            DrawLine([mouse.pos, mouse.pos_prev]);
        }
        else{
            DrawCircle([mouse.pos, mouse.pos_prev])
        }
        
        mouse.move = false;
    }
    mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
    setTimeout(mainLoop, 25);
  }

  mainLoop();
}

window.oncontextmenu = function () {
    return false;
}

document.addEventListener("DOMContentLoaded", init);
