var React = require('react');
var Reflux = require('reflux');
var ImageStore = require('../stores/ImageStore');
var Actions = require('../Actions');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var ImagePreview = require('./ImagePreview');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(ImageStore,'onChange')
    ],
    getInitialState: function() {
        return {
            images: []
        }
    },
    componentWillMount: function() {
        Actions.getImages(this.props.params.id);
    },
    componentWillReceiveProps: function(nextProps) {
        Actions.getImages(nextProps.params.id);
    },
    render: function () {
        return <div className="topic">
            {this.renderImages()}
        </div>
    },
    renderImages: function() {
        return this.state.images.slice(0,60).map(function(image) {
            return <ImagePreview key={image.id} {...image} />
        })
    },
    onChange: function(event, images) {
        this.setState({images: images});
    }
});