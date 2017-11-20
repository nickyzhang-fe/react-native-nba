/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';
import HeaderBar from '../components/headerBar';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import NetUtil from '../util/netUtil';
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';


class CommunityContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isRefreshing: false
        }
    }

    componentDidMount() {
        this.onRefresh();
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar
                    title="社区"
                    showLeftState={false}
                    showRightState={false}/>
                <FlatList
                    data={this.state.dataSource}
                    dataExtra={this.state}
                    renderItem={(item) => this._renderItemView(item)}
                    onEndReached={() => this.onLoadMore()}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isRefreshing}/>
            </View>
        )
    }

    _renderItemView = (item) => {
        return (
            <TouchableOpacity>
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
    };

    renderEmptyView = () => {
        return (
            <TouchableOpacity>
                <Text>{{数据为空}}</Text>
            </TouchableOpacity>
        )
    };

    onRefresh = () => {
        let that = this;
        let url = 'https://shequweb.sports.qq.com/module/timeLineAsGroup?lastId=0&count=40&gid=17&_=1510496938551';
        console.log(url);
        NetUtil.get(url, function (res) {
            console.log(res.data.list);
            that.setState({
                dataSource: res.data.list
            })
        })
    };

    onLoadMore = () => {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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

export default CommunityContainer;