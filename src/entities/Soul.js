import Phaser from 'phaser'
import Entity from './Entity'

const TINT = {
	5: 0x7ca4c5,
	15: 0x67ad73,
	50: 0xc6868e,
}

export default class Soul extends Entity {
	constructor(ctx, x, y, value) {
		super(ctx);

		this.sprite = this.ctx.matter.add.sprite(x, y, 'entities', 21, {
			label: 'soul',
			isSensor: true,
			ignoreGravity: true,
		})
		this.sprite.tint = TINT[value]
		this.sprite.play('soul-idle')

		this.value = value

		console.log("Created soul %s at %d, %d with value %d", this.eid, x, y, value)

		this.collidePlayer = this.ctx.matterCollision.addOnCollideStart({
			objectA: this.sprite,
			callback: this.onCollide,
			context: this,
		})
	}

	onCollide({ bodyA, bodyB }) {
		if (bodyB && bodyB.label === 'player_body') {
			console.log("GET", this.collidePlayer)
			this.ctx.sound.play('plop')
			this.collidePlayer()
			this.ctx.scorePoints(this)
		}
	}

	destroy() {
		this.collidePlayer()
		this.sprite.destroy()
	}
}