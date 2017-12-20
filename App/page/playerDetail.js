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
            baseInfo: {}
        };
        console.log(this.props.playerInfo)
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => this.getPlayerBaseInfo())
    }

    render() {
        const {baseInfo, seasonData} = this.state;
        return (
            <View style={styles.container}>
                <HeaderBar
                    title={this.state.title}
                    showLeftState={true}
                    showRightState={true}
                    showRightImage={true}
                    leftItemTitle={'资料'}
                    leftImageSource={require('../image/back.png')}
                    rightImageSource={{uri: this.state.teamIcon}}
                    onPress={() => this.goBack()}/>
                <View style={styles.outline}>
                    <Image style={styles.teamLogo} source={{uri: this.state.playerIcon}}/>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={[styles.outlineTxt, {fontSize: 30}]}>{`#${baseInfo.jerseyNum}`}</Text>
                        <Text style={[styles.outlineTxt, styles.outlineTxtSize]}>{`${baseInfo.teamName}  ${baseInfo.position}  ${baseInfo.height}  ${baseInfo.weight}`}</Text>
                        <Text style={[styles.outlineTxt, styles.outlineTxtSize]}>{`生日:${baseInfo.birthDate}  选秀${baseInfo.draftYear}`}</Text>
                    </View>
                </View>
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
            </View>
        )
    }




    goBack = () => {
        getNavigator().pop();
    };

    getPlayerBaseInfo = () => {
        let that = this;
        let url = `http://sportsnba.qq.com/player/baseInfo?appver=4.0.1&appvid=4.0.1&deviceId
        =09385DB300E081E142ED046B568B2E48&from=app&guid=09385DB300E081E142ED046B568B2E48&height
        =1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&playerId=${this.state.playerId}`;
        NetUtil.get(url, function (res) {
            console.log(res.data);
            that.setState({
                baseInfo: res.data,
                seasonData: res.data.stats
            })
        })
    };

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
        flex:1,
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
    }
});

export default PlayerDetail;