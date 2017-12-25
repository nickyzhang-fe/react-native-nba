/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';

import {
    View,
    Text,
    Alert,
    Image,
    InteractionManager,
    ListView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import HeaderBar from '../components/headerBar';
import {getNavigator} from '../constant/router';
import NetUtil from '../util/netUtil';
import CommonUtil from '../util/commonUtil';
import CommonStyle from '../style/commonStyle';
import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';
import _updateConfig from '../../update.json';
const {appKey} = _updateConfig[Platform.OS];

class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.loadGame = null;
        this.state = {
            currentTime: CommonUtil.FormatDate(new Date().getTime(), 'yyyy-MM-dd'),
            startTime: CommonUtil.FormatDate(new Date().getTime() - 6 * 24 * 60 * 60 * 1000, 'yyyy-MM-dd'),
            endTime: CommonUtil.FormatDate(new Date().getTime() + 6 * 24 * 60 * 60 * 1000, 'yyyy-MM-dd'),
            pageNum: 0,
            gameData: []
        };
    }

    componentWillMount() {
        if (isFirstTime) {
            Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
                {
                    text: '是', onPress: () => {
                    throw new Error('模拟启动失败,请重启应用')
                }
                },
                {
                    text: '否', onPress: () => {
                    markSuccess()
                }
                },
            ]);
        } else if (isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
        }
    }

    doUpdate = info => {
        downloadUpdate(info).then(hash => {
            Alert.alert('提示', '下载完毕,是否重启应用?', [
                {
                    text: '是', onPress: () => {
                    switchVersion(hash);
                }
                },
                {text: '否',},
                {
                    text: '下次启动时', onPress: () => {
                    switchVersionLater(hash);
                }
                },
            ]);
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };

    checkUpdate = () => {
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                    {
                        text: '确定', onPress: () => {
                        info.downloadUrl && Linking.openURL(info.downloadUrl)
                    }
                    },
                ]);
            } else if (info.upToDate) {
                Alert.alert('提示', '您的应用版本已是最新.');
            } else {
                Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
                    {
                        text: '是', onPress: () => {
                        this.doUpdate(info)
                    }
                    },
                    {text: '否',},
                ]);
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => this.getMatchList());
        this.loadGame = setInterval(
            () => this.getMatchList(),
            20000
        )
    }

    componentDidUpdate() {
        // 当前页的第一个matchPeriod为2是取消刷新
        if (!CommonUtil.isEmpty(this.state.gameData)) {
            if (this.state.gameData[0].matchInfo.matchPeriod === '2') {
                this.loadGame && clearInterval(this.loadGame);
            }
        }
    }

    componentWillUnmount() {
        this.loadGame && clearInterval(this.loadGame);
    }

    render() {
        const {dataPageSource, pageNum} = this.state;
        return (
            <View style={styleSheet.container}>
                <HeaderBar
                    title="赛程"
                    showLeftState={false}
                    showRightState={false}
                    showRightImage={false}/>
                <View style={styleSheet.dateStyle}>
                    <Image style={styleSheet.dateImgStyle} source={require('../image/back_left.png')}/>
                    <Text style={{color: CommonStyle.WHITE, fontSize: 16}}>{this.state.currentTime}</Text>
                    <Image style={styleSheet.dateImgStyle} source={require('../image/back_right.png')}/>
                </View>
                {
                    CommonUtil.isEmpty(this.state.gameData) ?
                        this.renderEmpty() :
                        <ScrollView>
                            <View style={styleSheet.listView}>
                                {
                                    this.state.gameData.map((item, index) => this.renderRow(item, index))
                                }
                            </View>
                        </ScrollView>
                }

            </View>
        )
    }

