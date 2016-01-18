var foreground = {
    id: 'foreground',
    visible: true,
    init: function () {
        var self = this;
        this.enabledMessage = false;
        this.message = '';
        this.messageTimer = new jsGFwk.Timer({
            action: function () {
                self.enabledMessage = false;
                self.message = '';
            }, tickTime: 2
        });
    },
    showMessage: function (message) {
        this.message = message;
        this.enabledMessage = true;
    },
    update: function (delta) {
        if (this.enabledMessage) {
            this.messageTimer.tick(delta);
        }
    },
    draw: function (context) {
        context.fillStyle = 'gray';
        context.textAlign = 'center';
        context.font = '34pt roboto';
        context.fillText(this.message, jsGFwk.settings.width / 2, jsGFwk.settings.height / 2);
    }
};