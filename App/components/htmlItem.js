/**
 * Created by Cral-Gates on 2017/11/18.
 */
import React, {Component} from 'react';
import PropType from 'prop-types';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Modal
} from 'react-native';
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';
import Global from '../constant/global';

class HtmlItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
    }

    render() {
        let item = this.props.item;
        console.log(item);
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        item.map((item, i) => this.dealType(item, i))
                    }
                </ScrollView>
            </View>
        )
    }

    dealType = (item, i) => {
        if ((item.type === 0 && !CommonUtil.isEmpty(item.info)) || (item.type === 'text' && !CommonUtil.isEmpty(item.info))) {
            return (
                <View style={styles.item} key={i}>
                    <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;{item.info}</Text>
                </View>
            );
        }
        if (item.type === 1 || item.type === 'img') {
            if (!CommonUtil.isEmpty(item.img)){
                this.state.image = item.img.imgurl0.imgurl.replace('http', 'https');
            } else {
                this.state.image = item.image.raw.url.replace('http', 'https');
            }
            return (
                <TouchableOpacity key={i}>
                    <View style={styles.item}>
                        <Image style={styles.image} source={{uri: this.state.image}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    };
}


FlatList.propTypes = {
    item: PropType.array
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 10
    },
    modalStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: CommonStyle.BLACK
    },
    item: {
        width: CommonUtil.getScreenWidth(),
        minHeight: 20,
        flexDirection: 'row'
    },
    text: {
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 16,
        color: CommonStyle.TEXT_COLOR,
        lineHeight: 20
    },
    image: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        minHeight: 300,
        width: CommonUtil.getScreenWidth() - 20
    }
});

export default HtmlItem;