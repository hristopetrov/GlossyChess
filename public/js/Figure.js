var Figure = (function () {
    function Figure(game, cell, image) {

        if (typeof this.constructor === 'Figure') {
            throw new Error('You cannot create instance of Figure!');
        }

        this.game = game;

        this.cell = cell;

        this.image = image;



    }
})()