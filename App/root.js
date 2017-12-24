/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';
import App from './app';
import configureStore from './store/configureStore';
import {Provider} from "react-redux";

const store = configureStore();

class root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

export default root;