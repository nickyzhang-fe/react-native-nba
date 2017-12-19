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

class TeamDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.teamInfo[0].name,
            teamId: this.props.teamInfo[0].teamId,
            baseInfo: {},
            rankInfo: {},
            stats:{},
            statsRank: {}
        };
        console.log(this.props.teamInfo);
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => this.getTeamInfo())
    }

    render() {
        const {baseInfo, rankInfo, stats, statsRank} = this.state;
        return (
            <View style={styles.container}>
                <HeaderBar
                    title={this.state.title}
                    showLeftState={true}
                    showRightState={false}
                    showRightImage={false}
                    leftItemTitle={'数据'}
                    leftImageSource={require('../image/back.png')}
                    onPress={() => this.goBack()}/>
                <View style={styles.outline}>
                    <Image style={styles.teamLogo} source={{uri: baseInfo.teamLogo}}/>
                    <View>
                        <Text style={[styles.outlineTxt, {fontSize: 20}]}>{baseInfo.teamName}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={[styles.outlineTxt, {fontSize: 30}]}>{`${rankInfo.wins}`}</Text>
                            <Text style={[styles.outlineTxt, {fontSize: 16}]}>{'胜  '}</Text>
                            <Text style={[styles.outlineTxt, {fontSize: 30}]}>{`${rankInfo.losses}`}</Text>
                            <Text style={[styles.outlineTxt, {fontSize: 16}]}>{`负`}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.outlineTxt, styles.outlineTxtSize]}>{`排名: ${rankInfo.conferenceRank}`}</Text>
                        <Text style={[styles.outlineTxt, styles.outlineTxtSize]}>{`教练: ${baseInfo.coach}`}</Text>
                        <Text style={[styles.outlineTxt, styles.outlineTxtSize]}>{`连续战绩: ${rankInfo.streak}`}</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.subTitle}>
                        <Text style={styles.subTitleTxt}>{'球队介绍'}</Text>
                    </View>
                    <Text style={styles.subContent}>&nbsp;&nbsp;&nbsp;&nbsp;{baseInfo.introduction}</Text>
                    <View style={styles.subTitle}>
                        <Text style={styles.subTitleTxt}>{'场均数据'}</Text>
                    </View>
                    <View style={styles.subTitle}>
                        <Text style={styles.subTitleTxt}>{'球队阵容'}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

    goBack = () => {
        getNavigator().pop();
    };

    getTeamInfo = () => {
        let that = this;
        let url = `http://sportsnba.qq.com/team/info?teamId=${this.state.teamId}&selects=baseInfo&appver=
        4.0.1&appvid=4.0.1&deviceId=09385DB300E081E142ED046B568B2E48&from=app&guid=
        09385DB300E081E142ED046B568B2E48&height=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080`;
        NetUtil.get(url, function (res) {
            that.setState({
                baseInfo: res.data.baseInfo,
                rankInfo: res.data.rankInfo,
                stats: res.data.stats,
                statsRank: res.data.statsRank
            })
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CommonStyle.BACKGROUND_COLOR
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
        height: 60,
        width: 60
    },
    outlineTxt: {
        color: CommonStyle.WHITE
    },
    outlineTxtSize: {
        fontSize: 14
    },
    subTitle: {
        height: 40,
        width: CommonUtil.getScreenWidth(),
        borderBottomWidth: 1,
        borderBottomColor: CommonStyle.GRAY_COLOR,
        borderTopWidth: 1,
        borderTopColor: CommonStyle.GRAY_COLOR,
        justifyContent: 'center',
        paddingLeft: 15
    },
    subTitleTxt:{
        color: CommonStyle.TEXT_GRAY_COLOR,
    },
    subContent: {
        color: CommonStyle.BLACK,
        width: CommonUtil.getScreenWidth(),
        paddingHorizontal: 15,
        lineHeight: 20,
        paddingVertical: 10
    }
});

export default TeamDetail;