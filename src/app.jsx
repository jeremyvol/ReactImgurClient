var React = require('react');
var ReactDOM = require('react-dom');

var routes = require('./routes');
var api = require('./utils/api');

ReactDOM.render(routes, document.querySelector('.container'));
