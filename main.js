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
          }, 1200);
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

    // หิมะตก (pixel snow) โดยไม่มีการตอบสนองต่อการเลื่อนเมาส์
    const canvas = document.getElementById("snow-canvas");
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const flakes = [];
    for (let i = 0; i < 150; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.floor(Math.random() * 2) + 1,
        speed: Math.random() * 1 + 0.01
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
