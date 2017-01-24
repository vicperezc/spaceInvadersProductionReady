Invaders.MechanicsMenu = function (game) {
    this.button1 = null;

    this.button2 = null;
    this.locked2 = null;

    this.button3 = null;
    this.locked3 = null;

    this.button4 = null;
    this.locked4 = null;

    this.button5 = null;
    this.locked5 = null;

    this.button6 = null;
    this.locked6 = null;

    this.button7 = null;
    this.locked7 = null;

    this.button8 = null;
    this.locked8 = null;

    this.button9 = null;
    this.locked9 = null;

    this.button10 = null;
    this.locked10 = null;

    this.button11 = null;
    this.locked11 = null;

    this.button12 = null;
    this.locked12 = null;

    this.button13 = null;
    this.locked13 = null;

    this.modalMenu = null;
    this.levels = null;
};

Invaders.MechanicsMenu.prototype = {

    create: function () {
        this.stage.backgroundColor = '#588cf6';

        this.modalMenu = this.add.image(517,332.5,'modalMenu');
        this.modalMenu.anchor.setTo(0.5,0.5);

        this.levels = this.add.image(521,118.5,'levels');
        this.levels.anchor.setTo(0.5,0.5);

        var wooble = this.add.tween(this.levels.scale);
        wooble.to({
            //x= 503 y=302
            x: 1.05
        }, 500, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);
        wooble.start();

        this.button1 = this.add.button(289,312,'buttonOne',this.mechanicOne,this,1,0,2);
        this.button1.anchor.setTo(0.5,0.5);

        this.button2 = this.make.button(444,312,'buttonTwo',this.mechanicTwo,this,1,0,2);
        this.button2.anchor.setTo(0.5,0.5);
        this.locked2 = this.add.image(444,312,'locked');
        this.locked2.anchor.setTo(0.5,0.5);

        this.button3 = this.make.button(599,312,'buttonThree',this.mechanicThree,this,1,0,2);
        this.button3.anchor.setTo(0.5,0.5);
        this.locked3 = this.add.image(599,312,'locked');
        this.locked3.anchor.setTo(0.5,0.5);

        this.button4 = this.make.button(755,312,'buttonFour',this.mechanicFour,this,1,0,2);
        this.button4.anchor.setTo(0.5,0.5);
        this.locked4 = this.add.image(755,312,'locked');
        this.locked4.anchor.setTo(0.5,0.5);

        this.button5 = this.make.button(210,417,'buttonFive',this.mechanicFive,this,1,0,2);
        this.button5.anchor.setTo(0.5,0.5);
        this.locked5 = this.add.image(210,417,'locked');
        this.locked5.anchor.setTo(0.5,0.5);

        this.button6 = this.make.button(367,417,'buttonSix',this.mechanicSix,this,1,0,2);
        this.button6.anchor.setTo(0.5,0.5);
        this.locked6 = this.add.image(367,417,'locked');
        this.locked6.anchor.setTo(0.5,0.5);

        this.button7 = this.make.button(522,417,'buttonSeven',this.mechanicSeven,this,1,0,2);
        this.button7.anchor.setTo(0.5,0.5);
        this.locked7 = this.add.image(522,417,'locked');
        this.locked7.anchor.setTo(0.5,0.5);

        this.button8 = this.make.button(677,417,'buttonEight',this.mechanicEight,this,1,0,2);
        this.button8.anchor.setTo(0.5,0.5);
        this.locked8 = this.add.image(677,417,'locked');
        this.locked8.anchor.setTo(0.5,0.5);

        this.button9 = this.make.button(834,417,'buttonNine',this.mechanicNine,this,1,0,2);
        this.button9.anchor.setTo(0.5,0.5);
        this.locked9 = this.add.image(834,417,'locked');
        this.locked9.anchor.setTo(0.5,0.5);

        this.button10 = this.make.button(289,522,'buttonTen',this.mechanicTen,this,1,0,2);
        this.button10.anchor.setTo(0.5,0.5);
        this.locked10 = this.add.image(289,522,'locked');
        this.locked10.anchor.setTo(0.5,0.5);

        this.button11 = this.make.button(444,522,'buttonEleven',this.mechanicEleven,this,1,0,2);
        this.button11.anchor.setTo(0.5,0.5);
        this.locked11 = this.add.image(444,522,'locked');
        this.locked11.anchor.setTo(0.5,0.5);

        this.button12 = this.make.button(599,522,'buttonTwelve',this.mechanicTwelve,this,1,0,2);
        this.button12.anchor.setTo(0.5,0.5);
        this.locked12 = this.add.image(599,522,'locked');
        this.locked12.anchor.setTo(0.5,0.5);

        this.button13 = this.make.button(755,522,'buttonThirteen',this.mechanicThirteen,this,1,0,2);
        this.button13.anchor.setTo(0.5,0.5);
        this.locked13 = this.add.image(755,522,'locked');
        this.locked13.anchor.setTo(0.5,0.5);

        //this.add.button(550,250,'buttonOne',this.startExtra,this,1,0,2);

        this.clickS = this.add.audio('click');
        this.clickS.volume = 1;

        if (Invaders.youWin1 == true){
            this.unlockedLevel2();
        }
        if (Invaders.youWin2 == true){
            this.unlockedLevel3();
        }
        if (Invaders.youWin3 == true){
            this.unlockedLevel4();
        }
        if (Invaders.youWin4 == true){
            this.unlockedLevel5();
        }
        if (Invaders.youWin5 == true){
            this.unlockedLevel6();
        }
        if (Invaders.youWin6 == true){
            this.unlockedLevel7();
        }
        if (Invaders.youWin7 == true){
            this.unlockedLevel8();
        }
        if (Invaders.youWin8 == true){
            this.unlockedLevel9();
        }
        if (Invaders.youWin9 == true){
            this.unlockedLevel10();
        }
        if (Invaders.youWin10 == true){
            this.unlockedLevel11();
        }
        if (Invaders.youWin11 == true){
            this.unlockedLevel12();
        }
        if (Invaders.youWin12 == true){
            this.unlockedLevel13();
        }
    },

    unlockedLevel2: function () {
        this.locked2.kill();
        this.world.add(this.button2);
    },

    unlockedLevel3: function () {
        this.locked3.kill();
        this.world.add(this.button3);
    },

    unlockedLevel4: function () {
        this.locked4.kill();
        this.world.add(this.button4);
    },

    unlockedLevel5: function () {
        this.locked5.kill();
        this.world.add(this.button5);
    },

    unlockedLevel6: function () {
        this.locked6.kill();
        this.world.add(this.button6);
    },

    unlockedLevel7: function () {
        this.locked7.kill();
        this.world.add(this.button7);
    },

    unlockedLevel8: function () {
        this.locked8.kill();
        this.world.add(this.button8);
    },

    unlockedLevel9: function () {
        this.locked9.kill();
        this.world.add(this.button9);
    },

    unlockedLevel10: function () {
        this.locked10.kill();
        this.world.add(this.button10);
    },

    unlockedLevel11: function () {
        this.locked11.kill();
        this.world.add(this.button11);
    },

    unlockedLevel12: function () {
        this.locked12.kill();
        this.world.add(this.button12);
    },

    unlockedLevel13: function () {
        this.locked13.kill();
        this.world.add(this.button13);
    },

    ///////////////
    // MECHANICS //
    ///////////////

    mechanicOne: function () {
        this.game.time.reset();
        this.state.start('MechanicOne');
        this.clickS.play();
    },

    mechanicTwo: function () {
        this.game.time.reset();
        this.state.start('MechanicTwo');
        this.clickS.play();
    },

    mechanicThree: function () {
        this.game.time.reset();
        this.state.start('MechanicThree');
        this.clickS.play();
    },

    mechanicFour: function () {
        this.game.time.reset();
        this.state.start('MechanicFour');
        this.clickS.play();
    },

    mechanicFive: function () {
        this.game.time.reset();
        this.state.start('MechanicFive');
        this.clickS.play();
    },

    mechanicSix: function () {
        this.game.time.reset();
        this.state.start('MechanicSix');
        this.clickS.play();
    },

    mechanicSeven: function () {
        this.game.time.reset();
        this.state.start('MechanicSeven');
        this.clickS.play();
    },

    mechanicEight: function () {
        this.game.time.reset();
        this.state.start('MechanicEight');
        this.clickS.play();
    },

    mechanicNine: function () {
        this.game.time.reset();
        this.state.start('MechanicNine');
        this.clickS.play();
    },

    mechanicTen: function () {
        this.game.time.reset();
        this.state.start('MechanicTen');
        this.clickS.play();
    },

    mechanicEleven: function () {
        this.game.time.reset();
        this.state.start('MechanicEleven');
        this.clickS.play();
    },

    mechanicTwelve: function () {
        this.game.time.reset();
        this.state.start('MechanicTwelve');
        this.clickS.play();
    },

    mechanicThirteen: function () {
        this.game.time.reset();
        this.state.start('MechanicThirteen');
        this.clickS.play();
    }






};