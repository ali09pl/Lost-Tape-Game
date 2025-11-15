// نظام الألغاز المبسط
class PuzzleSystem {
    constructor() {
        this.puzzles = new Map();
        this.initPuzzles();
    }

    initPuzzles() {
        // اللغز 1: زر الإغلاق المعطوب
        this.puzzles.set(1, {
            id: 1,
            name: "زر الإغلاق المعطوب",
            type: "click",
            description: "زر الإغلاق لا يعمل - حاول إصلاحه",
            requiredClicks: 3,
            currentClicks: 0,
            solved: false,
            onAttempt: function(game) {
                this.currentClicks++;
                const responses = [
                    "لا يعمل... هل تعتقد أن النقر أكثر سيساعد؟",
                    "ما زال لا يعمل! ربما نحتاج إلى طريقة أخرى.",
                    "مفاجأة! لا يزال لا يعمل... لماذا تستمر في المحاولة؟"
                ];
                game.narrator.typeText(responses[this.currentClicks - 1] || "توقف! هذا لا يجدي.");
                
                if (this.currentClicks >= this.requiredClicks) {
                    this.solved = true;
                    game.story.unlockPuzzle(2);
                    game.story.addClue("broken_button");
                    game.narrator.typeText("انتظر... لقد لاحظت شيئاً. الزر ليس معطوباً بل تم تعطيله عمداً!");
                    return true;
                }
                return false;
            }
        });

        // اللغز 2: سحب العنصر
        this.puzzles.set(2, {
            id: 2,
            name: "العنصر المتحرك",
            type: "drag",
            description: "اسحب العنصر إلى المنطقة الصحيحة",
            targetZone: { x: 300, y: 200, width: 100, height: 100 },
            solved: false,
            onAttempt: function(game, element, x, y) {
                const target = this.targetZone;
                if (x >= target.x && x <= target.x + target.width &&
                    y >= target.y && y <= target.y + target.height) {
                    this.solved = true;
                    game.story.progressToNextChapter();
                    game.narrator.typeText("ممتاز! لقد سحبتها إلى المكان الصحيح. انظر، تظهر ملفات جديدة!");
                    return true;
                }
                return false;
            }
        });
    }

    getPuzzle(id) {
        return this.puzzles.get(id);
    }

    solvePuzzle(game, puzzleId, ...args) {
        const puzzle = this.getPuzzle(puzzleId);
        if (puzzle && !puzzle.solved) {
            return puzzle.onAttempt(game, ...args);
        }
        return false;
    }
}
