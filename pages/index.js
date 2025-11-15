import { Analytics } from "@vercel/analytics/react"
import Game from '../components/Game'
import '../styles/globals.css'

export default function Home() {
    return (
        <>
            <Game />
            <Analytics />
        </>
    )
}
