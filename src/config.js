import Phaser from 'phaser'

export default {
	type: Phaser.AUTO,
	parent: 'content',
	width: 800,
	height: 600,
	localStorageName: 'mashup_jam_2020',
	pixelArt: true,
	physics: {
		default: 'matter',
		matter: {
			// debug: true,
			gravity: {
				y: 1,
			},
		},
	},
}