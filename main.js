let size = 3;
let color = "black";
let mode = 0;




//event listener for change size 
document.addEventListener('keydown',(e)=>{

  if(e.ctrlKey && e.key == "+"){
    e.preventDefault();
    size++;
  }
  else if(e.ctrlKey && e.key == "-"){
    e.preventDefault();
    if(size>0)size--;
  }
  document.getElementById('size').innerText = size;
});


document.getElementById('select').addEventListener('change', (e)=>{
  color = e.target.value;
})




function changeMode(element) {
  
  mode = element.id;
  if(mode == 3){
    document.getElementById('canvas').style.cursor = "crosshair";
  }
  else{
    document.getElementById('canvas').style.cursor = "url('Images/paintbrush.ico')1 30, crosshair";
  }
}

function init() {
  let mouse = {
    drawing: false,
    click:false,
    pos: { x: 0, y: 0 },
    pos_prev: { x: 0, y: 0 },
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
    mouse.pos_prev.x = e.clientX;
    mouse.pos_prev.y = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    mouse.drawing = false;
    mouse.click = false;
  });

  canvas.addEventListener("mousemove", (e) => {
    if(mode == 3 && mouse.click == true)
    {
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y, mouse.pos.x, mouse.pos.y, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y, mouse.pos.x, mouse.pos.y-1, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y, mouse.pos.x, mouse.pos.y+1, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y-1, mouse.pos.x, mouse.pos.y, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y+1, mouse.pos.x, mouse.pos.y, "white");


      mouse.pos.x = e.clientX;
      mouse.pos.y = e.clientY;
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y, mouse.pos.x, mouse.pos.y, color);
      if(mouse.click)mouse.drawing = true;
    }
    else if(mode == 0){
      mouse.pos.x = e.clientX;
      mouse.pos.y = e.clientY;
      if(mouse.click)mouse.drawing = true;
    }
    
  });

  function Draw(x, y, radius) {
    context.beginPath();
    context.arc(x, y-52, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke();

  }

  function DrawLine(p_x, p_y, x, y, c){
    context.beginPath();
    context.lineWidth = size;
    context.strokeStyle = c;
    context.moveTo(p_x, p_y-52);
    context.lineTo(x, y-52);
    context.stroke();
  }


  function mainLoop() {
    if(mouse.drawing){
      if(mode == 0)
      {
        Draw(mouse.pos.x, mouse.pos.y, size);
      }
      else if(mode == 3)
      {
        console.log(mouse.pos_prev);
      }
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
