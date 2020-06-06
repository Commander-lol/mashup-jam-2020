import Phaser from 'phaser'

export default class AdventureScene extends Phaser.Scene {
	constructor() {
		super({ key: 'AdventureScene' });
	}

	create() {
		this.player = this.matter.add.image(400 - 16, 300 - 32, 'player')

		const leftKey = this.input.keyboard.addKey('space')
		leftKey.on('down', () => {
			if (Math.random() > 0.5) {
				this.player.applyForce(new Phaser.Math.Vector2(Math.random(), - 0.1));
			} else {
				this.player.applyForce(new Phaser.Math.Vector2(-Math.random(), - 0.1));
			}
		})


		this.platform = this.matter.add.image(400 - 16, 550, 'player')
		this.platform.rotation = Math.PI / 2
		this.platform.setStatic(true)

		this.matter.world.createDebugGraphic()
	}
}