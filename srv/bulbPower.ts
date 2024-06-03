'use server'
import { delay } from '@/util/delay'
import { getBulb } from './bulb'

export async function powerOffBulb(alias: string) {
	const bulb = getBulb(alias)
	bulb.setPowerState(false)

	// check to confirm that the bulb is off repeatedly
	let bulbIsStillOn = await bulb.getPowerState()
	while (bulbIsStillOn) {
		await delay(250)
		bulbIsStillOn = await bulb.getPowerState()
		console.log(`bulbIsStillOn: ${bulbIsStillOn}. 2`)
	}

	// resolve after confirmation that the command worked
	return
}

export async function powerOnBulb(alias: string) {
	const bulb = getBulb(alias)
	bulb.setPowerState(true)

	// check to confirm that the bulb is off repeatedly
	let bulbIsStillOff = await !bulb.getPowerState()
	while (bulbIsStillOff) {
		await delay(250)
		bulbIsStillOff = await !bulb.getPowerState()
		console.log(`bulbIsStillOff: ${bulbIsStillOff}. 2`)
	}

	// resolve after confirmation that the command worked
	return
}

export async function getPowerState(alias: string) {
	const bulb = getBulb(alias)
	return bulb.getPowerState()
}
