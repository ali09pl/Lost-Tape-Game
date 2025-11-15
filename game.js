class LostTapeGame {
    constructor() {
        this.currentStage = 0;
        this.narrator = new Narrator();
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log("🎮 لعبة الشريط المفقود - جاهزة!");
    }

    setupEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startGame();
        });

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLanguage(e.target.dataset.lang);
            });
        });
    }

    startGame() {
        const startScreen = document.getElementById('start-screen');
        startScreen.style.opacity = '0';
        startScreen.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            startScreen.style.display = 'none';
            this.showMainGame();
        }, 500);
    }

    showMainGame() {
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = `
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
                                <span class="typing-text">أهلاً... لا، انتظر، لم أقل شيئاً. ارحل من هنا!</span>
                            </div>
                        </div>

                        <div id="interaction-area">
                            <div class="puzzle-element" id="close-puzzle">
                                <span>إغلاق ✕</span>
                            </div>
                            <div class="puzzle-element" id="drag-puzzle">
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
        `;

        this.setupGameEvents();
        this.narrator.speak('initialDialogue');
    }

    setupGameEvents() {
        document.getElementById('close-btn').addEventListener('click', () => {
            this.handleCloseButton();
        });

        document.querySelectorAll('.dialogue-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.handleDialogueChoice(e.target.dataset.response);
            });
        });

        this.setupDragAndDrop();
    }

    handleCloseButton() {
        const closeBtn = document.getElementById('close-btn');
        closeBtn.style.animation = 'glitch 0.5s infinite';
        
        setTimeout(() => {
            closeBtn.style.animation = '';
        }, 1000);
        
        this.narrator.typeText('مفاجأة! الزر لا يعمل... لماذا أعتقدت أنه سيعمل؟');
    }

    handleDialogueChoice(responseId) {
        const responses = {
            '1': 'أنا؟ مجرد راوٍ محبوس في هذا النظام المعطوب. وأنت تزعجني!',
            '2': 'أنت في موقع إلكتروني محطم، وأنا مشغول بمحاولة إصلاحه!',
            '3': 'الإغلاق؟ جربت ذلك الزر الأحمر في الأعلى؟ لا يعمل، صدمة!'
        };
        
        this.narrator.typeText(responses[responseId]);
    }

    setupDragAndDrop() {
        const dragElement = document.getElementById('drag-puzzle');
        let isDragging = false;

        dragElement.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragElement.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                dragElement.style.position = 'absolute';
                dragElement.style.left = (e.clientX - 50) + 'px';
                dragElement.style.top = (e.clientY - 25) + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                dragElement.style.cursor = 'grab';
                this.narrator.typeText('حسناً، يبدو أنك مصمم على البقاء. ربما يمكنك المساعدة...');
            }
        });
    }

    switchLanguage(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // تطبيق الترجمة
        this.applyTranslation(lang);
    }

    applyTranslation(lang) {
        const translations = {
            'ar': {
                title: 'الشريط المفقود',
                subtitle: 'لعبة من الغموض والهزل',
                startBtn: 'ابدأ اللعبة',
                address: 'https://الشريط-المفقود.لعبة',
                closeBtn: 'إغلاق ✕',
                dragBtn: 'اسحبني 🎮',
                options: ['من أنت؟', 'أين أنا؟', 'كيف أخرج من هنا؟'],
                dialogues: {
                    initial: 'أهلاً... لا، انتظر، لم أقل شيئاً. ارحل من هنا!',
                    closeFail: 'مفاجأة! الزر لا يعمل... لماذا أعتقدت أنه سيعمل؟',
                    help: 'حسناً، يبدو أنك مصمم على البقاء. ربما يمكنك المساعدة...'
                }
            },
            'en': {
                title: 'The Lost Tape', 
                subtitle: 'A Mystery Comedy Game',
                startBtn: 'Start Game',
                address: 'https://the-lost-tape.game',
                closeBtn: 'Close ✕',
                dragBtn: 'Drag Me 🎮',
                options: ['Who are you?', 'Where am I?', 'How do I get out?'],
                dialogues: {
                    initial: 'Hello... wait, no, I didn\'t say anything. Get out of here!',
                    closeFail: 'Surprise! The button doesn\'t work... why did you think it would?',
                    help: 'Well, you seem determined to stay. Maybe you can help...'
                }
            },
            'fr': {
                title: 'La Bande Perdue',
                subtitle: 'Jeu de Mystère et Comédie', 
                startBtn: 'Commencer le Jeu',
                address: 'https://la-bande-perdue.jeu',
                closeBtn: 'Fermer ✕',
                dragBtn: 'Tirez-moi 🎮',
                options: ['Qui êtes-vous ?', 'Où suis-je ?', 'Comment sortir ?'],
                dialogues: {
                    initial: 'Bonjour... attendez, non, je n\'ai rien dit. Sortez d\'ici !',
                    closeFail: 'Surprise ! Le bouton ne fonctionne pas... pourquoi pensiez-vous qu\'il fonctionnerait ?',
                    help: 'Eh bien, vous semblez déterminé à rester. Peut-être pouvez-vous aider...'
                }
            }
        };

        const t = translations[lang];
        
        // تطبيق الترجمة
        document.querySelector('.game-title').textContent = t.title;
        document.querySelector('.game-subtitle').textContent = t.subtitle;
        document.getElementById('start-btn').textContent = t.startBtn;
        
        if(document.getElementById('address-bar')) {
            document.getElementById('address-bar').textContent = t.address;
            document.getElementById('close-puzzle').innerHTML = `<span>${t.closeBtn}</span>`;
            document.getElementById('drag-puzzle').innerHTML = `<span>${t.dragBtn}</span>`;
            
            const options = document.querySelectorAll('.dialogue-option');
            options.forEach((option, index) => {
                option.textContent = t.options[index];
            });
        }
    }
}

class Narrator {
    speak(textKey) {
        const texts = {
            'initialDialogue': 'أهلاً... لا، انتظر، لم أقل شيئاً. ارحل من هنا!'
        };
        this.typeText(texts[textKey]);
    }

    typeText(text, speed = 30) {
        const textElement = document.getElementById('narrator-text');
        if(!textElement) return;
        
        textElement.innerHTML = '<span class="typing-text"></span>';
        const typingElement = textElement.querySelector('.typing-text');
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, speed);
    }
}

// إصلاح النصوص العربية عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // استبدال النصوص الخاطئة
    const body = document.body;
    const fixes = {
        "اسحيني": "اسحبني",
        "اسميني": "اسحبني", 
        "استجنبي": "اسحبني",
        "المققود": "المفقود",
        "المثقود": "المفقود",
        "محظم": "محطم",
        "راو": "راوٍ",
        "لماذا": "لماذا"
    };
    
    Object.keys(fixes).forEach(wrong => {
        const right = fixes[wrong];
        body.innerHTML = body.innerHTML.replace(new RegExp(wrong, 'g'), right);
    });
    
    window.game = new LostTapeGame();
});
