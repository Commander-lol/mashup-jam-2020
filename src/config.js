import Phaser from 'phaser'
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin'

export default {
	type: Phaser.AUTO,
	parent: 'content',
	width: 960,
	height: 800,
	backgroundColor: '#c5ccb8',
	// backgroundColor: '#7e9e99',
	localStorageName: 'mashup_jam_2020',
	pixelArt: true,
	plugins: {
		scene: [
			{
				plugin: PhaserMatterCollisionPlugin,
				key: 'matterCollision',
				mapping: 'matterCollision',
			}
		],
	},
	scale: {
		mode: Phaser.Scale.NONE,
	},
	physics: {
		default: 'matter',
		matter: {
			enableSleeping: true,
			// debug: true,
			gravity: {
				y: 1,
			},
		},
	},
}