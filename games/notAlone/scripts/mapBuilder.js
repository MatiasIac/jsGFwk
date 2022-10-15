class MapBuilder {

    mapConstants = { };

    constructor() {
        //water
        this._setMapConstants(0, 0, 255, 0, false);
        //dirt
        this._setMapConstants(204, 102, 0, 1, false);
    }

    _createKey = (r, g, b) => `${r}, ${g}, ${b}`;

    _setMapConstants(r, g, b, tile, isSolid) {
        isSolid = isSolid || false;
        this.mapConstants[this._createKey(r, g, b)] = { tile, isSolid };
    }

    _createEmptyMapArray(width, height) {
        let emptyArray = new Array(width);

        for (let i = 0; i < emptyArray.length; i++) {
            emptyArray[i] = new Array(height);
        }

        return emptyArray;
    }

    createMap(mapImage) {
        const width = mapImage.width;
        const height = mapImage.height;

        let x = 0;
        let y = 0;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');
        context.clearRect(0, 0, width, height);
        context.drawImage(mapImage, 0, 0);

        const imgData = context.getImageData(0, 0, width, height);

        let mapMatrix = this._createEmptyMapArray(width, height);

        for (var i = 0; i < imgData.data.length; i += 4) {
            const r = imgData.data[i];
            const g = imgData.data[i + 1];
            const b = imgData.data[i + 2];
            const alpha = imgData.data[i + 3];

            if (i % (width * 4) === 0) {
                x = 0;
                y++;
            }
            x++;

            mapMatrix[x - 1][y - 1] = this.mapConstants[this._createKey(r, g, b)];

        }

        return mapMatrix;
    }
}

let mapBuilder = new MapBuilder();