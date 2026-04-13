function clamp(value, min, max) {
    if (value < min) {
        return min;
    }

    if (value > max) {
        return max;
    }

    return value;
}

function intersects(a, b) {
    return !(
        (a.x + a.width) <= b.x
        || (b.x + b.width) <= a.x
        || (a.y + a.height) <= b.y
        || (b.y + b.height) <= a.y
    );
}

export { clamp, intersects };
