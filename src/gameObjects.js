class GameObject {
    name = crypto.randomUUID();
    zOrder = 0;
    isVisible = false;

    constructor() { }

    init() { }

    update(delta) { 
        console.log(`Dummy game object ${this.name}`);
    }
}

class VisualGameObject extends GameObject {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    isVisible = true;

    constructor(name, x, y, width, height, zOrder, isVisible) {
        super();

        super.name = name;
        super.zOrder = zOrder || 0;

        this.isVisible = isVisible || true;
        this.x = x || this.x;
        this.y = y || this.y;
        this.width = width || this.width;
        this.height = height || this.height;
    }

    draw(context) { }
}

export { GameObject, VisualGameObject };