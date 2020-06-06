import Phaser from 'phaser'
import logo from '../assets/logo.png'

import player from '../assets/images/player.png'
import pixel from '../assets/images/pixel.png'
import test_level from '../assets/levels/opening.json'
import tileset from '../assets/images/tileset.png'

export default class LoaderScene extends Phaser.Scene {
	constructor() {
		super({ key: 'LoaderScene' })
	}
	preload() {
		this.matter.enableCollisionEventsPlugin()

		this.load.image('logo', logo)
		this.load.image('player', player)
		this.load.image('tileset', tileset)
		this.load.image('pixel', pixel)

		this.load.tilemapTiledJSON('test_level', test_level)

		this.load.once('complete', () => {
			this.scene.start('AdventureScene')
		})
	}

	create() {
		const logo = this.add.image(400, 150, 'logo')

		this.tweens.add({
			targets: logo,
			y: 450,
			duration: 2000,
			ease: 'Power2',
			yoyo: true,
			loop: -1,
		})
	}
}