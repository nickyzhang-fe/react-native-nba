/**
 * Created by Cral-Gates on 2017/5/2.
 */
'use strict';
import React, {Component} from 'react';
import {Dimensions} from 'react-native';

class commonUtil extends Component {
    /*
     * 判断字符
     * */
    static isEmpty(v) {
        switch (typeof v) {
            case 'date':
                return true;
            case 'undefined' :
                return true;
            case 'string' :
                if (v.trim().length === 0)
                    return true;
                break;
            case 'boolean' :
                if (!v)
                    return true;
                break;
            case 'number' :
                if (0 === v)
                    return true;
                break;
            case 'object' :
                if (null === v) {
                    return true;
                }
                else if (undefined !== v.length && v.length === 0) {
                    return true;
                }
                else {
                    return false;
                }
                break;
        }
        return false;
    }

    /*
     * url 替换
     * */
    static replaceHttpHeader(str) {
        String.prototype.replace = function () {
            this.replace('http', 'https');
        };
        return str.replace();
    }

    /*
     * 随机生成颜色
     * */
    static chooseColor() {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    }

    /*
     * 时间戳转时间
     * */
    static  formatDateTime(timeStamp) {
        let date = new Date();
        date.setTime(timeStamp * 1000);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };

    /*
     * 屏幕宽高
     * */
    static getScreenWidth() {
        return Dimensions.get('window').width;
    }

    static getScreenHeight() {
        return Dimensions.get('window').height
    }

    static FormatDate(timestamp, formater) {
        let date = new Date();
        date.setTime(parseInt(timestamp));
        formater = (formater != null) ? formater : 'yyyy-MM-dd hh:mm';
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };

            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                    (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return fmt;
        };
        return date.Format(formater);
    }
}

export default commonUtil;