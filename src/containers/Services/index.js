
import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Services extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    goScreen = (item) => {
        switch (item.id) {
            case 1:
                return this.props.navigation.navigate({
                    name: 'Transfer',
                    // params: { navigation: this.props.navigation },
                });
            case 6:
                return this.props.navigation.navigate({
                    name: 'Received',
                });
            case 7:
                return this.props.navigation.navigate({
                    name: 'Transfered',
                });
            default:
                return;
        }
    }

    render() {
        const { item } = this.props;
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '25%' }}>
                <TouchableOpacity onPress={() => this.goScreen(item)}
                    style={{ alignItems: 'center', paddingHorizontal: 5, justifyContent: 'center', paddingVertical: 25 }}
                >
                    <Ionicons
                        name={item.iconName}
                        size={20}
                        style={{ color: 'black' }}
                    />
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>
                            {item.serviceName}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
