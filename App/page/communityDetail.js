/**
 * Created by Cral-Gates on 2017/11/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import HeaderBar from '../components/headerBar';
import CommonUtil from '../util/commonUtil';
import NetUtil from '../util/netUtil';
import CommonStyle from '../style/commonStyle';
import {getNavigator} from '../constant/router';

class CommunityDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '社区评论'
        }
    }

    componentDidMount() {

    }

    render(){
        return (
            <View style={styles.container}>
                <HeaderBar
                    title= {this.state.title}
                    showLeftState={true}
                    showRightState={false}
                    leftItemTitle={''}
                    leftImageSource={require('../image/back.png')}
                    onPress={() => this.goBack()}/>
                <Text>测试数据</Text>
            </View>
        )
    }

    goBack = () => {
        getNavigator().pop();
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
});

export default CommunityDetail;