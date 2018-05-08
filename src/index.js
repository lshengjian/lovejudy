
import 'pixi';
import 'phaser';

import Boot from './boot';
import Play from './play';



let game = new Phaser.Game(960,850, Phaser.AUTO, '',null);
game.state.add('play', Play, true);
//game.state.add('play', Play, false);
//game.state.add('boot', Boot, true);
//game.state.start('boot');
//game.state.start('play');