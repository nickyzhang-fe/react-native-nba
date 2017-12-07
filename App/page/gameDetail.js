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

class GameDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.gameDetail,
            title: this.props.gameDetail.leftName + 'vs' + this.props.gameDetail.rightName,
            mid: this.props.gameDetail.mid,
            baseInfo: '',
            ids: [],
            matchList: [],
            page: 1,
            pageSize: 20
        };
    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(this.getBaseInfo());
        InteractionManager.runAfterInteractions(this.getGameDetailIds());
    }

    render() {
        const baseInfo = this.state.baseInfo;
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
            </View>
        )
    }

    renderBaseInfo = (baseInfo) => {
        if (CommonUtil.isEmpty(baseInfo)){
            return;
        }
        return (
            <View style={[styles.item, {backgroundColor: CommonStyle.DARK_RED}]}>
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

    goBack = () => {
        getNavigator().pop();
    };

    getMatchStatus = (status) => {
        switch (status){
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
                baseInfo: res.data
            });
        })
    };

    getGameDetailIds = () => {
        let that = this;
        let url = 'http://sportsnba.qq.com/match/textLiveIndex?appver=4.0.1&appvid=4.0.1&deviceId'+
            '=09385DB300E081E142ED046B568B2E48&from=app&guid=09385DB300E081E142ED046B568B2E48&height '
            +'=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&mid=' + this.state.mid;
        NetUtil.get(url, function (res) {
            console.log(res.data);
            that.setState({
                ids: res.data
            });
            that.getGameDetail()
        })
    };

    getGameDetail = () => {
        let that = this;
        let ids = '';
        for (let i = 20*(that.state.page -1); i <= that.state.ids.index.length - 1; i++){
            if (i <= (20*that.state.page - 1)){
                ids += that.state.ids.index[i]+',';
            }
        }
        console.log(ids);
        let url = 'http://sportsnba.qq.com/match/textLiveDetail?appver=4.0.1&appvid=4.0.1&deviceId'+
            '=0928183600E081E142ED076B56E3DBAA&from=app&guid=0928183600E081E142ED076B56E3DBAA&height'+
            '=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&mid='+ this.state.mid +
            '&ids=' + ids;
        console.log(url);
        NetUtil.get(url, function (res) {
            console.log(res);
            that.setState({
                matchList: res.data.detail
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
        color: CommonStyle.MAIN_COLOR
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
        color: CommonStyle.MAIN_COLOR,
        fontSize: 16
    },
    itemTextBig: {
        color: CommonStyle.MAIN_COLOR,
        fontSize: 24,
        fontWeight: "bold"
    }
});

export default GameDetail;