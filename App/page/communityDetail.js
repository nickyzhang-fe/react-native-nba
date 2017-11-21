/**
 * Created by Cral-Gates on 2017/11/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import HeaderBar from '../components/headerBar';
import CommonUtil from '../util/commonUtil';
import NetUtil from '../util/netUtil';
import CommonStyle from '../style/commonStyle';
import {getNavigator} from '../constant/router';
import Global from '../constant/global';

class CommunityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '1584644736401014846',
            title: '社区评论',
            topic: {},
            list: [],
            eliteList: [],
            page: 1
        };

    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(this.getCommunityDetail());
    }

    render() {
        console.log(this.state.topic);
        let topic = this.state.topic;
        console.log(topic.id);
        console.log(!CommonUtil.isEmpty(topic));
        // console.log(topic.user.avatar);
        if (CommonUtil.isEmpty(topic)) {
            return (
                <View style={styles.container}>
                    <HeaderBar
                        title={this.state.title}
                        showLeftState={true}
                        showRightState={false}
                        leftItemTitle={''}
                        leftImageSource={require('../image/back.png')}
                        onPress={() => this.goBack()}/>
                    <View style={styles.title}>
                        <Image
                            source={{uri: CommonUtil.isEmpty(topic.user.avatar) ? '' : topic.user.avatar.replace('http', 'https')}}
                            style={styles.title_image}/>
                        <Text>{CommonUtil.isEmpty(topic.user.name) ? '' : topic.user.name}</Text>
                        <Text>{topic.createTime}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    <Text>{'是大法官的说法'}</Text>
                </View>
            )
        }
    }

    goBack = () => {
        getNavigator().pop();
    };

    getCommunityDetail = () => {
        let that = this;
        let url = Global.TEN_SHE_QU_URL + '/reply/listCite?tid=' + that.state.id + '&page=1&listType=allWithElite&count=20&sort=asc&he=&_=1510497824444';
        console.log(url);
        NetUtil.get(url, function (res) {
            console.log(res.data.topic.user);
            that.setState({
                topic: res.data.topic,
                eliteList: res.data.eliteList,
                list: res.data.list,

            })
        })
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        flexDirection: 'row'
    },
    title_image: {
        height: 40,
        width: 40
    }
});

export default CommunityDetail;