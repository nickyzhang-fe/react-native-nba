/**
 * Created by Cral-Gates on 2017/12/14.
 */
import React, {Component} from 'react';
import PropType from 'prop-types';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';
import Global from '../constant/global';
import HeaderBar from '../components/headerBar';

class RankItem extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Text>{'西部'}</Text>
                <Text>{'东部'}</Text>
            </View>
        )
    }
}


FlatList.propTypes = {
    item: PropType.object
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default RankItem;