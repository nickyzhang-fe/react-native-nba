/**
 * Created by Cral-Gates on 2017/11/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
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

class GameDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.gameDetail,
            title: this.props.gameDetail.leftName + 'vs' + this.props.gameDetail.rightName,
            mid: this.props.gameDetail.mid,
            matchPeriod: this.props.gameDetail.matchPeriod,
            baseInfo: '',
            ids: [],
            matchList: [],
            gamePage: 0,
            pageSize: 20,
            isRefreshing: false
        };
    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(this.getBaseInfo());
        InteractionManager.runAfterInteractions(this.getGameDetailIds());
    }

    render() {
        const baseInfo = this.state.baseInfo;
        const detail = this.state.matchList;
        return (
            <View style={styles.container}>
                <HeaderBar
                    title={this.state.title}
                    showLeftState={true}
                    showRightState={false}
                    leftItemTitle={''}
                    leftImageSource={require('../image/back.png')}
                    onPress={() => this.goBack()}/>
                    {
                        this.renderBaseInfo(baseInfo)
                    }
                <FlatList
                    data={this.state.matchList}
                    dataExtra={this.state}
                    renderItem={(item, index) => this.renderMatchDetail(item, index)}
                    onRefresh={() => this.getGameDetailIds()}
                    onEndReached={() => this.getGameDetailMore()}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    keyExtractor={(item) => this._keyExtractor(item)}
                    refreshing={this.state.isRefreshing}/>

                <ScrollView>
                </ScrollView>
            </View>
        )
    }
// {
//     CommonUtil.isEmpty(detail) ? <View/> :
// <FlatList
// data={this.state.matchList}
// dataExtra={this.state}
// renderItem={(item, index) => this.renderMatchDetail(item, index)}
// onRefresh={() => this.getGameDetailIds()}
// onEndReached={() => this.getGameDetailMore()}
// onEndReachedThreshold={0.1}
// initialNumToRender={10}
// keyExtractor={(item) => this._keyExtractor(item)}
// refreshing={this.state.isRefreshing}/>
// }

// <View>
// {
//     this.state.matchPeriod === '2' ? (detail.map((item, index) => this.renderMatchDetail(item, index))) :
//         (this.state.matchPeriod === '1' ? (detail.map((item, index) => this.renderMatchDetail(item, index))) :
//             ((detail.map((item, index) => this.renderMatchDetail(item, index)))))
// }
// </View>

    _keyExtractor = (item, index) => index;

    _getItemLayout = (item, index) => (
        {length: 300, offset: 300 * index, index}
    );

    renderBaseInfo = (baseInfo) => {
        if (CommonUtil.isEmpty(baseInfo)) {
            return;
        }
        return (
            <View style={[styles.item, {backgroundColor: CommonStyle.THEME}]}>
                <View><Text style={styles.itemTop}>{baseInfo.venue}</Text></View>
                <View style={styles.itemBottom}>
                    <View style={styles.itemBottomLeft}>
                        <Image style={styles.itemImg}
                               source={{uri: baseInfo.leftBadge.replace('http', 'https')}}/>
                        <Text style={styles.itemText}>{baseInfo.leftName}</Text>
                    </View>
                    <View style={styles.itemBottomMiddle}>
                        {
                            new Date().getTime() < new Date(baseInfo.startTime) ?
                                (<Text style={styles.itemTextBig}> {baseInfo.startTime.slice(10, 16)}</Text>) :
                                (<View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={styles.itemTextBig}>{baseInfo.leftGoal}</Text>
                                    <Text style={[styles.itemText, {marginRight: 10, marginLeft: 10}]}>
                                        {this.getMatchStatus(baseInfo.matchPeriod)}</Text>
                                    <Text style={styles.itemTextBig}>{baseInfo.rightGoal}</Text>
                                </View>)
                        }
                    </View>
                    <View style={styles.itemBottomRight}>
                        <Image style={styles.itemImg}
                               source={{uri: baseInfo.rightBadge.replace('http', 'https')}}/>
                        <Text style={styles.itemText}>{baseInfo.rightName}</Text>
                    </View>
                </View>
            </View>
        )
    };

    renderMatchDetail = (ids, index) => {
        let item = ids.item;
        return (
            <View key={ids.index} style={styles.itemBottom}>
                {
                    item.hasOwnProperty('commentator') ?
                        <View style={styles.matchLeft}>
                            <Text style={[styles.matchTime, {marginTop: 10}]}>{'直播员'}</Text>
                        </View> :
                        <View style={styles.matchLeft}>
                            <Text style={styles.matchTime}>{item.quarter}</Text>
                            <Text style={styles.matchTime}>{item.time}</Text>
                        </View>
                }
                <View style={styles.matchMiddle}>
                    {
                        item.hasOwnProperty('commentator') ?
                            <Image style={styles.matchImage} source={{uri: item.commentator.logo}}/> :
                            (item.hasOwnProperty('player4NBAApp') ?
                                <Image style={styles.matchImage} source={{uri: item.player4NBAApp.pic}}/> :
                                ((item.teamName === this.state.baseInfo.leftName) ?
                                    <Image style={styles.matchImage} source={{uri: this.state.baseInfo.leftBadge}}/> :
                                    (item.teamName === this.state.baseInfo.rightName ?
                                        <Image style={styles.matchImage}
                                               source={{uri: this.state.baseInfo.rightBadge}}/> :
                                        <Image style={styles.matchImage} source={{uri: Global.DEFAULT_LOGO}}/>)))
                    }
                </View>
                <View style={styles.matchRight}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.matchTeam}>{CommonUtil.isEmpty(item.teamName) ? '直播员' : item.teamName}</Text>
                        <Text style={{color: CommonStyle.DARK_RED}}>{item.hasOwnProperty('leftGoal') ? (item.leftGoal+':'+item.rightGoal) : ''}</Text>
                    </View>
                    <Text style={styles.matchContent}>{item.content}</Text>
                    {
                        item.hasOwnProperty('video') ?
                            <Image style={styles.matchLiveImage} source={{uri: item.video.pic_160x90}}/>:<View/>
                    }
                </View>
                <View style={styles.longLine}/>
                <View style={styles.circle}/>
            </View>
        )
    };

    goBack = () => {
        getNavigator().pop();
    };

    getMatchStatus = (status) => {
        switch (status) {
            case '0':
                return '未开始';
                break;
            case '1':
                return '进行中';
                break;
            case '2':
                return '已结束';
                break;
        }
    };

    getBaseInfo = () => {
        let that = this;
        let url = 'http://sportsnba.qq.com/match/baseInfo?appver=4.0.1&appvid=4.0.1&deviceId' +
            '=0928183600E081E142ED076B56E3DBAA&from=app&guid=0928183600E081E142ED076B56E3DBAA&height' +
            '=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&mid=' + this.state.mid;
        NetUtil.get(url, function (res) {
            that.setState({
                baseInfo: res.data,
            });
        })
    };

    getGameDetailIds = () => {
        let that = this;
        that.setState({
            isRefreshing: true,
            gamePage: 1
        });
        let url = 'http://sportsnba.qq.com/match/textLiveIndex?appver=4.0.1&appvid=4.0.1&deviceId' +
            '=09385DB300E081E142ED046B568B2E48&from=app&guid=09385DB300E081E142ED046B568B2E48&height '
            + '=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&mid=' + this.state.mid;
        NetUtil.get(url, function (res) {
            that.setState({
                ids: res.data.index
            });
            that.getGameDetail()
        })
    };

    getGameDetail = () => {
        let that = this;
        let ids = '';
        let tempArray = [];
        for (let i = 20 * (that.state.gamePage - 1); i <= that.state.ids.length - 1; i++) {
            if (i <= (20 * that.state.gamePage - 1)) {
                ids += that.state.ids[i] + ',';
            }
        }
        let url = 'http://sportsnba.qq.com/match/textLiveDetail?appver=4.0.1&appvid=4.0.1&deviceId' +
            '=0928183600E081E142ED076B56E3DBAA&from=app&guid=0928183600E081E142ED076B56E3DBAA&height' +
            '=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&mid=' + this.state.mid +
            '&ids=' + ids;
        NetUtil.get(url, function (res) {
            for (let i in res.data.detail) {
                tempArray.push(res.data.detail[i]);
            }
            that.setState({
                matchList: tempArray,
                isRefreshing: false
            })
        })
    };

    getGameDetailMore = () => {
        let that = this;
        let ids = '';
        let tempArray = [];
        console.log(that.state.gamePage);
        that.setState({
            isRefreshing: true,
            gamePage: that.state.gamePage++
        });
        console.log(that.state.gamePage);
        for (let i = 20 * (that.state.gamePage - 1); i <= that.state.ids.length - 1; i++) {
            if (i <= (20 * that.state.gamePage - 1)) {
                ids += that.state.ids[i] + ',';
            }
        }
        console.log(ids);
        let url = 'http://sportsnba.qq.com/match/textLiveDetail?appver=4.0.1&appvid=4.0.1&deviceId' +
            '=0928183600E081E142ED076B56E3DBAA&from=app&guid=0928183600E081E142ED076B56E3DBAA&height' +
            '=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&mid=' + this.state.mid +
            '&ids=' + ids;
        NetUtil.get(url, function (res) {
            for (let i in res.data.detail) {
                tempArray.push(res.data.detail[i]);
            }
            that.setState({
                matchList: that.state.matchList.concat(tempArray),
                isRefreshing: false
            });
            console.log(that.state.gamePage)
        })
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
    item: {
        flexDirection: 'column',
        width: CommonUtil.getScreenWidth(),
        height: 120,
        paddingTop: 10,

    },
    itemTop: {
        textAlign: 'center',
        height: 20,
        lineHeight: 20,
        fontSize: 18,
        color: CommonStyle.WHITE
    },
    itemBottom: {
        flexDirection: 'row'
    },
    itemBottomLeft: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemBottomMiddle: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    itemBottomRight: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemImg: {
        height: 50,
        width: 50,
        marginBottom: 10
    },
    itemText: {
        color: CommonStyle.WHITE,
        fontSize: 16
    },
    itemTextBig: {
        color: CommonStyle.WHITE,
        fontSize: 24,
        fontWeight: "bold"
    },
    matchLeft: {
        width: 70,
        minHeight: 60,
        alignItems: 'center',
        paddingTop: 10
    },
    matchTime: {
        fontSize: 12,
        color: CommonStyle.TEXT_GRAY_COLOR,
    },
    matchMiddle: {
        width: 50,
        paddingTop: 10,
        alignItems: 'flex-end'
    },
    matchRight: {
        width: CommonUtil.getScreenWidth() - 130,
        padding: 10,
        minHeight: 70
    },
    matchImage: {
        height: 30,
        width: 30,
        borderRadius: 15
    },
    matchLiveImage: {
        height: 90,
        width: 160,
        marginTop: 10
    },
    matchTeam: {
        fontSize: 14,
        color: CommonStyle.BLACK,
        marginTop: 4
    },
    matchContent: {
        fontSize: 14,
        color: CommonStyle.TEXT_GRAY_COLOR,
        flexWrap: 'wrap',
        marginTop: 6
    },
    longLine: {
        position: 'absolute',
        left: 70,
        backgroundColor: CommonStyle.GRAY_COLOR,
        width: 1,
        height: '100%'
    },
    circle: {
        position: 'absolute',
        left: 67.5,
        top: 22,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: CommonStyle.THEME
    }
});

export default GameDetail;