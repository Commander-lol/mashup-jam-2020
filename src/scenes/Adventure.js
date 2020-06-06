import Phaser from 'phaser'

export default class AdventureScene extends Phaser.Scene {
	constructor() {
		super({ key: 'AdventureScene' });
	}

	create() {

		const map = this.make.tilemap({ key: 'test_level' })

		const tiles = map.addTilesetImage('tiles_16', 'tiles')
		const walls = map.createDynamicLayer('floors', tiles, 0, 0)
		walls.setCollisionByProperty({ collides: true })
		this.matter.world.convertTilemapLayer(walls)

		const playerSpawn = map.findObject('spawns', obj => obj.type === 'player_spawn')
		this.player = this.matter.add.image(playerSpawn.x, playerSpawn.y, 'player')
		this.player.setFixedRotation()


		this.spaceKey = this.input.keyboard.addKey('space')
		this.spaceKey.on('down', () => {
			this.player.setVelocityY(-6)
		})

		this.leftKey = this.input.keyboard.addKey('left')
		this.rightKey = this.input.keyboard.addKey('right')

		this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
		this.matter.world.createDebugGraphic()

		this.cameras.main.startFollow(this.player, false, 0.5, 0.5)
		this.cameras.main.setZoom(2)
		console.log(this.cameras.main.getBounds())
		console.log(map.widthInPixels, map.heightInPixels)
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
	}

	update(time, delta) {
		super.update(time, delta)

		if (this.leftKey.isDown) {
			this.player.setFlipX(true)
			this.player.applyForce({ x: -0.001, y: 0 })
		}
		if (this.rightKey.isDown) {
			this.player.setFlipX(false)
			this.player.applyForce({ x: 0.001, y: 0 })
		}

		const v = this.player.body.velocity
		if (v.x > 1) {
			this.player.setVelocityX(1)
		}
		if (v.x < -1) {
			this.player.setVelocityX(-1)
		}
	}
}