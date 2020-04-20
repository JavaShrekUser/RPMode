class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.mp3');
        this.load.image('UI old',  './assets/UI old.png');
        this.load.image('mainBack', './assets/mainback.png');
        this.load.image('textBack', './assets/textBack.png');
    }

    create(){
        //menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#00000000',
            color: '#E0FFF6',
            align:'right',
            padding:{
                top:5,
                bottom:5,
            },
            fixedWidth:0
        }

        let titleConfig = {
            fontFamily: 'fantasy',
            fontSize: '27px',
            backgroundColor: '#00000000',
            color: '#E0FFF6',
            align: 'right',
            padding: {
                top:5,
                bottom:5,
            },
            fixedWidth:0
        }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;


        this.mainBack = this.add.tileSprite(0, 0, 680, 480, 'mainBack').
        setOrigin(0,0);
        this.UI =  this.add.tileSprite(centerX, centerY - 130, 551, 64, 'UI old').
        setOrigin(0.5);
        this.textBack =  this.add.tileSprite(centerX, 270, 624, 130, 'textBack').
        setOrigin(0.5);

        this.add.text(centerX, centerY - 130, 'Fishing Day', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use arrows to move & (F) to cast net', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, 'Press ← for EASY or → for HARD', menuConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //this.add.text(20, 20, "Rocket Patrol Menu");
        //this.scene.start("playScene");
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy mode
            game.settings = {
                spaceshipSpeed:3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard mode
            game.settings= {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }

    }
}
