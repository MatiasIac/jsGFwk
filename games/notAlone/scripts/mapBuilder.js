class MapBuilder {

    mapConstants = { };

    constructor() {
        for (let index = 0; index < MAP_TILES.length; index++) {
            const element = MAP_TILES[index];
            this._setMapConstants(element)
        }
    }

    _createKey = (r, g, b) => `${r}, ${g}, ${b}`;

    _setMapConstants(element) {
        let { r, g, b, tileIndex, isSolid } = element;
        isSolid = isSolid || false;
        this.mapConstants[this._createKey(r, g, b)] = { tileIndex, isSolid };
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