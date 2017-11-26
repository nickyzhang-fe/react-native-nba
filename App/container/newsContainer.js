/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    InteractionManager
} from 'react-native';
import HeaderBar from '../components/headerBar';
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';
import NetUtil from '../util/netUtil';
import Global from '../constant/global';

class NewsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isRefreshing: false
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(this.getNewsList());
    }

    render() {
        console.log(this.state.dataSource);
        return (
            <View style={{flex: 1}}>
                <HeaderBar
                    title="新闻"
                    showLeftState={false}
                    showRightState={false}/>
                <View>
                    <Text>{'test'}</Text>
                </View>
            </View>
        )
    }

    getNewsList = () => {
        let that = this;
        let url = Global.TEN_SHE_QU_URL + '/reply/listCite?tid=0&page=1&listType=allWithElite&count=20&sort=asc&he=&_=1510497824444';
        console.log(url);
        NetUtil.get(url, function (res) {
            console.log(res.data);
        })
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    flatList: {
        width: CommonUtil.getScreenWidth(),
    },
    item: {
        height: 20,
        width: CommonUtil.getScreenWidth(),
        color: 'black'
    }
});

export default NewsContainer;