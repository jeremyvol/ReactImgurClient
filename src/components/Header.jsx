var React = require('react');
var Reflux = require('reflux');
var TopicStore = require('../stores/TopicStore');
var Actions = require('../Actions');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(TopicStore,'onChange')
    ],
    getInitialState: function(){
        return { 
            topics:[]
        }
    },
    componentWillMount: function(){
        Actions.getTopics();
    },
    render: function () {
        return <nav className="navbar navbar-default header">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    Imgur Browser
                </Link>
                <ul className="nav navbar-nav navbar-right">
                    {this.renderTopics()}
                </ul>
            </div>
        </nav>
    },
    renderTopics: function() {
        return this.state.topics.slice(0,4).map(function(topic) {
            return <li key={topic.id}>
                <Link activeClassName="active" to={"topics/" + topic.id}>
                    {topic.name}
                </Link>   
            </li>
        })
    },
    onChange: function(event,topics) {
        this.setState({topics: topics});
    }
});