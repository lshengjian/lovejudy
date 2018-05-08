let shaders=[
    // 'mandelbrot0',
    // 'mandelbrot1',
    // 'mandelbrot2',
     'mandelbrot3',
    // 'mandelbrot4',
     'mandelbrot5',
     'sky']

export default class Boot extends Phaser.State {

    preload() {
        this.ready = false
       // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      //  this.scale.setMinMax(480, 960, 1280, 1024);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

       // this.load.crossOrigin = 'anonymous';
        let idx=this.game.rnd.integer()%shaders.length;
        this.game.load.shader('demo', 'assets/shaders/'+shaders[idx]+'.frag');
        this.load.audio('music', 'assets/bgm.mp3');
    }

    create() {
        this.m_music = this.add.audio('music');
        
        let filter = new Phaser.Filter(this.game, null, this.game.cache.getShader('demo'));

        filter.setResolution(this.game.width, this.game.height);

        let sprite = this.game.add.sprite();
        sprite.width = this.game.width;
        sprite.height = this.game.height;

        sprite.filters = [filter];
        this.filter = filter;
        /*
        this.timer=setTimeout(()=>{
            this.jump();
        },10000);*/
          
        let spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
       // game.input.onDown.add(this.jump, this);



    }
    jump(){
        //this.timer.clean();
        this.m_music.stop();
        this.game.state.start('play');
    }
    update() {

        
        if(this.cache.isSoundDecoded('music')){
            this.filter.update(this.game.input.activePointer);
            if(this.ready == false) {
                this.ready = true;
                console.log('Music Decoded');
                this.m_music.play('', 0, 0.3, false);
            }
          
        }

    }
}    