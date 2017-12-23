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
import RankTitle from '../components/rankTitle';

class PlayerItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: [],
            rebound: [],
            assist: [],
            block: [],
            steal: [],
            type: this.props.type
        };
    };

    componentDidMount() {

    }

    render() {
        const {point, rebound, assist, block, steal, oppPoints} = this.props.item;
        if (CommonUtil.isEmpty(point)) {
            return (<Text>{'test'}</Text>);
        }
        return (
            <ScrollView style={styles.container}>
                <RankTitle title={'得分'} img={require('../image/go.png')}
                           click={() => this.goRankDetail(this.state.type, 0)}/>
                <View style={styles.playerItemBottom}>
                    {
                        point.map((item, index) => this.renderItem(item, index))
                    }
                </View>
                <RankTitle title={'篮板'} img={require('../image/go.png')}
                           click={() => this.goRankDetail(this.state.type, 1)}/>
                <View style={styles.playerItemBottom}>
                    {
                        rebound.map((item, index) => this.renderItem(item, index))
                    }
                </View>
                <RankTitle title={'助攻'} img={require('../image/go.png')}
                           click={() => this.goRankDetail(this.state.type, 2)}/>
                <View style={styles.playerItemBottom}>
                    {
                        assist.map((item, index) => this.renderItem(item, index))
                    }
                </View>
                <RankTitle title={'盖帽'} img={require('../image/go.png')}
                           click={() => this.goRankDetail(this.state.type, 3)}/>
                <View style={styles.playerItemBottom}>
                    {
                        block.map((item, index) => this.renderItem(item, index))
                    }
                </View>
                <RankTitle title={'抢断'} img={require('../image/go.png')}
                           click={() => this.goRankDetail(this.state.type, 4)}/>
                <View style={styles.playerItemBottom}>
                    {
                        steal.map((item, index) => this.renderItem(item, index))
                    }
                </View>
                {
                    this.props.type === 'team' ?
                        <View>
                            <RankTitle title={'失分'} img={require('../image/go.png')}
                                       click={() => this.goRankDetail(this.state.type, 5)}/>
                            <View style={styles.playerItemBottom}>
                                {
                                    oppPoints.map((item, index) => this.renderItem(item, index))
                                }
                            </View>
                        </View> :
                        <View/>
                }
            </ScrollView>
        )
    }

    renderItem = (item, index) => {
        return (
            <TouchableOpacity onPress={() => this.goDetail(item)} activeOpacity={1} key={index}>
                <View style={styles.playerItemBottomItem}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.value}</Text>
                    <Image style={styles.icon}
                           source={{uri: CommonUtil.isEmpty(item.playerIcon) ? item.teamLogo.replace('http', 'https') : item.playerIcon}}/>
                    {
                        CommonUtil.isEmpty(item.playerName) ? <View/> :
                            <Text numberOfLines={1}>{item.playerName}</Text>
                    }
                    <Text style={{marginTop: 5, color: CommonStyle.TEXT_GRAY_COLOR}}>{item.teamName}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    /*
     * 跳转到球员详情或球队详情
     * */
    goDetail = (item) => {
        switch (this.state.type) {
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
    /*
     * rank榜
     * */
    goRankDetail = (type, index) => {
        getNavigator().push({
            name: 'RankDetail',
            type: type,
            index: index
        })
    }
}

FlatList.propTypes = {
    item: PropType.object,
    type: PropType.string
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    playerItem: {
        width: CommonUtil.getScreenWidth(),
        flexDirection: 'column'
    },
    playerItemBottom: {
        width: CommonUtil.getScreenWidth(),
        height: 150,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: CommonStyle.GRAY_COLOR
    },
    playerItemBottomItem: {
        width: CommonUtil.getScreenWidth() / 3,
        height: 150,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginVertical: 5
    }
});

export default PlayerItem;