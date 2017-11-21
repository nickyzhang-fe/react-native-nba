/**
 * Created by Cral-Gates on 2017/11/18.
 */
import React, {Component} from 'react';
import PropType from 'prop-types';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';

class CommunityItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        console.log(this.props.item);
        let item = this.props.item;
        return (
            <TouchableOpacity onPress={() => this.props._onPress(item)}>
                <View style={styles.item}>
                    <View style={styles.itemTop}>
                        <View style={{flex: 5}}><Text style={styles.title}> {item.item.title}</Text></View>
                        <View style={{alignItems: 'center', flex: 1, alignSelf: 'center'}}>
                            <Image style={styles.image} source={{uri: item.item.moduleIcon.replace('http', 'https')}}/>
                            <Text style={styles.teamName}>{item.item.moduleName}</Text>
                        </View>
                    </View>
                    <View style={styles.itemBottom}>
                        <View style={styles.itemBottomLeft}>
                            <Text style={styles.subTitle}> {item.item.user.name}</Text>
                        </View>

                        <View style={styles.itemBottomRight}>
                            <Image style={styles.image_icon}
                                   source={require('../image/community/icon_shiwu_comment.png')}/>
                            <Text style={[styles.subTitle, {marginRight: 20}]}>{item.item.replyNum}</Text>
                            <Image style={styles.image_icon}
                                   source={require('../image/community/icon_shiwu_like.png')}/>
                            <Text style={[styles.subTitle, {marginRight: 15}]}>{item.item.supportNum}</Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

FlatList.propTypes = {
    item: PropType.object,
    _onPress: PropType.func
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: CommonStyle.MAIN_COLOR,
        borderBottomColor: CommonStyle.GRAY_COLOR,
        borderBottomWidth: 1,
        padding: 10,
        height: 108
    },
    itemTop: {
        flexDirection: 'row',
        height: 68
    },
    itemBottom: {
        flexDirection: 'row',
        width: CommonUtil.getScreenWidth() - 20,
        height: 20,
    },
    itemBottomLeft: {
        flex: 1,
        alignSelf: 'flex-end'
    },
    itemBottomRight: {
        flexDirection: 'row',
        flex: 1,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end'
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    image_icon: {
        height: 18,
        width: 18
    },
    title: {
        color: 'black',
        fontSize: 18,
    },
    teamName: {
        color: 'black',
        fontSize: 14,
        marginTop: 10
    },
    subTitle: {
        color: CommonStyle.TEXT_GRAY_COLOR,
        fontSize: 14
    }
});

export default CommunityItem;