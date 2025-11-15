// نظام القصة والأحداث الكامل
class GameStory {
    constructor() {
        this.currentChapter = 0;
        this.progress = 0;
        this.unlockedPuzzles = new Set([1]);
        this.foundClues = new Set();
        this.narratorMood = 'annoyed';
    }

    getChapter(chapterId) {
        const chapters = {
            0: {
                title: "البداية غير المرحب بها",
                dialogues: {
                    start: "أهلاً... لا، انتظر، لم أقل شيئاً. ارحل من هنا!",
                    afterCloseFail: "مفاجأة! الزر لا يعمل... لماذا أعتقدت أنه سيعمل؟",
                    afterDrag: "حسناً، يبدو أنك مصمم على البقاء. ربما يمكنك المساعدة...",
                    options: {
                        1: { text: "من أنت؟", response: "أنا؟ مجرد راوٍ محبوس في هذا النظام المعطوب. وأنت تزعجني!", mood: "annoyed" },
                        2: { text: "أين أنا؟", response: "أنت في موقع إلكتروني محطم، وأنا مشغول بمحاولة إصلاحه!", mood: "annoyed" },
                        3: { text: "كيف أخرج من هنا؟", response: "الإغلاق؟ جربت ذلك الزر الأحمر في الأعلى؟ لا يعمل، صدمة!", mood: "sarcastic" }
                    }
                },
                puzzles: [1, 2],
                clues: ["broken_button", "glitching_text"]
            },
            1: {
                title: "اكتشاف النظام",
                dialogues: {
                    start: "حسناً، بما أنك مصر على البقاء... هل ترى تلك الملفات المعطوبة في الأسفل؟",
                    afterPuzzle1: "ممتاز! لقد وجدت أول دليل. يبدو أن هناك شيئاً ما يعبث بالشيفرة المصدرية.",
                    options: {
                        1: { text: "ما هذه الملفات؟", response: "هذه بقايا النظام الأصلي. شيء ما حذف أجزاء مهمة!", mood: "curious" },
                        2: { text: "من يعبث بالشيفرة؟", response: "لا أعرف... لكني أشعر بوجود شيء آخر هنا معنا.", mood: "worried" },
                        3: { text: "كيف يمكنني المساعدة؟", response: "حاول إصلاح بعض الملفات. ربما نكتشف ما يحدث معاً.", mood: "cooperative" }
                    }
                },
                puzzles: [3, 4, 5],
                clues: ["deleted_files", "strange_code", "hidden_message"]
            }
        };
        return chapters[chapterId];
    }

    progressToNextChapter() {
        this.currentChapter++;
        this.progress = 0;
        this.narratorMood = 'curious';
        return this.getChapter(this.currentChapter);
    }

    unlockPuzzle(puzzleId) {
        this.unlockedPuzzles.add(puzzleId);
    }

    addClue(clueId) {
        this.foundClues.add(clueId);
    }

    setMood(mood) {
        this.narratorMood = mood;
    }

    getMoodStyle() {
        const moods = {
            'annoyed': { color: '#ff6b6b', emoji: '😠' },
            'sarcastic': { color: '#ffd93d', emoji: '😏' },
            'curious': { color: '#4ecdc4', emoji: '🤔' },
            'worried': { color: '#ff9ff3', emoji: '😟' },
            'cooperative': { color: '#1dd1a1', emoji: '🤝' }
        };
        return moods[this.narratorMood] || moods['annoyed'];
    }
}
