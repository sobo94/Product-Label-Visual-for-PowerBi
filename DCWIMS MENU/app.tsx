declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

import Loading from './components/loading.js'
import Hello from './components/Hello.js'



class App extends React.Component {
    render() {
        return (
            <div>
                <Loading />
                <Hello />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
