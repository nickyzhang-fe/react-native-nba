/**
 * Created by Cral-Gates on 2017/11/18.
 */
import React, {Component} from 'react';
import PropType from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';

class FlatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [{title: 'Title Text', key: 'item1'},
                {title: 'Title Text', key: 'item1'},
                {title: 'Title Text', key: 'item1'},
                {title: 'Title Text', key: 'item1'},
                {title: 'Title Text', key: 'item1'}]
        }
    }

    render() {
        return (
            <FlatList
                data={this.state.dataSource}
                extraData={this.state}
                renderItem={() => this.renderItem()}/>
        )
    }

    renderItem = (item) => {
        return (
            <TouchableOpacity>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        )
    };

    onRefresh = () => {

    };

    onLoadMore = () => {

    }
}

FlatList.propTypes = {};

export default FlatList;