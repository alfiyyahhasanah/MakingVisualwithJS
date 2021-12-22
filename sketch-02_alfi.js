const canvasSketch = require('canvas-sketch');
//import canvas sketch functions --> look at the documentation un GitHub
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const settings = {
  dimensions: [ 1080, 1080 ]
};

//const degToRad = (degrees) => {
  //return (degrees / 180) * Math.PI;}

//const randomRange = (min, max) => {
  //return Math.random() * (max - min) + min;}

const sketch = () => {
  return ({ context, width, height }) => {
    //Gradient background
    const bg = context.createRadialGradient(width/2, height/2, width*0.9, width/2, height/2, width*0.1);
    bg.addColorStop(0, "purple");
    bg.addColorStop(1, "pink");

    context.fillStyle = bg;
    context.fillRect(0, 0, width, height);

    let k = Math.random();
    if (k < 0.7) {
      context.fillStyle = '#ccffe6';
    } else {
      context.fillStyle = '#ccccff';
    }
    
    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.25;
    let x, y;

    const num = 40;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360/num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      //create a function to give random number
      context.scale(random.range(0.1,2), random.range(0.2, 0.5));
  
      context.beginPath();
      context.rect(-w*0.5, random.range(-w*0.5, -h*0.5), w, h);
      context.fill();
      context.restore();

      //another set of transformation --> creating arc
      context.save();
      //center of circle
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(1, 12);

      context.beginPath();
      context.arc(0, 0, radius * random.range(0.3, 1.3), slice * random.range(1, -8), Math.PI);
      let z = Math.random()
      if (z < 0.5) {
        context.strokeStyle = 'yellow';
      } else {
        context.strokeStyle = "white";
      }
      
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
