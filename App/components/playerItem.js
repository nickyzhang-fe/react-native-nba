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
        const {type} = this.props.type;
        if (CommonUtil.isEmpty(point)) {
            return (<Text>{'test'}</Text>);
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.playerItemTop}>
                    <Text style={{color: CommonStyle.TEXT_GRAY_COLOR}}>{'得分'}</Text>
                    <TouchableOpacity onPress={() => this.goDetail()} activeOpacity={1}>
                        <Image style={styles.img} source={require('../image/go.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.playerItemBottom}>
                    {
                        point.map((item, index) => this.renderItem(item, index))
                    }
                </View>
                <View style={styles.playerItemTop}>
                    <Text style={{color: CommonStyle.TEXT_GRAY_COLOR}}>{'篮板'}</Text>
                    <Image style={styles.img} source={require('../image/go.png')}/>
                </View>
                <View style={styles.playerItemBottom}>
                    {
                        rebound.map((item, index) => this.renderItem(item, index))
                    }
                </View>
                <View style={styles.playerItemTop}>
                    <Text style={{color: CommonStyle.TEXT_GRAY_COLOR}}>{'助攻'}</Text>
                    <Image style={styles.img} source={require('../image/go.png')}/>
                </View>
                <View style={styles.playerItemBottom}>
                    {
                        assist.map((item, index) => this.renderItem(item, index))
                    }
                </View>
                <View style={styles.playerItemTop}>
                    <Text style={{color: CommonStyle.TEXT_GRAY_COLOR}}>{'盖帽'}</Text>
                    <Image style={styles.img} source={require('../image/go.png')}/>
                </View>
                <View style={styles.playerItemBottom}>
                    {
                        block.map((item, index) => this.renderItem(item, index))
                    }
                </View>
                <View style={styles.playerItemTop}>
                    <Text style={{color: CommonStyle.TEXT_GRAY_COLOR}}>{'抢断'}</Text>
                    <Image style={styles.img} source={require('../image/go.png')}/>
                </View>
                <View style={styles.playerItemBottom}>
                    {
                        steal.map((item, index) => this.renderItem(item, index))
                    }
                </View>
                {
                    this.props.type === 3 ?
                        <View>
                            <View style={styles.playerItemTop}>
                                <Text style={{color: CommonStyle.TEXT_GRAY_COLOR}}>{'失分'}</Text>
                                <Image style={styles.img} source={require('../image/go.png')}/>
                            </View>
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

    goDetail = (item) => {
        console.log(item);
        switch (this.state.type) {
            case 1:
                getNavigator().push({
                    name: 'PlayerDetail'
                });
                break;
            case 2:
                getNavigator().push({
                    name: 'PlayerDetail'
                });
                break;
            case 3:
                getNavigator().push({
                    name: 'TeamDetail',
                    teamInfo: item
                });
                break;
        }
    }
}

FlatList.propTypes = {
    item: PropType.object,
    type: PropType.number
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    playerItem: {
        width: CommonUtil.getScreenWidth(),
        flexDirection: 'column'
    },
    playerItemTop: {
        width: CommonUtil.getScreenWidth(),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: CommonStyle.GRAY_COLOR,
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 15
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
    img: {
        height: 14,
        width: 14
    },
    icon: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginVertical: 5
    }
});

export default PlayerItem;