/**
 * Created by Cral-Gates on 2017/11/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    InteractionManager
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
            id: this.props.id,
            title: '社区评论'
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(this.getCommunityDetail());
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
    };

    getCommunityDetail = () => {
        let that = this;
        let url = 'https://shequweb.sports.qq.com/reply/listCite?tid='+ that.props.id +'&page=1&listType=allWithElite&count=20&sort=asc&he=&_=1510497824444';
        console.log(url);
        NetUtil.get(url, function (res) {
            console.log(res.data);
        })
    };
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
});

export default CommunityDetail;