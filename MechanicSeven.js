
Invaders.MechanicSeven = function () {
    //Variables para Invaders.Game
    this.ufo = null;
    this.invaderBullet = null;
    this.invaderBulletDos = null;
    this.invadersGroup = null;
    this.acceleration = 850;
    this.counter = 0;
    this.frame = 1;
    this.xOriginal = 368; // 400 (punto de origen) - 32 (avance de invaders en pixeles)
    this.tween = null;
    this.tweenUfo = null;

    this.bulletRed = null;
    this.explosionInvader = null;
    this.halo = null;
    this.spaceship = null;
    this.pixelesAmarillo = null;
    this.haloTwo = null;
    this.shieldHealth = 10;
    this.campoDeFuerzaGroup = null;

    this.lives = null;
    this.livesCounter = 4;
    this.gameOverS = null;
    this.gameOverTwoS = null;
    this.scoreText = null;
    this.scoreString = ' Score: ';
    this.scoreNumber = 0;
    this.tweenedPoints = 0;
    this.bulletToBulletSound = null;
    this.counterNotas = 0;
    this.nota1 = null;
    this.nota2 = null;
    this.nota3 = null;
    this.nota4 = null;
    this.pianoFast = null;
    this.triggerNote = null;

    this.flama = null;
    this.invaderShootS = null;
    this.ufoShootS = null;
    this.bulletHitOneS = null;
    this.firingTimer = 0;

    //MODAL
    this.modal = null;
    //GameOver
    this.gameOverWooble = null;
    this.youWinWooble = null;
    this.buttonReplay = null;
    this.buttonNextChapter = null;
    this.buttonMenu = null;
    this.clickS = null;

    //YouWin
    this.youWinS = null;

    //buttonMenuS
    this.buttonMenuS = null;

    // playerHitsInvadersCircular Variables
    this.arrPositionsX = [];
    this.arrPositionsY = [];
    this.randomTimer = null;

    this.backgroundOne = null;
    this.backgroundTwo = null;
    this.backgroundThree = null;

    this.campoVerde1 = null;
    this.campoBlancoNoPhysics1 = null;

    this.campoBlancoNoPhysics2 = null;
    this.campoVerde2 = null;

    this.campoBlancoNoPhysics3 = null;
    this.campoVerde3 = null;

    this.campoBlancoNoPhysics4 = null;
    this.campoVerde4 = null;

    this.campoBlancoNoPhysics5 = null;
    this.campoVerde5 = null;

    this.campoBlancoNoPhysics6 = null;
    this.campoVerde6 = null;

    this.campoBlancoNoPhysics7 = null;
    this.campoVerde7 = null;

    this.campoBlancoNoPhysics8 = null;
    this.campoVerde8 = null;

    this.campoBlancoNoPhysics9 = null;
    this.campoVerde9 = null;

    this.campoBlancoNoPhysics10 = null;
    this.campoVerde10 = null;

    this.campoBlancoNoPhysics11 = null;
    this.campoVerde11 = null;

    this.campoBlancoNoPhysics12 = null;
    this.campoVerde12 = null;
};
Invaders.MechanicSeven.prototype = {

    create: function () {

        this.world.setBounds(0, 0, 1024, 672);

        this.stage.backgroundColor = '#000427';

        this.backgroundOne = this.add.tileSprite(0, 0, 1024, 672, 'backgroundOne');
        this.backgroundOne.autoScroll(0, 30);

        this.backgroundTwo = this.add.tileSprite(0, 0, 1024, 672, 'backgroundTwo');
        this.backgroundTwo.autoScroll(0, 60);

        this.backgroundThree = this.add.tileSprite(0, 0, 1024, 672, 'backgroundThree');
        this.backgroundThree.autoScroll(0, 50);

        //*** Agregamos el make a nuestro UFO en create para que la función de ufo.fireatsprite funcione.
        this.ufo = this.make.sprite(-100, 50, "ufoRubi");
        this.ufo.anchor.setTo(0.5,0.5);


        //***INVADER BULLET
        //invaderBullet = game.add.weapon(100,'blueBullet');
        this.invaderBullet = this.add.weapon(50,'bulletInvader');
        this.invaderBullet.addBulletAnimation("bulletA",[0,1,2,3],10,true);
        this.invaderBullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.invaderBullet.bulletSpeed = 350;
        this.invaderBullet.bulletAngleOffset = 270;

        //***INVADER BULLET DOS
        this.invaderBulletDos = this.add.weapon(50,'bulletUfo');
        this.invaderBulletDos.addBulletAnimation('bulletUfo',[0,1,2,3],15,true);
        this.invaderBulletDos.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.invaderBulletDos.bulletSpeed = 800;

        //***INVADERS
        this.invadersGroup = this.add.group();
        this.invadersGroup.enableBody = true;
        this.invadersGroup.physicsBodyType = Phaser.Physics.ARCADE;
        //invadersGroup.forEach(tweenInvaders,this);

        //*** CAMPO DE FUERZA POOL
        this.campoDeFuerzaGroup = this.add.group();
        this.campoDeFuerzaGroup.enableBody = true;
        this.campoDeFuerzaGroup.physicsBodyType = Phaser.Physics.ARCADE;
        //this.campoDeFuerzaGroup.forEach(this.campoDeFuerzaAnimation);

        this.createInvaders();
        this.nextLine();
        this.createCampoDeFuerza();

        // WEAPONS

        //***Bullet Red
        this.bulletRed = this.add.weapon(30,'bulletHero');
        this.bulletRed.addBulletAnimation("bulletA",[0,1,2],10,true);
        this.bulletRed.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.bulletRed.fireRate = 80;
        this.bulletRed.bulletSpeed = 1200;
        this.bulletRed.bulletAngleVariance = 1;
        this.bulletRed.bulletAngleOffset = 90;

        //*** EXPLOSION POOL 1
        this.explosionInvader = this.add.group();
        this.explosionInvader.createMultiple(70,'explodeInvaders');
        this.explosionInvader.forEach(Invaders.items.explosionAnimation,this);


        //***HALO
        this.halo = this.add.group();
        this.halo.createMultiple(70,'halo');
        this.halo.forEach(Invaders.items.haloAnimation,this);

        // Agregamos la imagen como sprite
        this.spaceship = this.add.sprite(this.world.centerX,580,'hero');
        this.spaceship.anchor.setTo(0.5,0.5);
        this.physics.enable(this.spaceship, Phaser.Physics.ARCADE);
        //Collision size
        //this.spaceship.body.setSize(76, 60);
        this.spaceship.body.collideWorldBounds = true;
        //spaceship.body.maxVelocity.setTo(500,0);
        //spaceship.body.drag.setTo(2500,0);

        //***ADD CHILD ANIMATION SPRITE

        this.flama = this.make.sprite(-19,20,'flamaRubi');
        this.flama.animations.add('idle',[0,1,2,3,4,5,6,7],10,true);
        this.flama.animations.play('idle');
        this.spaceship.addChild(this.flama);

        this.campoVerde1 = this.add.group();
        this.campoVerde1.enableBody = true;
        this.pixeles1();

        this.campoVerde2 = this.add.group();
        this.campoVerde2.enableBody = true;
        this.pixeles2();

        this.campoVerde3 = this.add.group();
        this.campoVerde3.enableBody = true;
        this.pixeles3();

        this.campoVerde4 = this.add.group();
        this.campoVerde4.enableBody = true;
        this.pixeles4();

        this.campoVerde5 = this.add.group();
        this.campoVerde5.enableBody = true;
        this.pixeles5();

        this.campoVerde6 = this.add.group();
        this.campoVerde6.enableBody = true;
        this.pixeles6();

        this.campoVerde7 = this.add.group();
        this.campoVerde7.enableBody = true;
        this.pixeles7();

        this.campoVerde8 = this.add.group();
        this.campoVerde8.enableBody = true;
        this.pixeles8();

        this.campoVerde9 = this.add.group();
        this.campoVerde9.enableBody = true;
        this.pixeles9();

        this.campoVerde10 = this.add.group();
        this.campoVerde10.enableBody = true;
        this.pixeles10();

        this.campoVerde11 = this.add.group();
        this.campoVerde11.enableBody = true;
        this.pixeles11();

        this.campoVerde12 = this.add.group();
        this.campoVerde12.enableBody = true;
        this.pixeles12();

        this.campoBlancoNoPhysics1 = this.add.group();
        this.bitMapDataShieldNoPhysics1();

        this.campoBlancoNoPhysics2 = this.add.group();
        this.bitMapDataShieldNoPhysics2();

        this.campoBlancoNoPhysics3 = this.add.group();
        this.bitMapDataShieldNoPhysics3();

        this.campoBlancoNoPhysics4 = this.add.group();
        this.bitMapDataShieldNoPhysics4();

        this.campoBlancoNoPhysics5 = this.add.group();
        this.bitMapDataShieldNoPhysics5();

        this.campoBlancoNoPhysics6 = this.add.group();
        this.bitMapDataShieldNoPhysics6();

        this.campoBlancoNoPhysics7 = this.add.group();
        this.bitMapDataShieldNoPhysics7();

        this.campoBlancoNoPhysics8 = this.add.group();
        this.bitMapDataShieldNoPhysics8();

        this.campoBlancoNoPhysics9 = this.add.group();
        this.bitMapDataShieldNoPhysics9();

        this.campoBlancoNoPhysics10 = this.add.group();
        this.bitMapDataShieldNoPhysics10();

        this.campoBlancoNoPhysics11 = this.add.group();
        this.bitMapDataShieldNoPhysics11();

        this.campoBlancoNoPhysics12 = this.add.group();
        this.bitMapDataShieldNoPhysics12();

        //***HALO TWO
        this.haloTwo = this.add.group();
        this.haloTwo.createMultiple(70,'haloTwo');
        this.haloTwo.forEach(Invaders.items.haloAnimationTwo,this);

        this.cursor = this.input.keyboard.createCursorKeys();

        //  Lives
        this.lives = this.add.group();
        //game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

        for (var i = 0; i < 3; i++) {
            var ship = this.lives.create(this.world.width - 100 + (30 * i), 30, 'hero');
            ship.anchor.setTo(0.5, 0.5);
            ship.scale.setTo(0.4,0.4);
            //ship.angle = 90;
            ship.alpha = 0.7;
        }

        //MODAL
        this.modal = this.make.image(503,-302,'modal');
        this.modal.anchor.setTo(0.5,0.5);

        //                              x= 382 y=436.50
        //this.buttonReplay = this.add.button(382,436.5,'buttonReplay', this.replayGame, this ,1,0,2);
        this.buttonReplay = this.make.button(382,-436.5,'buttonReplay', this.replayGame, this ,1,0,2);
        this.buttonReplay.anchor.setTo(0.5,0.5);
        //                                      x=512  y=384.50
        //this.buttonNextChapter = this.add.button(512,384.5,'buttonNextChapter', this.nextChapter,this,1,0,2);
        this.buttonNextChapter = this.make.button(512,-384.5,'buttonNextChapter', this.nextChapter,this,1,0,2);
        this.buttonNextChapter.anchor.setTo(0.5,0.5);
        //                               x=638  y=436.50
        //this.buttonMenu = this.add.button(638,436.5,'buttonMenu', this.menu,this,1,0,2);
        this.buttonMenu = this.make.button(638,-436.5,'buttonMenu', this.menu,this,1,0,2);
        this.buttonMenu.anchor.setTo(0.5,0.5);

        this.clickS = this.add.audio('click');
        this.clickS.volume = 1;

        //YouWin
        this.youWinWooble = this.make.image(500,-161,'youWin');
        this.youWinWooble.anchor.setTo(0.5,0.5);


        this.youWinS = this.add.audio('youWin');

        //buttonMenuS
        this.buttonMenuS = this.add.button(20,23,'buttonMenuS', this.menu, this,1,0,2);

        this.gameOverWooble = this.make.image(512,-164,'gameOver');
        this.gameOverWooble.anchor.setTo(0.5,0.5);


        this.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);

        // AUDIO
        this.laserS = this.add.audio('laser');
        this.laserS.volume = 0.07;
        this.bulletRed.onFire.add(function () {this.laserS.play()},this);
        this.laserS.allowMultiple = true;

        this.bulletHitOneS = this.add.audio('bulletHitOne');
        this.bulletHitOneS.volume = 0.2;
        this.bulletHitOneS.allowMultiple = true;

        this.bulletHitTwoS = this.add.audio('bulletHitTwo');
        this.bulletHitTwoS.volume = 0.3;
        this.bulletHitTwoS.allowMultiple = true;

        this.poofS = this.add.audio('poof');
        this.poofS.volume = 0.7;
        this.poofS.allowMultiple = true;

        this.ufoS = this.add.audio('ufoSound');
        this.ufoS.volume = 0.2;

        this.gameOverS = this.add.audio('gameOver');
        //this.gameOverS.volume = 1;

        this.gameOverTwoS = this.add.audio('gameOverTwo');

        this.ufoShootS = this.add.audio('ufoShootS');
        this.ufoShootS.volume = 0.2;
        this.ufoShootS.allowMultiple = true;

        this.invaderShootS = this.add.audio('invaderShootS');
        this.invaderShootS.volume = .2;

        this.bulletToBulletSound = this.add.audio('bulletToBulletSound');
        this.bulletToBulletSound.volume = .2;

        this.nota1 = this.add.audio('nota1');
        this.nota1.volume = 0.3;
        this.nota1.allowMultiple = true;
        this.nota2 = this.add.audio('nota2');
        this.nota2.volume = 0.3;
        this.nota2.allowMultiple = true;
        this.nota3 = this.add.audio('nota3');
        this.nota3.volume = 0.3;
        this.nota3.allowMultiple = true;
        this.nota4 = this.add.audio('nota4');
        this.nota4.volume = 0.3;
        this.nota4.allowMultiple = true;

        this.pianoFast = this.add.audio('pianoFast');
        this.pianoFast.allowMultiple = true;
        this.triggerNote = this.add.audio('nota1');
        this.triggerNote.volume = 0; // Para que no se empalme el sonido
        this.triggerNote.allowMultiple = true;


        this.triggerNote.onPlay.add(function () {this.pianoFast.play('',0,0.6,true)},this);
        //this.pianoFast.play('',0,0.3,true)


        //*** UFO EXTRA
        this.time.events.repeat(5000, 1, this.ufoExtra, this);
        this.time.events.repeat(20000, 2, this.ufoExtra, this);
        this.time.events.repeat(55000, 1, this.ufoExtra, this);

        //SCORE
        var style = {
            font: "normal 34px KOMIKAX",
            fill: "#df2342",
            stroke: "#ffffff",
            strokeThickness: 3
            //boundsAlignH: "center",
            //boundsAlignV: "middle"
        };

        //                              160 Rubi
        this.scoreText = this.add.text(50, 7,  this.scoreString + this.scoreNumber, style);

    },

    createInvaders: function () {

        //Local variable
        var invader;


        for (var y = 0; y < 6; y++)
        {
            if (y<2){
                for (var x = 0; x < 10; x++)
                {
                    invader = this.invadersGroup.create(x * 60, y * 40, 'invaderPink');
                    invader.anchor.setTo(0.5, 0.5);
                    invader.frame = 0;
                    invader.health = 1;
                    //alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
                    //alien.play('fly');
                    invader.body.moves = false;

                }
            }else if(y>1 && y<4){
                for (x = 0; x < 10; x++)
                {
                    invader = this.invadersGroup.create(x * 60, y * 40, 'invaderBlue');
                    invader.anchor.setTo(0.5, 0.5);
                    invader.frame = 0;
                    invader.health = 1;
                    //alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
                    //alien.play('fly');
                    invader.body.moves = false;
                }

            }else if(y>3){

                for (x = 0; x < 10; x++)
                {
                    invader = this.invadersGroup.create(x * 60, y * 40, 'invaderRubi');
                    invader.anchor.setTo(0.5, 0.5);
                    invader.frame = 0;
                    invader.health = 1;
                    //alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
                    //alien.play('fly');
                    invader.body.moves = false;
                }
            }

        }

        this.invadersGroup.x = 400; // punto de origen
        this.invadersGroup.y = 100;

        for (var i = 0; i < 60; i++){

            this.arrPositionsX.push(this.invadersGroup.children[i].x);
            this.arrPositionsY.push(this.invadersGroup.children[i].y);
        }

    },

    createCampoDeFuerza: function () {
        // Creamos campo de fuerza
        for (var i = 0; i < 60; i++){

            //this.arrPositionsX.push(this.invadersGroup.children[i].x);
            //this.arrPositionsY.push(this.invadersGroup.children[i].y);

            var campo = this.campoDeFuerzaGroup.create(this.invadersGroup.children[i].x,this.invadersGroup.children[i].y , 'campoDeFuerza');
            campo.anchor.setTo(0.5, 0.5);
            campo.visible = true;
        }

        this.invadersGroup.add(this.campoDeFuerzaGroup);

        //  Now using the power of callAll we can add the same animation to all coins in the group:
        this.campoDeFuerzaGroup.callAll('animations.add', 'animations', 'campoDeFuerza', [0, 1, 2, 3], 10, true);
        //  And play them
        this.campoDeFuerzaGroup.callAll('animations.play', 'animations', 'campoDeFuerza');


    },

    nextLine: function () {
        //Time Event que va a acualizar el valor de la aceleración con la function nextAcceleration.
        this.time.events.repeat(this.acceleration,1,this.nextAcceleration, this);
    },

    nextAcceleration: function () {

        if (this.counter == 10){
            this.acceleration-=100;
        } else if (this.counter == 21){
            this.acceleration-=100;
        }else if (this.counter == 32){
            this.acceleration-=100;
        }else if (this.counter == 43){
            this.acceleration-=100;
        }else if (this.counter == 54){
            this.acceleration-=50;
        }else if (this.counter == 65){
            this.acceleration-=50;
        }else if (this.counter == 76){
            this.acceleration-=50;
        }else if (this.counter == 87){
            this.acceleration-=50;
        }else if (this.counter == 98){
            this.acceleration-=50;
        }else if (this.counter == 109){
            this.acceleration-=50;
        }else if (this.counter == 118){
            this.acceleration-=50;
        }else if (this.counter == 127){
            this.acceleration-=50;
        }else if (this.counter == 136){
            this.acceleration-=50;
        }

        //Agregamos un time event y le ponemos la function nextline para que actualize cada vez nuestro valor de aceleration
        this.time.events.add(1, this.nextLine, this);

        if (this.spaceship.alive && this.counter < 264){
            // Los invaders se van a mover y acelerar cada vez que se reinicie la function
            this.tweenInvaders();
        }

    },

    tweenInvaders: function () {

        if (this.invadersGroup.countLiving() > 1) {
            this.counter++;
        }



        // Ponemos de 0 al 50 porque son 50 Invaders los que queremos animar
        for (var i = 0; i < 60; i++){
            this.invadersGroup.children[i].frame = this.frame;
        }
        if (this.counter < 11){

            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=32;

            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        } else if(this.counter == 11){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 110}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=50;
            //invader.frame = 1;
            this.frame = 0;

        }else if (this.counter > 11 && this.counter < 22){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }

        }else if (this.counter == 22){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 120}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=50;
            //invader.frame = 0;
            this.frame = 1;


        }else if (this.counter > 22 && this.counter < 33){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 33){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 130}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=50;
            //invader.frame = 1;
            this.frame = 0;

        }else if (this.counter > 33 && this.counter < 44){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 44){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 140}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=50;
            //invader.frame = 0;
            this.frame = 1;

        }else if (this.counter > 44 && this.counter < 55){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 55){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 150}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=50;
            //invader.frame = 0;
            this.frame = 0;
        }else if (this.counter > 55 && this.counter < 66){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 66){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 160}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=50;
            //invader.frame = 0;
            this.frame = 1;
        }else if (this.counter > 66 && this.counter < 77){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 77){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 170}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=50;
            //invader.frame = 0;
            this.frame = 0;
        }else if (this.counter > 77 && this.counter < 88){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 88){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 180}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=50;
            //invader.frame = 0;
            this.frame = 1;
        }else if (this.counter > 88 && this.counter < 99){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 99){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 190}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=50;
            //invader.frame = 0;
            this.frame = 0;
        }else if (this.counter > 99 && this.counter < 110){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 110){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 200}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=50;
            //invader.frame = 0;
            this.frame = 1;
        }else if (this.counter > 110 && this.counter < 121){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 121){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 210}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=50;
            //invader.frame = 0;
            this.frame = 0;
        }else if (this.counter > 121 && this.counter < 132){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 132){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 220}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=50;
            //invader.frame = 0;
            this.frame = 1;
        }else if (this.counter > 132 && this.counter < 143){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 143){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 230}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=50;
            //invader.frame = 0;
            this.frame = 0;
        }else if (this.counter > 143 && this.counter < 154){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 154){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 240}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=50;
            //invader.frame = 0;
            this.frame = 1;
        }else if (this.counter > 154 && this.counter < 165){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 165){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 250}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=50;
            //invader.frame = 0;
            this.frame = 0;
        }else if (this.counter > 165 && this.counter < 176){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 176){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 260}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=50;
            //invader.frame = 0;
            this.frame = 1;
        }else if (this.counter > 176 && this.counter < 187){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 187){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 270}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=50;
            //invader.frame = 0;
            this.frame = 0;
        }else if (this.counter > 187 && this.counter < 198){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 198){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 280}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=50;
            //invader.frame = 0;
            this.frame = 1;
        }else if (this.counter > 198 && this.counter < 209){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 209){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 290}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=50;
            //invader.frame = 0;
            this.frame = 0;
        }else if (this.counter > 209 && this.counter < 220){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 220){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 300}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=50;
            //invader.frame = 0;
            this.frame = 1;
        }else if (this.counter > 220 && this.counter < 231){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 231){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 310}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=50;
            //invader.frame = 0;
            this.frame = 0;
        }else if (this.counter > 231 && this.counter < 242){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;
            } else {
                this.frame++
            }
        }else if(this.counter == 242){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 320}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=50;
            //invader.frame = 0;
            this.frame = 1;
        }else if (this.counter > 242 && this.counter < 253){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal-=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }else if(this.counter == 253){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { y: 330}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=50;
            //invader.frame = 0;
            this.frame = 0;
        }else if (this.counter > 253 && this.counter < 264){
            this.tween = this.add.tween(this.invadersGroup);
            this.tween.to( { x: this.xOriginal}, 50, Phaser.Easing.Linear.None, false, 0, 0, false);
            this.tween.start();
            this.xOriginal+=32;
            //invader.frame = frame;
            if(this.frame == 1){
                this.frame--;

            } else {
                this.frame++
            }
        }

        if (this.counter == 264){

            this.invadersReachGround();
        }

        if (this.invadersGroup.countLiving() > 1 && this.spaceship.alive && this.counter < 130) {
            var arrNotas = [
                this.nota1,
                this.nota2,
                this.nota3,
                this.nota4

            ];
            arrNotas[this.counterNotas].play();
            this.counterNotas++;

            if (this.counterNotas == 4){
                this.counterNotas = 0;
            }
        } else if (this.invadersGroup.countLiving() > 1 && this.spaceship.alive && this.counter == 130){
            this.triggerNote.play();
        }

    },

    ufoExtra: function () {

        //AQUI PONEMOS LOS ATRIBUTOS QUE QUEREMOS QUE TENGA NUESTRO UFO CADA VEZ QUE APARECE
        this.physics.arcade.enable(this.ufo);
        this.ufo.health = 3;
        this.ufo.animations.add("idle", [0,1,2,3,4], 10, true);
        this.ufo.animations.play('idle');


        if(this.spaceship.alive == true && this.counter < 264 && this.invadersGroup.countLiving() !== 1) {

            this.world.add(this.ufo);

            //Posiciones de salida del UFO
            var ufoEntrada = [
                [-10,67],
                [512,-10],
                [1034,67]
            ];
            var rN=Math.floor(Math.random()*(2+1)); //  Math.floor(Math.random()*(max-min+1)+min);
            this.ufo.reset(ufoEntrada[rN][0], ufoEntrada[rN][1]);

            this.world.add(this.ufo);
            this.tweenUfo = this.add.tween(this.ufo);

            var aRX = [];
            while (aRX.length < 8) {                         //750 porque el máximo de nuestro mundo en x es 850. Damos tolerancia de 100 o al gusto
                var randomnumber2 = Math.floor(Math.random() * (800 - 30 + 1) + 30); //  Math.floor(Math.random()*(max-min+1)+min);
                var found2 = false;
                for (var i2 = 0; i2 < aRX.length; i2++) {
                    if (aRX[i2] == randomnumber2) {
                        found2 = true;
                        break
                    }
                }
                if (!found2) aRX[aRX.length] = randomnumber2;
            }
            var aRY = [];
            while (aRY.length < 8) {                         ////550 porque el máximo de nuestro mundo en y es 600. Damos tolerancia de 50 o al gusto
                randomnumber2 = Math.floor(Math.random() * (400 - 30 + 1) + 30); //  Math.floor(Math.random()*(max-min+1)+min);
                found2 = false;
                for (i2 = 0; i2 < aRY.length; i2++) {
                    if (aRY[i2] == randomnumber2) {
                        found2 = true;
                        break
                    }
                }
                if (!found2) aRY[aRY.length] = randomnumber2;
            }

            var ufoSalida = [
                [-60,170],
                [512,-50],
                [1100,170]
            ];
            var rN2=Math.floor(Math.random()*(2+1)); //  Math.floor(Math.random()*(max-min+1)+min);
            //*** Para que cada vez que aparezca el UFO tenga una trayectoria distinta
            this.tweenUfo.to({
                    // Colocamos las primeras dos coordenadas (x:[] y:[]) del array que nos arroja Phaser WaveForms.
                    x: [aRX[0], aRX[0], aRX[1], aRX[2], aRX[3], aRX[4], aRX[5], aRX[6], aRX[7], ufoSalida[rN2][0], ufoSalida[rN2][0], ufoSalida[rN2][0], ufoSalida[rN2][0], ufoSalida[rN2][0]],
                    y: [67, aRY[0], aRY[1], aRY[2], aRY[3], aRY[4], aRY[5], aRY[6], aRY[7], ufoSalida[rN2][1], ufoSalida[rN2][1], ufoSalida[rN2][1], ufoSalida[rN2][1], ufoSalida[rN2][1]]
                }, 14000,
                Phaser.Easing.Linear.None, false, 10, 0, false).interpolation(function (v, k) {
                return Phaser.Math.catmullRomInterpolation(v, k);
            });


            this.tweenUfo.start();


            this.invaderBulletDos.onFire.add(function () {this.ufoShootS.play()},this);


            this.tweenUfo.onStart.add(function () {this.ufoS.play()}, this);
            //this.tweenUfo.onStart.add(function () { this.ufoFires()}, this);


            // Evento (funcion) que se dispara cada vez que termina el tween.
            this.tweenUfo.onComplete.add(function () {
                this.ufoS.stop()
            }, this);
            this.tweenUfo.onComplete.add(function () {
                this.ufo.kill()
            }, this);
            /*
             this.tweenUfo.onComplete.add(function () {
             this.ufo.revive()
             }, this);*/


            //onKilled Signal
            //Se pone 'events' por que onKilled pertenece a phaser/src/gameobjects/components/Events.js
            this.ufo.events.onKilled.add(function () {
                this.ufoS.stop()
            }, this);

        }

    },

    ufoFires: function () {
        var rN=Math.floor(Math.random()*(800-300+1)+300); //  Math.floor(Math.random()*(max-min+1)+min);
        this.invaderBulletDos.trackSprite(this.ufo,0,20,false);
        this.invaderBulletDos.fireRate = rN;
        // SOLAMENTE DISPARA SI ESTA VIVO EL UFO
        if(this.ufo.alive && this.invadersGroup.countLiving() > 1){
            this.invaderBulletDos.fireAtSprite(this.spaceship);


        }

    },

    enemyFires: function () {
        this.invaderBullet.onFire.add(function () {this.invaderShootS.play()},this);
        var naves = [];
        for (var i = 0; i < 60; i++){

            naves.push(this.invadersGroup.children[i]);
        }

        var navesVivas = [];
        for (i = 0; i < naves.length; i++) {
            // Si los elementos del array zombies están vivos
            if (naves[i].alive ){
                // Si están vivos los zombies los metemos al array zombiesAlive []
                navesVivas.push(naves[i]);
            }
        }
        var navesVivasRandom = navesVivas[Math.floor(Math.random() * navesVivas.length)];

        this.invaderBullet.trackSprite(navesVivasRandom,0,20,false);

        if (navesVivas.length > 0){

            //this.invaderBullet.fireAtSprite(this.spaceship);

            //***VAN JUNTAS
            this.invaderBullet.fireAngle = 90;
            this.invaderBullet.fire();
        }

        var firingTimerRandom = [
            400,
            600,
            800,
            1000,
            1200,
            1400
        ];
        var item = firingTimerRandom[Math.floor(Math.random() * firingTimerRandom.length)];
        // Esto significa que vamos a disparar cada 1000 ms o cada segundo
        this.firingTimer = this.time.now + item;
    },

    enemyHitsPlayer: function (player,bullet) {

        if(this.invadersGroup.countLiving() > 1){
            bullet.kill();
            var live;

            live = this.lives.getFirstAlive();

            if (live)
            {
                live.kill();
            }

            var explosionInvadersPrivate = this.explosionInvader.getFirstExists(false);
            explosionInvadersPrivate.reset(bullet.body.x,bullet.body.y + 20);
            explosionInvadersPrivate.play('explodeInvaders', 30,false,true);
            this.poofS.play();

            // When the player dies

            this.livesCounter--;

            if (this.livesCounter == 0){
                player.kill();

                this.playerDies();
            }
        }
    },

    playerHitsInvaders: function (enemy, bullet) {
        bullet.kill();

        //enemy.kill();
        enemy.damage(1);




        var explosionInvadersPrivate = this.explosionInvader.getFirstExists(false);
        explosionInvadersPrivate.reset(enemy.body.x + 20,enemy.body.y);
        explosionInvadersPrivate.play('explodeInvaders', 30,false,true);
        this.poofS.play();

        //Actualizamos el Score cada vez que muere un Invader
        this.scoreNumber+=50;

        this.scoreText.text = this.scoreString + this.scoreNumber;

        // Para que los tweened points empiecen del último número del score y no de 0
        this.tweenedPoints = this.scoreNumber;

        if (this.invadersGroup.countLiving() == 1 && this.spaceship.alive) {
            //score += 1000;
            //enemy.damage(0);
            this.youWin();
        }

        //this.scoreTween();

        // PARA QUE APAREZCA UN +50 CADA VEZ QUE MATAMOS UN INVADER
        // Lugar en donde aparecen los números. En este caso al centro de los Invaders
        /*
         var pointsAdded = this.add.text(enemy.body.x + 15, enemy.body.y + 15, '+50',
         {
         font: "28px Arial",
         fill: "#000",
         stroke: "#FFF",
         strokeThickness: 7
         });
         pointsAdded.anchor.set(0.5, 0.5);
         this.add.tween(pointsAdded).to({
         alpha: 0,
         // Queremos que los números se eleven 10 pixeles a partir del centro del enemigo
         y: enemy.body.y -10 }, 500, Phaser.Easing.Linear.None, true);
         //this.camera.shake(0.01, 100, true, Phaser.Camera.SHAKE_BOTH, true);

         */




    },

    campoDeFuerzaBulletCollision: function (campo,bullet) {

        campo.kill();
        bullet.kill();
        var haloAnimPrivate = this.halo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x + 10, bullet.body.y);
        haloAnimPrivate.play('halo',30,false,true);
        this.bulletHitOneS.play();

    },

    playerHitsInvadersCircular: function () {

        var aRX = [];
        while (aRX.length < 12) {                         //750 porque el máximo de nuestro mundo en x es 850. Damos tolerancia de 100 o al gusto
            var randomnumber2 = Math.floor(Math.random() * (600 - (-150) + 1) -150); //  Math.floor(Math.random()*(max-min+1)+min);
            var found2 = false;
            for (var i2 = 0; i2 < aRX.length; i2++) {
                if (aRX[i2] == randomnumber2) {
                    found2 = true;
                    break
                }
            }
            if (!found2) aRX[aRX.length] = randomnumber2;
        }
        var aRY = [];
        while (aRY.length < 12) {                         ////550 porque el máximo de nuestro mundo en y es 600. Damos tolerancia de 50 o al gusto
            randomnumber2 = Math.floor(Math.random() * (172 - (-50) + 1) - 50); //  Math.floor(Math.random()*(max-min+1)+min);
            found2 = false;
            for (i2 = 0; i2 < aRY.length; i2++) {
                if (aRY[i2] == randomnumber2) {
                    found2 = true;
                    break
                }
            }
            if (!found2) aRY[aRY.length] = randomnumber2;
        }
        var arr24 = [];
        while(arr24.length < 60){

            randomnumber2=Math.floor(Math.random()*(59+1)); //  Math.floor(Math.random()*(max-min+1)+min);
            found2=false;
            for(i2=0;i2<arr24.length;i2++){
                if(arr24[i2]==randomnumber2){found2=true;break}
            }
            if(!found2)arr24[arr24.length]=randomnumber2;
        }
        var invadersMoving = null;
        //Campo de fuerza Moving
        var campoDeFuerzaMoving = null;
        var campoDeFuerzaScale = null;

        for (var i = 0; i < 60; i++) {

            invadersMoving = this.add.tween(this.invadersGroup.children[i]);
            //invaderFall = this.add.tween(this.item);
            invadersMoving.to({

                x: [aRX[2],aRX[2],this.arrPositionsX[arr24[i]],aRX[2],aRX[2],this.arrPositionsX[arr24[i]]],
                y: [aRY[2],aRY[2],this.arrPositionsY[arr24[i]],aRY[2],aRY[2],this.arrPositionsY[arr24[i]]]
            }, 2000, Phaser.Easing.Linear.None, false, 10, 0, false).interpolation(function (v, k) {
                return Phaser.Math.catmullRomInterpolation(v, k);
            });

            invadersMoving.start();
            var growing = this.add.tween(this.invadersGroup.children[i].scale);
            growing.to({
                x:[1,.1,1.5,.1,1.5,1],
                y:[1,.1,1.5,.1,1.5,1]},2000, Phaser.Easing.Linear.None,false);
            growing.start();

            //
            campoDeFuerzaMoving = this.add.tween(this.campoDeFuerzaGroup.children[i]);
            //invaderFall = this.add.tween(this.item);
            campoDeFuerzaMoving.to({

                x: [aRX[2],aRX[2],this.arrPositionsX[arr24[i]],aRX[2],aRX[2],this.arrPositionsX[arr24[i]]],
                y: [aRY[2],aRY[2],this.arrPositionsY[arr24[i]],aRY[2],aRY[2],this.arrPositionsY[arr24[i]]]
            }, 2000, Phaser.Easing.Linear.None, false, 10, 0, false).interpolation(function (v, k) {
                return Phaser.Math.catmullRomInterpolation(v, k);
            });

            campoDeFuerzaMoving.start();
            campoDeFuerzaScale = this.add.tween(this.campoDeFuerzaGroup.children[i].scale);
            campoDeFuerzaScale.to({
                x:[1,.1,1.5,.1,1.5,1],
                y:[1,.1,1.5,.1,1.5,1]},2000, Phaser.Easing.Linear.None,false);
            campoDeFuerzaScale.start();
        }


    },

    randomFunctionDisparador: function () {

        // Movimientos
        this.playerHitsInvadersCircular();

        var arrayTime = [
            1000,
            2000,
            4000
        ];
        var x = Math.floor(Math.random()*(2+1));
        this.randomTimer = this.time.now + arrayTime[x];

    },

    playerHitsUfo: function (enemy, bullet) {
        bullet.kill();

        //enemy.kill();
        enemy.damage(1);


        //this.bulletHitOneS.play();

        if (enemy.alive == true){

            var haloAnimPrivate = this.halo.getFirstExists(false);
            haloAnimPrivate.reset(bullet.body.x, bullet.body.y);
            haloAnimPrivate.play('halo',30,false,true);
            this.bulletHitOneS.play();
        }

        if (enemy.alive == false){

            var explosionInvadersPrivate = this.explosionInvader.getFirstExists(false);
            explosionInvadersPrivate.reset(enemy.body.x + 20,enemy.body.y);
            explosionInvadersPrivate.play('explodeInvaders', 30,false,true);
            this.poofS.play();

            //Actualizamos el Score cada vez que muere un Invader
            this.scoreNumber+=300;

            this.scoreText.text = this.scoreString + this.scoreNumber;
            //this.scoreTween();

            // PARA QUE APAREZCA UN +50 CADA VEZ QUE MATAMOS UN INVADER
            // Lugar en donde aparecen los números. En este caso al centro de los Invaders
            var pointsAdded = this.add.text(enemy.body.x + 15, enemy.body.y + 15, ' +300',
                {
                    font: "38px KOMIKAX",
                    fill: "#df2342",
                    stroke: "#ffffff",
                    strokeThickness: 5
                });
            pointsAdded.anchor.set(0.5, 0.5);

            /*
             this.add.tween(pointsAdded).to({
             alpha: 0,
             // Queremos que los números se eleven 10 pixeles a partir del centro del enemigo
             y: enemy.body.y -10 }, 500, Phaser.Easing.Linear.None, true);
             this.camera.shake(0.01, 100, true, Phaser.Camera.SHAKE_BOTH, true);
             */

            var tweenA = this.add.tween(pointsAdded);
            tweenA.to({
                //alpha: 0,
                // Queremos que los números se eleven 10 pixeles a partir del centro del enemigo
                y: enemy.body.y -10,
                alpha: 0
            }, 1500, Phaser.Easing.Linear.None, false);
            tweenA.start();
        }
    },

    bulletToBulletCollision: function (bulletOne,bulletTwo) {

        bulletOne.kill();
        bulletTwo.kill();
        this.bulletToBulletSound.play();

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bulletTwo.body.x - 20, bulletTwo.body.y + 10);
        haloAnimPrivate.play('haloTwo',30,false,true);

    },

    playerDies: function () {
        var invader;

        for (var i = 0; i < 60; i++){
            invader = this.invadersGroup.children[i];
            invader.animations.add('win', [ 0, 1], 5, true);
            invader.animations.play('win');
        }

        this.ufoS.stop();
        this.gameOverS.play();
        this.gameOverTwoS.play();

        this.gameOverLogic();

    },

    invadersReachGround: function () {


        var invader;

        for (var i = 0; i < 60; i++){
            invader = this.invadersGroup.children[i];
            invader.animations.add('win', [ 0, 1], 5, true);
            invader.animations.play('win');
        }

        this.ufoS.stop();
        this.gameOverS.play();
        this.gameOverTwoS.play();

        this.gameOverLogic();



    },

    gameOverLogic: function () {
        this.world.add(this.modal);
        this.world.add(this.gameOverWooble);
        this.world.add(this.buttonReplay);
        //this.world.add(this.buttonNextChapter);
        this.world.add(this.buttonMenu);

        var wooble = this.add.tween(this.gameOverWooble.scale);
        wooble.to({
            //x= 503 y=302
            x: 1.05
        }, 500, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);
        wooble.start();

        var youLose = this.add.tween(this.gameOverWooble);
        youLose.to({
            //x= 503 y=302
            x: [512,512],
            y: [0,164]
        }, 2000, Phaser.Easing.Elastic.Out, false, 50, 0, false);
        youLose.start();


        //x= 503 y=302
        var modalMoving = this.add.tween(this.modal);
        modalMoving.to({
            //x= 503 y=302
            x: [503,503],
            y: [0,302]
        }, 2000, Phaser.Easing.Elastic.Out, false, 50, 0, false);
        modalMoving.start();

        var buttonReplayMoving = this.add.tween(this.buttonReplay);
        buttonReplayMoving.to({
            //                              x= 382 y=436.50
            x: [382,382],
            y: [0,436.5]
        }, 2000, Phaser.Easing.Elastic.Out, false, 50, 0, false);
        buttonReplayMoving.start();

        var buttonNextChapterMoving = this.add.tween(this.buttonNextChapter);
        buttonNextChapterMoving.to({
            //                             x=512  y=384.50
            x: [512,512],
            y: [0,384.5]
        }, 2000, Phaser.Easing.Elastic.Out, false, 50, 0, false);
        buttonNextChapterMoving.start();

        var buttonMenuMoving = this.add.tween(this.buttonMenu);
        buttonMenuMoving.to({
            //                             x=638  y=436.50
            x: [638,638],
            y: [0,436.5]
        }, 2000, Phaser.Easing.Elastic.Out, false, 50, 0, false);
        buttonMenuMoving.start();

        //this.game.world.alpha = .5;
        this.pianoFast.stop();

    },

    youWin: function () {

        this.world.add(this.modal);
        this.world.add(this.youWinWooble);
        this.world.add(this.buttonReplay);
        this.world.add(this.buttonNextChapter);
        this.world.add(this.buttonMenu);

        Invaders.youWin7 = true;

        var wooble = this.add.tween(this.youWinWooble.scale);
        wooble.to({
            //x= 503 y=302
            x: 1.05
        }, 500, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);
        wooble.start();

        var youWin = this.add.tween(this.youWinWooble);
        youWin.to({
            //x= 503 y=302
            x: [500,500],
            y: [0,161]
        }, 2000, Phaser.Easing.Elastic.Out, false, 50, 0, false);
        youWin.start();


        //x= 503 y=302
        var modalMoving = this.add.tween(this.modal);
        modalMoving.to({
            //x= 503 y=302
            x: [503,503],
            y: [0,302]
        }, 2000, Phaser.Easing.Elastic.Out, false, 50, 0, false);
        modalMoving.start();

        var buttonReplayMoving = this.add.tween(this.buttonReplay);
        buttonReplayMoving.to({
            //                              x= 382 y=436.50
            x: [382,382],
            y: [0,436.5]
        }, 2000, Phaser.Easing.Elastic.Out, false, 50, 0, false);
        buttonReplayMoving.start();

        var buttonNextChapterMoving = this.add.tween(this.buttonNextChapter);
        buttonNextChapterMoving.to({
            //                             x=512  y=384.50
            x: [512,512],
            y: [0,384.5]
        }, 2000, Phaser.Easing.Elastic.Out, false, 50, 0, false);
        buttonNextChapterMoving.start();

        var buttonMenuMoving = this.add.tween(this.buttonMenu);
        buttonMenuMoving.to({
            //                             x=638  y=436.50
            x: [638,638],
            y: [0,436.5]
        }, 2000, Phaser.Easing.Elastic.Out, false, 50, 0, false);
        buttonMenuMoving.start();

        this.ufoS.stop();
        this.pianoFast.stop();
        this.youWinS.play();

    },

    replayGame: function () {

        this.clickS.play();
        this.state.restart(true,false);

    },
    nextChapter: function () {

        this.state.start('MechanicEight');
        this.clickS.play();
    },
    menu: function () {
        this.ufoS.stop();
        this.pianoFast.stop();
        this.state.start('MechanicsMenu');
        this.clickS.play();
    },

    //////////////////
    // Horizontal 1 //
    //////////////////
    overlapCollision1: function () {

        var pixeles = [];
        for (var i = 0; i < 196; i++){

            pixeles.push(this.campoBlancoNoPhysics1.children[i]);
        }

        var pixelesVivos = [];
        for (i = 0; i < 196; i++) {
            // Si los elementos del array zombies están vivos
            if (pixeles[i].alive ){
                // Si están vivos los zombies los metemos al array zombiesAlive []
                pixelesVivos.push(pixeles[i]);
            }
        }

        var arr24 = [];
        //                  Tiene que ser igual al valor de i en el loop ---- 4,7,8,14
        while(arr24.length < 14){
            var randomnumber2=Math.floor(Math.random()* pixelesVivos.length); //  Math.floor(Math.random()*(max-min+1)+min);
            var found2=false;
            for(var i2=0;i2<arr24.length;i2++){
                if(arr24[i2]==randomnumber2){found2=true;break}
            }
            if(!found2)arr24[arr24.length]=randomnumber2;
        }

        for (i = 0; i < 14; i++) {
            if (pixelesVivos.length > 0){
                pixelesVivos[arr24[i]].kill();

            }
        }
    },
    pixeles1: function () {

        var playerbmd = this.add.bitmapData(83, 5);
        playerbmd.ctx.rect(0, 0, 83, 5);
        playerbmd.ctx.fillStyle = "#0f0";
        playerbmd.ctx.fill();

        var x = 160;
        var pixel = this.campoVerde1.create(x, 460, playerbmd);
        pixel.alpha = 0;
    },
    bitMapDataShieldNoPhysics1: function () {

        var platformbmd = this.add.bitmapData(3, 3);
        platformbmd.ctx.rect(0, 0, 3, 3);
        platformbmd.ctx.fillStyle = "#fff";
        platformbmd.ctx.fill();

        var masIgualCinco = 0;
        var updateY = 482;
        var updateX = 160;
        for (var i = 0; i < 7; i++){
            for (var j = 0; j < 28; j++) {
                var pixelA = this.campoBlancoNoPhysics1.create(updateX + masIgualCinco, updateY, platformbmd);

                masIgualCinco+=3;
            }
            masIgualCinco=0;
            updateY-=3;
        }
    },
    pixelVerdeCollision1: function (shield,bullet) {

        this.overlapCollision1();
        bullet.kill();
        //shield.kill();

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x - 20, bullet.body.y + 40);
        haloAnimPrivate.play('haloTwo',30,false,true);
    },

    //////////////////
    // Verticales 1 //
    //////////////////
    overlapCollision2: function () {

        var pixeles = [];
        for (var i = 0; i < 96; i++){

            pixeles.push(this.campoBlancoNoPhysics2.children[i]);
        }

        var pixelesVivos = [];
        for (i = 0; i < 96; i++) {
            // Si los elementos del array zombies están vivos
            if (pixeles[i].alive ){
                // Si están vivos los zombies los metemos al array zombiesAlive []
                pixelesVivos.push(pixeles[i]);
            }
        }

        var arr24 = [];
        //                  Tiene que ser igual al valor de i en el loop ---- 4,7,8,14
        while(arr24.length < 12){
            var randomnumber2=Math.floor(Math.random()* pixelesVivos.length); //  Math.floor(Math.random()*(max-min+1)+min);
            var found2=false;
            for(var i2=0;i2<arr24.length;i2++){
                if(arr24[i2]==randomnumber2){found2=true;break}
            }
            if(!found2)arr24[arr24.length]=randomnumber2;
        }

        for (i = 0; i < 12; i++) {
            if (pixelesVivos.length > 0){
                pixelesVivos[arr24[i]].kill();

            }
        }

    },
    pixeles2: function () {

        var playerbmd = this.add.bitmapData(18, 5);
        playerbmd.ctx.rect(0, 0, 18, 5);
        playerbmd.ctx.fillStyle = "#0f0";
        playerbmd.ctx.fill();

        var x = 160;
        var pixel = this.campoVerde2.create(x , 500, playerbmd);
        pixel.alpha = 0;
    },
    bitMapDataShieldNoPhysics2: function () {

        var platformbmd = this.add.bitmapData(3, 3);
        platformbmd.ctx.rect(0, 0, 3, 3);
        platformbmd.ctx.fillStyle = "#fff";
        platformbmd.ctx.fill();

        var masIgualCinco = 0;
        var updateY = 530; //+30

        for (var i = 0; i < 16; i++){

            for (var j = 0; j < 6; j++) {

                var updateX = 160;
                var pixelA = this.campoBlancoNoPhysics2.create(updateX + masIgualCinco, updateY, platformbmd);
                masIgualCinco+=3;
                //updateX+=5;

            }
            masIgualCinco=0;
            updateY-=3;
        }
    },
    pixelVerdeCollision2: function (shield,bullet) {

        this.overlapCollision2();
        bullet.kill();
        //shield.kill();

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x - 20, bullet.body.y + 40);
        haloAnimPrivate.play('haloTwo',30,false,true);
    },

    overlapCollision3: function () {

        var pixeles = [];
        for (var i = 0; i < 96; i++){

            pixeles.push(this.campoBlancoNoPhysics3.children[i]);
        }

        var pixelesVivos = [];
        for (i = 0; i < 96; i++) {
            // Si los elementos del array zombies están vivos
            if (pixeles[i].alive ){
                // Si están vivos los zombies los metemos al array zombiesAlive []
                pixelesVivos.push(pixeles[i]);
            }
        }

        var arr24 = [];
        //                  Tiene que ser igual al valor de i en el loop ---- 4,7,8,14
        while(arr24.length < 12){
            var randomnumber2=Math.floor(Math.random()* pixelesVivos.length); //  Math.floor(Math.random()*(max-min+1)+min);
            var found2=false;
            for(var i2=0;i2<arr24.length;i2++){
                if(arr24[i2]==randomnumber2){found2=true;break}
            }
            if(!found2)arr24[arr24.length]=randomnumber2;
        }

        for (i = 0; i < 12; i++) {
            if (pixelesVivos.length > 0){
                pixelesVivos[arr24[i]].kill();

            }
        }

    },
    pixeles3: function () {

        var playerbmd = this.add.bitmapData(18, 5);
        playerbmd.ctx.rect(0, 0, 18, 5);
        playerbmd.ctx.fillStyle = "#0f0";
        playerbmd.ctx.fill();

        var x = 226;
        var pixel = this.campoVerde3.create(x, 500, playerbmd);
        pixel.alpha = 0;

    },
    bitMapDataShieldNoPhysics3: function () {

        var platformbmd = this.add.bitmapData(3, 3);
        platformbmd.ctx.rect(0, 0, 3, 3);
        platformbmd.ctx.fillStyle = "#fff";
        platformbmd.ctx.fill();

        var masIgualCinco = 0;
        var updateY = 530; //+30
        //var updateX = 160;

        for (var i = 0; i < 16; i++){

            for (var j = 0; j < 6; j++) {
                var updateX = 226;
                var pixelA = this.campoBlancoNoPhysics3.create(updateX + masIgualCinco, updateY, platformbmd);
                masIgualCinco+=3;
            }
            masIgualCinco=0;
            updateY-=3;
        }
    },
    pixelVerdeCollision3: function (shield,bullet) {

        this.overlapCollision3();
        bullet.kill();
        //shield.kill();

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x - 20, bullet.body.y + 40);
        haloAnimPrivate.play('haloTwo',30,false,true);
    },

    //////////////////
    // Horizontal 2 //
    //////////////////
    overlapCollision4: function () {

        var pixeles = [];
        for (var i = 0; i < 196; i++){

            pixeles.push(this.campoBlancoNoPhysics4.children[i]);
        }

        var pixelesVivos = [];
        for (i = 0; i < 196; i++) {
            // Si los elementos del array zombies están vivos
            if (pixeles[i].alive ){
                // Si están vivos los zombies los metemos al array zombiesAlive []
                pixelesVivos.push(pixeles[i]);
            }
        }

        var arr24 = [];
        //                  Tiene que ser igual al valor de i en el loop ---- 4,7,8,14
        while(arr24.length < 14){
            var randomnumber2=Math.floor(Math.random()* pixelesVivos.length); //  Math.floor(Math.random()*(max-min+1)+min);
            var found2=false;
            for(var i2=0;i2<arr24.length;i2++){
                if(arr24[i2]==randomnumber2){found2=true;break}
            }
            if(!found2)arr24[arr24.length]=randomnumber2;
        }

        for (i = 0; i < 14; i++) {
            if (pixelesVivos.length > 0){
                pixelesVivos[arr24[i]].kill();

            }
        }
    },
    pixeles4: function () {

        var playerbmd = this.add.bitmapData(83, 5);
        playerbmd.ctx.rect(0, 0, 83, 5);
        playerbmd.ctx.fillStyle = "#0f0";
        playerbmd.ctx.fill();

        var x = 360;
        var pixel = this.campoVerde4.create(x, 460, playerbmd);
        pixel.alpha = 0;
    },
    bitMapDataShieldNoPhysics4: function () {

        var platformbmd = this.add.bitmapData(3, 3);
        platformbmd.ctx.rect(0, 0, 3, 3);
        platformbmd.ctx.fillStyle = "#fff";
        platformbmd.ctx.fill();

        var masIgualCinco = 0;
        var updateY = 482;
        var updateX = 360;
        for (var i = 0; i < 7; i++){

            for (var j = 0; j < 28; j++) {

                var pixelA = this.campoBlancoNoPhysics4.create(updateX + masIgualCinco, updateY, platformbmd);
                masIgualCinco+=3;
            }
            masIgualCinco=0;
            updateY-=3;
        }
    },
    pixelVerdeCollision4: function (shield,bullet) {

        this.overlapCollision4();
        bullet.kill();
        //shield.kill();

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x - 20, bullet.body.y + 40);
        haloAnimPrivate.play('haloTwo',30,false,true);
    },

    //////////////////
    // Verticales 2 //
    //////////////////
    overlapCollision5: function () {

        var pixeles = [];
        for (var i = 0; i < 96; i++){

            pixeles.push(this.campoBlancoNoPhysics5.children[i]);
        }

        var pixelesVivos = [];
        for (i = 0; i < 96; i++) {
            // Si los elementos del array zombies están vivos
            if (pixeles[i].alive ){
                // Si están vivos los zombies los metemos al array zombiesAlive []
                pixelesVivos.push(pixeles[i]);
            }
        }

        var arr24 = [];
        //                  Tiene que ser igual al valor de i en el loop ---- 4,7,8,14
        while(arr24.length < 12){
            var randomnumber2=Math.floor(Math.random()* pixelesVivos.length); //  Math.floor(Math.random()*(max-min+1)+min);
            var found2=false;
            for(var i2=0;i2<arr24.length;i2++){
                if(arr24[i2]==randomnumber2){found2=true;break}
            }
            if(!found2)arr24[arr24.length]=randomnumber2;
        }

        for (i = 0; i < 12; i++) {
            if (pixelesVivos.length > 0){
                pixelesVivos[arr24[i]].kill();

            }
        }

    },
    pixeles5: function () {

        var playerbmd = this.add.bitmapData(18, 5);
        playerbmd.ctx.rect(0, 0, 18, 5);
        playerbmd.ctx.fillStyle = "#0f0";
        playerbmd.ctx.fill();

        var x = 360;
        var pixel = this.campoVerde5.create(x, 500, playerbmd);
        pixel.alpha = 0;
    },
    bitMapDataShieldNoPhysics5: function () {

        var platformbmd = this.add.bitmapData(3, 3);
        platformbmd.ctx.rect(0, 0, 3, 3);
        platformbmd.ctx.fillStyle = "#fff";
        platformbmd.ctx.fill();

        var masIgualCinco = 0;
        var updateY = 530; //+30

        for (var i = 0; i < 16; i++){

            for (var j = 0; j < 6; j++) {

                var updateX = 360;
                var pixelA = this.campoBlancoNoPhysics5.create(updateX + masIgualCinco, updateY, platformbmd);
                pixelA.health = 2;
                // UNO para un pixel, 5 para cinco pixeles, etc.
                masIgualCinco+=3;
            }
            masIgualCinco=0;
            updateY-=3;
        }
    },
    pixelVerdeCollision5: function (shield,bullet) {

        this.overlapCollision5();
        bullet.kill();

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x - 20, bullet.body.y + 40);
        haloAnimPrivate.play('haloTwo',30,false,true);
    },

    overlapCollision6: function () {

        var pixeles = [];
        for (var i = 0; i < 96; i++){

            pixeles.push(this.campoBlancoNoPhysics6.children[i]);
        }

        var pixelesVivos = [];
        for (i = 0; i < 96; i++) {
            // Si los elementos del array zombies están vivos
            if (pixeles[i].alive ){
                // Si están vivos los zombies los metemos al array zombiesAlive []
                pixelesVivos.push(pixeles[i]);
            }
        }

        var arr24 = [];
        //                  Tiene que ser igual al valor de i en el loop ---- 4,7,8,14
        while(arr24.length < 12){
            var randomnumber2=Math.floor(Math.random()* pixelesVivos.length); //  Math.floor(Math.random()*(max-min+1)+min);
            var found2=false;
            for(var i2=0;i2<arr24.length;i2++){
                if(arr24[i2]==randomnumber2){found2=true;break}
            }
            if(!found2)arr24[arr24.length]=randomnumber2;
        }

        for (i = 0; i < 12; i++) {
            if (pixelesVivos.length > 0){
                pixelesVivos[arr24[i]].kill();

            }
        }

    },
    pixeles6: function () {

        var playerbmd = this.add.bitmapData(18, 5);
        playerbmd.ctx.rect(0, 0, 18, 5);
        playerbmd.ctx.fillStyle = "#0f0";
        playerbmd.ctx.fill();

        var x = 426;
        var pixel = this.campoVerde6.create(x, 500, playerbmd);
        pixel.alpha = 0;
    },
    bitMapDataShieldNoPhysics6: function () {

        var platformbmd = this.add.bitmapData(3, 3);
        platformbmd.ctx.rect(0, 0, 3, 3);
        platformbmd.ctx.fillStyle = "#fff";
        platformbmd.ctx.fill();

        var masIgualCinco = 0;
        var updateY = 530; //+30
        //var updateX = 160;

        for (var i = 0; i < 16; i++){

            for (var j = 0; j < 6; j++) {

                var updateX = 426;
                var pixelA = this.campoBlancoNoPhysics6.create(updateX + masIgualCinco, updateY, platformbmd);
                pixelA.health = 2;
                // UNO para un pixel, 5 para cinco pixeles, etc.
                masIgualCinco+=3;
            }
            masIgualCinco=0;
            updateY-=3;
        }
    },
    pixelVerdeCollision6: function (shield,bullet) {

        this.overlapCollision6();
        bullet.kill();
        //shield.kill();

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x - 20, bullet.body.y + 40);
        haloAnimPrivate.play('haloTwo',30,false,true);
    },

    //////////////////
    // Horizontal 3 //
    //////////////////
    overlapCollision7: function () {

        var pixeles = [];
        for (var i = 0; i < 196; i++){

            pixeles.push(this.campoBlancoNoPhysics7.children[i]);
        }

        var pixelesVivos = [];
        for (i = 0; i < 196; i++) {
            // Si los elementos del array zombies están vivos
            if (pixeles[i].alive ){
                // Si están vivos los zombies los metemos al array zombiesAlive []
                pixelesVivos.push(pixeles[i]);
            }
        }

        var arr24 = [];
        //                  Tiene que ser igual al valor de i en el loop ---- 4,7,8,14
        while(arr24.length < 14){
            var randomnumber2=Math.floor(Math.random()* pixelesVivos.length); //  Math.floor(Math.random()*(max-min+1)+min);
            var found2=false;
            for(var i2=0;i2<arr24.length;i2++){
                if(arr24[i2]==randomnumber2){found2=true;break}
            }
            if(!found2)arr24[arr24.length]=randomnumber2;
        }

        for (i = 0; i < 14; i++) {
            if (pixelesVivos.length > 0){
                pixelesVivos[arr24[i]].kill();

            }
        }
    },
    pixeles7: function () {

        var playerbmd = this.add.bitmapData(83, 5);
        playerbmd.ctx.rect(0, 0, 83, 5);
        playerbmd.ctx.fillStyle = "#0f0";
        playerbmd.ctx.fill();

        var x = 560;
        var pixel = this.campoVerde7.create(x, 460, playerbmd);
        pixel.alpha = 0;
    },
    bitMapDataShieldNoPhysics7: function () {

        var platformbmd = this.add.bitmapData(3, 3);
        platformbmd.ctx.rect(0, 0, 3, 3);
        platformbmd.ctx.fillStyle = "#fff";
        platformbmd.ctx.fill();

        var masIgualCinco = 0;
        var updateY = 482;
        var updateX = 560;
        for (var i = 0; i < 7; i++){
            for (var j = 0; j < 28; j++) {

                var pixelA = this.campoBlancoNoPhysics7.create(updateX + masIgualCinco, updateY, platformbmd);
                masIgualCinco+=3;
            }
            masIgualCinco=0;
            updateY-=3;
        }
    },
    pixelVerdeCollision7: function (shield,bullet) {

        this.overlapCollision7();
        bullet.kill();

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x - 20, bullet.body.y + 40);
        haloAnimPrivate.play('haloTwo',30,false,true);
    },

    //////////////////
    // Verticales 3 //
    //////////////////
    overlapCollision8: function () {

        var pixeles = [];
        for (var i = 0; i < 96; i++){

            pixeles.push(this.campoBlancoNoPhysics8.children[i]);
        }

        var pixelesVivos = [];
        for (i = 0; i < 96; i++) {
            // Si los elementos del array zombies están vivos
            if (pixeles[i].alive ){
                // Si están vivos los zombies los metemos al array zombiesAlive []
                pixelesVivos.push(pixeles[i]);
            }
        }

        var arr24 = [];
        //                  Tiene que ser igual al valor de i en el loop ---- 4,7,8,14
        while(arr24.length < 12){
            var randomnumber2=Math.floor(Math.random()* pixelesVivos.length); //  Math.floor(Math.random()*(max-min+1)+min);
            var found2=false;
            for(var i2=0;i2<arr24.length;i2++){
                if(arr24[i2]==randomnumber2){found2=true;break}
            }
            if(!found2)arr24[arr24.length]=randomnumber2;
        }

        for (i = 0; i < 12; i++) {
            if (pixelesVivos.length > 0){
                pixelesVivos[arr24[i]].kill();
            }
        }

    },
    pixeles8: function () {

        var playerbmd = this.add.bitmapData(18, 5);
        playerbmd.ctx.rect(0, 0, 18, 5);
        playerbmd.ctx.fillStyle = "#0f0";
        playerbmd.ctx.fill();

        var x = 560;
        var pixel = this.campoVerde8.create(x, 500, playerbmd);
        pixel.alpha = 0;
    },
    bitMapDataShieldNoPhysics8: function () {

        var platformbmd = this.add.bitmapData(3, 3);
        platformbmd.ctx.rect(0, 0, 3, 3);
        platformbmd.ctx.fillStyle = "#fff";
        platformbmd.ctx.fill();

        var masIgualCinco = 0;
        var updateY = 530; //+30

        for (var i = 0; i < 16; i++){

            for (var j = 0; j < 6; j++) {

                var updateX = 560;
                var pixelA = this.campoBlancoNoPhysics8.create(updateX + masIgualCinco, updateY, platformbmd);
                // UNO para un pixel, 5 para cinco pixeles, etc.
                masIgualCinco+=3;
            }
            masIgualCinco=0;
            updateY-=3;
        }
    },
    pixelVerdeCollision8: function (shield,bullet) {

        this.overlapCollision8();
        bullet.kill();

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x - 20, bullet.body.y + 40);
        haloAnimPrivate.play('haloTwo',30,false,true);
    },

    overlapCollision9: function () {

        var pixeles = [];
        for (var i = 0; i < 96; i++){

            pixeles.push(this.campoBlancoNoPhysics9.children[i]);
        }

        var pixelesVivos = [];
        for (i = 0; i < 96; i++) {
            // Si los elementos del array zombies están vivos
            if (pixeles[i].alive ){
                // Si están vivos los zombies los metemos al array zombiesAlive []
                pixelesVivos.push(pixeles[i]);
            }
        }

        var arr24 = [];
        //                  Tiene que ser igual al valor de i en el loop ---- 4,7,8,14
        while(arr24.length < 12){
            var randomnumber2=Math.floor(Math.random()* pixelesVivos.length); //  Math.floor(Math.random()*(max-min+1)+min);
            var found2=false;
            for(var i2=0;i2<arr24.length;i2++){
                if(arr24[i2]==randomnumber2){found2=true;break}
            }
            if(!found2)arr24[arr24.length]=randomnumber2;
        }

        for (i = 0; i < 12; i++) {
            if (pixelesVivos.length > 0){
                pixelesVivos[arr24[i]].kill();
            }
        }

    },
    pixeles9: function () {

        var playerbmd = this.add.bitmapData(18, 5);
        playerbmd.ctx.rect(0, 0, 18, 5);
        playerbmd.ctx.fillStyle = "#0f0";
        playerbmd.ctx.fill();

        var x = 626;
        var pixel = this.campoVerde9.create(x, 500, playerbmd);
        pixel.alpha = 0;
    },
    bitMapDataShieldNoPhysics9: function () {

        var platformbmd = this.add.bitmapData(3, 3);
        platformbmd.ctx.rect(0, 0, 3, 3);
        platformbmd.ctx.fillStyle = "#fff";
        platformbmd.ctx.fill();

        var masIgualCinco = 0;
        var updateY = 530; //+30

        for (var i = 0; i < 16; i++){

            for (var j = 0; j < 6; j++) {

                var updateX = 626;
                var pixelA = this.campoBlancoNoPhysics9.create(updateX + masIgualCinco, updateY, platformbmd);
                // UNO para un pixel, 5 para cinco pixeles, etc.
                masIgualCinco+=3;
            }
            masIgualCinco=0;
            updateY-=3;
        }
    },
    pixelVerdeCollision9: function (shield,bullet) {

        this.overlapCollision9();
        bullet.kill();

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x - 20, bullet.body.y + 40);
        haloAnimPrivate.play('haloTwo',30,false,true);
    },

    //////////////////
    // Horizontal 4 //
    //////////////////
    overlapCollision10: function () {

        var pixeles = [];
        for (var i = 0; i < 196; i++){

            pixeles.push(this.campoBlancoNoPhysics10.children[i]);
        }

        var pixelesVivos = [];
        for (i = 0; i < 196; i++) {
            // Si los elementos del array zombies están vivos
            if (pixeles[i].alive ){
                // Si están vivos los zombies los metemos al array zombiesAlive []
                pixelesVivos.push(pixeles[i]);
            }
        }

        var arr24 = [];
        //                  Tiene que ser igual al valor de i en el loop ---- 4,7,8,14
        while(arr24.length < 14){
            var randomnumber2=Math.floor(Math.random()* pixelesVivos.length); //  Math.floor(Math.random()*(max-min+1)+min);
            var found2=false;
            for(var i2=0;i2<arr24.length;i2++){
                if(arr24[i2]==randomnumber2){found2=true;break}
            }
            if(!found2)arr24[arr24.length]=randomnumber2;
        }

        for (i = 0; i < 14; i++) {
            if (pixelesVivos.length > 0){
                pixelesVivos[arr24[i]].kill();
            }
        }
    },
    pixeles10: function () {

        var playerbmd = this.add.bitmapData(83, 5);
        playerbmd.ctx.rect(0, 0, 83, 5);
        playerbmd.ctx.fillStyle = "#0f0";
        playerbmd.ctx.fill();

        var x = 760;
        var pixel = this.campoVerde10.create(x , 460, playerbmd);
        pixel.alpha = 0;
    },
    bitMapDataShieldNoPhysics10: function () {

        var platformbmd = this.add.bitmapData(3, 3);
        platformbmd.ctx.rect(0, 0, 3, 3);
        platformbmd.ctx.fillStyle = "#fff";
        platformbmd.ctx.fill();

        var masIgualCinco = 0;
        var updateY = 482;
        var updateX = 760;
        for (var i = 0; i < 7; i++){
            for (var j = 0; j < 28; j++) {
                var pixelA = this.campoBlancoNoPhysics10.create(updateX + masIgualCinco, updateY, platformbmd);
                masIgualCinco+=3;
            }
            masIgualCinco=0;
            updateY-=3;
        }
    },
    pixelVerdeCollision10: function (shield,bullet) {

        this.overlapCollision10();
        bullet.kill();

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x - 20, bullet.body.y + 40);
        haloAnimPrivate.play('haloTwo',30,false,true);
    },

    //////////////////
    // Verticales 4 //
    //////////////////
    overlapCollision11: function () {
        var pixeles = [];
        for (var i = 0; i < 96; i++){

            pixeles.push(this.campoBlancoNoPhysics11.children[i]);
        }

        var pixelesVivos = [];
        for (i = 0; i < 96; i++) {
            // Si los elementos del array zombies están vivos
            if (pixeles[i].alive ){
                // Si están vivos los zombies los metemos al array zombiesAlive []
                pixelesVivos.push(pixeles[i]);
            }
        }

        var arr24 = [];
        //                  Tiene que ser igual al valor de i en el loop ---- 4,7,8,14
        while(arr24.length < 12){
            var randomnumber2=Math.floor(Math.random()* pixelesVivos.length); //  Math.floor(Math.random()*(max-min+1)+min);
            var found2=false;
            for(var i2=0;i2<arr24.length;i2++){
                if(arr24[i2]==randomnumber2){found2=true;break}
            }
            if(!found2)arr24[arr24.length]=randomnumber2;
        }

        for (i = 0; i < 12; i++) {
            if (pixelesVivos.length > 0){
                pixelesVivos[arr24[i]].kill();

            }
        }

    },
    pixeles11: function () {

        var playerbmd = this.add.bitmapData(18, 5);
        playerbmd.ctx.rect(0, 0, 18, 5);
        playerbmd.ctx.fillStyle = "#0f0";
        playerbmd.ctx.fill();

        var x = 760;
        var pixel = this.campoVerde11.create(x, 500, playerbmd);
        pixel.alpha = 0;
    },
    bitMapDataShieldNoPhysics11: function () {

        var platformbmd = this.add.bitmapData(3, 3);
        platformbmd.ctx.rect(0, 0, 3, 3);
        platformbmd.ctx.fillStyle = "#fff";
        platformbmd.ctx.fill();

        var masIgualCinco = 0;
        var updateY = 530; //+30
        for (var i = 0; i < 16; i++){

            for (var j = 0; j < 6; j++) {

                var updateX = 760;
                var pixelA = this.campoBlancoNoPhysics11.create(updateX + masIgualCinco, updateY, platformbmd);
                // UNO para un pixel, 5 para cinco pixeles, etc.
                masIgualCinco+=3;
            }
            masIgualCinco=0;
            updateY-=3;
        }
    },
    pixelVerdeCollision11: function (shield,bullet) {

        this.overlapCollision11();
        bullet.kill();

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x - 20, bullet.body.y + 40);
        haloAnimPrivate.play('haloTwo',30,false,true);
    },

    overlapCollision12: function () {

        var pixeles = [];
        for (var i = 0; i < 96; i++){

            pixeles.push(this.campoBlancoNoPhysics12.children[i]);
        }

        var pixelesVivos = [];
        for (i = 0; i < 96; i++) {
            // Si los elementos del array zombies están vivos
            if (pixeles[i].alive ){
                // Si están vivos los zombies los metemos al array zombiesAlive []
                pixelesVivos.push(pixeles[i]);
            }
        }

        var arr24 = [];
        //                  Tiene que ser igual al valor de i en el loop ---- 4,7,8,14
        while(arr24.length < 12){
            var randomnumber2=Math.floor(Math.random()* pixelesVivos.length); //  Math.floor(Math.random()*(max-min+1)+min);
            var found2=false;
            for(var i2=0;i2<arr24.length;i2++){
                if(arr24[i2]==randomnumber2){found2=true;break}
            }
            if(!found2)arr24[arr24.length]=randomnumber2;
        }

        for (i = 0; i < 12; i++) {
            if (pixelesVivos.length > 0){
                pixelesVivos[arr24[i]].kill();

            }
        }

    },
    pixeles12: function () {

        var playerbmd = this.add.bitmapData(18, 5);
        playerbmd.ctx.rect(0, 0, 18, 5);
        playerbmd.ctx.fillStyle = "#0f0";
        playerbmd.ctx.fill();

        var x = 826;
        var pixel = this.campoVerde12.create(x, 500, playerbmd);
        pixel.alpha = 0;
    },
    bitMapDataShieldNoPhysics12: function () {

        var platformbmd = this.add.bitmapData(3, 3);
        platformbmd.ctx.rect(0, 0, 3, 3);
        platformbmd.ctx.fillStyle = "#fff";
        platformbmd.ctx.fill();

        var masIgualCinco = 0;
        var updateY = 530; //+30

        for (var i = 0; i < 16; i++){

            for (var j = 0; j < 6; j++) {

                var updateX = 826;
                var pixelA = this.campoBlancoNoPhysics12.create(updateX + masIgualCinco, updateY, platformbmd);
                // UNO para un pixel, 5 para cinco pixeles, etc.
                masIgualCinco+=3;
            }
            masIgualCinco=0;
            updateY-=3;
        }
    },
    pixelVerdeCollision12: function (shield,bullet) {

        this.overlapCollision12();
        bullet.kill();

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x - 20, bullet.body.y + 40);
        haloAnimPrivate.play('haloTwo',30,false,true);
    },

    update: function () {

        if (this.spaceship.alive && this.counter < 264){
            // Empieza la funciòn después de 2 segundos
            if (this.game.time.totalElapsedSeconds().toFixed(0) > 2){
                if (this.time.now > this.randomTimer){
                    //Disparador de funciones
                    this.randomFunctionDisparador();
                }
            }
        }

        /////////////
        // Campo 1 //
        /////////////

        if (this.campoBlancoNoPhysics1.countLiving() === 0) {
            //this.campoVerde1.callAll('kill');
            //this.campoVerde1.forEach(function (c) { c.kill(); },this);
            this.campoVerde1.forEachAlive(
                function(c) {
                    c.kill();
                },
                this
            );
        }

        if (this.campoBlancoNoPhysics2.countLiving() === 0) {
            this.campoVerde2.forEachAlive(
                function(c) {
                    c.kill();
                },
                this
            );
        }

        if (this.campoBlancoNoPhysics3.countLiving() === 0) {
            this.campoVerde3.forEachAlive(
                function(c) {
                    c.kill();
                },
                this
            );
        }

        /////////////
        // Campo 2 //
        /////////////
        if (this.campoBlancoNoPhysics4.countLiving() === 0) {
            this.campoVerde4.forEachAlive(
                function(c) {
                    c.kill();
                },
                this
            );
        }
        if (this.campoBlancoNoPhysics5.countLiving() === 0) {
            this.campoVerde5.forEachAlive(
                function(c) {
                    c.kill();
                },
                this
            );
        }
        if (this.campoBlancoNoPhysics6.countLiving() === 0) {
            this.campoVerde6.forEachAlive(
                function(c) {
                    c.kill();
                },
                this
            );
        }

        /////////////
        // Campo 3 //
        /////////////
        if (this.campoBlancoNoPhysics7.countLiving() === 0) {
            this.campoVerde7.forEachAlive(
                function(c) {
                    c.kill();
                },
                this
            );
        }
        if (this.campoBlancoNoPhysics8.countLiving() === 0) {
            this.campoVerde8.forEachAlive(
                function(c) {
                    c.kill();
                },
                this
            );
        }
        if (this.campoBlancoNoPhysics9.countLiving() === 0) {
            this.campoVerde9.forEachAlive(
                function(c) {
                    c.kill();
                },
                this
            );
        }

        /////////////
        // Campo 4 //
        /////////////
        if (this.campoBlancoNoPhysics10.countLiving() === 0) {
            this.campoVerde10.forEachAlive(
                function(c) {
                    c.kill();
                },
                this
            );
        }
        if (this.campoBlancoNoPhysics11.countLiving() === 0) {
            this.campoVerde11.forEachAlive(
                function(c) {
                    c.kill();
                },
                this
            );
        }
        if (this.campoBlancoNoPhysics12.countLiving() === 0) {
            this.campoVerde12.forEachAlive(
                function(c) {
                    c.kill();
                },
                this
            );
        }

        //*** Hero Shield Collision
        this.physics.arcade.overlap(
            this.campoVerde1,
            this.bulletRed.bullets,
            this.pixelVerdeCollision1,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde2,
            this.bulletRed.bullets,
            this.pixelVerdeCollision2,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde3,
            this.bulletRed.bullets,
            this.pixelVerdeCollision3,
            null,
            this
        );

        this.physics.arcade.overlap(
            this.campoVerde4,
            this.bulletRed.bullets,
            this.pixelVerdeCollision4,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde5,
            this.bulletRed.bullets,
            this.pixelVerdeCollision5,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde6,
            this.bulletRed.bullets,
            this.pixelVerdeCollision6,
            null,
            this
        );

        this.physics.arcade.overlap(
            this.campoVerde7,
            this.bulletRed.bullets,
            this.pixelVerdeCollision7,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde8,
            this.bulletRed.bullets,
            this.pixelVerdeCollision8,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde9,
            this.bulletRed.bullets,
            this.pixelVerdeCollision9,
            null,
            this
        );

        this.physics.arcade.overlap(
            this.campoVerde10,
            this.bulletRed.bullets,
            this.pixelVerdeCollision10,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde11,
            this.bulletRed.bullets,
            this.pixelVerdeCollision11,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde12,
            this.bulletRed.bullets,
            this.pixelVerdeCollision12,
            null,
            this
        );

        //*** Invaders Shield Collision
        this.physics.arcade.overlap(
            this.campoVerde1,
            this.invaderBullet.bullets,
            this.pixelVerdeCollision1,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde2,
            this.invaderBullet.bullets,
            this.pixelVerdeCollision2,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde3,
            this.invaderBullet.bullets,
            this.pixelVerdeCollision3,
            null,
            this
        );

        this.physics.arcade.overlap(
            this.campoVerde4,
            this.invaderBullet.bullets,
            this.pixelVerdeCollision4,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde5,
            this.invaderBullet.bullets,
            this.pixelVerdeCollision5,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde6,
            this.invaderBullet.bullets,
            this.pixelVerdeCollision6,
            null,
            this
        );

        this.physics.arcade.overlap(
            this.campoVerde7,
            this.invaderBullet.bullets,
            this.pixelVerdeCollision7,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde8,
            this.invaderBullet.bullets,
            this.pixelVerdeCollision8,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde9,
            this.invaderBullet.bullets,
            this.pixelVerdeCollision9,
            null,
            this
        );

        this.physics.arcade.overlap(
            this.campoVerde10,
            this.invaderBullet.bullets,
            this.pixelVerdeCollision10,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde11,
            this.invaderBullet.bullets,
            this.pixelVerdeCollision11,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde12,
            this.invaderBullet.bullets,
            this.pixelVerdeCollision12,
            null,
            this
        );

        //Bullet to Bullet Collision
        this.physics.arcade.overlap(
            this.bulletRed.bullets,
            this.invaderBullet.bullets,
            this.bulletToBulletCollision,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.bulletRed.bullets,
            this.invaderBulletDos.bullets,
            this.bulletToBulletCollision,
            null,
            this
        );

        //*** UFO Shield Collision
        this.physics.arcade.overlap(
            this.campoVerde1,
            this.invaderBulletDos.bullets,
            this.pixelVerdeCollision1,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde2,
            this.invaderBulletDos.bullets,
            this.pixelVerdeCollision2,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde3,
            this.invaderBulletDos.bullets,
            this.pixelVerdeCollision3,
            null,
            this
        );

        this.physics.arcade.overlap(
            this.campoVerde4,
            this.invaderBulletDos.bullets,
            this.pixelVerdeCollision4,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde5,
            this.invaderBulletDos.bullets,
            this.pixelVerdeCollision5,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde6,
            this.invaderBulletDos.bullets,
            this.pixelVerdeCollision6,
            null,
            this
        );

        this.physics.arcade.overlap(
            this.campoVerde7,
            this.invaderBulletDos.bullets,
            this.pixelVerdeCollision7,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde8,
            this.invaderBulletDos.bullets,
            this.pixelVerdeCollision8,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde9,
            this.invaderBulletDos.bullets,
            this.pixelVerdeCollision9,
            null,
            this
        );

        this.physics.arcade.overlap(
            this.campoVerde10,
            this.invaderBulletDos.bullets,
            this.pixelVerdeCollision10,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde11,
            this.invaderBulletDos.bullets,
            this.pixelVerdeCollision11,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.campoVerde12,
            this.invaderBulletDos.bullets,
            this.pixelVerdeCollision12,
            null,
            this
        );

        // Player Hits CampoDeFuerza, Invader and UFO

        this.physics.arcade.overlap(
            this.campoDeFuerzaGroup,
            this.bulletRed.bullets,
            this.campoDeFuerzaBulletCollision,
            null,
            this
        );

        this.physics.arcade.overlap(
            this.invadersGroup,
            this.bulletRed.bullets,
            this.playerHitsInvaders,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.ufo,
            this.bulletRed.bullets,
            this.playerHitsUfo,
            null,
            this
        );

        // Invader and UFO hits Player
        this.physics.arcade.overlap(
            this.spaceship,
            this.invaderBullet.bullets,
            this.enemyHitsPlayer,
            null,
            this
        );
        this.physics.arcade.overlap(
            this.spaceship,
            this.invaderBulletDos.bullets,
            this.enemyHitsPlayer,
            null,
            this
        );

        // Botón de disparo barra espaciadora
        var shootButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.bulletRed.trackSprite(this.spaceship,0,0,false);


        // Tiempo de disparo correspondiente a los valores de firingTimer y firingTimerDos
        if (this.time.now > this.firingTimer && this.spaceship.alive && this.counter < 264) {

            this.enemyFires();
        }
        if (this.spaceship.alive && this.ufo.inCamera && this.counter < 264) {

            this.ufoFires();
        }


        if (shootButton.isDown && this.spaceship.alive && this.counter < 264 && this.invadersGroup.countLiving() !== 1){
            this.bulletRed.fire();
        }

        //var singleShot = shootButton.onDown.add(shootBullet, this);

        /*
         shootButton.onDown.add(shootBullet, this);
         function shootBullet() { // Will only be called once per key press.
         // Will be passed the full Key object. See Phaser.Key for properties.
         this.bulletRed.fire();
         }
         */

        //////////////////////////////////////////
        //    Move Right Spaceship              //
        //////////////////////////////////////////
        //if (cursor.left.isDown && cursor.right.isUp)

        if (this.cursor.right.isDown && this.cursor.left.isUp){

            //spaceship.body.acceleration.x = 1200;
            this.spaceship.body.velocity.x = 270;

        } else if( this.cursor.left.isDown && this.cursor.right.isUp){

            //spaceship.body.acceleration.x = -1200;
            this.spaceship.body.velocity.x = -270;
        } else {

            //spaceship.body.acceleration.x = 0;
            this.spaceship.body.velocity.x = 0;

        }

    },

    shutdown: function () {
        this.ufoS.stop();
        this.youWinS.stop();

        //this.state.start(this.state.current);
        //this.game.world.removeAll();
        // Variables para reiniciar Se ponen aquí para que cuando aparezca el modal, el juego se reinicie con todos los botones
        this.counter = 0;
        this.shieldHealth = 10;
        this.scoreNumber = 0;
        this.livesCounter = 4;
        this.xOriginal = 368;
        this.acceleration = 850;
        this.frame = 1;
        this.firingTimer = 0;
        this.tweenedPoints = 0;
        this.arrPositionsX = [];
        this.arrPositionsY = [];
        this.randomTimer = null;
        this.game.time.reset();
        this.counterNotas = 0;
        this.nota1 = null;
        this.nota2 = null;
        this.nota3 = null;
        this.nota4 = null;
        this.pianoFast = null;
        this.triggerNote = null;

    },


    render: function () {

        //this.game.debug.text('InvaderGroup.lenght: ' + this.invadersGroup.countLiving(),20,60);
        //this.game.debug.text('Control: ' + this.game.time.totalElapsedSeconds().toFixed(0),20,80);
        this.game.debug.text('M7 Counter: ' + this.counter,20,80);
        this.game.debug.text('CountLiving: ' + this.invadersGroup.countLiving(),20,100);
        this.game.debug.text('totalElapsedSeconds: ' + this.game.time.totalElapsedSeconds().toFixed(0),20,120);
        //this.game.debug.body(this.spaceship);
    }


};

Invaders.items = {

    explosionAnimation: function (explosionInvadersOne) {
        explosionInvadersOne.anchor.x = 0.5;
        explosionInvadersOne.anchor.y = 0.5;
        explosionInvadersOne.animations.add('explodeInvaders');

    },

    haloAnimation: function (allHaloAnimations) {
        allHaloAnimations.anchor.x = 0.5;
        //allHaloAnimations.anchor.y = 0.5;
        allHaloAnimations.animations.add('halo');

    },

    haloAnimationTwo: function (allHaloAnimationsTwo) {
        //allHaloAnimationsTwo.anchor.x = 0.5;
        allHaloAnimationsTwo.anchor.y = 0.5;
        allHaloAnimationsTwo.animations.add('haloTwo');
    }
};
