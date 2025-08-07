document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const numStars = 500;
    const stars = [];

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            twinkleSpeed: Math.random() * 0.05,
            twinkleDirection: 1,
            speedX: (Math.random() - 0.5) * 0.1,
            speedY: (Math.random() - 0.5) * 0.1
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        });
    }

    function updateStars() {
        stars.forEach(star => {
            // Movement
            star.x += star.speedX;
            star.y += star.speedY;

            // Wall collision
            if (star.x < 0) star.x = canvas.width;
            if (star.x > canvas.width) star.x = 0;
            if (star.y < 0) star.y = canvas.height;
            if (star.y > canvas.height) star.y = 0;

            // Twinkling
            star.alpha += star.twinkleSpeed * star.twinkleDirection;
            if (star.alpha > 1) {
                star.alpha = 1;
                star.twinkleDirection = -1;
            } else if (star.alpha < 0) {
                star.alpha = 0;
                star.twinkleDirection = 1;
            }
        });
    }

    function animate() {
        updateStars();
        drawStars();
        requestAnimationFrame(animate);
    }

    animate();
});
