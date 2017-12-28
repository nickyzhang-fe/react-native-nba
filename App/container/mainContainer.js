/**
 * Created by Cral-Gates on 2017/11/14.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import GameContainer from './gameContainer';
import NewsContainer from './newsContainer';
import CommunityContainer from './communityContainer';
import DataContainer from './dataContainer';
import TabBar from '../components/tabBar'

const tabIcon = [
    require('../image/tab/btn_football_game_up_dark.png'),
    require('../image/tab/btn_news_up_dark.png'),
    require('../image/tab/btn_bbs_up_dark.png'),
    require('../image/tab/btn_more_up_dark.png')
];
const tabSelectedIcon = [
    require('../image/tab/btn_football_game_down.png'),
    require('../image/tab/btn_news_down.png'),
    require('../image/tab/btn_bbs_down.png'),
    require('../image/tab/btn_more_down.png')
];

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollableTabView
                tabBarPosition="bottom"
                locked={true}
                scrollWithoutAnimation={true}
                prerenderingSiblingsNumber={4}
                overlayBottom={true}
                renderTabBar={() => {
                    return <TabBar
                        tabIconNames={tabIcon}
                        selectedTabIconNames={tabSelectedIcon}/>
                }}>
                <GameContainer/>
                <NewsContainer/>
                <CommunityContainer/>
                <DataContainer/>
            </ScrollableTabView>
        )
    }

    componentWillUnmount() {
        console.log('unmount')
    }
}

const styles = StyleSheet.create({
    subView: {
        overflow: 'hidden'
    }
});

export default MainContainer;