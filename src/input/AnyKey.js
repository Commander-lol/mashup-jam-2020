/**
 * @property {Phaser.Input.Keyboard.Key[]} keys
 */
export default class AnyKey {
	constructor(keys = []) {
		this.keys = keys
	}

	get isDown() {
		return this.keys.some(key => key.isDown)
	}
}