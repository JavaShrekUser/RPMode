class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
 
    preload(){
        this.load.image('rocket','./assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield1', './assets/starfield1.png');
        this.load.image('starfield2', './assets/starfield2.png');
        this.load.image('starfield3', './assets/starfield3.png');
        this.load.image('starfield4', './assets/starfield4.png');
        this.load.image('clownfish',  './assets/ClownFish.png');
        this.load.image('UI',  './assets/UI.png');
        this.load.image('yard', './assets/yard.png');
        this.load.audio('bgm', './assets/bgm.mp3');
        this.load.spritesheet('explosion','./assets/explosion.png',
        {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){

        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 680, 480, 'starfield').
        setOrigin(0,0);
        this.starfield0 = this.add.tileSprite(0, 50, 640, 70, 'starfield1').
        setOrigin(0,0);
        this.starfield1 = this.add.tileSprite(0, 120, 640, 70, 'starfield1').
        setOrigin(0,0);
        this.starfield2 = this.add.tileSprite(0, 190, 640, 70, 'starfield2').
        setOrigin(0,0);
        this.starfield3 = this.add.tileSprite(0, 260, 640, 70, 'starfield3').
        setOrigin(0,0);
        this.starfield4 = this.add.tileSprite(0, 330, 640, 73, 'starfield4').
        setOrigin(0,0);
        this.yard = this.add.tileSprite(0, 0, 640, 480, 'yard').
        setOrigin(0,0);
       

        //white rectangle borders

        //green UI background
    
     
        //new green ui
        this.UI =  this.add.tileSprite(46, 18, 551, 64, 'UI').
        setOrigin(0,0);

        //add bgm
        this.sound.play('bgm');
        
        //add rocket (p1)
        //(scene, x, y, texture, frame)
        this.p1Rocket = new Rocket(this, game.config.width/2, 417,
             'rocket').setScale(0.5, 0.5).setOrigin(0, 0);

        //add spaceship x3
        this.ship01 = new Spaceship(this, game.config.width - 70, 132, 'spaceship', 0, 30).
        setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width - 130, 196, 'spaceship', 0, 20).
        setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width - 190, 260, 'spaceship', 0, 10).
        setOrigin(0,0);
        this.fish04 = new ClownFish(this, game.config.width + 130, 160, 'clownfish', 0, 50).
        setOrigin(0,0);

        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', 
            {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //score
        this.p1Score = 0;
        //score display
        let scoreConfig = {
            fontFamily: 'serif',
            fontSize: '28px',
            backgroundColor: '#00000000',
            color: '#E0FFF6',
            align: 'right',
            padding: {
                top:5,
                bottom:5.
            },
            fixedWidth: 50
        }
        this.scoreLeft = this.add.text(133, 30, this.p1Score, scoreConfig);

        let endConfig = {
            fontFamily: 'fantasy',
            fontSize: '28px',
            backgroundColor: '#00000000',
            color: '#00000',
            align: 'right',
            padding: {
                top:5,
                bottom:5.
            },
            fixedWidth: 50
        }

        let menuConfig = {
            fontFamily: 'serif',
            fontSize: '28px',
            backgroundColor: '#00000000',
            color: '#E0FFF6',
            align: 'right',
            padding: {
                top:5,
                bottom:5.
            },
            fixedWidth: 50
        }

        //visible timer
        this.visibleTimer = this.add.text(531, 30, '', scoreConfig).setOrigin(1,0);
        this.visibleTimer.text = game.settings.gameTimer/1000;

        //get timer
        //timer tutorial: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/
        var timer = this.time.addEvent({
            delay: 1000,
            callback: this.isTiming,
            callbackScope: this,
            repeat: (game.settings.gameTimer/1000)-1,
        });

        //game over flag
        this.gameOver = false;

        //60S play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () =>{
            this.add.text(game.config.width/2, game.config.height/2, 'Game Over', endConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, ' Press (F) to Restart or ←for Menu', endConfig). setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        
    }
    
    update(){

        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.restart(this.p1Score);
            game.sound.stopAll();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
            game.sound.stopAll();
        }

        //scroll starfield
        this.starfield0.tilePositionX -= 3;
        this.starfield1.tilePositionX -= 2.5;
        this.starfield2.tilePositionX -= 2;
        this.starfield3.tilePositionX -= 1.5;
        this.starfield4.tilePositionX -= 1;

        this.starfield0.tilePositionY -= 0.3;
        this.starfield1.tilePositionY -= 0.3;   
        this.starfield2.tilePositionY -= 0.3;   
        this.starfield3.tilePositionY -= 0.3;   
        this.starfield4.tilePositionY -= 0.3;   

        //update spaceships
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update(); 
            this.ship02.update();
            this.ship03.update();
            this.fish04.update();
        }

        //check collision
        if(this.checkCollision(this.p1Rocket, this.fish04)){
            this.p1Rocket.reset();
            this.shipExplode(this.fish04);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship){
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
            }else{
                return false;
            }
    }

    shipExplode(ship){

        //temporarily hide ship
        ship.alpha = 0;

        //create explosion sprite ate ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');             //play explode animation
        boom.on('animationcomplete', ()=>{      //callback after animation complete
            ship.reset();                       //reset ship position
            ship.alpha = 1;                     //make ship visible again
            boom.destroy();                     //remove explosion sprite
        });
        //score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');       //sound when the spaceship destory
    }


    isTiming(){
    
        this.visibleTimer.text--;
    }
}