import Phaser from 'phaser'

export default class AdventureScene extends Phaser.Scene {
	constructor() {
		super({ key: 'AdventureScene' });
	}

	create() {
		const map = this.make.tilemap({ key: 'test_level' })

		const tiles = map.addTilesetImage('level_tiles', 'tileset')
		const walls = map.createDynamicLayer('walls', tiles, 0, 0)
		walls.setCollisionByProperty({ collides: true })


		this.matter.world.convertTilemapLayer(walls)
		this.player = this.matter.add.image(400 - 16, 300 - 32, 'player')
		this.player.setFixedRotation()
			.setFriction(0.05, 0.02, 0)

		const emitter = this.add.particles('pixel')
		const e = emitter.createEmitter({
			gravityX: 0,
			gravityY: 250,
			speed: particle => Math.random() * 300 + 100,
			quantity: 10,
			angle: -20,
			x: 0, y: 0,
			follow: this.player,
			lifespan: 0,
		})

		e.setLifespan(0)

		this.spaceKey = this.input.keyboard.addKey('space')
		this.spaceKey.on('down', () => {
			this.player.setVelocityY(-11)
			e.setLifespan(e.lifespan.propertyValue + 100)
		})

		this.leftKey = this.input.keyboard.addKey('left')
		this.leftKey.on('down', () => {
			this.player.setFlipX(true)
			this.player.applyForce({ x: -0.01, y: 0 })
		})
		this.rightKey = this.input.keyboard.addKey('right')
		this.rightKey.on('down', () => {
			this.player.setFlipX(false)
			this.player.applyForce({ x: 0.01, y: 0 })
		})

		this.player.on('collision', console.log)

		// this.platform = this.matter.add.image(400 - 16, 550, 'player')
		// this.platform.rotation = Math.PI / 2
		// this.platform.setStatic(true)

		this.matter.world.createDebugGraphic()

		this.cameras.main.startFollow(this.player, false, 0.5, 0.5)
	}

	update(time, delta) {
		super.update(time, delta)

		if (this.leftKey.isDown) {
			this.player.setFlipX(true)
			this.player.applyForce({ x: -0.01, y: 0 })
		}
		if (this.rightKey.isDown) {
			this.player.setFlipX(false)
			this.player.applyForce({ x: 0.01, y: 0 })
		}

		const v = this.player.body.velocity
		if (v.x > 7) {
			this.player.setVelocityX(7)
		}
		if (v.x < -7) {
			this.player.setVelocityX(-7)
		}
	}
}