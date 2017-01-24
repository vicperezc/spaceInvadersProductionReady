
/*
var highScore = localStorage.getItem('highscore');
if(highScore  === null) {
    // If there is no highScore (game is started for the first time on this device)
    localStorage.setItem('highscore', 0);
    highScore = 0;
}*/


// Creamos el objeto principal de nuestro juego
var Invaders = {
    youWin1: false,
    youWin2: false,
    youWin3: false,
    youWin4: false,
    youWin5: false,
    youWin6: false,
    youWin7: false,
    youWin8: false,
    youWin9: false,
    youWin10: false,
    youWin11: false,
    youWin12: false,
    youWin13: false
};

Invaders.Boot = function (game) {};
Invaders.Boot.prototype = {

    init: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        //this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

        } else {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 672);
            this.scale.forceLandscape = false; // Para que se vea end portrait y landscape
            //this.scale.forceOrientation(true,true); // Para que se vea end portrait y landscape
            this.scale.pageAlignHorizontally = true;
        }

    },

    preload: function () {

        // Precargamos la preload Bar para que esté lista cuando empezamos Preloader
        this.load.image('loadBar','assets/loadBar.png');

    },
    create: function () {

        //this.input.maxPointers = 1;
        //this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
        //this.scale.startFullScreen(true, true);
        //this.scale.setScreenSize(true);
        //this.ScaleManager.EXACT_FIT = 0;
        //this.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

        //this.scale.forcePortrait = true;
        //this.scale.forceLandscape = true;
        //this.scale.incorrectOrientation = false;
        this.state.start('Preloader');

    }





};