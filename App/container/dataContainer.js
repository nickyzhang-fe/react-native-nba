/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';
import HeaderBar from '../components/headerBar';
import {getNavigator} from '../constant/router'

class DataContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <HeaderBar
                    title="数据"
                    showLeftState={false}
                    showRightState={true}
                    showRightImage={true}
                    rightImageSource={require('../image/person/github.png')}
                    onPressRight={() => this.showPersonInfo()}/>
            </View>
        )
    }

    showPersonInfo = () => {
        getNavigator().push({
            name: 'PersonInfo'
        });
    }
}

export default DataContainer;