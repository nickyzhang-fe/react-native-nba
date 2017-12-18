/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {PureComponent} from 'react';
import {
    View,
    Text,
    Image,
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
import {getNavigator} from '../constant/router';

class NewsContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isRefreshing: false,
            ids: [],
            page: 1
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(this.getNewsListIds());
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar
                    title="新闻"
                    showLeftState={false}
                    showRightState={false}/>
                <FlatList
                    data={this.state.dataSource}
                    dataExtra={this.state}
                    renderItem={(item) => this.renderItemView(item)}
                    onEndReached={() => this.onLoadMore()}
                    onRefresh={() => this.getNewsListIds()}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    getItemLayout={(item, index) => this._getItemLayout(item, index)}
                    keyExtractor={(item) => this._keyExtractor(item)}
                    refreshing={this.state.isRefreshing}/>
            </View>
        )
    }

    renderItemView = (item) => {
        const {cover_map} = item.item;
        return (
            <TouchableOpacity onPress={() => this.goNewsDetail(item)} key={cover_map.newsId} activeOpacity={1}>
                <View style={styles.item}>
                    <Image style={styles.image} source={{uri: cover_map.imgurl.replace('http', 'https')}}/>
                    <View><Text style={styles.title} numberOfLines={1}>{cover_map.title}</Text></View>
                    <View style={styles.bottom}>
                        <Text style={styles.subTitle}>{cover_map.pub_time_new}</Text>
                        <Text style={styles.subTitle}>{cover_map.source}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    _keyExtractor = (item, index) => item.newsId;

    _getItemLayout = (item, index) => (
        {length: 300, offset: 300 * index, index}
    );

    getNewsListIds = () => {
        let that = this;
        let url = 'http://sportsnba.qq.com/news/index?appver=4.0.1&appvid=4.0.1&deviceId=09385DB300E081E142ED046B568B2E48&from=app&guid=09385DB300E081E142ED046B568B2E48&height=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&column=banner';
        NetUtil.get(url, function (res) {
            that.setState({
                ids: res.data,
                page: 1
            });
            that.getNewsList()
        })
    };

    getNewsList = () => {
        let that = this;
        let ids = '';
        let tempArray = [];
        // that.setState({
        //     isRefreshing: true,
        //     page: 1
        // });
        for (let i = 20 * (that.state.page - 1); i <= that.state.ids.length - 1; i++) {
            if (i <= (20 * that.state.page - 1)) {
                ids += that.state.ids[i].id + ',';
            }
        }
        let url = 'http://sportsnba.qq.com/news/item?appver=4.0.1&appvid=4.0.1&deviceId' +
            '=0928183600E081E142ED076B56E3DBAA&from=app&guid=0928183600E081E142ED076B56E3DBAA&height' +
            '=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&column=banner&articleIds=' + ids;
        NetUtil.get(url, function (res) {
            for (let i in res.data) {
                tempArray.push(res.data[i]);
            }
            that.setState({
                dataSource: tempArray,
                isRefreshing: false,
                page: 2
            })
        })
    };

    onLoadMore = () => {
        let that = this;
        let ids = '';
        let tempArray = [];
        for (let i = 20 * (that.state.page - 1); i <= that.state.ids.length - 1; i++) {
            if (i <= (20 * that.state.page - 1)) {
                ids += that.state.ids[i].id + ',';
            }
        }
        let url = 'http://sportsnba.qq.com/news/item?appver=4.0.1&appvid=4.0.1&deviceId' +
            '=0928183600E081E142ED076B56E3DBAA&from=app&guid=0928183600E081E142ED076B56E3DBAA&height' +
            '=1920&network=WIFI&os=Android&osvid=7.1.1&width=1080&column=banner&articleIds=' + ids;
        NetUtil.get(url, function (res) {
            for (let i in res.data) {
                tempArray.push(res.data[i]);
            }
            that.setState({
                dataSource: that.state.dataSource.concat(tempArray),
                isRefreshing: false,
                page: that.state.page + 1
            })
        })
    };

    goNewsDetail = (item) => {
        getNavigator().push({
            name: 'NewsDetail',
            item: item
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    item: {
        height: 300,
        width: CommonUtil.getScreenWidth(),
        backgroundColor: CommonStyle.BACKGROUND_COLOR,
        borderBottomColor: CommonStyle.GRAY_COLOR,
        borderBottomWidth: 1
    },
    title: {
        color: CommonStyle.BLACK,
        fontSize: 16,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 5
    },
    image: {
        width: CommonUtil.getScreenWidth(),
        height: 240
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    subTitle: {
        color: CommonStyle.TEXT_GRAY_COLOR,
        fontSize: 14,
    }
});

export default NewsContainer;