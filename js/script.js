(() => {
    const properties = {
        spacesDiameter: 32,
        dotDiameter: 14,
        wavelength: 100,
        velocity: .09,
        direction: 1,
        displacement: 1
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let w = canvas.width = innerWidth;
    let h = canvas.height = innerHeight;

    let dotsList;

    canvas.style.background = 'rgba(17,17,23,1)';
    document.querySelector('body').appendChild(canvas);

    window.onresize = function() {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;
        init();

    }

    class Dot {
        constructor(x, y, num) {
            this.x = x;
            this.y = y;
            this.radius = properties.dotDiameter / 2;
            this.scale = getDistance(x, y) / properties.wavelength;
            this.text = num;
        }

        update() {
            this.resize();
            this.draw();
        }

        resize() {
            this.scale = this.scale - properties.velocity * properties.direction;
        }
        draw() {
            let s = (1 - Math.abs(Math.sin(this.scale)));
            let o = (1 - s) * 250;
            let r = this.radius * s;
            ctx.beginPath();
            ctx.arc(this.x, this.y, r, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = 'rgb( ' + o + ',255, ' + o + ',' + s + ')';
            ctx.fillText(this.text, this.x, this.y);
        }
    }

    init();

    function init() {

        dotsList = [];

        const dotsCountX = w / properties.spacesDiameter | 0;
        const dotsCountY = h / properties.spacesDiameter | 0;
        const startX = (properties.spacesDiameter + w - dotsCountX * properties.spacesDiameter) / 2;
        const startY = (properties.spacesDiameter + h - dotsCountY * properties.spacesDiameter) / 2;

        let displacement = properties.spacesDiameter / 4 * properties.displacement;


        for (let j = 0; j < dotsCountY; j++) {
            displacement = -displacement;
            let y = startY + j * properties.spacesDiameter;
            for (let i = 0; i < dotsCountX; i++) {
                let x = startX + i * properties.spacesDiameter + displacement;
                dotsList.push(new Dot(x, y, j + i));
            }
        }

    }

    loop();

    function loop() {
        ctx.clearRect(0, 0, w, h);
        for (let a in dotsList) {
            dotsList[a].update();
        }
        requestAnimationFrame(loop);
    }

    function getDistance(x, y) {
        let dx = w / 2 - x;
        let dy = h / 2 - y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }
})();