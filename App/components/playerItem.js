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

class PlayerItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: [],
            rebound: [],
            assist: [],
            block: [],
            steal: []
        }
    };
    render() {
        const {point, rebound, assist, block, steal} = this.props.item;
        if (CommonUtil.isEmpty(point)){
            return (<View/>);
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.playerItemTop}>
                    <Text style={{color: CommonStyle.TEXT_GRAY_COLOR}}>{'得分'}</Text>
                    <Image style={styles.img} source={require('../image/go.png')}/>
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
            </ScrollView>
        )
    }

    renderItem = (item, index) => {
        return(
            <View style={styles.playerItemBottomItem} key={index}>
                    <Text style={{fontWeight: 'bold'}}>{item.value}</Text>
                    <Image style={styles.icon} source={{uri: item.playerIcon}}/>
                    <Text numberOfLines={1}>{item.playerName}</Text>
                    <Text style={{marginTop: 5, color: CommonStyle.TEXT_GRAY_COLOR}}>{item.teamName}</Text>
            </View>
        )
    };
}

FlatList.propTypes = {
    item: PropType.object
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: CommonUtil.getScreenHeight() - 64,
        width: CommonUtil.getScreenWidth()
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
        width: CommonUtil.getScreenWidth()/3,
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
        height: 66,
        width: 66,
        backgroundColor: CommonStyle.GRAY_COLOR,
        borderRadius: 33,
        marginVertical: 5
    }
});

export default PlayerItem;