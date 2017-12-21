/**
 * Created by Cral-Gates on 2017/12/14.
 * 左边文字，右边图片的标题栏
 */
import React, {Component} from 'react';
import PropType from 'prop-types';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';

class rankTitle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, img, click} = this.props;
        return (
            <View style={styles.playerItemTop}>
                <Text style={{color: CommonStyle.TEXT_GRAY_COLOR}}>{title}</Text>
                <TouchableOpacity onPress={click} activeOpacity={1}>
                    <Image style={styles.img} source={img}/>
                </TouchableOpacity>
            </View>
        )
    }
}

FlatList.propTypes = {
    title: PropType.string.isRequired,
    img: PropType.node.isRequired,
    click: PropType.func.isRequired
};

const styles = StyleSheet.create({
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
    img: {
        height: 16,
        width: 16,
    }
});

export default rankTitle;