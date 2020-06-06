/**
 * @property {Phaser.Scene} ctx
 */
export default class Entity {
	/**
	 * @param {Phaser.Scene} context
	 */
	constructor(context) {
		this.ctx = context
		context.events.on('update', this.update, this)
	}

	update() {

	}

	destroy() {
		this.dead = true
	}
}