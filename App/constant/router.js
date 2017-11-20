/**
 * Created by Cral-Gates on 2017/11/14.
 */

import App from '../../App';
import MainContainer from '../container/mainContainer';
import NewsContainer from '../container/newsContainer';
import GameContainer from '../container/gameContainer';
import DataContainer from '../container/dataContainer';
import CommunityContainer from '../container/communityContainer';
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

routeMap.set('GameContainer', {
    component: GameContainer
});

routeMap.set('DataContainer', {
    component: DataContainer
});

routeMap.set('CommunityContainer', {
    component: CommunityContainer
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

