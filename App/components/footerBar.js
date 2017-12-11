/**
 * Created by Cral-Gates on 2017/12/11.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native';
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';
import Global from '../constant/global';

class FooterBar extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {

    }

    render(){
        return(
            <View>
                <TextInput/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default FooterBar;