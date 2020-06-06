import Phaser from 'phaser'
import Entity from './Entity'
import AnyKey from '../input/AnyKey'

/**
 * @property {Phaser.Physics.Matter.Sprite} sprite
 */
export default class Player extends Entity {
	static get DefaultCollisions() {
		return { left: false, right: false, bottom: false }
	}

	constructor(ctx, x, y) {
		super(ctx)

		this.createInputs()

		this.sprite = ctx.matter.add.sprite(x, y, 'player', 0)
		this.anims = {
			walk: ctx.anims.create({
				key: 'player-walk',
				frames: ctx.anims.generateFrameNumbers('player', { start: 1, end: 10 }),
				frameRate: 36,
				repeat: -1,
			}),
			idle: ctx.anims.create({
				key: 'player-idle',
				frames: ctx.anims.generateFrameNumbers('player', { start: 0, end: 0}),
				frameRate: 1,
				repeat: -1,
			}),
		}

		this.createPhysics()

		this.sprite.setExistingBody(this.bodies.compound)
			.setFixedRotation()
			.setPosition(x, y)

		this.abilities = {
			jump: true,
		}

		this.cooldowns = {
			jump: null,
		}

		this.speed = {
			running: 0.0015,
			floating: 0.001,
		}

		this.ctx.matter.world.on('beforeupdate', this.beforePhysicsUpdates, this)

		this.ctx.matterCollision.addOnCollideStart({
			objectA: Object.values(this.sensors),
			callback: this.onSensorCollision,
			context: this,
		})
		this.ctx.matterCollision.addOnCollideActive({
			objectA: Object.values(this.sensors),
			callback: this.onSensorCollision,
			context: this,
		})
	}

	createInputs() {
		this.inputLeft = new AnyKey([
			this.ctx.input.keyboard.addKey('left'),
			this.ctx.input.keyboard.addKey('A'),
		])

		this.inputRight = new AnyKey([
			this.ctx.input.keyboard.addKey('right'),
			this.ctx.input.keyboard.addKey('D'),
		])

		this.inputJump = new AnyKey([
			this.ctx.input.keyboard.addKey('space'),
		])

		this.inputAttack = new AnyKey([
			this.ctx.input.keyboard.addKey('X'),
		])
	}

	createPhysics() {
		const { Body, Bodies } = Phaser.Physics.Matter.Matter
		const { width, height } = this.sprite

		this.bodies = {
			main: Bodies.rectangle(width / 2, height / 2 + 1, width - 8, height - 4, ),
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
			friction: 0.8,
			restitution: 0,

		})

		this.collisions = Player.DefaultCollisions
	}

	update() {
		// TODO: Update jumping and animations

		const speed = this.collisions.bottom ? this.speed.running : this.speed.floating

		if (this.inputLeft.isDown) {
			this.sprite.setFlipX(true)
			if (this.collisions.bottom || !this.collisions.left) {
				this.sprite.applyForce({ x: -speed, y: 0 })
			}
		}
		if (this.inputRight.isDown) {
			this.sprite.setFlipX(false)
			if (!this.collisions.bottom || !this.collisions.right) {
				this.sprite.applyForce({ x: speed, y: 0 })
			}
		}
		if (this.inputJump.isDown && this.collisions.bottom && this.abilities.jump) {
			this.ctx.sound.play('jump')
			this.sprite.setVelocityY(-6)
			this.abilities.jump = false
			this.cooldowns.jump = this.ctx.time.addEvent({
				delay: 250,
				callback: () => {
					this.abilities.jump = true
					this.cooldowns.jump = null
				}
			})
		}

		const v = this.sprite.body.velocity
		if (v.x > 1) {
			this.sprite.setVelocityX(1)
		}
		if (v.x < -1) {
			this.sprite.setVelocityX(-1)
		}
	}

	/**
	 * Called when a sensor starts to, or continues to, collide with a physics body.
	 * The {obj}A set of properties will always refer to the sensor that triggered
	 * this function.
	 *
	 * @param bodyA
	 * @param bodyB
	 * @param pair
	 */
	onSensorCollision({ bodyA, bodyB, pair }) {
		if (bodyB.isSensor) {
			return
		}

		if (bodyA === this.sensors.left) {
			this.collisions.left = true
			if (pair.separation > 0.5) {
				this.sprite.x += pair.separation - 0.5
			}
		} else if (bodyA === this.sensors.right) {
			this.collisions.right = true
			if (pair.separation > 0.5) {
				this.sprite.x -= pair.separation - 0.5
			}
		} else if (bodyA === this.sensors.bottom) {
			this.collisions.bottom = true
		}
	}

	beforePhysicsUpdates() {
		this.collisions = Player.DefaultCollisions
	}
}