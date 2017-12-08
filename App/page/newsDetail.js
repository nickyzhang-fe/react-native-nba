/**
 * Created by Cral-Gates on 2017/12/8.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
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

class NewsDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            detail: this.props.item,
            title: '新闻详情',
            shareUrl: this.props.item.item.url
        };
    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(this.getNewsDetail());
    }

    componentDidMount() {

    }

    render(){
        return(
            <View style={styles.container}>
                <HeaderBar
                    title={this.state.title}
                    showLeftState={true}
                    showRightState={false}
                    leftItemTitle={''}
                    leftImageSource={require('../image/back.png')}
                    onPress={() => this.goBack()}/>
                <View ><Text style={styles.title}>{this.props.item.item.title}</Text></View>
                <HtmlItem
                    item={CommonUtil.isEmpty(this.state.detail.item.content) ? [] : this.state.detail.item.content}/>
            </View>
        )
    }

    goBack = () => {
        getNavigator().pop();
    };

    getNewsDetail = () => {

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
    }
});

export default NewsDetail;