import Phaser from 'phaser'
import logo from '../assets/logo.png'
import player from '../assets/player.png'

export default class LoaderScene extends Phaser.Scene {
	constructor() {
		super({ key: 'LoaderScene' })
	}
	preload() {
		this.load.image('logo', logo)
		this.load.image('player', player)
		this.matter.enableCollisionEventsPlugin()

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