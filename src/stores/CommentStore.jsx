var Reflux = require('reflux');
var Actions = require('../Actions');
var Api = require('../utils/api');

module.exports = Reflux.createStore({
    listenables: [Actions],
    getImage: function(imageId) {
        Api.get('gallery/' + imageId + '/comments')
            .then(function(json){
                this.comment = json.data;
                this.triggerChange();
            }.bind(this));
    },
    triggerChange: function() {
        this.trigger('change',this.comment);
    }
});