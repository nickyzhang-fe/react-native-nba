/**
 * Created by Cral-Gates on 2017/5/5.
 */
'use strict';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    StatusBar
} from 'react-native';

import commonStyle from '../style/commonStyle';
const STATUS_BAR_HEIGHT = 20;
const NAV_BAR_HEIGHT = 44;

class HeaderBar extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func,
        onPressRight: PropTypes.func,
        subTitle: PropTypes.string,
        showStateBar: PropTypes.bool,
        showLeftState: PropTypes.bool,
        showRightState: PropTypes.bool,
        showRightImage: PropTypes.bool,
        leftItemTitle: PropTypes.string,
        leftImageSource: PropTypes.node,
        rightItemTitle: PropTypes.string,
        rightImageSource: PropTypes.node
    };

    static defaultProps = {
        title: '标题',
        subTitle: '',
        showStateBar: false,
        showLeftState: true,
        showRightState: false,
        showRightImage: false,
        leftItemTitle: '返回',
        rightItemTitle: '完成',
        leftImageSource: require('../image/back.png'),
        rightImageSource: require('../image/menu_person.png')
    };

    render() {
        /*
         * Android和iOS状态栏
         * */
        let showStateBar = this.props.showStateBar;
        /*
         * 左边返回键状态
         * */
        let leftItemState = this.props.showLeftState;
        /*
         * 右边状态 true: 文字，false: 图片
         * */
        let rightItemState = this.props.showRightState;
        let showRightImage = this.props.showRightImage;

        if (Platform.OS === 'ios') {
            showStateBar = true;
        } else {
            showStateBar = false;
        }
        return (
            <View style={[styles.container,
                {
                    height: showStateBar ? NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT : NAV_BAR_HEIGHT,
                    paddingTop: showStateBar ? STATUS_BAR_HEIGHT : 0
                }]}>
                {
                    showStateBar ? (
                        <StatusBar
                            backgroundColor='#ffde00'
                            animated={true}
                            translucent={true}
                            hidden={true}/>
                    ) : null
                }
                <View>
                    {
                        leftItemState
                            ?
                            <TouchableOpacity onPress={this.props.onPress}>
                                <View style={styles.leftItem}>
                                    <Image style={styles.nav_img} source={this.props.leftImageSource}></Image>
                                    <Text style={styles.nav_text}>{this.props.leftItemTitle}</Text>
                                </View>
                            </TouchableOpacity>
                            : <View style={{width: 60}}/>
                    }
                </View>
                <View style={styles.nav_title}>
                    <Text style={styles.textStyle}>{this.props.title}</Text>
                </View>
                <View style={styles.rightItem}>
                    < TouchableOpacity onPress={this.props.onPressRight}>
                        {
                            rightItemState
                                ? (showRightImage ?
                                <Image style={styles.nav_img} source={this.props.rightImageSource}></Image>
                                : <Text style={styles.nav_text}>{this.props.rightItemTitle}</Text>)
                                : null
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: commonStyle.THEME,
        alignItems: 'center'
    },
    nav_title: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    textStyle: {
        fontSize: 20,
        color: commonStyle.WHITE,
        textAlign: 'center'
    },
    leftItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        width: 60
    },
    rightItem: {
        width: 60,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    nav_text: {
        fontSize: 16
    },
    nav_img: {
        flexDirection: 'row',
        height: 24,
        width: 24
    },
});

export default HeaderBar;