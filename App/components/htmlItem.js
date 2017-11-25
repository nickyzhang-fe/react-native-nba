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
import ImageViewer from 'react-native-image-zoom-viewer';
import CommonStyle from '../style/commonStyle';
import CommonUtil from '../util/commonUtil';
import Global from '../constant/global';

class HtmlItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let item = this.props.item;
        return (
            <ScrollView>
                {
                    item.map((item, i) => this.dealType(item, i))
                }
            </ScrollView>
        )
    }

//     return (
// <View style={styles.container}>
// <Modal
// animationType='slide'
// transparent={false}
// visible={this.state.isModal}
// onRequestClose={() => {
//     this._setModalVisible(false)
// }}>
// <TouchableOpacity onPress={this.closeModal.bind(this)} style={styles.modalStyle}>
// <View>
// <Image style={{width: CommonUtil.getScreenWidth(), minHeight: 200}}
// source={{uri: this.state.images[0]}}/>
// </View>
// </TouchableOpacity>
// </Modal>
// </View>
// )

    dealType = (item, i) => {
        if (item.type === 0 && !CommonUtil.isEmpty(item.info)) {
            return (
                <View style={styles.item} key={i}>
                    <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;{item.info}</Text>
                </View>
            );
        }
        if (item.type === 1) {
            return (
                <TouchableOpacity key={i}>
                    <View style={styles.item}>
                        <Image style={styles.image} source={{uri: item.image.raw.url.replace('http', 'https')}}/>
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
        flexDirection: 'column'
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