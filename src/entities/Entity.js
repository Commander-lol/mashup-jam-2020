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
		context.events.once("shutdown", this.destroy, this);
		context.events.once("destroy", this.destroy, this);
	}

	_onUpdate() {
		if (!this.dead) {
			this.update()
		}
	}

	_onDestroy() {
		this.dead = true
		this.ctx.events.off('update', this._onUpdate, this)
		this.ctx.events.off('shutdown', this._onDestroy, this)
		this.ctx.events.off('destroy', this._onDestroy, this)

		this.destroy()
	}

	update() { }

	destroy() { }
}