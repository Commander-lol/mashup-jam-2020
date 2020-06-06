import Phaser from 'phaser'
import config from './config'
import { scenes } from './scenes'

console.log(scenes)

class Game extends Phaser.Game {
	constructor() {
		super({
			...config,
			scene: scenes,
		})

	}
}

window.game = new Game()