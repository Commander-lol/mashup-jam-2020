import Phaser from 'phaser'

export default {
	type: Phaser.AUTO,
	parent: 'content',
	width: 800,
	height: 600,
	backgroundColor: '#c5ccb8',
	localStorageName: 'mashup_jam_2020',
	pixelArt: true,
	scale: {
		mode: Phaser.Scale.NONE,
	},
	physics: {
		default: 'matter',
		matter: {
			enableSleeping: true,
			debug: true,
			gravity: {
				y: 1,
			},
		},
	},
}