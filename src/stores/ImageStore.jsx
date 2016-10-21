var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../Actions');
var _ = require('lodash');

module.exports = Reflux.createStore({
    listenables: [Actions],
    getImages: function(topicId) {
        return Api.get('topics/' + topicId)
            .then(function(json){
                this.images = _.reject(json.data,function(image) {
                    return image.is_album
                });
                this.triggerChange();
            }.bind(this));
    },
    getImage: function(imageId) {
        return Api.get('image/' + imageId)
            .then(function(json){
                if (this.images) {
                    this.images.push(json.data);
                } else {
                    this.images = [json.data];
                }
                this.triggerChange();
            }.bind(this));
    },
    find: function(imageId) {
        var image = _.find(this.images, {id:imageId});
        if (image) {
            return image
        } else {
            this.getImage(imageId);
            return null
        }
    },
    triggerChange: function() {
        this.trigger('change',this.images);
    }
});