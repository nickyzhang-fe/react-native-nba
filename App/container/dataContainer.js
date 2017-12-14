/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import HeaderBar from '../components/headerBar';
import {getNavigator} from '../constant/router';
import CommonUtil from '../util/commonUtil';
import CommonStyle from '../style/commonStyle';
import Global from '../constant/global';
import RankItem from '../components/rankItem';

const BLOG = {
    url: Global.BLOG_URL,
    title: '我的博客'
};

const GITHUB = {
    url: Global.GITHUB_URL,
    title: '我的项目'
};

class DataContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar
                    title="数据"
                    showLeftState={true}
                    showRightState={true}
                    showRightImage={true}
                    leftItemTitle={''}
                    rightImageSource={require('../image/person/github.png')}
                    leftImageSource={require('../image/menu_person.png')}
                    onPressRight={() => this.showPersonInfo(GITHUB)}
                    onPress={() => this.showPersonInfo(BLOG)}/>

                <View style={styles.container}>
                    <ScrollableTabView
                        style={[styles.container]}
                        locked={false}
                        tabBarPosition={'top'}
                        initialPage={0}
                        prerenderingSiblingsNumber={4}
                        tabBarBackgroundColor={CommonStyle.THEME}
                        tabBarActiveTextColor={CommonStyle.WHITE}
                        tabBarUnderlineStyle={{backgroundColor: CommonStyle.WHITE}}
                        tabBarInactiveTextColor={CommonStyle.TEXT_GRAY_COLOR}
                        renderTabBar={() => <DefaultTabBar/>}>

                        <RankItem tabLabel="球队排行"/>
                        <RankItem tabLabel="日榜"/>
                        <RankItem tabLabel="球员榜"/>
                        <RankItem tabLabel="球队榜"/>
                    </ScrollableTabView>
                </View>
            </View>

        )
    }


    showPersonInfo = (url) => {
        getNavigator().push({
            name: 'PersonInfo',
            url: url
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        width: CommonUtil.getScreenWidth(),
        height: CommonUtil.getScreenHeight() - 100
    }
});
export default DataContainer;