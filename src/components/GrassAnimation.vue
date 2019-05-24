<template>
		<canvas class="grass" id="grassAnim"></canvas>
</template>

<script>
	import Utility from '../scripts/utils.js';
	export default {
		name: 'GrassAnimation',
		mounted() {
			const grassAnim = function() {
				const canvas = document.getElementById("grassAnim"),
				  ctx = canvas.getContext("2d"),
				  stack = [],
				  w = canvas.parentElement.clientWidth,
				  h = canvas.parentElement.clientHeight;

				const drawer = function() {
				  ctx.fillStyle = "#ffffff";
				  ctx.fillRect(0, 0, w, h);
				  stack.forEach(function(el) {
				    el();
				  });
				  requestAnimationFrame(drawer);
				};

				const anim = function() {
				  let x = 0;
				  const speed = Math.random() * 7;
				  const position = Math.random() * w - w / 2;
				  const maxTall = Math.random() * 100 + 200;
				  const maxSize = Math.random() * 10 + 5;
				  const c = function(l, u) {
				    return Math.round(Math.random() * (u || 255) + l || 0);
				  };
				  const color = "rgb(" + c(60, 10) + "," + c(201, 50) + "," + c(120, 50) + ")";
				  
				  return function() {
				    const deviation = Math.cos(x / 30) * Math.min(x / 40, 50),
				      tall = Math.min(x / 2, maxTall),
				      size = Math.min(x / 30, maxSize);

				    x += speed;
				    ctx.save();

				    ctx.strokeWidth = 10;
				    ctx.translate(w / 2 + position, h);
				    ctx.fillStyle = color;

				    ctx.beginPath();
				    ctx.lineTo(-size, 0);
				    ctx.quadraticCurveTo(-size, -tall / 2, deviation, -tall);
				    ctx.quadraticCurveTo(size, -tall / 2, size, 0);
				    //ctx.closePath();
				    ctx.fill();
				    
				    ctx.restore();
				  };
				};

				for (var x = 0; x < 30; x++) {
				  stack.push(anim());
				}

				canvas.width = w;
				canvas.height = h;

				drawer();
			}
			const grass = function() {
				const canvas = document.getElementById("grassAnim");
				const ctx = canvas.getContext("2d");
				const w = canvas.parentElement.clientWidth;
				const  h = canvas.parentElement.clientHeight;
				canvas.width = w;
				canvas.height = h;


				// ctx.translate(w / 2 + position, h);
				ctx.fillStyle = '#000';

				ctx.beginPath();
				ctx.moveTo(w/2, h);
				ctx.lineTo(w/2, h/2);
				ctx.lineTo(w/3, h);
				// ctx.quadraticCurveTo(20, 100, 200, 20);
				ctx.fill();
				// ctx.stroke();

			}
			grass()
			console.log( Utility.printStuff('hello') )
			
		}
	}
		
</script>
<style>
	canvas: {
		background-color: #eee
	}
</style>