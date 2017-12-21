/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';

import {
    View,
    Text,
    Image,
    InteractionManager,
    ListView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import HeaderBar from '../components/headerBar';
import {getNavigator} from '../constant/router';
import NetUtil from '../util/netUtil';
import CommonUtil from '../util/commonUtil';
import CommonStyle from '../style/commonStyle';

class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.loadGame = null;
        this.ps = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2,});
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            currentTime: CommonUtil.FormatDate(new Date().getTime(), 'yyyy-MM-dd'),
            startTime: CommonUtil.FormatDate(new Date().getTime() - 6 * 24 * 60 * 60 * 1000, 'yyyy-MM-dd'),
            endTime: CommonUtil.FormatDate(new Date().getTime() + 6 * 24 * 60 * 60 * 1000, 'yyyy-MM-dd'),
            pageNum: 0,
            dataPageSource: this.ps.cloneWithPages([]),
            dataListSource: this.ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        this.loadGame = setInterval(
            ()=> this.getMatchList(),
            2000
        );
        // InteractionManager.runAfterInteractions(this.getMatchList())
    }

    componentWillUnmount() {
        this.loadGame && clearInterval(this.loadGame);
    }

    render() {
        const {dataPageSource, pageNum} = this.state;
        return (
            <View style={styleSheet.container}>
                <HeaderBar
                    title="比赛"
                    showLeftState={false}
                    showRightState={false}
                    showRightImage={false}/>
                <ListView
                    style={styleSheet.listView}
                    renderRow={(rowData) => this.renderRow(rowData)}
                    dataSource={this.state.dataListSource}
                    enableEmptySections={true}/>

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
            <ListView
                style={styleSheet.listView}
                renderRow={(rowData) => this.renderRow(rowData)}
                dataSource={this.state.dataListSource.cloneWithRows(data)}
                enableEmptySections={true}/>
        )
    }

    _onBeyondRange = (id) => {
        console.log('onBeyondRange' + id);
    };

    onChangePage = (id) => {
        console.log("onchangePage" + id);
    };

    goPager = (index) => {
        this.viewPager.goToPage(index);
    };

    renderRow(item) {
        const rowData = item.matchInfo;
        return (
            <TouchableOpacity onPress={() => this.goMatchDetail(rowData)}>
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
                                        <Text style={[styleSheet.itemText, {color: CommonStyle.TEXT_COLOR, marginHorizontal: 10}]}>{'已结束'}</Text>
                                        <Text style={styleSheet.itemTextBig}>{rowData.rightGoal}</Text>
                                    </View> :
                                    (rowData.matchPeriod === '0' ?
                                        <View style={{justifyContent: 'center', alignItems: 'center'}}><Text
                                            style={styleSheet.itemTextBig}>{rowData.startTime.slice(10,16)}</Text></View> :
                                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
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
    }

    getMatchList = () => {
        let that = this;
        let tempArray = [];
        let url = 'http://sportsnba.qq.com/match/listByDate?appver=4.0.1&appvid=4.0.1&' +
            'deviceId=0928183600E081E142ED076B56E3DBAA&from=app&guid=0928183600E081E142ED076B56E3DBAA&' +
            'height=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&teamId=-1&date=' + this.state.currentTime;
        NetUtil.get(url, function (res) {
            that.setState({
                dataListSource: that.state.dataListSource.cloneWithRows(res.data.matches),
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
    listView: {
        flex: 1,
        width: CommonUtil.getScreenWidth()
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