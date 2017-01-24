
Invaders.MechanicTen = function () {
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

    //bmd Shield
    this.bmdGroup = null;
    this.bmd = null;
    this.pixelBmd = null;

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

    //playerHitsInvadersMoveToObject Variables
    this.arrPositionsX = [];
    this.arrPositionsY = [];
    this.randomTimer = null;
    this.delayTween = 0;

    this.invaderBulletB = null;
    this.invaderBulletC = null;
    this.invadersMovingC = null;
    this.firingTimerA = 0;
    this.firingTimerB = 0;
    this.firingTimerC = 0;
};
Invaders.MechanicTen.prototype = {

    create: function () {

        this.world.setBounds(0, 0, 1024, 672);

        this.stage.backgroundColor = '#282c34';

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

        this.invaderBulletB = this.add.weapon(50,'bulletInvader');
        this.invaderBulletB.addBulletAnimation("bulletA",[0,1,2,3],10,true);
        this.invaderBulletB.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.invaderBulletB.bulletSpeed = 350;
        this.invaderBulletB.bulletAngleOffset = 270;

        this.invaderBulletC = this.add.weapon(50,'bulletInvader');
        this.invaderBulletC.addBulletAnimation("bulletA",[0,1,2,3],10,true);
        this.invaderBulletC.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.invaderBulletC.bulletSpeed = 350;
        this.invaderBulletC.bulletAngleOffset = 270;

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

        this.bmdGroup = this.add.group();
        this.bmdGroup.enableBody = true;
        this.bitMapDataShield();

        //***HALO TWO
        this.haloTwo = this.add.group();
        this.haloTwo.createMultiple(70,'haloTwo');
        this.haloTwo.forEach(Invaders.items.haloAnimationTwo,this);

        this.cursor = this.input.keyboard.createCursorKeys();

        //  Lives
        this.lives = this.add.group();
        //game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

        for (var i = 0; i < 3; i++)
        {
            var ship = this.lives.create(this.world.width - 100 + (30 * i), 30, 'spaceship');
            ship.anchor.setTo(0.5, 0.5);
            ship.scale.setTo(0.5,0.5);
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

    bitMapDataShield: function () {

        this.pixelBmd = this.make.sprite(0, 0, 'pixelAmarillo');
        this.pixelBmd.anchor.set(0.5);
        this.physics.enable(this.pixelBmd, Phaser.Physics.ARCADE);

        this.bmd = this.add.bitmapData(this.game.width, this.game.height);
        this.bmd.addToWorld();
        this.bmd.smoothed = false;
        //this.physics.enable(this.bmd, Phaser.Physics.ARCADE);
        //this.physics.enable(this.spaceship, Phaser.Physics.ARCADE);
        //bmd.draw(loop, 100, 500);


        var playerbmd = this.add.bitmapData(32, 32);
        playerbmd.ctx.rect(0, 0, 50, 50);
        playerbmd.ctx.fillStyle = "#0f0";
        playerbmd.ctx.fill();

        //this.pixelVerde = this.add.sprite(this.world.centerX, this.world.centerY, playerbmd);
        //this.physics.arcade.enable(this.pixelVerde);
        //this.pixelVerde.anchor.set(0.5);
        //this.pixelVerde.body.collideWorldBounds = true;

        var platformbmd = this.add.bitmapData(5, 5);
        platformbmd.ctx.rect(0, 0, 5, 5);
        platformbmd.ctx.fillStyle = "#fff";
        platformbmd.ctx.fill();

        // Important - the platforms need to move via velocity, not via direct moving (tweens etc) otherwise they will not allow the player to 'ride' them
        /*
         this.platform1 = this.add.sprite(this.world.centerX - 200, this.world.centerY + 64, platformbmd, 0, this.bmdGroup);
         this.platform1.anchor.set(0.5);
         this.platform1.body.immovable = true;

         this.platform1 = this.add.sprite(this.world.centerX - 300, this.world.centerY + 64, platformbmd, 0, this.bmdGroup);
         this.platform1.anchor.set(0.5);
         this.platform1.body.immovable = true;*/

        //////////////////////
        //   Primero        //
        //////////////////////
        var masIgualCinco = 0;
        var updateY = 530; //+30
        //var updateX = 160;

        for (var i = 0; i < 8; i++){

            for (var j = 0; j < 17; j++) {

                if (j<3){
                    var updateX = 160;
                    var pixelA = this.bmdGroup.create(updateX + masIgualCinco, updateY, platformbmd);
                    pixelA.health = 2;
                    // UNO para un pixel, 5 para cinco pixeles, etc.
                    masIgualCinco+=6;
                    //updateX+=5;
                }else if (j>13){
                    updateX = 208;
                    pixelA = this.bmdGroup.create(updateX + masIgualCinco, updateY, platformbmd);
                    pixelA.health = 2;
                    // UNO para un pixer, 5 para cinco pixeles, etc.
                    masIgualCinco+=6;
                    //updateX+=5;
                }
            }
            masIgualCinco=0;
            updateY-=6;
        }
        //////////////////////
        //   HORIZONTAL     //
        //////////////////////
        masIgualCinco = 0;
        updateY = 482;
        updateX = 160;
        for (i = 0; i < 4; i++){
            for (j = 0; j < 14; j++) {
                pixelA = this.bmdGroup.create(updateX + masIgualCinco, updateY, platformbmd);
                pixelA.health = 2;
                //updateX = 100;
                // UNO para un pixer, 5 para cinco pixeles, etc.
                masIgualCinco+=6;
            }
            masIgualCinco=0;
            updateY-=6;
        }
        //////////////////////
        //   Segundo        //
        //////////////////////
        masIgualCinco = 0;
        updateY = 530;
        //var updateX = 160;
        for (i = 0; i < 8; i++){

            for (j = 0; j < 17; j++) {

                if (j<3){
                    updateX = 360;
                    pixelA = this.bmdGroup.create(updateX + masIgualCinco, updateY, platformbmd);
                    pixelA.health = 2;
                    // UNO para un pixer, 5 para cinco pixeles, etc.
                    masIgualCinco+=6;
                    //updateX+=5;
                }else if (j>13){
                    updateX = 408;
                    pixelA = this.bmdGroup.create(updateX + masIgualCinco, updateY, platformbmd);
                    pixelA.health = 2;
                    // UNO para un pixer, 5 para cinco pixeles, etc.
                    masIgualCinco+=6;
                    //updateX+=5;
                }
            }
            masIgualCinco=0;
            updateY-=6;
        }
        //////////////////////
        //   HORIZONTAL     //
        //////////////////////
        masIgualCinco = 0;
        updateY = 482;
        updateX = 360;
        for (i = 0; i < 4; i++){

            for (j = 0; j < 14; j++) {

                pixelA = this.bmdGroup.create(updateX + masIgualCinco, updateY, platformbmd);
                pixelA.health = 2;
                // UNO para un pixer, 5 para cinco pixeles, etc.
                masIgualCinco+=6;
            }
            masIgualCinco=0;
            updateY-=6;
        }
        //////////////////////
        //   Tercero        //
        //////////////////////
        masIgualCinco = 0;
        updateY = 530;
        //var updateX = 160;
        for (i = 0; i < 8; i++){

            for (j = 0; j < 17; j++) {

                if (j<3){
                    updateX = 560;
                    pixelA = this.bmdGroup.create(updateX + masIgualCinco, updateY, platformbmd);
                    pixelA.health = 2;
                    // UNO para un pixer, 5 para cinco pixeles, etc.
                    masIgualCinco+=6;
                    //updateX+=5;
                }else if (j>13){
                    updateX = 608;
                    pixelA = this.bmdGroup.create(updateX + masIgualCinco, updateY, platformbmd);
                    pixelA.health = 2;
                    // UNO para un pixer, 5 para cinco pixeles, etc.
                    masIgualCinco+=6;
                    //updateX+=5;
                }
            }
            masIgualCinco=0;
            updateY-=6;
        }
        //////////////////////
        //   HORIZONTAL     //
        //////////////////////
        masIgualCinco = 0;
        updateY = 482;
        updateX = 560;
        for (i = 0; i < 4; i++){

            for (j = 0; j < 14; j++) {

                pixelA = this.bmdGroup.create(updateX + masIgualCinco, updateY, platformbmd);
                //updateX = 100;
                pixelA.health = 2;
                // UNO para un pixer, 5 para cinco pixeles, etc.
                masIgualCinco+=6;
            }
            masIgualCinco=0;
            updateY-=6;
        }


        //////////////////////
        //   Cuarto         //
        //////////////////////

        masIgualCinco = 0;
        updateY = 530;
        //var updateX = 160;
        for (i = 0; i < 8; i++){

            for (j = 0; j < 17; j++) {

                if (j<3){
                    updateX = 760;
                    pixelA = this.bmdGroup.create(updateX + masIgualCinco, updateY, platformbmd);
                    pixelA.health = 2;

                    // UNO para un pixer, 5 para cinco pixeles, etc.
                    masIgualCinco+=6;
                    //updateX+=5;
                }else if (j>13){
                    updateX = 808;
                    pixelA = this.bmdGroup.create(updateX + masIgualCinco, updateY, platformbmd);
                    pixelA.health = 2;

                    // UNO para un pixer, 5 para cinco pixeles, etc.
                    masIgualCinco+=6;
                    //updateX+=5;
                }
            }
            masIgualCinco=0;
            updateY-=6;
        }
        //////////////////////
        //   HORIZONTAL     //
        //////////////////////
        masIgualCinco = 0;
        updateY = 482;
        updateX = 760;
        for (i = 0; i < 4; i++){

            for (j = 0; j < 14; j++) {

                pixelA = this.bmdGroup.create(updateX + masIgualCinco, updateY, platformbmd);
                pixelA.health = 2;
                //updateX = 100;
                // UNO para un pixer, 5 para cinco pixeles, etc.
                masIgualCinco+=6;
            }
            masIgualCinco=0;
            updateY-=6;
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
            explosionInvadersPrivate.reset(player.body.x + 15,player.body.y);
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

    enemyFiresA: function () {
        this.invaderBullet.onFire.add(function () {this.invaderShootS.play()},this);
        var naves = [];
        for (var i = 0; i < 20; i++){

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
            800,
            900
        ];
        var item = firingTimerRandom[Math.floor(Math.random() * firingTimerRandom.length)];
        // Esto significa que vamos a disparar cada 1000 ms o cada segundo
        this.firingTimerA = this.time.now + item;

    },

    playerHitsInvadersMoveToObjectA: function () {

        var aRX = [];
        while (aRX.length < 5) {                         //750 porque el máximo de nuestro mundo en x es 850. Damos tolerancia de 100 o al gusto
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
        while (aRY.length < 5) {                         ////550 porque el máximo de nuestro mundo en y es 600. Damos tolerancia de 50 o al gusto
            randomnumber2 = Math.floor(Math.random() * (500 - (-50) + 1) - 50); //  Math.floor(Math.random()*(max-min+1)+min);
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


        var invadersMovingA = null;
        //Campo de fuerza Moving
        var campoDeFuerzaMoving = null;

        for (var i = 0; i < 20; i++) {

            invadersMovingA = this.add.tween(this.invadersGroup.children[i]);
            //invaderFall = this.add.tween(this.item);
            invadersMovingA.to({

                x: [aRX[0],aRX[1],aRX[2],aRX[3],aRX[4],this.arrPositionsX[i]],
                y: [aRY[0],aRY[1],aRY[2],aRY[3],aRY[4],this.arrPositionsY[i]]
            }, 6500, Phaser.Easing.Linear.None, false, this.delayTween, 0, false).interpolation(function (v, k) {
                return Phaser.Math.catmullRomInterpolation(v, k);
            });
            invadersMovingA.start();


            //
            campoDeFuerzaMoving = this.add.tween(this.campoDeFuerzaGroup.children[i]);
            //invaderFall = this.add.tween(this.item);
            campoDeFuerzaMoving.to({

                x: [aRX[0],aRX[1],aRX[2],aRX[3],aRX[4],this.arrPositionsX[i]],
                y: [aRY[0],aRY[1],aRY[2],aRY[3],aRY[4],this.arrPositionsY[i]]
            }, 6500, Phaser.Easing.Linear.None, false, this.delayTween, 0, false).interpolation(function (v, k) {
                return Phaser.Math.catmullRomInterpolation(v, k);
            });
            campoDeFuerzaMoving.start();
            this.delayTween+=150;
        }
        this.delayTween = 0;
    },

    enemyFiresB: function () {
        this.invaderBulletB.onFire.add(function () {this.invaderShootS.play()},this);
        var naves = [];
        //PARA QUE SOLO DISPAREN LOS INVADERS DEL 20 AL 40
        for (var i = 39; i > 19; i--){

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

        // SOLO DISPARA EL INVADER VIVO 0 DEL invadersGroup 20 al 40
        this.invaderBulletB.trackSprite(navesVivasRandom,0,20,false);


        if (navesVivas.length > 0){

            //this.invaderBullet.fireAtSprite(this.spaceship);

            //***VAN JUNTAS
            this.invaderBulletB.fireAngle = 90;
            this.invaderBulletB.fire();
        }
        var firingTimerRandom = [
            600,
            800
        ];
        var item = firingTimerRandom[Math.floor(Math.random() * firingTimerRandom.length)];
        // Esto significa que vamos a disparar cada 1000 ms o cada segundo
        this.firingTimerB = this.time.now + item;

    },

    playerHitsInvadersMoveToObjectB: function () {

        var aRX = [];
        while (aRX.length < 5) {                         //750 porque el máximo de nuestro mundo en x es 850. Damos tolerancia de 100 o al gusto
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
        while (aRY.length < 5) {                         ////550 porque el máximo de nuestro mundo en y es 600. Damos tolerancia de 50 o al gusto
            randomnumber2 = Math.floor(Math.random() * (500 - (-50) + 1) - 50); //  Math.floor(Math.random()*(max-min+1)+min);
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


        var invadersMovingB = null;
        //Campo de fuerza Moving
        var campoDeFuerzaMoving = null;

        for (var i = 20; i < 40; i++) {


            invadersMovingB = this.add.tween(this.invadersGroup.children[i]);
            //invaderFall = this.add.tween(this.item);
            invadersMovingB.to({

                x: [aRX[0],aRX[1],aRX[2],aRX[3],aRX[4],this.arrPositionsX[i]],
                y: [aRY[0],aRY[1],aRY[2],aRY[3],aRY[4],this.arrPositionsY[i]]
            }, 6500, Phaser.Easing.Linear.None, false, this.delayTween, 0, false).interpolation(function (v, k) {
                return Phaser.Math.catmullRomInterpolation(v, k);
            });
            invadersMovingB.start();

            //
            campoDeFuerzaMoving = this.add.tween(this.campoDeFuerzaGroup.children[i]);
            //invaderFall = this.add.tween(this.item);
            campoDeFuerzaMoving.to({

                x: [aRX[0],aRX[1],aRX[2],aRX[3],aRX[4],this.arrPositionsX[i]],
                y: [aRY[0],aRY[1],aRY[2],aRY[3],aRY[4],this.arrPositionsY[i]]
            }, 6500, Phaser.Easing.Linear.None, false, this.delayTween, 0, false).interpolation(function (v, k) {
                return Phaser.Math.catmullRomInterpolation(v, k);
            });
            campoDeFuerzaMoving.start();
            this.delayTween+=150;
        }
        this.delayTween = 0;
    },

    enemyFiresC: function () {
        this.invaderBulletC.onFire.add(function () {this.invaderShootS.play()},this);
        var naves = [];
        //PARA QUE SOLO DISPAREN LOS INVADERS DEL 20 AL 40
        for (var i = 40; i < 60; i++){

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

        //this.invaderBullet.trackSprite(navesVivasRandom,0,20,false);

        // SOLO DISPARA EL INVADER VIVO 0 DEL invadersGroup 20 al 40
        this.invaderBulletC.trackSprite(navesVivasRandom,0,20,false);


        if (navesVivas.length > 0){

            //this.invaderBullet.fireAtSprite(this.spaceship);

            //***VAN JUNTAS
            this.invaderBulletC.fireAngle = 90;
            this.invaderBulletC.fire();
        }

        var firingTimerRandom = [
            500,
            700
        ];
        var item = firingTimerRandom[Math.floor(Math.random() * firingTimerRandom.length)];
        // Esto significa que vamos a disparar cada 1000 ms o cada segundo
        this.firingTimerC = this.time.now + item;


    },

    playerHitsInvadersMoveToObjectC: function () {

        var aRX = [];
        while (aRX.length < 5) {                         //750 porque el máximo de nuestro mundo en x es 850. Damos tolerancia de 100 o al gusto
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
        while (aRY.length < 5) {                         ////550 porque el máximo de nuestro mundo en y es 600. Damos tolerancia de 50 o al gusto
            randomnumber2 = Math.floor(Math.random() * (500 - (-50) + 1) - 50); //  Math.floor(Math.random()*(max-min+1)+min);
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

        //Campo de fuerza Moving
        var campoDeFuerzaMoving = null;

        for (var i = 40; i < 60; i++) {


            this.invadersMovingC = this.add.tween(this.invadersGroup.children[i]);
            //invaderFall = this.add.tween(this.item);
            this.invadersMovingC.to({

                x: [aRX[0],aRX[1],aRX[2],aRX[3],aRX[4],this.arrPositionsX[i]],
                y: [aRY[0],aRY[1],aRY[2],aRY[3],aRY[4],this.arrPositionsY[i]]
            }, 6500, Phaser.Easing.Linear.None, false, this.delayTween, 0, false).interpolation(function (v, k) {
                return Phaser.Math.catmullRomInterpolation(v, k);
            });
            this.invadersMovingC.start();

            //
            campoDeFuerzaMoving = this.add.tween(this.campoDeFuerzaGroup.children[i]);
            //invaderFall = this.add.tween(this.item);
            campoDeFuerzaMoving.to({

                x: [aRX[0],aRX[1],aRX[2],aRX[3],aRX[4],this.arrPositionsX[i]],
                y: [aRY[0],aRY[1],aRY[2],aRY[3],aRY[4],this.arrPositionsY[i]]
            }, 6500, Phaser.Easing.Linear.None, false, this.delayTween, 0, false).interpolation(function (v, k) {
                return Phaser.Math.catmullRomInterpolation(v, k);
            });
            campoDeFuerzaMoving.start();
            this.delayTween+=150;
        }
        this.delayTween = 0;
    },

    randomFunctionDisparador: function () {

        // Movimientos
        //this.playerHitsInvadersMoveToObject();
        this.playerHitsInvadersMoveToObjectA();
        this.playerHitsInvadersMoveToObjectB();
        this.playerHitsInvadersMoveToObjectC();

        var arrayTime = [
            10000,
            12000,
            14000
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

            //this.scoreText.text = this.scoreString + this.scoreNumber;
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
                y: enemy.body.y -10 }, 1000, Phaser.Easing.Linear.None, false);

            //to(properties, duration, ease, autoStart, delay, repeat, yoyo)
            var tweenB = this.add.tween(pointsAdded);
            tweenB.to({
                alpha: 0,
                // Queremos que los números se eleven 10 pixeles a partir del centro del enemigo
                x: 150, y: 40 }, 200, Phaser.Easing.Linear.None, false);
            tweenA.chain(tweenB);
            tweenA.start();
            tweenB.onComplete.add(function () {this.scoreTween();},this);
            //this.spawnEmitter(this.scoreNumber, 'star', 20, 300);
            //this.spawnEmitter(this.ufo, 'star', 20, 300);
            //this.spawnEmitter(this.scoreText, 'star', 20, 300);

            //this.camera.shake(0.01, 100, true, Phaser.Camera.SHAKE_BOTH, true);

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

    //De aquí se actualiza el Score
    scoreTween: function() {

        //this.screenGameoverScore.setText('Score: 0');


        // Ponemos la variable tweenedPoints hasta arriba para que no empiece
        // el score de cero cada vez que se actualiza
        //this.tweenedPoints = 0;

        var pointsTween = this.add.tween(this);

        //pointsTween.onStart.add(function (){this.spawnEmitter(this.scoreText, 'star', 10, 300);},this);

        pointsTween.to({tweenedPoints: this.scoreNumber }, 800, Phaser.Easing.Linear.None, true, 0);

        pointsTween.onUpdateCallback(function(){

            this.scoreText.setText(' Score: ' + Math.floor(this.tweenedPoints));
        }, this);
        // Esta función se pone para que acualice el valor de scoreNumber
        pointsTween.onComplete.addOnce(function(){
            this.scoreText.setText(' Score: '+ this.scoreNumber);
            this.spawnEmitter(this.scoreText, 'star', 10, 300);


        }, this);

        pointsTween.start();
    },

    // De aquí aparecen los +10
    addPoints: function() {
        //this._score += 10;
        //this.textScore.setText('Score: '+this._score);

        var randX = this.rnd.integerInRange(200,this.world.width-200);
        var randY = this.rnd.integerInRange(200,this.world.height-200);
        var pointsAdded = this.add.text(null, null, '+50',
            {
                font: "28px Arial",
                fill: "#000",
                stroke: "#FFF",
                strokeThickness: 7
            });
        pointsAdded.anchor.set(0.5, 0.5);
        this.add.tween(pointsAdded).to({
            alpha: 0/*,
             y: randY-50 */}, 1000, Phaser.Easing.Linear.None, true);

        //this.camera.shake(0.01, 100, true, Phaser.Camera.SHAKE_BOTH, true);
    },

    spawnEmitter: function(item, particle, number, lifespan, frequency, offsetX, offsetY, gravity) {
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        lifespan = lifespan || 2000;
        frequency = frequency || 0;
        var emitter = this.game.add.emitter(item.x+100, item.y + 15, number);
        emitter.maxParticles = number;
        emitter.makeParticles(particle);
        emitter.setXSpeed(-500, 500);
        emitter.setYSpeed(-700, 300);
        emitter.setScale(2, 1, 2, 1, 500, Phaser.Easing.Linear.None);
        emitter.gravity = gravity || 250;
        emitter.start(false, lifespan, frequency, number);
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

        Invaders.youWin10 = true;

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

        this.state.start('MechanicEleven');
        this.clickS.play();
    },
    menu: function () {
        this.ufoS.stop();
        this.pianoFast.stop();
        this.state.start('MechanicsMenu');
        this.clickS.play();
    },

    update: function () {

        if (this.spaceship.alive && this.counter < 264){
            // Empieza la funciòn después de 2 segundos
            if (this.game.time.totalElapsedSeconds().toFixed(0) > 2){
                if (this.time.now > this.randomTimer){
                    //Disparador de funciones
                    this.randomFunctionDisparador();

                }

                // SE COLOCA AQUI PARA QUE LA FUNCION DE ENEMYFIRES TENGA LA REFERENCIA DE RANDOM FUNCTION DISPARADOR
                // TIENE QUE ESTAR ACTIVA this.playerHitsInvadersMoveToObjectC();

                if (this.time.now > this.firingTimerA && this.spaceship.alive && this.counter < 264 && this.invadersMovingC.isRunning) {
                    this.enemyFiresA();

                }
                if (this.time.now > this.firingTimerB && this.spaceship.alive && this.counter < 264 && this.invadersMovingC.isRunning) {

                    this.enemyFiresB();
                }
                if (this.time.now > this.firingTimerC && this.spaceship.alive && this.counter < 264 && this.invadersMovingC.isRunning) {

                    this.enemyFiresC();
                }
            }

        }



        // Shield Collision
        this.physics.arcade.overlap(this.bmdGroup,this.bulletRed.bullets,Invaders.items.shieldCollision,null,this);
        this.physics.arcade.overlap(this.bmdGroup,this.invaderBullet.bullets,Invaders.items.shieldCollision,null,this);
        this.physics.arcade.overlap(this.bmdGroup,this.invaderBulletB.bullets,Invaders.items.shieldCollision,null,this);
        this.physics.arcade.overlap(this.bmdGroup,this.invaderBulletC.bullets,Invaders.items.shieldCollision,null,this);
        this.physics.arcade.overlap(this.bmdGroup, this.invaderBulletDos.bullets,Invaders.items.shieldCollision,null,this);

        //Collision
        this.physics.arcade.overlap(this.bulletRed.bullets,this.invaderBullet.bullets,this.bulletToBulletCollision,null,this);
        this.physics.arcade.overlap(this.bulletRed.bullets,this.invaderBulletB.bullets,this.bulletToBulletCollision,null,this);
        this.physics.arcade.overlap(this.bulletRed.bullets,this.invaderBulletC.bullets,this.bulletToBulletCollision,null,this);
        this.physics.arcade.overlap(this.bulletRed.bullets,this.invaderBulletDos.bullets,this.bulletToBulletCollision,null,this); // Cuando el UFO DISPARA

        this.physics.arcade.overlap(this.campoDeFuerzaGroup, this.bulletRed.bullets,this.campoDeFuerzaBulletCollision,null,this);
        this.physics.arcade.overlap(this.invadersGroup, this.bulletRed.bullets,this.playerHitsInvaders,null,this);
        this.physics.arcade.overlap(this.ufo,this.bulletRed.bullets,this.playerHitsUfo,null,this);

        this.physics.arcade.overlap(this.spaceship, this.invaderBullet.bullets, this.enemyHitsPlayer,null,this);
        this.physics.arcade.overlap(this.spaceship, this.invaderBulletB.bullets, this.enemyHitsPlayer,null,this);
        this.physics.arcade.overlap(this.spaceship, this.invaderBulletC.bullets, this.enemyHitsPlayer,null,this);
        this.physics.arcade.overlap(this.spaceship, this.invaderBulletDos.bullets, this.enemyHitsPlayer,null,this);

        //HandyButton

        var handyButton = this.input.keyboard.addKey(Phaser.Keyboard.W);

        handyButton.onDown.add(this.gameOverLogic,this);

        // Botón de disparo barra espaciadora
        var shootButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.bulletRed.trackSprite(this.spaceship,0,0,false);


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

        this.arrPositionsX = [];
        this.arrPositionsY = [];
        this.randomTimer = null;
        this.delayTween = 0;

        //playerHitsInvadersMoveToObject Variables
        this.arrPositionsX = [];
        this.arrPositionsY = [];
        this.randomTimer = null;

        this.invaderBulletB = null;
        this.invaderBulletC = null;
        this.invadersMovingC = null;
        this.firingTimerA = 0;
        this.firingTimerB = 0;
        this.firingTimerC = 0;

    },


    render: function () {

        //this.game.debug.text('InvaderGroup.lenght: ' + this.invadersGroup.countLiving(),20,60);
        //this.game.debug.text('Control: ' + this.game.time.totalElapsedSeconds().toFixed(0),20,80);
        this.game.debug.text('M10 Counter: ' + this.counter,20,80);
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
    },

    shieldCollision: function (shield,bullet) {
        // Nuestro shield tiene un health de 10.
        // Cada vez que recibe una bala y destruye un pixel amarillo su health disminuye por -1;
        this.shieldHealth--;
        var rN=Math.floor(Math.random()*(9-5+1)+5);
        // Si la bala ha matado '9' pixeles es lo mismo que if (shieldHealth == 1) => Destruimos la bala
        //Con esto podemos determinar el número de pixeles que queremos que se destruyan por tipo de bala o enemigo.
        // También podemos poner un número random para que cada bala dañe aleatoriamente al shield
        if (this.shieldHealth == rN){
            bullet.kill();
            //shieldHealth = 10;
        }

        shield.kill();

        //Daño ocasionado por el redBullet
        //shield.damage(10);
        this.shieldHealth = 10;

        var haloAnimPrivate = this.haloTwo.getFirstExists(false);
        haloAnimPrivate.reset(bullet.body.x - 20, bullet.body.y + 10);
        haloAnimPrivate.play('haloTwo',30,false,true);



        //bullet.kill();

        //shield.damage(1);


    }


};
