/**
 * Created by Cral-Gates on 2017/12/8.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Modal,
    InteractionManager,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';

import HeaderBar from '../components/headerBar';
import HtmlItem from '../components/htmlItem';
import CommonUtil from '../util/commonUtil';
import NetUtil from '../util/netUtil';
import CommonStyle from '../style/commonStyle';
import {getNavigator} from '../constant/router';
import Global from '../constant/global';

class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: this.props.item,
            title: '新闻详情',
            shareUrl: this.props.item.item.url,
            animationType: 'slide',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            showModal: false
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this._onRequestClose()}>
                    <View style={styles.modal}>
                        <View style={styles.modalItem} onPress={() => this._closeModal()}>
                            <Image style={styles.shareImage} source={require('../image/tab/btn_bbs_down.png')}/>
                            <Text style={styles.shareText}>{'微信'}</Text>
                        </View>
                    </View>
                </Modal>
                <HeaderBar
                    title={this.state.title}
                    showLeftState={true}
                    showRightState={true}
                    showRightImage={true}
                    leftItemTitle={''}
                    rightItemTitle={''}
                    leftImageSource={require('../image/back.png')}
                    rightImageSource={require('../image/share/share.png')}
                    onPress={() => this.goBack()}
                    onPressRight={() => this.share()}/>
                <View ><Text style={styles.title}>{this.props.item.item.title}</Text></View>
                <HtmlItem
                    item={CommonUtil.isEmpty(this.state.detail.item.content) ? [] : this.state.detail.item.content}/>
            </View>
        )
    }

    goBack = () => {
        getNavigator().pop();
    };

    share = () => {
        this.setState({
            modalVisible: true
        })
    };

    _onRequestClose = () => {
        console.log('request');
    };

    _closeModal = () => {
        this.setState({
            modalVisible: false
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 22,
        color: CommonStyle.BLACK,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
        width: CommonUtil.getScreenWidth()
    },
    modalItem: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: 250,
        backgroundColor: CommonStyle.BACKGROUND_COLOR,
        width: CommonUtil.getScreenWidth()
    },
    shareImage: {
        height: 60,
        width: 60
    },
    shareText: {
        fontSize: 16,
        color: CommonStyle.BLACK
    }
});

export default NewsDetail;