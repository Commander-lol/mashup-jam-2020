import Phaser from 'phaser'
import logo from '../assets/logo.png'

export default class LoaderScene extends Phaser.Scene {
	constructor() {
		super({ key: 'LoaderScene' })
	}
	preload() {
		this.load.image('logo', logo)
		this.matter.enableCollisionEventsPlugin()
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