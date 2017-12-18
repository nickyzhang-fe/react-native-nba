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

class RankItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eastList: [],
            westList: []
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(this.getRankList())
    }

    render() {
        const {westList, eastList} = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.rankItem}>
                    <Text style={[styles.rankTitleTxt, styles.rankTitleFW, {width: '36%', textAlign: 'left', paddingLeft: 25}]}>{'西部排行'}</Text>
                    <Text style={[styles.rankTitleTxt, styles.rankTitleFW, {width: '16%'}]}>{'胜-负'}</Text>
                    <Text style={[styles.rankTitleTxt, styles.rankTitleFW, {width: '16%'}]}>{'胜场差'}</Text>
                    <Text style={[styles.rankTitleTxt, styles.rankTitleFW, {width: '16%'}]}>{'胜率'}</Text>
                    <Text style={[styles.rankTitleTxt, styles.rankTitleFW, {width: '16%'}]}>{'近况'}</Text>
                </View>
                {
                    (westList.map((item, index) => this.renderItem(item, index)))
                }
                <View style={styles.rankItem}>
                    <Text style={[styles.rankTitleTxt, styles.rankTitleFW, {width: '36%', textAlign: 'left', paddingLeft: 25}]}>{'东部排行'}</Text>
                    <Text style={[styles.rankTitleTxt, styles.rankTitleFW, {width: '16%'}]}>{'胜-负'}</Text>
                    <Text style={[styles.rankTitleTxt, styles.rankTitleFW, {width: '16%'}]}>{'胜场差'}</Text>
                    <Text style={[styles.rankTitleTxt, styles.rankTitleFW, {width: '16%'}]}>{'胜率'}</Text>
                    <Text style={[styles.rankTitleTxt, styles.rankTitleFW, {width: '16%'}]}>{'近况'}</Text>
                </View>
                {
                    (eastList.map((item, index) => this.renderItem(item, index)))
                }
            </ScrollView>
        )
    }

    renderItem = (item, index) => {
        return(
            <View style={styles.rankItem} key={index}>
                <View style={[styles.rankLeft, {width: '36%'}]}>
                    <Text style={[styles.rankIndex, styles.rankTitleFW, {color:(index <= 7 ? '#ff0000' : '#000000')}]}>{index+1}</Text>
                    <Image style={styles.rankImg} source={{uri: item[0].badge.replace('http', 'https')}}/>
                    <Text style={[styles.rankName, styles.rankTitleFW]}>{item[0].name}</Text>
                </View>
                <Text style={[styles.rankTitleTxt, {width: '16%'}]}>{`${item[1]} - ${item[2]}`}</Text>
                <Text style={[styles.rankTitleTxt, {width: '16%'}]}>{item[4]}</Text>
                <Text style={[styles.rankTitleTxt, {width: '16%'}]}>{item[3]}</Text>
                <Text style={[styles.rankTitleTxt, {width: '16%'}]}>{item[10]}</Text>
            </View>
        )
    };

    getRankList =() => {
        let that = this;
        let url = `http://sportsnba.qq.com/team/rank?appver=4.0.1&appvid=4.0.1&deviceId=
                09385DB300E081E142ED046B568B2E48&from=app&guid=09385DB300E081E142ED046B568B2E48&height
                =1920&network=WIFI&os=Android&osvid=7.1.1&width=1080`;
        NetUtil.get(url, function (res) {
            that.setState({
                eastList: res.data[0].rows,
                westList: res.data[1].rows
            })
        })
    }
}

FlatList.propTypes = {
    item: PropType.object
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rankItem: {
        flexDirection: 'row',
        height: 40,
        width: CommonUtil.getScreenWidth(),
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: CommonStyle.GRAY_COLOR
    },
    rankTitle: {
        flexDirection: 'row',
        height: 40,
        width: CommonUtil.getScreenWidth(),
        borderBottomColor: CommonStyle.GRAY_COLOR,
        borderBottomWidth: 1
    },
    rankTitleTxt: {
        color: CommonStyle.BLACK,
        textAlign: 'center'
    },
    rankTitleFW: {
        fontWeight: 'bold',
    },
    rankLeft: {
        flexDirection: 'row',
        height: 40,
        width: 80,
        alignItems: 'center',
        paddingLeft: 10
    },
    rankIndex: {
        width: 20,
        textAlign: 'center'
    },
    rankName: {
        color: CommonStyle.BLACK
    },
    rankImg: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 12
    }
});

export default RankItem;