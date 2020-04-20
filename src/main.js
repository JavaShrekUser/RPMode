// Logan Park, ID: 1743251, Email: hpark58@ucsc.edu

/*

***************************************************************************************************************

*Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (50)
 Action sound effect From: https://opengameart.org/content/rpg-sound-pack, https://opengameart.org/content/water-splashes
 All visual artwork designed and created by Logan Park.

*Add your own (copyright-free) background music to the Play scene (10)
 From: https://opengameart.org/content/gone-fishin

*Display the time remaining (in seconds) on the screen (15)
 Timer tutorial: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/

*Implement parallax scrolling (15)

*Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (25)

*50 + 10 + 15 + 15 + 25 = 115

***************************************************************************************************************

I did extra work to get extra 15 points. I know there is not extra credits, but it's just a backup that 
ensures that I can still get 100 points if I didn't do enough or do well in some parts.

***************************************************************************************************************

Enjoy the game, and thank you for playing.

*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
};

let game = new Phaser.Game(config); 
//reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT;
