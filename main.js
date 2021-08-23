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
  if(mode == 3 || mode == 1  || mode == 2){
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
    if(e.button == 2)
    {
      mode = 4;
      document.getElementById('canvas').style.cursor = "url('Images/erase.ico')1 30, crosshair";
    }
    else if(mode == 4 && e.button == 0) 
    {
      mode = 0;
      document.getElementById('canvas').style.cursor = "url('Images/paintbrush.ico')1 30, crosshair";
    }
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
    else if(mode == 4){
      mouse.pos.x = e.clientX;
      mouse.pos.y = e.clientY;
      if(mouse.click)mouse.drawing = true;
    }
    else if(mode == 1 && mouse.click == true){
      //borrar la primera linea xd
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y, mouse.pos.x, mouse.pos_prev.y, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y, mouse.pos.x, mouse.pos_prev.y-1, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y, mouse.pos.x, mouse.pos_prev.y+1, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y-1, mouse.pos.x, mouse.pos_prev.y, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y+1, mouse.pos.x, mouse.pos_prev.y, "white");


      //segunda linda
      DrawLine(mouse.pos_prev.x,mouse.pos.y, mouse.pos.x, mouse.pos.y, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos.y, mouse.pos.x, mouse.pos.y-1, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos.y, mouse.pos.x, mouse.pos.y+1, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos.y-1, mouse.pos.x, mouse.pos.y, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos.y+1, mouse.pos.x, mouse.pos.y, "white");
      
      //tercera linea xd
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y, mouse.pos_prev.x, mouse.pos.y, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y, mouse.pos_prev.x, mouse.pos.y-1, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y, mouse.pos_prev.x, mouse.pos.y+1, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y-1, mouse.pos_prev.x, mouse.pos.y, "white");
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y+1, mouse.pos_prev.x, mouse.pos.y, "white");


      //cuarta linea xd
      DrawLine(mouse.pos.x,mouse.pos_prev.y, mouse.pos.x, mouse.pos.y, "white");
      DrawLine(mouse.pos.x,mouse.pos_prev.y, mouse.pos.x, mouse.pos.y-1, "white");
      DrawLine(mouse.pos.x,mouse.pos_prev.y, mouse.pos.x, mouse.pos.y+1, "white");
      DrawLine(mouse.pos.x,mouse.pos_prev.y-1, mouse.pos.x, mouse.pos.y, "white");
      DrawLine(mouse.pos.x,mouse.pos_prev.y+1, mouse.pos.x, mouse.pos.y, "white");




      mouse.pos.x = e.clientX;
      mouse.pos.y = e.clientY;
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y, mouse.pos.x, mouse.pos_prev.y, color);
      DrawLine(mouse.pos_prev.x,mouse.pos.y, mouse.pos.x, mouse.pos.y, color);
      DrawLine(mouse.pos_prev.x,mouse.pos_prev.y, mouse.pos_prev.x, mouse.pos.y, color);
      DrawLine(mouse.pos.x,mouse.pos_prev.y, mouse.pos.x, mouse.pos.y, color);

      if(mouse.click)mouse.drawing = true;
    }
    else if(mode == 2 && mouse.click == true)
    {

      DrawCircle(mouse.pos.x, mouse.pos.y-1, Distance(mouse.pos_prev.x, mouse.pos_prev.y, mouse.pos.x, mouse.pos.y), "white");
      DrawCircle(mouse.pos.x, mouse.pos.y+1, Distance(mouse.pos_prev.x, mouse.pos_prev.y, mouse.pos.x, mouse.pos.y), "white");
      DrawCircle(mouse.pos.x+1, mouse.pos.y, Distance(mouse.pos_prev.x, mouse.pos_prev.y, mouse.pos.x, mouse.pos.y), "white");
      DrawCircle(mouse.pos.x-1, mouse.pos.y, Distance(mouse.pos_prev.x, mouse.pos_prev.y, mouse.pos.x, mouse.pos.y), "white");
      
      mouse.pos.x = e.clientX;
      mouse.pos.y = e.clientY;
      DrawCircle(mouse.pos.x, mouse.pos.y, Distance(mouse.pos_prev.x, mouse.pos_prev.y, mouse.pos.x, mouse.pos.y), color);
      if(mouse.click)mouse.drawing = true;
    }
    
  });

  function Distance(x1, y1, x2, y2)
  {
    var r1 = (x2-x1)*(x2-x1);
    var r2 = (y2-y1)*(y2-y1);
    var suma = r1+r2;
    return Math.pow(suma, 1/2);
  }

  function Draw(x, y, radius, c) {
    context.beginPath();
    context.arc(x, y-52, radius, 0, 2 * Math.PI, false);
    context.fillStyle = c;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = c;
    context.stroke();
  }

  function DrawCircle(x, y, radius, c) {
    context.beginPath();
    context.arc(x, y-52, radius, 0, 2 * Math.PI, false);
    context.lineWidth = size;
    context.strokeStyle = c;
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
        Draw(mouse.pos.x, mouse.pos.y, size, color);
      }
      else if(mode == 4){
        Draw(mouse.pos.x, mouse.pos.y, 5, "white");
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
