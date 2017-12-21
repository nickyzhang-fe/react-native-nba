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
        this.state = {
            title: this.props.type === 'player' ? '球员数据详情' : '球队数据详情',
            index: this.props.index
        };
        console.log(this.props)
    };

    componentDidMount() {

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
                        initialPage={this.state.index}>
                        <View tabLabel="得分"/>
                        <View tabLabel="篮板"/>
                        <View tabLabel="助攻"/>
                        <View tabLabel="盖帽"/>
                        <View tabLabel="抢断"/>
                    </ScrollableTabView>
                </View>
            </View>
        )
    }

    getPlayerDaily = () => {
        let that = this;
        let url = `http://sportsnba.qq.com/player/statsRank?appver=4.0.1&appvid=4.0.1&deviceId
        =09385DB300E081E142ED046B568B2E48&from=app&guid=09385DB300E081E142ED046B568B2E48&height
        =1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&statType=point&num=-1&tabType=3&seasonId=2017`;

        NetUtil.get(url, function (res) {
            that.setState({

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
    }
});

export default RankDetail;