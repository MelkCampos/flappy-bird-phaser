var state = {

    // That's where will load the images and sounds
    preload: function() {
        Game.load.image('cube', 'sprites/cube.png')
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
    }

}

// initialize Phaser
let Game = new Phaser.Game(400, 490)

Game.state.add('state', state)

// start the state
Game.state.start('state')


