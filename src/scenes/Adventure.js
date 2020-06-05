import Phaser from 'phaser'

export default class AdventureScene extends Phaser.Scene {
	constructor() {
		super({ key: 'AdventureScene' });
	}

	create() {
		this.player = this.add.image(400 - 16, 300 - 32, 'player')

		const leftKey = this.input.keyboard.addKey('space')
		leftKey.on('down', () => {
			this.player.rotation += 0.2
		})
	}
}