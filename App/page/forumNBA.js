/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {PureComponent} from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
} from 'react-native';
import HeaderBar from '../components/headerBar';
import CommunityItem from '../components/communityItem';
import NetUtil from '../util/netUtil';
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';
import {getNavigator} from '../constant/router';
import Global from '../constant/global';


class ForumNBA extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isRefreshing: false,
            lastId: '0'
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(this.getCommunityList());
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar
                    title="热议NBA"
                    showLeftState={true}
                    showRightState={false}
                    leftItemTitle={''}
                    onPress={() => this.goBack()}/>
                <FlatList
                    data={this.state.dataSource}
                    dataExtra={this.state}
                    renderItem={(item) => this._renderItemView(item)}
                    onEndReached={() => this.onLoadMore()}
                    onRefresh={() => this.getCommunityList()}
                    onEndReachedThreshold={0.2}
                    initialNumToRender={10}
                    getItemLayout={(item, index) => this._getItemLayout(item, index)}
                    keyExtractor={(item) => this._keyExtractor(item)}
                    refreshing={this.state.isRefreshing}/>
            </View>
        )
    }

    _renderItemView = (item) => {
        return (
            <CommunityItem
                item={item}
                _onPress={(item) => this.goCommunityDetail(item)}/>
        )
    };

    _keyExtractor = (item, index) => item.id;

    _getItemLayout = (item, index) => (
        {length: 108, offset: 108 * index, index}
    );

    getCommunityList = () => {
        let that = this;
        that.setState({
            isRefreshing: true,
        });
        let url = Global.TEN_SHE_QU_URL + '/module/timeLineAsGroup?lastId=0&count=20&gid=17&_=1510496938551';
        NetUtil.get(url, function (res) {
            that.setState({
                dataSource: res.data.list,
                lastId: res.data.lastId,
                isRefreshing: false
            })
        })
    };

    onLoadMore = () => {
        let that = this;
        let url = Global.TEN_SHE_QU_URL + '/module/timeLineAsGroup?lastId=' + this.state.lastId + '&count=20&gid=17&_=1510496938551';
        that.setState({
            isRefreshing: true
        });
        NetUtil.get(url, function (res) {
            that.setState({
                dataSource: that.state.dataSource.concat(res.data.list),
                lastId: res.data.lastId,
                isRefreshing: false
            })
        })
    };

    goBack = () => {
        getNavigator().pop();
    };

    goCommunityDetail = (item) => {
        getNavigator().push({
            name: 'CommunityDetail',
            id: item.item.id
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CommonStyle.BACKGROUND_COLOR
    }
});

export default ForumNBA;