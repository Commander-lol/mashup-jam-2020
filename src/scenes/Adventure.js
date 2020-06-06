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

		this.player = new Player(this, this.spawn.x, this.spawn.y)

		this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5)
		this.cameras.main.setZoom(4)

		this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
	}
}