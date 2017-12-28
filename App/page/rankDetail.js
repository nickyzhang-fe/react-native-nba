/**
 * Created by Cral-Gates on 2017/12/17.
 */
/**
 * Created by Cral-Gates on 2017/12/14.
 */
import React, {Component} from 'react';
import PropType from 'prop-types';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity,
    InteractionManager
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';
import Global from '../constant/global';
import HeaderBar from '../components/headerBar';
import NetUtil from '../util/netUtil';
import {getNavigator} from '../constant/router';

const playerTitleName = ['得分', '篮板', '助攻', '盖帽', '抢断'];
const teamTitleName = ['得分', '篮板', '助攻', '盖帽', '抢断', '失分'];

class RankDetail extends Component {
    constructor(props) {
        super(props);
        this.loadData = null;
        this.state = {
            title: this.props.type === 'day' ? '每日数据' : (this.props.type === 'player' ? '球员榜' : '球队榜'),
            tabsName: this.props.type === 'team' ? teamTitleName : playerTitleName,
            index: this.props.index,
            tabType: this.props.type === 'day' ? 1 : 3,
            seasonId: new Date().getFullYear(),
            statType: 'point',
            data: []
        };
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => this.chooseStatType(this.state.index));
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar
                    title={this.state.title}
                    showLeftState={true}
                    showRightState={false}
                    showRightImage={false}
                    leftItemTitle={''}
                    leftImageSource={require('../image/back_left.png')}
                    onPress={() => this.goBack()}/>
                <View style={styles.container}>
                    <ScrollableTabView
                        locked={false}
                        tabBarPosition={'top'}
                        scrollWithoutAnimation={true}
                        tabBarBackgroundColor={CommonStyle.THEME}
                        tabBarActiveTextColor={CommonStyle.WHITE}
                        tabBarUnderlineStyle={{backgroundColor: CommonStyle.WHITE}}
                        tabBarInactiveTextColor={CommonStyle.TEXT_GRAY_COLOR}
                        renderTabBar={() => (<DefaultTabBar/>)}
                        initialPage={this.state.index}
                        onChangeTab={(obj) => this.chooseStatType(obj.i)}>
                        {
                            this.state.tabsName.map((item, index) => this.renderTitle(item, index))
                        }
                    </ScrollableTabView>
                </View>
            </View>
        )
    }

    renderTitle = (item, index) => {
        let data = this.state.data;
        return (
            <View tabLabel={item} key={index}>
                <ScrollView>
                    {
                        CommonUtil.isEmpty(data) ? <View/> :
                            data.map((item, index) => this.renderItem(item, index))
                    }
                </ScrollView>
            </View>
        )
    };

    renderItem = (item, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => this.goPlayerOrTeamDetail(item)}>
                <View style={styles.item}>
                    <Text style={{marginLeft: 15}}>{index + 1 + '.'}</Text>
                    <Image style={styles.icon}
                           source={{uri: CommonUtil.isEmpty(item.playerIcon) ? item.teamLogo : item.playerIcon}}/>
                    <View>
                        {
                            CommonUtil.isEmpty(item.playerName) ? <View/> :
                                <Text style={{color: CommonStyle.THEME, marginBottom: 2}}>{item.playerName}</Text>
                        }
                        <Text>{item.teamName}</Text>
                    </View>
                    <Text style={styles.itemValue}>{item.value}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    chooseStatType = (index) => {
        let that = this;
        let url = '';
        let params = that.state.title === '球队榜' ? 'team/statsRank?' : 'player/statsRank?';
        switch (index) {
            case 0:
                that.setState({
                    statType: 'point',
                    data: []
                }, function () {
                    url = Global.BASE_URL + params + Global.BASE_PARAMS + '&statType=' + that.state.statType + '&num=-1&tabType=' + that.state.tabType + '&seasonId=' + that.state.seasonId;
                    that.getPlayerRank(url, index);
                });
                break;
            case 1:
                that.setState({
                    statType: 'rebound',
                    data: []
                }, function () {
                    url = Global.BASE_URL + params + Global.BASE_PARAMS + '&statType=' + that.state.statType + '&num=-1&tabType=' + that.state.tabType + '&seasonId=' + that.state.seasonId;
                    that.getPlayerRank(url, index);
                });
                break;
            case 2:
                that.setState({
                    statType: 'assist',
                    data: []
                }, function () {
                    url = Global.BASE_URL + params + Global.BASE_PARAMS + '&statType=' + that.state.statType + '&num=-1&tabType=' + that.state.tabType + '&seasonId=' + that.state.seasonId;
                    that.getPlayerRank(url, index);
                });
                break;
            case 3:
                that.setState({
                    statType: 'block',
                    data: []
                }, function () {
                    url = Global.BASE_URL + params + Global.BASE_PARAMS + '&statType=' + that.state.statType + '&num=-1&tabType=' + that.state.tabType + '&seasonId=' + that.state.seasonId;
                    that.getPlayerRank(url, index);
                });
                break;
            case 4:
                that.setState({
                    statType: 'steal',
                    data: []
                }, function () {
                    url = Global.BASE_URL + params + Global.BASE_PARAMS + '&statType=' + that.state.statType + '&num=-1&tabType=' + that.state.tabType + '&seasonId=' + that.state.seasonId;
                    that.getPlayerRank(url, index);
                });
                break;
            case 5:
                that.setState({
                    statType: 'oppPoints',
                    data: []
                }, function () {
                    url = Global.BASE_URL + params + Global.BASE_PARAMS + '&statType=' + that.state.statType + '&num=-1&tabType=' + that.state.tabType + '&seasonId=' + that.state.seasonId;
                    that.getPlayerRank(url, index);
                });
                break;
            default:
                break;
        }
    };

    getPlayerRank = (url, index) => {
        let that = this;
        NetUtil.get(url, function (res) {
            that.setState({
                data: res.data[that.state.statType],
                index: index
            })
        })
    };

    goPlayerOrTeamDetail = (item) => {
        switch (this.props.type) {
            case "day":
                getNavigator().push({
                    name: 'PlayerDetail',
                    playerInfo: item
                });
                break;
            case "player":
                getNavigator().push({
                    name: 'PlayerDetail',
                    playerInfo: item
                });
                break;
            case 'team':
                getNavigator().push({
                    name: 'TeamDetail',
                    teamInfo: item
                });
                break;
        }
    };

    goBack = () => {
        getNavigator().pop();
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        width: CommonUtil.getScreenWidth(),
        height: 60,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: CommonStyle.GRAY_COLOR,
        flexDirection: 'row'
    },
    icon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginHorizontal: 15
    },
    itemValue: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 20,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default RankDetail;