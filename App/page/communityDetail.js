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
    ScrollView,
    TextInput
} from 'react-native';

import HeaderBar from '../components/headerBar';
import HtmlItem from '../components/htmlItem';
import CommonUtil from '../util/commonUtil';
import NetUtil from '../util/netUtil';
import CommonStyle from '../style/commonStyle';
import {getNavigator} from '../constant/router';
import Global from '../constant/global';
import Toast from '../components/toast';

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
                <ScrollView style={{marginBottom: 52}}>
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
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput style={styles.input} placeholder={'请输入评论'} multiline={false} autoCapitalize='none'
                               placeholderTextColor={CommonStyle.THEME}/>
                    <TouchableOpacity onPress={() => this.commit()}>
                        <View style={styles.commitTxtbg}><Text style={styles.commitText}>{'评论'}</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    goBack = () => {
        getNavigator().pop();
    };

    getCommunityDetail = () => {
        let that = this;
        let url = Global.TEN_SHE_QU_URL + '/reply/listCite?tid=' + that.state.id + '&page=1&listType=allWithElite&count=20&sort=asc&he=&_=1510497824444';
        NetUtil.get(url, function (res) {
            that.setState({
                topic: res.data.topic,
                eliteList: res.data.eliteList,
                list: res.data.list,
                user: res.data.topic.user
            })
        })
    };

    commit = () => {
        Toast.show('暂不支持评论哟!');
    }
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
    },
    footer: {
        height: 50,
        width: CommonUtil.getScreenWidth(),
        backgroundColor: CommonStyle.WHITE,
        borderTopColor: CommonStyle.GRAY_COLOR,
        borderTopWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    input: {
        height: 40,
        padding: 10,
        width: CommonUtil.getScreenWidth() - 70,
        marginTop: 5,
        lineHeight: 20
    },
    commitTxtbg: {
        backgroundColor: CommonStyle.THEME,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 30,
        width: 40,
        marginVertical: 10,
        marginLeft: 10,
        marginRight: 20
    },
    commitText: {
        color: CommonStyle.WHITE,
        fontSize: 12
    }
});

export default CommunityDetail;