// النظام الرئيسي للعبة - النسخة المبسطة
class LostTapeGame {
    constructor() {
        this.story = new GameStory();
        this.puzzles = new PuzzleSystem();
        this.audio = new AudioSystem();
        this.narrator = new Narrator(this);
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log("🎮 لعبة الشريط المفقود - جاهزة!");
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const startBtn = document.getElementById('start-btn');
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    this.audio.playClickSound();
                    this.startGame();
                });
            }

            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.audio.playClickSound();
                    this.switchLanguage(e.target.dataset.lang);
                });
            });

            this.createMuteButton();
        });
    }

    createMuteButton() {
        const muteBtn = document.createElement('button');
        muteBtn.innerHTML = '🔊';
        muteBtn.className = 'mute-btn';
        muteBtn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 10px; border-radius: 50%; cursor: pointer; z-index: 1000;';
        
        muteBtn.addEventListener('click', () => {
            const isMuted = this.audio.toggleMute();
            muteBtn.innerHTML = isMuted ? '🔇' : '🔊';
            this.audio.playClickSound();
        });

        document.body.appendChild(muteBtn);
    }

    startGame() {
        const startScreen = document.getElementById('start-screen');
        startScreen.style.opacity = '0';
        
        setTimeout(() => {
            startScreen.classList.remove('active');
            this.showMainGame();
        }, 500);
    }

    showMainGame() {
        const gameContainer = document.getElementById('game-container');
        const currentChapter = this.story.getChapter(this.story.currentChapter);
        
        gameContainer.innerHTML = `
            <div id="main-screen" class="screen active">
                <div id="computer-screen">
                    <div id="browser-window">
                        <div id="browser-header">
                            <div class="browser-buttons">
                                <span class="browser-btn close" id="close-btn">✕</span>
                                <span class="browser-btn minimize">–</span>
                                <span class="browser-btn maximize">□</span>
                            </div>
                            <div id="address-bar">https://الشريط-المفقود.لعبة</div>
                        </div>
                        
                        <div id="game-content">
                            <div id="dialogue-container">
                                <div id="narrator-text">
                                    <span class="typing-text"></span>
                                </div>
                            </div>

                            <div id="interaction-area">
                                <div class="puzzle-element" id="close-puzzle" data-puzzle="1">
                                    <span>إغلاق ✕</span>
                                </div>
                                <div class="puzzle-element" id="drag-puzzle" data-puzzle="2">
                                    <span>اسحبني 🎮</span>
                                </div>
                            </div>

                            <div id="dialogue-options">
                                <button class="dialogue-option" data-response="1">من أنت؟</button>
                                <button class="dialogue-option" data-response="2">أين أنا؟</button>
                                <button class="dialogue-option" data-response="3">كيف أخرج من هنا؟</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupGameEvents();
        this.narrator.typeText(currentChapter.dialogues.start);
    }

    setupGameEvents() {
        const closeBtn = document.getElementById('close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.handleCloseButton();
            });
        }

        const dragElement = document.getElementById('drag-puzzle');
        if (dragElement) {
            this.setupDragAndDrop(dragElement);
        }

        document.querySelectorAll('.dialogue-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.audio.playClickSound();
                this.handleDialogueChoice(e.target.dataset.response);
            });
        });
    }

    handleCloseButton() {
        this.audio.playClickSound();
        const closeBtn = document.getElementById('close-btn');
        closeBtn.classList.add('glitch');
        
        setTimeout(() => {
            closeBtn.classList.remove('glitch');
        }, 1000);
        
        this.puzzles.solvePuzzle(this, 1);
    }

    setupDragAndDrop(element) {
        let isDragging = false;

        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            element.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                element.style.position = 'absolute';
                element.style.left = (e.clientX - 60) + 'px';
                element.style.top = (e.clientY - 30) + 'px';
                
                // التحقق إذا وصل للهدف
                const targetZone = { x: 300, y: 200, width: 100, height: 100 };
                const rect = element.getBoundingClientRect();
                if (rect.x >= targetZone.x && rect.x <= targetZone.x + targetZone.width &&
                    rect.y >= targetZone.y && rect.y <= targetZone.y + targetZone.height) {
                    this.puzzles.solvePuzzle(this, 2, element, rect.x, rect.y);
                }
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = 'grab';
            }
        });
    }

    handleDialogueChoice(responseId) {
        const chapter = this.story.getChapter(this.story.currentChapter);
        const option = chapter.dialogues.options[responseId];
        
        if (option) {
            this.story.setMood(option.mood);
            this.narrator.typeText(option.response);
        }
    }

    switchLanguage(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        console.log("اللغة: " + lang);
    }
}

class Narrator {
    constructor(game) {
        this.game = game;
    }

    typeText(text, speed = 40) {
        const textElement = document.getElementById('narrator-text');
        if (!textElement) return;

        textElement.innerHTML = '<span class="typing-text"></span>';
        const typingElement = textElement.querySelector('.typing-text');
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                this.game.audio.playTypingSound();
                i++;
            } else {
                clearInterval(typing);
            }
        }, speed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.game = new LostTapeGame();
});
