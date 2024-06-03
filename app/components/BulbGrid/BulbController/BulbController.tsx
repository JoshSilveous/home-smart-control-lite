'use client'

import { getPowerState, powerOffBulb, powerOnBulb } from '@/srv/bulbPower'
import { useEffect, useState } from 'react'
import style from './BulbController.module.scss'

export function BulbController({ bulbAlias }: { bulbAlias: string }) {
	const [bulbLoaded, setBulbLoaded] = useState(false)
	const [powerState, setPowerState] = useState(false)

	useEffect(() => {
		async function loadBulbStatus() {
			setPowerState(await getPowerState(bulbAlias))

			return
		}

		loadBulbStatus().then(() => {
			setBulbLoaded(true)
		})
	}, [])

	function togglePower(e: React.MouseEvent) {
		const buttonElem = e.target as HTMLButtonElement

		buttonElem.classList.add(style.pending_change)
		if (powerState) {
			powerOffBulb(bulbAlias).then(() => {
				buttonElem.classList.remove(style.pending_change)
				setPowerState(false)
			})
		} else {
			powerOnBulb(bulbAlias).then(() => {
				buttonElem.classList.remove(style.pending_change)
				setPowerState(true)
			})
		}
	}
	if (bulbLoaded) {
		return (
			<div className={style.container}>
				<div className={style.bulb_alias}>{bulbAlias}</div>
				<button
					className={`${style.power_button} ${powerState ? style.on : style.off}`}
					onClick={togglePower}
				>
					{powerState ? 'Turn Off' : 'Turn On'}
				</button>
			</div>
		)
	} else {
		return (
			<div className={style.container}>
				<div className={style.loading}>loading state of bulb {bulbAlias}</div>
			</div>
		)
	}
}
