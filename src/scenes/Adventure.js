import Phaser from 'phaser'
import Player from '../entities/Player'

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

		this.spawn = map.findObject('spawns', obj => obj.type === 'player_spawn')
		// this.player = this.matter.add.image(this.spawn.x, this.spawn.y, 'player')
		// this.player.setFixedRotation()

		const player = new Player(this, this.spawn.x, this.spawn.y)
		player.sprite.setFixedRotation()
		this.player = player

		this.spaceKey = this.input.keyboard.addKey('space')
		this.spaceKey.on('down', () => {
			player.sprite.setVelocityY(-6)
		})

		this.leftKey = this.input.keyboard.addKey('left')
		this.rightKey = this.input.keyboard.addKey('right')

		this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

		this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5)
		this.cameras.main.setZoom(4)
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
	}

	update(time, delta) {
		super.update(time, delta)

		const player = this.player.sprite

		if (this.leftKey.isDown) {
			player.setFlipX(true)
			player.applyForce({ x: -0.001, y: 0 })
		}
		if (this.rightKey.isDown) {
			player.setFlipX(false)
			player.applyForce({ x: 0.001, y: 0 })
		}

		const v = player.body.velocity
		if (v.x > 1) {
			player.setVelocityX(1)
		}
		if (v.x < -1) {
			player.setVelocityX(-1)
		}
	}
}