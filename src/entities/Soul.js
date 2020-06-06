import Phaser from 'phaser'
import Entity from './Entity'

export default class Soul extends Entity {
	constructor(ctx, x, y, value) {
		super(ctx);

		this.sprite = this.ctx.matter.add.sprite(x, y, 'entities', 11, {
			isSensor: true,
			ignoreGravity: true,
		})
		this.sprite.tint = Math.random() * 0xffffff
		this.sprite.play('soul-idle')

		this.value = value

		console.log("Created soul %s at %d, %d with value %d", this.eid, x, y, value)
	}
}