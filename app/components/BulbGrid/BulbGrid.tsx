'use client'
import { powerOffBulb, powerOnBulb } from '@/srv/bulbPower'
import style from './BulbGrid.module.scss'
import { awaitBulbRegistration } from '@/srv/registerBulbs'
import { delay } from '@/util/delay'
import { useEffect, useState } from 'react'
import { BulbController } from './BulbController/BulbController'
export function BulbGrid() {
	const [bulbsReady, setBulbsReady] = useState(false)

	const bulbs = ['Backlight', 'Main']

	useEffect(() => {
		awaitBulbRegistration(bulbs).then(() => {
			setBulbsReady(true)
		})
	}, [])

	if (bulbsReady) {
		const bulbControls = bulbs.map((bulb) => {
			return <BulbController bulbAlias={bulb} />
			// return (
			// 	<div className={style.bulb_container}>
			// 		<button
			// 			onClick={() => {
			// 				powerOffBulb(bulb)
			// 			}}
			// 		>
			// 			Off
			// 		</button>
			// 		<button
			// 			onClick={() => {
			// 				powerOnBulb(bulb)
			// 			}}
			// 		>
			// 			On
			// 		</button>
			// 	</div>
			// )
		})

		return <div className={style.container}>{bulbControls}</div>
	} else {
		return (
			<div className={style.container}>
				<h3>Registering bulbs...</h3>
				<p>If struggling, make sure both bulbs are turned on</p>
			</div>
		)
	}
}
