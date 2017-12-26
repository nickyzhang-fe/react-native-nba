import React, {Component} from 'react';
import {
    BackHandler
} from 'react-native';
import Toast from '../components/toast';
import {requestAnimationFrame} from "react-native/Libraries/react-native/react-native-interface";

export default function BackUtils() {
    let hasTip = false;
    let lastClickTime;
    return function () {
        const routers = this.navigator.getCurrentRoutes();
        console.log(routers);
        if (routers.length > 1) {
            navigator.pop();
            return true;
        }
        lastClickTime = Date.now();
        if (!hasTip) {
            let handler = function () {
                let currentTime = Date.now();
                if (currentTime - lastClickTime < 2000) {
                    requestAnimationFrame(handler);
                } else {
                    hasTip = false
                }
            };
            handler();
            hasTip = true;
            Toast.show('再按一次退出程序');
            return true
        } else {
            BackHandler.exitApp();
            return true
        }
    }
}
