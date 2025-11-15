'use client'
import { useState, useEffect } from 'react'

export default function Game() {
  const [screen, setScreen] = useState('start')
  const [text, setText] = useState('')
  const [isMuted, setIsMuted] = useState(false)

  const playSound = () => {
    if (isMuted) return
    // صوت بسيط
    const beep = new AudioContext()
    const oscillator = beep.createOscillator()
    oscillator.connect(beep.destination)
    oscillator.frequency.value = 800
    oscillator.start()
    setTimeout(() => oscillator.stop(), 100)
  }

  const typeText = (message, speed = 50) => {
    setText('')
    let i = 0
    const timer = setInterval(() => {
      if (i < message.length) {
        setText(prev => prev + message[i])
        playSound()
        i++
      } else {
        clearInterval(timer)
      }
    }, speed)
  }

  const startGame = () => {
    playSound()
    setScreen('main')
    setTimeout(() => {
      typeText("أهلاً... لا، انتظر، لم أقل شيئاً. ارحل من هنا!")
    }, 500)
  }

  const handleClose = () => {
    playSound()
    typeText("مفاجأة! الزر لا يعمل... لماذا أعتقدت أنه سيعمل؟")
  }

  const handleDialogue = (response) => {
    playSound()
    const responses = {
      1: "أنا؟ مجرد راوٍ محبوس في هذا النظام المعطوب. وأنت تزعجني!",
      2: "أنت في موقع إلكتروني محطم، وأنا مشغول بمحاولة إصلاحه!",
      3: "الإغلاق؟ جربت ذلك الزر الأحمر في الأعلى؟ لا يعمل، صدمة!"
    }
    typeText(responses[response])
  }

  if (screen === 'start') {
    return (
      <div style={styles.startScreen}>
        <h1 style={styles.title}>الشريط المفقود</h1>
        <p style={styles.subtitle}>لعبة من الغموض والهزل</p>
        <button style={styles.startButton} onClick={startGame}>
          ابدأ الرحلة
        </button>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.computerScreen}>
        <div style={styles.browserWindow}>
          <div style={styles.browserHeader}>
            <div style={styles.browserButtons}>
              <span style={styles.closeButton} onClick={handleClose}>✕</span>
              <span style={styles.minimizeButton}>–</span>
              <span style={styles.maximizeButton}>□</span>
            </div>
            <div style={styles.addressBar}>https://الشريط-المفقود.لعبة</div>
          </div>
          
          <div style={styles.gameContent}>
            <div style={styles.dialogueContainer}>
              <div style={styles.narratorText}>
                {text}<span style={styles.cursor}>|</span>
              </div>
            </div>

            <div style={styles.interactionArea}>
              <div style={styles.puzzleElement} onClick={handleClose}>
                إغلاق ✕
              </div>
              <div style={styles.puzzleElement}>
                اسحبني 🎮
              </div>
            </div>

            <div style={styles.dialogueOptions}>
              <button style={styles.optionButton} onClick={() => handleDialogue(1)}>
                من أنت؟
              </button>
              <button style={styles.optionButton} onClick={() => handleDialogue(2)}>
                أين أنا؟
              </button>
              <button style={styles.optionButton} onClick={() => handleDialogue(3)}>
                كيف أخرج من هنا؟
              </button>
            </div>
          </div>
        </div>
      </div>

      <button 
        style={styles.muteButton}
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
    </div>
  )
}

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  startScreen: {
    textAlign: 'center',
    color: 'white'
  },
  title: {
    fontSize: '3rem',
    background: 'linear-gradient(45deg, #4cc9f0, #4361ee)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#ccc',
    marginBottom: '30px'
  },
  startButton: {
    background: 'linear-gradient(45deg, #4361ee, #4cc9f0)',
    border: 'none',
    padding: '15px 40px',
    fontSize: '1.1rem',
    color: 'white',
    borderRadius: '25px',
    cursor: 'pointer'
  },
  computerScreen: {
    width: '90%',
    height: '90%',
    background: '#2d2d2d',
    borderRadius: '15px',
    border: '2px solid #444'
  },
  browserWindow: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  browserHeader: {
    background: '#3a3a3a',
    padding: '15px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    borderBottom: '1px solid #555'
  },
  browserButtons: {
    display: 'flex',
    gap: '10px'
  },
  closeButton: {
    width: '16px',
    height: '16px',
    background: '#ff5f57',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    cursor: 'pointer'
  },
  minimizeButton: {
    width: '16px',
    height: '16px',
    background: '#ffbd2e',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px'
  },
  maximizeButton: {
    width: '16px',
    height: '16px',
    background: '#28ca42',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px'
  },
  addressBar: {
    background: '#1a1a1a',
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    color: '#888',
    flex: 1
  },
  gameContent: {
    flex: 1,
    background: '#1a1a1a',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  dialogueContainer: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '10px',
    padding: '20px',
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  narratorText: {
    fontSize: '1.2rem',
    color: '#4cc9f0',
    textAlign: 'center'
  },
  cursor: {
    animation: 'blink 1s infinite'
  },
  interactionArea: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center'
  },
  puzzleElement: {
    background: 'rgba(76, 201, 240, 0.15)',
    border: '2px solid #4cc9f0',
    borderRadius: '10px',
    padding: '15px 25px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '1.1rem'
  },
  dialogueOptions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center'
  },
  optionButton: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer'
  },
  muteButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: 'white',
    padding: '10px',
    borderRadius: '50%',
    cursor: 'pointer'
  }
}
