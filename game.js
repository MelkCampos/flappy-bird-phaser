var state = {

    // That's where will load the images and sounds
    preload: function() {
        Game.load.image('cube', 'sprites/pccc.png')
        Game.load.image('pipe', 'sprites/block.jpg')
    },



    // Here the game will be set up. display sprites and etc
    create: function() {

        Game.stage.backgroundColor = '#40739e'

        Game.physics.startSystem(Phaser.Physics.ARCADE)

        // draw the cube
        this.cube = Game.add.sprite(100, 120, 'cube')

        Game.physics.arcade.enable(this.cube)

        this.cube.body.gravity.y = 1000

        // make the cube 'jump'
        var spaceKey = Game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR )

        spaceKey.onDown.add(this.fly, this)


        // PIPES
        this.pipes = Game.add.group()

        this.timer = Game.time.events.loop(1500, this.addRowOfPiper, this)
    },




    // This function is called 60 times per second
    // It contains the game's logic
    update: function() {

        // If the cube is out of the screen (too high or too low)
        if(this.cube.y < 0 || this.cube.y > 490) 

        this.restartGame()
        
    },

    // make the cube 'fly | jump'
    fly: function() {

        // Add a vertical velocity to the bird
        this.cube.body.velocity.y = -350
    },

    // restart game :v
    restartGame: function() {

        // start the 'state'
        Game.state.start('state')
    },

    // add the pipes in the game
    addOnePipe: function(pointX, pointY) {

        // Create a pipe at the position 'x' and 'y' 
        var pipe = Game.add.sprite(pointX, pointY, 'pipe')

        // Add the pipe to our previously created group
        this.pipes.add(pipe)

        // Enable physics on the pipe
        Game.physics.arcade.enable(pipe)

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200

        // Automatically kill the pipe when it's no longer visible
        pipe.checkWorldBounds = true
        pipe.outOfBoundsKill = true
    },

    addRowOfPiper: function() {

        // Randomly pick a number between 1 and 5
        // This will be the hole position

        var hole = Math.floor(Math.random() * 5) + 1

        for(let i = 0; i < 8; i++) {

            if (i != hole && i != hole + 1)
            this.addOnePipe(400, i * 60 + 10)
        }

    }

}

// initialize Phaser
let Game = new Phaser.Game(400, 490)

Game.state.add('state', state)

// start the state
Game.state.start('state')


