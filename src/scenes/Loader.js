import Phaser from 'phaser'
import logo from '../assets/logo.png'

import player_image from '../assets/images/player_16.png'
import tiles_image  from '../assets/images/tiles_16.png'
import pixel_image from '../assets/images/pixel.png'
import entities_image from '../assets/images/entities.png'

import plop_sound from '../assets/sounds/plop.mp3'
import jump_sound from '../assets/sounds/jump.mp3'

import test_data from '../assets/levels/test_16.json'

export default class LoaderScene extends Phaser.Scene {
	constructor() {
		super({ key: 'LoaderScene' })
	}
	preload() {
		this.matter.enableCollisionEventsPlugin()

		this.load.image('logo', logo)

		this.load.spritesheet('player', player_image, { frameWidth: 16, frameHeight: 16 })
		this.load.spritesheet('entities', entities_image, { frameWidth: 16, frameHeight: 16 })
		this.load.image('tiles', tiles_image)
		this.load.image('pixel', pixel_image)

		this.load.audio('plop', plop_sound)
		this.load.audio('jump', jump_sound)

		this.load.tilemapTiledJSON('test_level', test_data)

		this.load.once('complete', () => {
			this.scene.start('AdventureScene')
		})
	}

	create() {
		const logo = this.add.image(400, 150, 'logo')

		this.tweens.add({
			targets: logo,
			y: 450,
			duration: 2000,
			ease: 'Power2',
			yoyo: true,
			loop: -1,
		})

		this.anims.create( {
			key: 'soul-idle',
			frames: this.anims.generateFrameNumbers('entities', {
				frames: [21, 22, 23, 24]
			}),
			frameRate: 6,
			repeat: -1,
		})
	}
}