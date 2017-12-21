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

class RankDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props)
    };

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <HeaderBar
                    title="数据详情"
                    showLeftState={true}
                    showRightState={false}
                    showRightImage={false}
                    leftItemTitle={''}
                    leftImageSource={require('../image/back.png')}
                    onPress={() => this.goBack()}/>
            </View>
        )
    }

    goBack = () => {
        getNavigator().pop();
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default RankDetail;