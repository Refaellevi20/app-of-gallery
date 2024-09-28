// function drawCircleInCanvas(canvasId) {
//     const canvas = document.getElementById(canvasId);
//     const ctx = canvas.getContext('2d');
    
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//     ctx.beginPath();
//     ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
//     ctx.fillStyle = 'lightblue'; // Circle fill color
//     ctx.fill();
//     ctx.strokeStyle = 'blue'; // Circle border color
//     ctx.lineWidth = 5;
//     ctx.stroke();
// }

// // Draw on the big canvases
// drawCircleInCanvas('canvas1');
// drawCircleInCanvas('canvas2');
// drawCircleInCanvas('canvas3');
// drawCircleInCanvas('canvas4');

// // Draw on the small canvases
// function drawSmallCircle(canvasId) {
//     const canvas = document.getElementById(canvasId);
//     const ctx = canvas.getContext('2d');
    
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//     ctx.beginPath();
//     ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
//     ctx.fillStyle = 'red'; // Small circle fill color
//     ctx.fill();
// }

// drawSmallCircle('smallCanvas1');
// drawSmallCircle('smallCanvas2');
// drawSmallCircle('smallCanvas3');
// drawSmallCircle('smallCanvas4');
