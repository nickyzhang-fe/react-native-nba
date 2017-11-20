/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';

import {
    View,
    Text
} from 'react-native';

import HeaderBar from '../components/headerBar';
import {getNavigator} from '../constant/router';

class PersonInfo extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <HeaderBar
                    title="我就是我"
                    showLeftState={true}
                    showRightState={false}
                    leftItemTitle={''}
                    leftImageSource={require('../image/close.png')}
                    onPress={() => this.hidePersonInfo()}/>
            </View>
        )
    }

    hidePersonInfo = () => {
        getNavigator().pop();
    }
}

export default PersonInfo;