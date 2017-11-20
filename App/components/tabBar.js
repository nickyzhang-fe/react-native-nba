import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View
} from 'react-native';

class TabBar extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    setAnimationValue = (value) => {
        console.log(value);
    };

    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => {
                    let color = this.props.activeTab === i ? 'green' : 'gray';
                    let icon = this.props.activeTab == i ? this.props.selectedTabIconNames[i] : this.props.tabIconNames[i];
                    return (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.8}
                            style={styles.tab}
                            onPress={() => this.props.goToPage(i)}>
                            <View style={styles.tabItem}>
                                <Image
                                    style={styles.icon}
                                    source={icon}/>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    }
}

TabBar.PropTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    // tabNames: PropTypes.array,
    tabIconNames: PropTypes.array,
    selectedTabIconNames: PropTypes.array
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 20
    },
    tabs: {
        flexDirection: 'row',
        height: 56,
        borderTopColor: '#d9d9d9',
        borderTopWidth: 1
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 2
    }
});

export default TabBar;