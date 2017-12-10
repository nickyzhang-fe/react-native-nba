/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    InteractionManager,
    ScrollView
} from 'react-native';
import HeaderBar from '../components/headerBar';
import CommunityItem from '../components/communityItem';
import NetUtil from '../util/netUtil';
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';
import {getNavigator} from '../constant/router';
import Global from '../constant/global';

class CommunityContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar
                    title="NBA社区"
                    showLeftState={false}
                    showRightState={false}/>
                <ScrollView>
                    <View style={styles.forumTitle}>
                        <View style={styles.forumTag}/>
                        <Text style={styles.forumTagTxt}>{'热门社区'}</Text>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            Global.HOTFORUM.map((item, index) => this.renderHotForum(item, index))
                        }
                    </View>

                    <View style={styles.forumTitle}>
                        <View style={styles.forumTag}/>
                        <Text style={styles.forumTagTxt}>{'全部社区'}</Text>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            Global.ALLFORUM.map((item, index) => this.renderHotForum(item, index))
                        }
                    </View>
                </ScrollView>

            </View>
        )
    }

    renderHotForum = (item, index) => {
        console.log(item);
        return (
            <TouchableOpacity key={index} onPress={() => this.goForumList(item)}>
                <View style={styles.forumItem}>
                    <Image style={styles.forumImg} source={{uri: item.icon}}/>
                    <Text style={styles.forumTxt}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    goForumList = (item) => {
        if (item.name === '热议NBA'){
            getNavigator().push({
                name: 'ForumNBA'
            })
        } else {

        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    forumTitle: {
        height: 50,
        width: CommonUtil.getScreenWidth(),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: CommonStyle.GRAY_COLOR,
        borderTopWidth: 1,
        borderTopColor: CommonStyle.GRAY_COLOR
    },
    forumTag: {
        height: 24,
        width: 5,
        backgroundColor: CommonStyle.THEME,
        marginHorizontal: 10
    },
    forumTagTxt: {
        fontSize: 18,
        color: CommonStyle.BLACK,
        fontWeight: '400'
    },
    forumItem: {
        height: CommonUtil.getScreenWidth() / 4,
        width: CommonUtil.getScreenWidth() / 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forumImg: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginBottom: 5
    },
    forumTxt: {
        fontSize: 16,
        color: CommonStyle.BLACK
    }
});

export default CommunityContainer;