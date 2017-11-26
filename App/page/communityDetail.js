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
    InteractionManager,
    ScrollView
} from 'react-native';

import HeaderBar from '../components/headerBar';
import HtmlItem from '../components/htmlItem';
import CommonUtil from '../util/commonUtil';
import NetUtil from '../util/netUtil';
import CommonStyle from '../style/commonStyle';
import {getNavigator} from '../constant/router';
import Global from '../constant/global';

class CommunityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: '社区评论',
            topic: {},
            user: {},
            list: [],
            eliteList: [],
            page: 1
        };

    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(this.getCommunityDetail());
    }

    render() {
        const {topic, user, eliteList, list} = this.state;
        return (
            <View style={styles.container}>
                <HeaderBar
                    title={this.state.title}
                    showLeftState={true}
                    showRightState={false}
                    leftItemTitle={''}
                    leftImageSource={require('../image/back.png')}
                    onPress={() => this.goBack()}/>
                <View style={[styles.title, styles.row]}>
                    <Image
                        source={{uri: CommonUtil.isEmpty(user.avatar) ? Global.AVATAR : user.avatar.replace('http', 'https')}}
                        style={styles.title_image}/>
                    <View style={[styles.column, {marginLeft: 10}]}>
                        <Text style={styles.title_name}>{CommonUtil.isEmpty(user.name) ? '' : user.name}</Text>
                        <Text style={styles.title_time}>{CommonUtil.formatDateTime(topic.createTime)}</Text>
                    </View>
                </View>
                <HtmlItem
                    item={CommonUtil.isEmpty(topic.content) ? [] : topic.content}/>
            </View>
        )
    }

    goBack = () => {
        getNavigator().pop();
    };

    getCommunityDetail = () => {
        let that = this;
        let url = Global.TEN_SHE_QU_URL + '/reply/listCite?tid=' + that.state.id + '&page=1&listType=allWithElite&count=20&sort=asc&he=&_=1510497824444';
        console.log(url);
        NetUtil.get(url, function (res) {
            console.log(res.data.topic.content);
            that.setState({
                topic: res.data.topic,
                eliteList: res.data.eliteList,
                list: res.data.list,
                user: res.data.topic.user
            })
        })
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    contentStyle: {
        padding: 0,
        width: CommonUtil.getScreenWidth() - 20
    },
    title: {
        height: 60,
        width: CommonUtil.getScreenWidth()
    },
    title_image: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginLeft: 20,
        marginTop: 10
    },
    title_name: {
        fontSize: 16,
        color: CommonStyle.BLACK,
        marginTop: 12,
        marginBottom: 4
    },
    title_time: {
        fontSize: 14,
        color: CommonStyle.TEXT_GRAY_COLOR
    }
});

export default CommunityDetail;