var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

  game.load.image('bar', 'images/bar.png');
	game.load.image('bg', 'images/bg.png');
  game.load.image('dust', 'images/dust.png');

}

var sprite;
var cursors;
var image;

function create() 
{

    //	Enable p2 physics
	  game.physics.startSystem(Phaser.Physics.P2JS);

    //  Make things a bit more bouncey
    game.physics.p2.defaultRestitution = 0.8;

    //  Add a sprite
	  sprite = game.add.sprite(200, 300, 'bar');

    //  Enable if for physics. This creates a default rectangular body.
	  game.physics.p2.enable(sprite);

    //  Modify a few body properties
	  sprite.body.setZeroDamping();
	  sprite.body.fixedRotation = true;

    cursors = game.input.keyboard.createCursorKeys();
    
    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
    image = game.add.sprite(700, 300, 'dust');

    game.physics.enable(image, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    image.body.velocity.setTo(-200,-200);
    
    //  This makes the game world bounce-able
    image.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors. "1" is 100% energy return
    image.body.bounce.set(1);

}

function update() {

	  sprite.body.setZeroVelocity();

    if (cursors.up.isDown)
    {
    	sprite.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
    	sprite.body.moveDown(400);
    }

}

function render() 
{



}
