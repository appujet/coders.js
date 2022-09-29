const Canvas = require('canvas');

Canvas.registerFont(require("path").resolve(__dirname, '../../assets/fonts/Swift.ttf'), { family: 'swift' });

const randomText = () => {
    Math.random().toString(36).replace(/[^a-z]|[gkqr]+/gi, '').substr(0, 6).toUpperCase(),
        shuffleArray = (array) => {
            let i = array.length, temp, randomIndex;
            while (0 !== i) {
                randomIndex = Math.floor(Math.random() * i);
                i -= 1;
                temp = array[i];
                array[i] = array[randomIndex];
                array[randomIndex] = temp;
            }
            return array;
        }
}
module.exports = class Captcha {
    /**
     * @param {Number} width Width of captcha
     * @returns {String} Return captcha
     */
    constructor(_number = 250) {
        _number = typeof _number !== 'number' || _number < 250 ? 250 : _number;
        this._canvas = Canvas.createCanvas(400, _number);
        this._value = randomText();
        this.ctx = this._canvas.getContext('2d');
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, 400, _number);
        this.ctx.save();

        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath()
        const coords = [];
        for (let i = 0; i < 4; i++) {
            if (!coords[i]) coords[i] = [];
            for (let j = 0; j < 5; j++) coords[i][j] = (Math.round(Math.random() * 80) + j * 80);
            if (!(i % 2)) coords[i] = shuffleArray(coords[i]);
        }
        for (let i = 0; i < coords.length; i++) {
            if (!(i % 2)) {
                for (let j = 0; j < coords[i].length; j++) {
                    if (!i) {
                        this.ctx.moveTo(coords[i][j], 0);
                        this.ctx.lineTo(coords[i + 1][j], 400);
                    } else {
                        this.ctx.moveTo(0, coords[i][j]);
                        this.ctx.lineTo(400, coords[i + 1][j]);
                    }
                }
            }
        }
        this.ctx.stroke();

        this.ctx.fillStyle = '#000';
        this.ctx.lineWidth = 0;

        for (let i = 0; i < 200; i++) {
            this.ctx.beginPath();
            this.ctx.arc(
                Math.round(Math.random() * 360) + 20,
                Math.round(Math.random() * 360) + 20,
                Math.round(Math.random() * 7) + 1, 0, Math.PI * 2,
            );
            this.ctx.fill();
        }
        this.ctx.font = 'bold 50px swift';
        this.ctx.fillStyle = '#000';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';
        this.ctx.translate(0, _number)
        this.ctx.translate(
            Math.round(Math.random() * 100 - 50) + 200,
            -1 * Math.round(Math.random() * (_number / 4) - (_number / 8) - _number / 2),
        );
        this.ctx.rotate(Math.random() - 0.5);
        this.ctx.beginPath();
        // value for captcha
        this._value = '';
        while (this._value.length !== 6) this._value = randomText();
        this.ctx.fillText(this._value, 0, 0);
        this.ctx.restore();
        for (let i = 0; i < 5000; i++) {
            this.ctx.beginPath();
            let color = "#";
            while (color.length < 7) color += Math.round(Math.random() * 16).toString(16);
            color += "a0";
            this.ctx.fillStyle = color;
            this.ctx.arc(
                Math.round(Math.random() * 400), // X coordinate
                Math.round(Math.random() * _h), // Y coordinate
                Math.random() * 2, // Radius
                0, // Start angle
                Math.PI * 2 // End angle
            );
            this.ctx.fill();
        }
    }
    get value() {
        return this._value;
    }
    get PNGStream() {
        return this._canvas.createPNGStream();
    }

    get JPEGStream() {
        return this._canvas.createJPEGStream();
    }

    get dataURL() {
        return this._canvas.toDataURL("image/jpeg");
    }
}