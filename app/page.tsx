import { powerOffBulb } from '@/srv/bulbPower'
import styles from './page.module.css'
import { BulbGrid } from './components/BulbGrid/BulbGrid'

export default function Home() {
	return (
		<main className={styles.main}>
			<h1>Silvy's Personal Smart Home</h1>
			<BulbGrid />
		</main>
	)
}
