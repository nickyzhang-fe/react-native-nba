/**
 * Created by Cral-Gates on 2017/11/14.
 */

import MainContainer from '../container/mainContainer';
import NewsContainer from '../container/newsContainer';
import NewsDetail from '../page/newsDetail';
import GameContainer from '../container/gameContainer';
import GameDetail from '../page/gameDetail';
import DataContainer from '../container/dataContainer';
import CommunityContainer from '../container/communityContainer';
import ForumNBA from '../page/forumNBA';
import ForumTeam from '../page/forumTeam';
import CommunityDetail from '../page/communityDetail';
import PersonInfo from '../page/personInfo';
import {
    Navigator
} from 'react-native-deprecated-custom-components'

let navigator;
const routeMap = new Map();

routeMap.set('MainContainer', {
    component: MainContainer
});

routeMap.set('NewsContainer', {
    component: NewsContainer
});

routeMap.set('NewsDetail', {
    component: NewsDetail
});

routeMap.set('GameContainer', {
    component: GameContainer
});

routeMap.set('GameDetail', {
    component: GameDetail
});

routeMap.set('DataContainer', {
    component: DataContainer
});

routeMap.set('CommunityContainer', {
    component: CommunityContainer,
    params: ''
});

routeMap.set('ForumNBA', {
    component: ForumNBA
});

routeMap.set('ForumTeam', {
    component: ForumTeam
});

routeMap.set('CommunityDetail', {
    component: CommunityDetail
});

routeMap.set('PersonInfo', {
    component: PersonInfo,
    sceneAnimation: Navigator.SceneConfigs.FloatFromBottom
});

export function registerNavigator(nav) {
    if (navigator) {
        return;
    }
    navigator = nav;
}

export function getNavigator() {
    return navigator;
}

export function getRouteMap() {
    return routeMap;
}

