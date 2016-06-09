function preload() {

	game.load.image('bar', 'images/bar.png');
	game.load.image('bg', 'images/bg.png');
	game.load.image('dust', 'images/dust.png');

}

var cursors;
var bar;
var iWall;
var dust;
var lives = 3;
var score = 0;
var scoreText;
var livesText;
var introText;

function create() 
{
    scoreText = game.add.text(680, 550, 'Score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    livesText = game.add.text(32, 550, 'Lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });
    
    //	Enable p2 physics
	  game.physics.startSystem(Phaser.Physics.P2JS);

    //  Make things a bit more bouncey
    game.physics.p2.defaultRestitution = 0.8;

    //  Add a sprite
	  bar = game.add.sprite(100, game.world.centerY, 'bar', 'images/bar.png');
	  bar.anchor.setTo(0.5, 0.5);
	  

    //  Enable if for physics. This creates a default rectangular body.
	  game.physics.p2.enable(bar);

    //  Modify a few body properties
	  bar.body.setZeroDamping();
	  bar.body.fixedRotation = true;

    cursors = game.input.keyboard.createCursorKeys();
    
    iWall = game.add.sprite(1, 200, 'iWall');
    iWall.name = 'iWall';

    game.physics.enable(iWall, Phaser.Physics.ARCADE);
    //  In this example the new collision box is much larger than the original sprite
    iWall.body.setSize(1, 600, 1, -200);
    iWall.body.immovable = true;

    dust = game.add.sprite(700, 200, 'dust', 'images/dust.png');
    dust.name = 'dust';
    game.physics.enable(dust, Phaser.Physics.ARCADE);
    dust.body.velocity.setTo(-200,-200);
    dust.body.collideWorldBounds = true;
    dust.body.bounce.set(1);
    
}

function update() 
{
    bar.body.setZeroVelocity();

    if (cursors.up.isDown)
    {
    	bar.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
    	bar.body.moveDown(400);
    }
    
    game.physics.arcade.collide(bar, dust, collisionHandler1, null, this);
    game.physics.arcade.collide(iWall, dust, collisionHandler, null, this);

}

function collisionHandler1 (obj1, obj2) {

    dust.kill();

}

function collisionHandler (obj1, obj2) {

    lives--;
    livesText.text = 'Lives: ' + lives;
    dust.kill();

    if (lives === 0)
    {
        gameOver();
    }
    else
    {
        dust.reset(700, 200);
        dust.body.velocity.setTo(-200,-200);
    }
}

function gameOver () {
    
    introText.text = 'Game Over!';
    introText.visible = true;

}

