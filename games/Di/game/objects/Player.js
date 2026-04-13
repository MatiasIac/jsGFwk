import { PORT_CONFIG, PLAYER_SIZE } from "../config.js";
import { DRAW_STYLE, SPRITES } from "../sprites.js";
import { clamp } from "../utils/math.js";

const framework = window.jsGFwk;
if (!framework) {
    throw new Error("jsGFwk bundle not loaded. Ensure ../../dist/jsgfwk-bundle.js is available.");
}

const { VisualGameObject, KeyboardIO } = framework;

const { SCREEN_WIDTH, SCREEN_HEIGHT } = PORT_CONFIG;
const PLAYER_COLLIDER_HEIGHT = PLAYER_SIZE - 1;
const MAX_SIM_DELTA = 0.05;

class Player extends VisualGameObject {
    constructor(runtime, keyboard) {
        super("player", 0, 0, PLAYER_SIZE, PLAYER_COLLIDER_HEIGHT, 1, true);
        this.runtime = runtime;
        this.keyboard = keyboard;
        this.jumpLatch = false;
        this.baseSpeed = 90;
        this.sprintFactor = 1.45;
        this.jumpVelocity = -200;
        this.gravity = 470;
        this.maxFallSpeed = 260;
        this.vy = 0;
        this.isGrounded = false;
        this.exitSuppressedUntilClear = true;
        this.exitCooldownMs = 200;
        this.lastExitAt = 0;
        this.horizontalAccumulator = 0;
        this.verticalAccumulator = 0;
        this.facing = "right";
        this.runFrame = 0;
        this.jumpFrame = 0;
        this.runAnimationTimer = 0;
        this.jumpAnimationTimer = 0;
        this.runAnimationStep = 0.12;
        this.jumpAnimationStep = 0.14;
        this.currentSprite = SPRITES.player.idle;
        this.respawn();
    }

    getRect(nextX = this.x, nextY = this.y) {
        return {
            x: nextX,
            y: nextY,
            width: this.width,
            height: this.height,
        };
    }

    respawn() {
        const spawn = this.runtime.getSpawnPoint();
        this.x = spawn.x;
        this.y = spawn.y;
        this.vy = 0;
        this.horizontalAccumulator = 0;
        this.verticalAccumulator = 0;
        this.isGrounded = this.runtime.isBlocked(this.getRect(this.x, this.y + 1));
        this.exitSuppressedUntilClear = true;
        this.lastExitAt = Date.now();
        this.runFrame = 0;
        this.jumpFrame = 0;
        this.runAnimationTimer = 0;
        this.jumpAnimationTimer = 0;
        this.currentSprite = SPRITES.player.idle;
    }

    moveHorizontal(amount) {
        const direction = Math.sign(amount);
        let remaining = Math.abs(amount);
        let moved = 0;

        while (remaining > 0) {
            const step = Math.min(remaining, 1) * direction;
            if (step === 0) {
                break;
            }

            const nextX = clamp(this.x + step, 0, SCREEN_WIDTH - this.width);
            const candidate = this.getRect(nextX, this.y);
            if (this.runtime.isBlocked(candidate)) {
                break;
            }

            this.x = nextX;
            remaining -= Math.abs(step);
            moved += step;
        }

        return moved;
    }

    moveVertical(amount) {
        const direction = Math.sign(amount);
        let remaining = Math.abs(amount);
        let moved = 0;

        this.isGrounded = false;

        while (remaining > 0) {
            const step = Math.min(remaining, 1) * direction;
            if (step === 0) {
                break;
            }

            const nextY = clamp(this.y + step, 0, SCREEN_HEIGHT - this.height);
            if (nextY === this.y) {
                if (direction > 0) {
                    this.isGrounded = true;
                }

                this.vy = 0;
                break;
            }

            const candidate = this.getRect(this.x, nextY);

            if (this.runtime.isBlocked(candidate)) {
                if (direction > 0) {
                    this.isGrounded = true;
                }

                this.vy = 0;
                this.verticalAccumulator = 0;
                break;
            }

            this.y = nextY;
            remaining -= Math.abs(step);
            moved += step;
        }

        if (!this.isGrounded) {
            this.isGrounded = this.runtime.isBlocked(this.getRect(this.x, this.y + 1));
        }

        return moved;
    }

