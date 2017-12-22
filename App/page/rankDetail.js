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

class RankDetail extends Component {
    constructor(props) {
        super(props);
        this.loadData = null;
        this.state = {
            title: this.props.type === 'day' ? '每日数据' : (this.props.type === 'player' ? '球员榜' : '球队榜'),
            index: this.props.index,
            tabType: this.props.type === 'day' ? 1 : 3,
            seasonId: new Date().getFullYear(),
            statType: 'point',
            data: []
        };
        console.log(this.props)
    };

    componentDidMount() {
        this.loadData = setTimeout(() => {
            this.getPlayerRank(this.state.index)
        }, 2000);
        // InteractionManager.runAfterInteractions(() => this.getPlayerRank(this.state.index));
    }

    render() {
        console.log(111111);
        console.log(this.state.data[this.state.statType]);
        let data = this.state.data[this.state.statType];
        return (
            <View style={styles.container}>
                <HeaderBar
                    title={this.state.title}
                    showLeftState={true}
                    showRightState={false}
                    showRightImage={false}
                    leftItemTitle={''}
                    leftImageSource={require('../image/back.png')}
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
                        onChangeTab={(obj) => this.getPlayerRank(obj.i)}
                        goToPage={() => this.getPlayerRank(obj.i)}>
                        <View tabLabel="得分">

                        </View>
                        <View tabLabel="篮板">
                        </View>
                        <View tabLabel="助攻">
                        </View>
                        <View tabLabel="盖帽">
                        </View>
                        <View tabLabel="抢断">
                        </View>
                        <View tabLabel="失分">
                        </View>
                    </ScrollableTabView>
                </View>
            </View>
        )
    }

// {
//     data.map((item, index) => this.renderItem(item, index))
// }

    renderItem = (item, index) => {
        console.log(item);
        return (
            <View key={index} style={styles.item}>
                <Text>{index}</Text>
                <Text>{item.playerName}</Text>
                <Text>{item.teamName}</Text>
                <Text>{item.value}</Text>
            </View>
        )
    };

    getPlayerRank = (index) => {
        let that = this;
        switch (index) {
            case 0:
                that.setState({
                    statType: 'point'
                });
                break;
            case 1:
                that.setState({
                    statType: 'rebound'
                });
                break;
            case 2:
                that.setState({
                    statType: 'assist'
                });
                break;
            case 3:
                that.setState({
                    statType: 'block'
                });
                break;
            case 4:
                that.setState({
                    statType: 'steal'
                });
                break;
            case 5:
                that.setState({
                    statType: 'oppPoints'
                });
                break;
        }
        let params = that.state.title === '球队榜' ? 'team/statsRank?' : 'player/statsRank?';
        let url = Global.BASE_URL + params + Global.BASE_PARAMS + 'statType=' + that.state.statType + '&num=-1&tabType=' + that.state.tabType + '&seasonId=' + that.state.seasonId
        NetUtil.get(url, function (res) {
            // console.log(res.data);
            that.setState({
                data: res.data,
                index: index
            })
        })
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
    }
});

export default RankDetail;