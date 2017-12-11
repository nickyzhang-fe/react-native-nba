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
            page: 1,
            pageSize: 20
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
                <ScrollView
                    style={{marginBottom: 52}}
                    onMomentumScrollEnd={this._contentViewScroll}>
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
                    <View>
                        {
                            CommonUtil.isEmpty(eliteList) ?
                                <View></View> :
                                <View>
                                    <View style={styles.commitTitle}>
                                        <View style={styles.commitTag}/>
                                        <Text style={styles.commitTagTxt}>{'精华回帖'}</Text>
                                    </View>
                                    {
                                        (eliteList.map((item, i) => this.renderCommitItem(item, i)))
                                    }
                                    <View style={styles.commitTitle}>
                                        <View style={styles.commitTag}/>
                                        <Text style={styles.commitTagTxt}>{'全部回帖'}</Text>
                                    </View>
                                    {
                                        (list.map((item, i) => this.renderCommitItem(item, i)))
                                    }
                                </View>
                        }
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput style={styles.input} placeholder={'请输入评论'} multiline={false} autoCapitalize='none'
                               placeholderTextColor={CommonStyle.THEME} keyboardAppearance={'light'}
                    underlineColorAndroid={'transparent'} selectionColor={CommonStyle.THEME}/>
                    <TouchableOpacity onPress={() => this.commit()}>
                        <View style={styles.commitTxtbg}><Text style={styles.commitText}>{'评论'}</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderCommitItem = (item, i) => {
        return (
            <View key={i} style={styles.commitItem}>
                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.icon} source={{uri: item.user.avatar.replace('http', 'https')}}/>
                    <View>
                        <Text style={styles.commitUserName}>{item.user.name}</Text>
                        <Text style={styles.commitTime}>{item.createTime}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.commitSummary}>{item.summary}</Text>
                </View>
            </View>
        )
    };

    goBack = () => {
        getNavigator().pop();
    };

    _contentViewScroll = (e) => {
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight + 80 >= contentSizeHeight) {
            this.onLoadMore();
        }
    };

    getCommunityDetail = () => {
        let that = this;
        let url = Global.TEN_SHE_QU_URL + '/reply/listCite?tid=' + that.state.id +
            '&page=' + this.state.page + '&listType=allWithElite&count=' +
            this.state.pageSize + '&sort=asc&he=&_=1510497824444';
        console.log(url);
        NetUtil.get(url, function (res) {
            that.setState({
                topic: res.data.topic,
                eliteList: res.data.eliteList,
                list: res.data.list,
                user: res.data.topic.user
            })
        })
    };

    onLoadMore = () => {
        let that = this;
        let url = Global.TEN_SHE_QU_URL + '/reply/listCite?tid=' + that.state.id +
            '&page=' + this.state.page++ + '&listType=allWithElite&count=' +
            this.state.pageSize + '&sort=asc&he=&_=1510497824444';
        NetUtil.get(url, function (res) {
            that.setState({
                list: that.state.list.concat(res.data.list)
            });
        })
    };

    commit = () => {
        Toast.show('暂不支持评论哟!');
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
    },
    commitTitle: {
        height: 50,
        width: CommonUtil.getScreenWidth(),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: CommonStyle.GRAY_COLOR,
        borderTopWidth: 1,
        borderTopColor: CommonStyle.GRAY_COLOR
    },
    commitTag: {
        height: 24,
        width: 5,
        backgroundColor: CommonStyle.THEME,
        marginHorizontal: 10
    },
    commitTagTxt: {
        fontSize: 18,
        color: CommonStyle.BLACK,
        fontWeight: '400'
    },
    commitItem: {
        width: CommonUtil.getScreenWidth(),
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderBottomColor: CommonStyle.GRAY_COLOR,
        borderBottomWidth: 1
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 5
    },
    commitUserName: {
        fontSize: 16,
        color: CommonStyle.BLACK,
        marginTop: 8
    },
    commitTime: {
        fontSize: 12,
        color: CommonStyle.TEXT_GRAY_COLOR,
        marginTop: 2
    },
    commitSummary: {
        fontSize: 16,
        color: CommonStyle.BLACK,
        fontWeight: '400',
        marginLeft: 10,
        marginVertical: 4
    }
});

export default CommunityDetail;