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
            playerIcon: this.props.playerInfo.playerIcon
        };
        console.log(this.props.playerInfo)
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => this.getPlayerBaseInfo())
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar
                    title={this.state.title}
                    showLeftState={true}
                    showRightState={false}
                    showRightImage={false}
                    leftItemTitle={'资料'}
                    leftImageSource={require('../image/back.png')}
                    onPress={() => this.goBack()}/>
            </View>
        )
    }


// <View style={styles.outline}>
// <Image style={styles.teamLogo} source={{uri: baseInfo.teamLogo}}/>
// <View>
// <Text style={[styles.outlineTxt, {fontSize: 20}]}>{baseInfo.teamName}</Text>
// <View style={{flexDirection: 'row', alignItems: 'center'}}>
// <Text style={[styles.outlineTxt, {fontSize: 30}]}>{`${rankInfo.wins}`}</Text>
// <Text style={[styles.outlineTxt, {fontSize: 16}]}>{'胜  '}</Text>
// <Text style={[styles.outlineTxt, {fontSize: 30}]}>{`${rankInfo.losses}`}</Text>
// <Text style={[styles.outlineTxt, {fontSize: 16}]}>{`负`}</Text>
// </View>
// </View>
// <View>
// <Text style={[styles.outlineTxt, styles.outlineTxtSize]}>{`排名: ${rankInfo.conferenceRank}`}</Text>
// <Text style={[styles.outlineTxt, styles.outlineTxtSize]}>{`教练: ${baseInfo.coach}`}</Text>
// <Text style={[styles.outlineTxt, styles.outlineTxtSize]}>{`连续战绩: ${rankInfo.streak}`}</Text>
// </View>
// </View>

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
        height: 60,
        width: 60
    },
    outlineTxt: {
        color: CommonStyle.WHITE,
    },
    outlineTxtSize: {
        fontSize: 14
    },
});

export default PlayerDetail;