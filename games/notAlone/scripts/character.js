

class Character extends jsGFwk.VisualGameObject {

    constructor() {
        super("guy", 0, 0, 0, 0, 30);
    }

    update(delta) {
        if (keyboardIO.getActiveKeys()[jsGFwk.KeyboardIO.KEYS.W] === true) { VIEWPORT_Y -= 1; }
        if (keyboardIO.getActiveKeys()[jsGFwk.KeyboardIO.KEYS.S] === true) { VIEWPORT_Y += 1; }
        if (keyboardIO.getActiveKeys()[jsGFwk.KeyboardIO.KEYS.D] === true) { VIEWPORT_X += 1; }
        if (keyboardIO.getActiveKeys()[jsGFwk.KeyboardIO.KEYS.A] === true) { VIEWPORT_X -= 1; }
    }

    draw(context) {

    }
}

let character = new Character();