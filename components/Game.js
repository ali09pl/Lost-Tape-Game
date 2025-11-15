import { useState, useEffect, useRef } from 'react';

const Game = () => {
    const [currentScreen, setCurrentScreen] = useState('start');
    const [narratorText, setNarratorText] = useState('');
    const [currentChapter, setCurrentChapter] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const gameContainerRef = useRef(null);

    // بيانات القصة
    const story = {
        0: {
            title: "البداية غير المرحب بها",
            dialogues: {
                start: "أهلاً... لا، انتظر، لم أقل شيئاً. ارحل من هنا!",
                options: {
                    1: { text: "من أنت؟", response: "أنا؟ مجرد راوٍ محبوس في هذا النظام المعطوب. وأنت تزعجني!" },
                    2: { text: "أين أنا؟", response: "أنت في موقع إلكتروني محطم، وأنا مشغول بمحاولة إصلاحه!" },
                    3: { text: "كيف أخرج من هنا؟", response: "الإغلاق؟ جربت ذلك الزر الأحمر في الأعلى؟ لا يعمل، صدمة!" }
                }
            }
        }
    };

    // تأثيرات صوتية بسيطة
    const playSound = (frequency = 800, duration = 100) => {
        if (isMuted) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration/1000);
            
            oscillator.start();
            setTimeout(() => oscillator.stop(), duration);
        } catch (e) {
            console.log("الصوت غير مدعوم");
        }
    };

    // كتابة النص بشكل متحرك
    const typeText = (text, speed = 40) => {
        let i = 0;
        setNarratorText('');
        
        const typing = setInterval(() => {
            if (i < text.length) {
                setNarratorText(prev => prev + text.charAt(i));
                playSound(200, 50);
                i++;
            } else {
                clearInterval(typing);
            }
        }, speed);
    };

    // بدء اللعبة
    const startGame = () => {
        playSound();
        setCurrentScreen('main');
        setTimeout(() => {
            typeText(story[currentChapter].dialogues.start);
        }, 500);
    };

    // التعامل مع خيارات الحوار
    const handleDialogueChoice = (responseId) => {
        playSound();
        const option = story[currentChapter].dialogues.options[responseId];
        if (option) {
            typeText(option.response);
        }
    };

    // التعامل مع زر الإغلاق
    const handleCloseButton = () => {
        playSound();
        typeText("مفاجأة! الزر لا يعمل... لماذا أعتقدت أنه سيعمل؟");
    };

    // السحب والإفلات
    const setupDragAndDrop = () => {
        const dragElement = document.getElementById('drag-puzzle');
        if (!dragElement) return;

        let isDragging = false;

        const handleMouseDown = (e) => {
            isDragging = true;
            dragElement.style.cursor = 'grabbing';
        };

        const handleMouseMove = (e) => {
            if (isDragging) {
                dragElement.style.position = 'absolute';
                dragElement.style.left = (e.clientX - 60) + 'px';
                dragElement.style.top = (e.clientY - 30) + 'px';
            }
        };

        const handleMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                dragElement.style.cursor = 'grab';
                typeText("حسناً، يبدو أنك مصمم على البقاء. ربما يمكنك المساعدة...");
            }
        };

        dragElement.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            dragElement.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    };

    useEffect(() => {
        if (currentScreen === 'main') {
            const cleanup = setupDragAndDrop();
            return cleanup;
        }
    }, [currentScreen]);

    // شاشة البداية
    const StartScreen = () => (
        <div id="start-screen" className="screen active">
            <div id="title-section">
                <h1 className="game-title">الشريط المفقود</h1>
                <p className="game-subtitle">لعبة من الغموض والهزل - نسخة React</p>
                <button id="start-btn" onClick={startGame}>
                    ابدأ الرحلة
                </button>
            </div>
        </div>
    );

    // الشاشة الرئيسية للعبة
    const MainGameScreen = () => (
        <div id="main-screen" className="screen active">
            <div id="computer-screen">
                <div id="browser-window">
                    <div id="browser-header">
                        <div className="browser-buttons">
                            <span className="browser-btn close" id="close-btn" onClick={handleCloseButton}>
                                ✕
                            </span>
                            <span className="browser-btn minimize">–</span>
                            <span className="browser-btn maximize">□</span>
                        </div>
                        <div id="address-bar">https://الشريط-المفقود.لعبة</div>
                    </div>
                    
                    <div id="game-content">
                        <div id="dialogue-container">
                            <div id="narrator-text">
                                <span className="typing-text">{narratorText}</span>
                            </div>
                        </div>

                        <div id="interaction-area">
                            <div className="puzzle-element" id="close-puzzle" onClick={handleCloseButton}>
                                <span>إغلاق ✕</span>
                            </div>
                            <div className="puzzle-element" id="drag-puzzle">
                                <span>اسحبني 🎮</span>
                            </div>
                        </div>

                        <div id="dialogue-options">
                            <button className="dialogue-option" onClick={() => handleDialogueChoice('1')}>
                                من أنت؟
                            </button>
                            <button className="dialogue-option" onClick={() => handleDialogueChoice('2')}>
                                أين أنا؟
                            </button>
                            <button className="dialogue-option" onClick={() => handleDialogueChoice('3')}>
                                كيف أخرج من هنا؟
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div id="game-container" ref={gameContainerRef}>
            <div id="language-selector">
                <button className="lang-btn active">العربية</button>
                <button className="lang-btn">English</button>
                <button className="lang-btn">Français</button>
            </div>

            {currentScreen === 'start' && <StartScreen />}
            {currentScreen === 'main' && <MainGameScreen />}

            <button 
                className="mute-btn"
                onClick={() => setIsMuted(!isMuted)}
            >
                {isMuted ? '🔇' : '🔊'}
            </button>
        </div>
    );
};

export default Game;