// <ViewPager
// ref={(viewPager) => {this.viewPager = viewPager}}
// style={styleSheet.container}
// initialPage={pageNum}
// onBeyondRange={this._onBeyondRange}
// dataSource={this.state.dataPageSource}
// renderPage={this._renderPage.bind(this)}
// renderPageIndicator={false}
// onChangePage={this.onChangePage.bind(this)}/>

    _renderPage(data, pageId) {
        return (
            <ScrollView>
                <View style={styleSheet.listView}>
                    {
                        this.state.gameData.map((item, index) => this.renderRow(item, index))
                    }
                </View>
            </ScrollView>
        )
    }

    renderEmpty = () => {
        return (
            <TouchableOpacity onPress={()=>this.checkUpdate()} activeOpacity={1}>
                <View style={styleSheet.listEmpty}>
                    <Image style={styleSheet.emptyImg} source={require('../image/no_data.png')}/>
                    <Text style={styleSheet.nbaName}>{'今天没有比赛哟'}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    renderRow(item, index) {
        const rowData = item.matchInfo;
        return (
            <TouchableOpacity key={index} onPress={() => this.goMatchDetail(rowData)}>
                <View style={[styleSheet.item, {backgroundColor: CommonStyle.WHITE}]}>
                    <View><Text style={styleSheet.itemTop}>{rowData.matchDesc}</Text></View>
                    <View style={styleSheet.itemBottom}>
                        <View style={styleSheet.itemBottomLeft}>
                            <Image style={styleSheet.itemImg}
                                   source={{uri: rowData.leftBadge.replace('http', 'https')}}/>
                            <Text style={styleSheet.nbaName}>{rowData.leftName}</Text>
                        </View>
                        <View style={styleSheet.itemBottomMiddle}>
                            {
                                (rowData.matchPeriod === '2') ?
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={styleSheet.itemTextBig}>{rowData.leftGoal}</Text>
                                        <Text style={[styleSheet.itemText, {
                                            color: CommonStyle.TEXT_COLOR,
                                            marginHorizontal: 10,
                                            fontWeight: 'bold'
                                        }]}>{'已结束'}</Text>
                                        <Text style={styleSheet.itemTextBig}>{rowData.rightGoal}</Text>
                                    </View> :
                                    (rowData.matchPeriod === '0' ?
                                        <View style={{justifyContent: 'center', alignItems: 'center'}}><Text
                                            style={styleSheet.itemTextBig}>{rowData.startTime.slice(10, 16)}</Text></View> :
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={styleSheet.itemTextBig}>{rowData.leftGoal}</Text>
                                            <View style={{flexDirection: 'column', marginHorizontal: 10}}>
                                                <Text style={styleSheet.itemText}>{rowData.quarter}</Text>
                                                <Text style={styleSheet.itemText}>{rowData.quarterTime}</Text>
                                            </View>
                                            <Text style={styleSheet.itemTextBig}>{rowData.rightGoal}</Text>
                                        </View>)
                            }
                        </View>
                        <View style={styleSheet.itemBottomRight}>
                            <Image style={styleSheet.itemImg}
                                   source={{uri: rowData.rightBadge.replace('http', 'https')}}/>
                            <Text style={styleSheet.nbaName}>{rowData.rightName}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    _onBeyondRange = (id) => {
        console.log('onBeyondRange' + id);
    };

    onChangePage = (id) => {
        console.log("onchangePage" + id);
    };

    goPager = (index) => {
        this.viewPager.goToPage(index);
    };

    getMatchList = () => {
        let that = this;
        let tempArray = [];
        let url = 'http://sportsnba.qq.com/match/listByDate?appver=4.0.1&appvid=4.0.1&' +
            'deviceId=0928183600E081E142ED076B56E3DBAA&from=app&guid=0928183600E081E142ED076B56E3DBAA&' +
            'height=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&teamId=-1&date=' + this.state.currentTime;
        NetUtil.get(url, function (res) {
            that.setState({
                gameData: res.data.matches,
                pageNum: 5
            });
        })
    };

    goMatchDetail = (rowData) => {
        getNavigator().push({
            name: 'GameDetail',
            gameDetail: rowData
        })
    }
}

const styleSheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CommonStyle.LINE_GRAY_COLOR,
    },
    dateStyle: {
        height: 40,
        width: CommonUtil.getScreenWidth(),
        backgroundColor: CommonStyle.THEME,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    dateImgStyle: {
        height: 20,
        width: 20
    },
    listView: {
        flex: 1,
        width: CommonUtil.getScreenWidth()
    },
    listEmpty: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CommonStyle.BACKGROUND_COLOR,
        height: CommonUtil.getScreenHeight() - 160,
        width: CommonUtil.getScreenWidth()
    },
    emptyImg: {
        height: 100,
        width: 100,
        marginBottom: 20
    },
    item: {
        flexDirection: 'column',
        width: CommonUtil.getScreenWidth() - 20,
        height: 120,
        borderRadius: 10,
        paddingTop: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    itemTop: {
        textAlign: 'center',
        height: 20,
        lineHeight: 20,
        fontSize: 18,
        color: CommonStyle.TEXT_COLOR
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
        height: 45,
        width: 45,
        marginBottom: 10
    },
    nbaName: {
        color: CommonStyle.TEXT_GRAY_COLOR,
        fontSize: 16
    },
    itemText: {
        color: CommonStyle.DARK_RED,
        fontSize: 14
    },
    itemTextBig: {
        color: CommonStyle.BLACK,
        fontSize: 28,
        fontWeight: "400"
    }
});

export default GameContainer;