import Phaser from 'phaser'
import Entity from './Entity'

/**
 * @property {Phaser.Physics.Matter.Sprite} sprite
 */
export default class Player extends Entity {
	constructor(ctx, x, y) {
		super(ctx)

		const { Body, Bodies } = Phaser.Physics.Matter.Matter

		this.sprite = ctx.matter.add.sprite(x, y, 'player', 0)
		this.anims = {
			walk: ctx.anims.create({
				key: 'player-walk',
				frames: ctx.anims.generateFrameNumbers('player', { start: 1, end: 10 }),
				frameRate: 45,
				repeat: -1,
			}),
			idle: ctx.anims.create({
				key: 'player-idle',
				frames: ctx.anims.generateFrameNumbers('player', { start: 0, end: 0}),
				frameRate: 1,
				repeat: -1,
			}),
		}

		const { width, height } = this.sprite

		this.bodies = {
			main: Bodies.rectangle(width / 2, height / 2, width - 6, height - 2, { chamfer: { radius: 3 } }),
		}
		this.sensors = {
			bottom: Bodies.rectangle(width / 2, height, width * 0.25, 2, { isSensor: true }),
			left: Bodies.rectangle(2, height / 2, 2, height * 0.5, { isSensor: true }),
			right: Bodies.rectangle(width - 2, height / 2, 2, height * 0.5, { isSensor: true })
		};

		this.bodies.compound = Body.create({
			parts: [
				this.bodies.main,
				this.sensors.bottom,
				this.sensors.left,
				this.sensors.right,
			],
			frictionStatic: 0,
			frictionAir: 0.01,
			friction: 0.01,
		})

		this.sprite.setExistingBody(this.bodies.compound)
			.setFixedRotation()
			.setPosition(x, y)

	}

	update() {
		// TODO: Update jumping and animations

		if (Math.abs(this.sprite.body.velocity.x) > 0) {
			this.sprite.play('player-walk', true, 0)
		}
	}
}