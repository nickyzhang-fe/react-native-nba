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

import HeaderBar from '../components/headerBar';
import {getNavigator} from '../constant/router';
import NetUtil from '../util/netUtil';
import CommonUtil from '../util/commonUtil';
import CommonStyle from '../style/commonStyle';

class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            startTime: CommonUtil.FormatDate(new Date().getTime(), 'yyyy-MM-dd'),
            endTime: CommonUtil.FormatDate(new Date().getTime(), 'yyyy-MM-dd'),
            dataSource: this.ds.cloneWithRows([]),
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(this.getMatchList())
    }

    render() {
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
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}/>
            </View>
        )
    }

    renderRow(rowData) {
        return (
            <TouchableOpacity onPress={() => this.goMatchDetail()}>
                <View style={[styleSheet.item, {backgroundColor: CommonUtil.chooseColor()}]}>
                    <View><Text style={styleSheet.itemTop}>{rowData.matchDesc}</Text></View>
                    <View style={styleSheet.itemBottom}>
                        <View style={styleSheet.itemBottomLeft}>
                            <Image style={styleSheet.itemImg}
                                   source={{uri: rowData.leftBadge.replace('http', 'https')}}/>
                            <Text style={styleSheet.itemText}>{rowData.leftName}</Text>
                        </View>
                        <View style={styleSheet.itemBottomMiddle}>
                            {
                                new Date().getTime() < new Date(rowData.startTime) ?
                                    (<Text style={styleSheet.itemTextBig}> {rowData.startTime.slice(10, 16)}</Text>) :
                                    (<View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={styleSheet.itemTextBig}>{rowData.leftGoal}</Text>
                                        <Text style={[styleSheet.itemText, {marginRight: 10, marginLeft: 10}]}>{(rowData.quarter ==='第4节' && rowData.quarterTime === '00:00') ? '已结束' : rowData.quarter}</Text>
                                        <Text style={styleSheet.itemTextBig}>{rowData.rightGoal}</Text>
                                    </View>)
                            }
                        </View>
                        <View style={styleSheet.itemBottomRight}>
                            <Image style={styleSheet.itemImg}
                                   source={{uri: rowData.rightBadge.replace('http', 'https')}}/>
                            <Text style={styleSheet.itemText}>{rowData.rightName}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    getMatchList = () => {
        let that = this;
        let url = 'https://matchweb.sports.qq.com/kbs/list?from=NBA_PC&columnId=100000&startTime=' + this.state.startTime + '&endTime=' + this.state.endTime + '&_=1510492775658';
        console.log(url);
        NetUtil.get(url, function (res) {
            console.log(res.data);
            that.setState({
                dataSource: that.ds.cloneWithRows(res.data[that.state.startTime])
            })
        })
    };

    goMatchDetail = () => {

    }
}

const styleSheet = StyleSheet.create({
    container: {
        flex: 1
    },
    listView: {
        flex: 1,
        backgroundColor: CommonStyle.MAIN_COLOR,
        height: CommonUtil.getScreenHeight()
    },
    item: {
        flexDirection: 'column',
        width: CommonUtil.getScreenWidth() - 20,
        height: 120,
        borderRadius: 10,
        paddingTop: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,

    },
    itemTop: {
        textAlign: 'center',
        height: 20,
        lineHeight: 20,
        fontSize: 20,
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
        height: 60,
        width: 60
    },
    itemText: {
        color: CommonStyle.MAIN_COLOR,
        fontSize: 18
    },
    itemTextBig: {
        color: CommonStyle.MAIN_COLOR,
        fontSize: 24,
        fontWeight: "bold"
    }
});

export default GameContainer;