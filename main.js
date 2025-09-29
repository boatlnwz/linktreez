document.addEventListener("DOMContentLoaded", () => {
    const text = "Boat_bananaz";
    const typedElement = document.getElementById("typed");

    let index = 0;
    let isDeleting = false;

    function typeLoop() {
      if (!isDeleting) {
        typedElement.textContent = text.substring(0, index + 1);
        index++;
        if (index === text.length) {
          setTimeout(() => {
            isDeleting = true;
            typeLoop();
          }, 1800);
          return;
        }
      } else {
        typedElement.textContent = text.substring(0, index - 1);
        index--;
        if (index === 0) {
          isDeleting = false;
        }
      }

      setTimeout(typeLoop, isDeleting ? 80 : 120);
    }

    typeLoop();

    // หิมะตก (pixel snow)
    const canvas = document.getElementById("snow-canvas");
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const flakes = [];
    for (let i = 0; i < 150; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,  // ขนาดหิมะเล็กลง
        speed: Math.random() * 1.5 + 0.01  // ความเร็วหิมะเพิ่มขึ้น
      });
    }

    function drawSnow() {
      ctx.clearRect(0, 0, width, height);

      // วาดหิมะ (วงกลม)
      for (let flake of flakes) {
        flake.y += flake.speed;

        // รีเซ็ตตำแหน่งเมื่อหลุดจอ
        if (flake.y > height || flake.x < 0 || flake.x > width) {
          flake.y = -flake.size;
          flake.x = Math.random() * width;
        }

        // วาดวงกลมแทนสี่เหลี่ยม
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      requestAnimationFrame(drawSnow);
    }

    drawSnow();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
});

const start10y = new Date("2025-03-31T00:00:00");
const end10y = new Date("2035-03-31T12:00:00");
const span10y = end10y - start10y;
const secondsInDay = 86400;

function updateClock10y() {
  const now = new Date();
  const lived10y = now - start10y;
  const percent10y = lived10y / span10y;
  const secondsPassed10y = percent10y * secondsInDay;
  const ms10y = secondsPassed10y * 1000;

  const hours = Math.floor(ms10y / 3600000);
  const minutes = Math.floor((ms10y % 3600000) / 60000);
  const seconds = Math.floor((ms10y % 60000) / 1000);
  const milliseconds = Math.floor(ms10y % 1000);

  const hourDeg = ((hours % 12) + minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const secondDeg = seconds * 6;
  const subSecondDeg = (milliseconds / 1000) * 360;

  document.getElementById("hour10y").style.transform = `rotate(${hourDeg}deg)`;
  document.getElementById("minute10y").style.transform = `rotate(${minuteDeg}deg)`;
  document.getElementById("second10y").style.transform = `rotate(${secondDeg}deg)`;
  document.getElementById("subsecond10y").style.transform = `rotate(${subSecondDeg}deg)`;

  const pad = (n, d = 2) => n.toString().padStart(d, '0');
  document.getElementById("digital10y").textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
  document.getElementById("percentText10y").textContent = `${(percent10y * 100).toFixed(6)}%`;
}

setInterval(updateClock10y, 20);
