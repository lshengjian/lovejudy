let LEFT = 48
let TOP = 48
let CELL = 42
let RADIUS = CELL / 2 * 0.9;
let LINES = 19;
let bmds = [];
import brain from './core';
export default class Play extends Phaser.State {


    preload() {

        this.load.image('background', 'assets/weiqi-bg.png');
        this.load.image('borad', 'assets/weiqi-borad.png');
        this.load.audio('eate', 'assets/eate.mp3');
        this.load.audio('place', 'assets/place.mp3');
        brain.init(LINES);
    }

    makeBitmapData() {
        let { game } = this;
        if (bmds.length < 1) {
            bmds[0] = game.add.bitmapData(CELL, CELL);
            bmds[1] = game.add.bitmapData(CELL, CELL);
            let grd = bmds[0].context.createRadialGradient(CELL / 2 - RADIUS / 2, CELL / 2 - RADIUS / 2,
                RADIUS / 6, CELL / 2, CELL / 2, RADIUS);
            grd.addColorStop(0, '#FDFDFD');
            grd.addColorStop(1, '#000000');
            bmds[0].circle(CELL / 2, CELL / 2, RADIUS, grd);
            game.cache.addBitmapData('0', bmds[0]);
            grd = bmds[1].context.createRadialGradient(CELL / 2 - RADIUS / 2, CELL / 2 - RADIUS / 2,
                RADIUS / 6, CELL / 2, CELL / 2, RADIUS);
            grd.addColorStop(0, '#B9B9B9');
            grd.addColorStop(1, '#FFFFFF');
            bmds[1].circle(CELL / 2, CELL / 2, RADIUS, grd);
            game.cache.addBitmapData('1', bmds[1]);
        }

    }
    
    addChessman(r, c) {
        let sp = this.game.add.sprite(LEFT + CELL * c - RADIUS, TOP + CELL * r - RADIUS,
            this.game.cache.getBitmapData(brain.getCurrentSide()));
        if (!brain.tryPlaceChessman(r, c, sp)) {
            return;
        }

        let key = brain.getCurrentSide();
        sp.inputEnabled = true;

        this.m_place.play();
        sp.events.onInputDown.add((d) => {
            let data = brain.findFree(d.m_code);
            // console.log(data);
            this.flags = [];
            for (let d of data) {
                let row = Math.floor(d / 100);
                let col = d % 100;
                this.flags.push(new Phaser.Circle(LEFT + CELL * col, TOP + CELL * row, 12));
            }

        });
        if (brain.m_last.length > 0) {
            this.m_eate.play();
            console.log(brain.m_last);
        }
        for (let sp of brain.m_last) {
           // 
            this.game.add.tween(sp)
                .to({ alpha: 0.1 }, 1000, Phaser.Easing.Linear.None, true, 0, 3)
                .onComplete.add(() => {
                    sp.kill();
                });
        }
        return sp;
    }

    render() {
        for (let d of this.flags) {
            this.game.debug.geom(d, '#00ff00');
        }

    }
    create() {
        this.flags = [];
        this.makeBitmapData();

        this.m_background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
        this.m_borad = this.add.sprite(4, 4, 'borad');
        this.m_place = this.add.audio('place');
        this.m_eate = this.add.audio('eate');
        this.game.input.onDown.add(this.onClick, this);

        this.tips = [0, 0];
        this.tips[1] = this.game.add.sprite(LEFT * 1.6 + CELL * LINES, TOP * 4, this.game.cache.getBitmapData('1'));
        this.tips[0] = this.game.add.sprite(LEFT * 1.6 + CELL * LINES, this.game.height - TOP * 4, this.game.cache.getBitmapData('0'));
        this.tips[0].anchor.setTo(0.5);
        this.tips[1].anchor.setTo(0.5);
    }
    onClick() {
        let { x, y } = this.game.input;
        let c = Math.round((x - LEFT) / CELL);
        let r = Math.round((y - TOP) / CELL);
        if (r < 0)
            r = 0;
        if (c < 0)
            c = 0;
        if (r >= LINES)
            r = LINES - 1;
        if (c >= LINES)
            c = LINES - 1;
        let code = brain.getCode(r, c);
        if (brain.isPlaced(code)) {
            return;
        }

        this.addChessman(r, c);

    }

    update() {
        let next = brain.getIndex() % 2;
        this.tips[next].angle += 2;
    }

}    