    handleHazardsAndExits() {
        if (this.runtime.touchesSpike(this.getRect())) {
            this.runtime.setMessage("Spike hit. Respawning.");
            this.respawn();
            return;
        }

        const exit = this.runtime.findExit(this.getRect());
        const now = Date.now();

        if (!exit) {
            this.exitSuppressedUntilClear = false;
            return;
        }

        if (this.exitSuppressedUntilClear) {
            return;
        }

        if ((now - this.lastExitAt) < this.exitCooldownMs) {
            return;
        }

        const moved = this.runtime.setLevel(exit.goTo, exit.showsAt);
        if (moved) {
            this.respawn();
            this.runtime.setMessage(`Moved to level ${exit.goTo + 1}.`, 1400);
        }
    }

    updateAnimation(delta, horizontalIntent) {
        if (horizontalIntent < 0) {
            this.facing = "left";
        } else if (horizontalIntent > 0) {
            this.facing = "right";
        }

        if (!this.isGrounded) {
            this.jumpAnimationTimer += delta;
            while (this.jumpAnimationTimer >= this.jumpAnimationStep) {
                this.jumpAnimationTimer -= this.jumpAnimationStep;
                this.jumpFrame = (this.jumpFrame + 1) % 2;
            }

            if (this.facing === "left") {
                this.currentSprite = SPRITES.player.jumpLeft[this.jumpFrame];
            } else {
                this.currentSprite = SPRITES.player.jumpRight[this.jumpFrame];
            }
            return;
        }

        this.jumpAnimationTimer = 0;
        this.jumpFrame = 0;

        if (horizontalIntent < 0) {
            this.runAnimationTimer += delta;
            while (this.runAnimationTimer >= this.runAnimationStep) {
                this.runAnimationTimer -= this.runAnimationStep;
                this.runFrame = (this.runFrame + 1) % 2;
            }

            this.currentSprite = SPRITES.player.runLeft[this.runFrame];
            return;
        }

        if (horizontalIntent > 0) {
            this.runAnimationTimer += delta;
            while (this.runAnimationTimer >= this.runAnimationStep) {
                this.runAnimationTimer -= this.runAnimationStep;
                this.runFrame = (this.runFrame + 1) % 2;
            }

            this.currentSprite = SPRITES.player.runRight[this.runFrame];
            return;
        }

        this.runAnimationTimer = 0;
        this.runFrame = 0;
        this.currentSprite = SPRITES.player.idle;
    }

    update(delta) {
        const dt = Number.isFinite(delta) ? clamp(delta, 0, MAX_SIM_DELTA) : 0;
        const activeKeys = this.keyboard.getActiveKeys();
        const speed = activeKeys[KeyboardIO.KEYS.SHIFT]
            ? this.baseSpeed * this.sprintFactor
            : this.baseSpeed;

        let horizontalIntent = 0;
        if (activeKeys[KeyboardIO.KEYS.A] && !activeKeys[KeyboardIO.KEYS.D]) {
            horizontalIntent = -1;
        } else if (activeKeys[KeyboardIO.KEYS.D] && !activeKeys[KeyboardIO.KEYS.A]) {
            horizontalIntent = 1;
        }

        const deltaX = horizontalIntent * speed * dt;

        this.horizontalAccumulator += deltaX;
        const moveX = this.horizontalAccumulator > 0
            ? Math.floor(this.horizontalAccumulator)
            : Math.ceil(this.horizontalAccumulator);

        if (moveX !== 0) {
            const consumedX = this.moveHorizontal(moveX);
            this.horizontalAccumulator -= consumedX;
            if (consumedX !== moveX) {
                this.horizontalAccumulator = 0;
            }
        }

        const wantsJump = Boolean(
            activeKeys[KeyboardIO.KEYS.W]
            || activeKeys[KeyboardIO.KEYS.SPACEBAR]
        );

        if (!wantsJump) {
            this.jumpLatch = false;
        } else if (!this.jumpLatch && this.isGrounded) {
            this.vy = this.jumpVelocity;
            this.isGrounded = false;
            this.jumpLatch = true;
        }

        this.vy += this.gravity * dt;
        if (this.vy > this.maxFallSpeed) {
            this.vy = this.maxFallSpeed;
        }

        this.verticalAccumulator += this.vy * dt;
        const moveY = this.verticalAccumulator > 0
            ? Math.floor(this.verticalAccumulator)
            : Math.ceil(this.verticalAccumulator);

        if (moveY !== 0) {
            const consumedY = this.moveVertical(moveY);
            this.verticalAccumulator -= consumedY;
            if (consumedY !== moveY) {
                this.verticalAccumulator = 0;
            }
        } else if (this.isGrounded) {
            this.verticalAccumulator = 0;
        }

        this.updateAnimation(dt, horizontalIntent);
        this.handleHazardsAndExits();
    }

    drawSpectrum(renderer) {
        renderer.drawSprite(this.x | 0, this.y | 0, this.currentSprite, DRAW_STYLE.player);
    }
}

export { Player };
