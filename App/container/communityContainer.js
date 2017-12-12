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
                        <Text style={styles.forumTagTxt}>{'西部社区'}</Text>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            Global.WESTFORUM.map((item, index) => this.renderHotForum(item, index))
                        }
                    </View>
                    <View style={styles.forumTitle}>
                        <View style={styles.forumTag}/>
                        <Text style={styles.forumTagTxt}>{'东部社区'}</Text>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            Global.EASTFORUM.map((item, index) => this.renderHotForum(item, index))
                        }
                    </View>
                </ScrollView>

            </View>
        )
    }

    renderHotForum = (item, index) => {
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
            getNavigator().push({
                name: 'ForumTeam',
                team: item
            })
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
        height: CommonUtil.getScreenWidth() / 5,
        width: CommonUtil.getScreenWidth() / 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forumImg: {
        height: 44,
        width: 44,
        borderRadius: 22,
        marginBottom: 5,
        marginTop: 10
    },
    forumTxt: {
        fontSize: 14,
        color: CommonStyle.BLACK
    }
});

export default CommunityContainer;