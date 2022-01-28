var starfield = {
    id: "starfield",
    offset: 0,
    visible: true,
    starImage: {},
    speed: 3.5,

    init: function () {	
        var c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(0, 0, width, height);
        ctx.fill();
        ctx.beginPath();

        for (var n=0; n < 100; n++){
            var x = parseInt(Math.random() * canvas.width);
            var y = parseInt(Math.random() * canvas.height);
            var radius = Math.random() * 1;
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.closePath();
        }

        ctx.fillStyle = "white";
        ctx.fill();

        this.starImage = new Image();
        this.starImage.src = c.toDataURL();
    },

    update: function(delta) {
        this.offset -= this.speed;
        if (this.offset < 0) { this.offset = height; }
    },
    draw: function (context) {
        context.drawImage(this.starImage, 0, -this.offset);
        context.drawImage(this.starImage, 0, height - this.offset);
    }
};