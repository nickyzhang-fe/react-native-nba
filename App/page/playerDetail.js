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
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';
import Global from '../constant/global';
import HeaderBar from '../components/headerBar';
import NetUtil from '../util/netUtil';
import {getNavigator} from '../constant/router';

class PlayerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.playerInfo.playerName,
            playerId: this.props.playerInfo.playerId,
            playerIcon: this.props.playerInfo.playerIcon,
            teamIcon: this.props.playerInfo.teamIcon,
            seasonData: {},
            baseInfo: {},
            regularSeason: [],
            postSeason: [],
            header: [],
            stats: [],
            lastMatches: []
        };
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => this.getPlayerBaseInfo());
        InteractionManager.runAfterInteractions(() => this.getPlayerCareerData());
        InteractionManager.runAfterInteractions(() => this.getPlayerSeasonData());
    }

    render() {
        const {baseInfo, seasonData, regularSeason, header, postSeason, lastMatches, stats} = this.state;
        return (
            <View style={styles.container}>
                <HeaderBar
                    title={this.state.title}
                    showLeftState={true}
                    showRightState={false}
                    showRightImage={false}
                    leftItemTitle={'资料'}
                    leftImageSource={require('../image/back_left.png')}
                    onPress={() => this.goBack()}/>
                <View style={styles.outline}>
                    <Image style={styles.teamLogo} source={{uri: this.state.playerIcon}}/>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={[styles.outlineTxt, {fontSize: 30}]}>{`#${baseInfo.jerseyNum}`}</Text>
                        <Text
                            style={[styles.outlineTxt, styles.outlineTxtSize]}>{`${baseInfo.teamName}  ${baseInfo.position}  ${baseInfo.height}  ${baseInfo.weight}`}</Text>
                        <Text
                            style={[styles.outlineTxt, styles.outlineTxtSize]}>{`生日:${baseInfo.birthDate}  选秀${baseInfo.draftYear}`}</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.seasonData}>
                        <View style={styles.dataItem}>
                            <Text style={styles.dataValue}>{seasonData.points}</Text>
                            <Text style={styles.dataKey}>{`场均得分`}</Text>
                        </View>
                        <View style={styles.dataItem}>
                            <Text style={styles.dataValue}>{seasonData.rebounds}</Text>
                            <Text style={styles.dataKey}>{`场均篮板`}</Text>
                        </View>
                        <View style={styles.dataItem}>
                            <Text style={styles.dataValue}>{seasonData.assists}</Text>
                            <Text style={styles.dataKey}>{`场均助攻`}</Text>
                        </View>
                        <View style={styles.dataItem}>
                            <Text style={styles.dataValue}>{seasonData.blocks}</Text>
                            <Text style={styles.dataKey}>{`场均盖帽`}</Text>
                        </View>
                        <View style={styles.dataItem}>
                            <Text style={styles.dataValue}>{seasonData.steals}</Text>
                            <Text style={styles.dataKey}>{`场均抢断`}</Text>
                        </View>
                    </View>
                    <View style={styles.subTitle}>
                        <Text style={styles.subTitleTxt}>{'常规赛平均'}</Text>
                    </View>
                    <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{borderBottomWidth: 1, borderBottomColor: CommonStyle.GRAY_COLOR}}>
                                {
                                    regularSeason.map((item, index) => this.renderRegularItem(item, index))
                                }
                            </View>
                        </ScrollView>
                    </View>
                    {
                        CommonUtil.isEmpty(postSeason) ? <View/> :
                            <View>
                                <View style={styles.subTitle}>
                                    <Text style={styles.subTitleTxt}>{'季后赛平均'}</Text>
                                </View>
                                <View>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        <View style={{borderBottomWidth: 1, borderBottomColor: CommonStyle.GRAY_COLOR}}>
                                            {
                                                postSeason.map((item, index) => this.renderRegularItem(item, index))
                                            }
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                    }

                    <View style={styles.subTitle}>
                        <Text style={styles.subTitleTxt}>{'本赛季平均'}</Text>
                    </View>
                    <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{borderBottomWidth: 1, borderBottomColor: CommonStyle.GRAY_COLOR}}>
                                {
                                    stats.map((item, index) => this.renderRegularItem(item, index))
                                }
                            </View>
                        </ScrollView>
                    </View>
                    {
                        CommonUtil.isEmpty(lastMatches) ? <View/> :
                        <View>
                            <View style={styles.subTitle}>
                                <Text style={styles.subTitleTxt}>{'最近5场'}</Text>
                            </View>
                            <View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: CommonStyle.GRAY_COLOR}}>
                                        {
                                            lastMatches.map((item, index) => this.renderRegularItem(item, index, '4'))
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }

    renderRegularItem = (items, indexs, data) => {
        return (
            <View key={indexs} style={styles.scrollItem}>
                {
                    items.map((item, index) => this.renderItem(item, index, data))
                }
            </View>
        )
    };

    renderItem = (item, index, data) => {
        return (
            <Text key={index}
                  style={[styles.scrollItemTxt, {width: (index === 0 && data === '4') ? 120 : 66}]}>{item}</Text>
        )
    };


    goBack = () => {
        getNavigator().pop();
    };

    getPlayerBaseInfo = () => {
        console.log('player');
        let that = this;
        let url = `http://sportsnba.qq.com/player/baseInfo?appver=4.0.1&appvid=4.0.1&deviceId
        =09385DB300E081E142ED046B568B2E48&from=app&guid=09385DB300E081E142ED046B568B2E48&height
        =1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&playerId=${this.state.playerId}`;
        NetUtil.get(url, function (res) {
            that.setState({
                baseInfo: res.data,
                seasonData: res.data.stats
            })
        })
    };

    getPlayerCareerData = () => {
        let that = this;
        let url = `http://sportsnba.qq.com/player/stats?appver=4.0.1&appvid=4.0.1&deviceId
        =09385DB300E081E142ED046B568B2E48&from=app&guid=09385DB300E081E142ED046B568B2E48&height
        =1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&playerId=${this.state.playerId}&tabType=2`;
        NetUtil.get(url, function (res) {
            let tempRegular = res.data.reg.rows.unshift(res.data.reg.head);
            let tempPost = res.data.hasOwnProperty('playoff') ? res.data.playoff.rows.unshift(res.data.reg.head) : [];
            that.setState({
                regularSeason: res.data.reg.rows,
                postSeason: res.data.hasOwnProperty('playoff') ? res.data.playoff.rows : [],
            })
        })
    };

    getPlayerSeasonData = () => {
        let that = this;
        let url = `http://sportsnba.qq.com/player/stats?appver=4.0.1&appvid=4.0.1&deviceId
        =09385DB300E081E142ED046B568B2E48&from=app&guid=09385DB300E081E142ED046B568B2E48&height
        =1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&playerId=${this.state.playerId}&tabType=1`;
        NetUtil.get(url, function (res) {
            let tempLastMatches = res.data.hasOwnProperty('lastMatches') ? res.data.lastMatches.rows.unshift(res.data.lastMatches.head) : [];
            let tempStats = res.data.stats.rows.unshift(res.data.stats.head);
            that.setState({
                lastMatches: CommonUtil.isEmpty(res.data.lastMatches.rows) ? res.data.lastMatches.rows : [],
                stats: res.data.stats.rows,
            })
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    outline: {
        height: 100,
        width: CommonUtil.getScreenWidth(),
        flexDirection: 'row',
        backgroundColor: CommonStyle.THEME,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    teamLogo: {
        height: 100,
        width: 100
    },
    outlineTxt: {
        color: CommonStyle.WHITE,
    },
    outlineTxtSize: {
        fontSize: 14
    },
    seasonData: {
        flexDirection: 'row',
        height: 70,
        width: CommonUtil.getScreenWidth(),
        borderBottomWidth: 1,
        borderBottomColor: CommonStyle.GRAY_COLOR
    },
    dataItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataKey: {
        fontSize: 12,
        color: CommonStyle.TEXT_GRAY_COLOR
    },
    dataValue: {
        fontSize: 24,
        color: CommonStyle.BLACK,
        marginVertical: 5
    },
    subTitle: {
        height: 40,
        width: CommonUtil.getScreenWidth(),
        borderBottomWidth: 1,
        borderBottomColor: CommonStyle.GRAY_COLOR,
        justifyContent: 'center',
        paddingLeft: 15
    },
    subTitleTxt: {
        color: CommonStyle.TEXT_GRAY_COLOR,
    },
    scrollItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        justifyContent: 'center'
    },
    scrollItemTxt: {
        width: 66,
        textAlign: 'center',
        color: CommonStyle.BLACK
    }
});

export default PlayerDetail;