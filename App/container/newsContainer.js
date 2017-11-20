/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import HeaderBar from '../components/headerBar';
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';
import NetUtil from '../util/netUtil';

class NewsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isRefreshing: false
        };
    }

    componentDidMount() {
        this.onRefresh();
    }

    render() {
        console.log(this.state.dataSource);
        return (
            <View style={{flex: 1}}>
                <HeaderBar
                    title="新闻"
                    showLeftState={false}
                    showRightState={false}/>
            </View>
        )
    }




    _renderItem = (item) => {
        console.log(item.item.title);
        return (
            <TouchableOpacity>
                <View style={{height: 50, width: CommonUtil.getScreenWidth(), backgroundColor: 'white'}}>
                    <Text style={styles.item}>{item.item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    renderEmptyComponent = () => {
        return (
            <TouchableOpacity>
                <Text>{{数据为空}}</Text>
            </TouchableOpacity>
        )
    };

    onRefresh = () => {
        let that = this;
        let url = 'https://tags.open.qq.com/interface/tag/articles.php?p=1&l=20&tag=NBA&oe=gbk&ie=utf-8&source=web&site=sports&_=1510498594797';
        console.log(url);
        // NetUtil.get(url, function (res) {
        //     console.log(res.data);
        //     that.setState({
        //         dataSource: res.data
        //     })
        // })
    };

    onLoadMore = () => {

    }
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