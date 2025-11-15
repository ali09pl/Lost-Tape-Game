import Game from '../components/Game'
import { Analytics } from '@vercel/analytics/react'

export default function Home() {
  return (
    <>
      <Game />
      <Analytics />
    </>
  )
}
