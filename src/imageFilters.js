class ImageFilters {

    constructor() { }

    static _convolute(context, weights, img) {
        const side = Math.round(Math.sqrt(weights.length));
        const halfSide = Math.floor(side / 2);
        const pixels = context.getImageData(0, 0, img.width, img.height);
        let src = pixels.data;
        const w = pixels.width;
        const h = pixels.height;
        
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = w;
        tempCanvas.height = h;
        let tempContext = tempCanvas.getContext("2d");
        const pixelData = tempContext.createImageData(w, h);
        let dst = pixelData.data;

        const alphaFac = 0;
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                let sy = y;
                let sx = x;
                let dstOff = (y * w + x) * 4;
                let r = 0, g = 0, b = 0, a = 0;
                for (let cy = 0; cy < side; cy++) {
                    for (let cx = 0; cx < side; cx++) {
                        let scy = sy + cy - halfSide;
                        let scx = sx + cx - halfSide;
                        if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                            let srcOff = (scy * sw + scx) * 4;
                            let wt = weights[cy * side + cx];
                            r += src[srcOff] * wt;
                            g += src[srcOff+1] * wt;
                            b += src[srcOff+2] * wt;
                            a += src[srcOff+3] * wt;
                        }
                    }
                }
                dst[dstOff] = r;
                dst[dstOff+1] = g;
                dst[dstOff+2] = b;
                dst[dstOff+3] = a + alphaFac * (255 - a);
            }
        }
        
        context.putImageData(pixelData, 0, 0);
    }

    static _convolute2(context, weights, img, offset, divisor) {
        if (!divisor) {
            divisor = weights.reduce(function(a, b) {return a + b;}) || 1;
        }

        const pixels = context.getImageData(0, 0, img.width, img.height);
        let src = pixels.data;
        const w = pixels.width;
        const h = pixels.height;
        
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = w;
        tempCanvas.height = h;
        let tempContext = tempCanvas.getContext("2d");
        const pixelData = tempContext.createImageData(w, h);
        let dst = pixelData.data;
        let len = dst.length; 
        let res = 0;

        for (let i = 0; i < len; i++) {
            if ((i + 1) % 4 === 0) {
              dst[i] = src[i];
              continue;
            }
            res = 0;
            let these = [
              src[i - w * 4 - 4] || src[i],
              src[i - w * 4]     || src[i],
              src[i - w * 4 + 4] || src[i],
              src[i - 4]         || src[i],
              src[i],
              src[i + 4]         || src[i],
              src[i + w * 4 - 4] || src[i],
              src[i + w * 4]     || src[i],
              src[i + w * 4 + 4] || src[i]
            ];
            for (let j = 0; j < 9; j++) {
              res += these[j] * weights[j];
            }
            res /= divisor;
            if (offset) {
              res += offset;
            }
            dst[i] = res;
        }
        context.putImageData(pixelData, 0, 0);
    }

    static GRAYSCALE(context, img) {
        const imageData = context.getImageData(0, 0, img.width, img.height);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
            data[i] = brightness;
            data[i + 1] = brightness;
            data[i + 2] = brightness;
        }

        context.putImageData(imageData, 0, 0);
    }

    static INVERTCOLOR(context, img) {
        const imageData = context.getImageData(0, 0, img.width, img.height);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }

        context.putImageData(imageData, 0, 0);
    }

    static DARKER(context, img) {
        const imageData = context.getImageData(0, 0, img.width, img.height);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = (data[i] - 50 < 0 ? 0 : data[i] - 50);
            data[i + 1] = (data[i + 1] - 50 < 0 ? 0 : data[i + 1] - 50);
            data[i + 2] = (data[i + 2] - 50 < 0 ? 0 : data[i + 2] - 50);
        }

        context.putImageData(imageData, 0, 0);
    }

    static BLUR(context, img) {
        const weights = [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9];
        ImageFilters._convolute(context, weights, img);
    }

    static SHARPEN(context, img) {
        const weights = [ 0, -2, 0, -2, 11, -2, 0, -2, 0];
        ImageFilters._convolute2(context, weights, img);
    }

    static EMBOSSSUBTLE(context, img) {
        const weights = [1, 1, -1, 1, 3, -1, 1, -1, -1];
        ImageFilters._convolute2(context, weights, img);
    }

    static EMBOSS(context, img) {
        const weights = [2, 0, 0, 0, -1, 0, 0, 0, -1];
        ImageFilters._convolute2(context, weights, img, 127);
    }

    static EDGEDETECT(context, img) {
        const weights = [1, 1, 1, 1, -7, 1, 1, 1, 1];
        ImageFilters._convolute2(context, weights, img);
    }

    static EDGEDETECT2(context, img) {
        const weights = [-5, 0, 0, 0, 0, 0, 0, 0, 5];
        ImageFilters._convolute2(context, weights, img);
    }		
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = ImageFilters;
}