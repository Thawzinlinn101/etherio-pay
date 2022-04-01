import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {

};

export default class InputField extends React.PureComponent<Props> {
    props: Props;

    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _onChangePhoneNumber(text) {
        this.setState({ input: text });
    }

    render() {
        const { input } = this.props;
        return (
            <View>
                <TextInput
                    mode="outlined"
                    label="Phone Number"
                    placeholder="Enter Phone Number"
                    right={<TextInput.Icon name="close" color={'#d8d8d8'} onPress={() => this.onPressPhNo()} />}
                    value={input}
                    onChangeText={(text) => this._onChangePhoneNumber(text)}
                    maxLength={11}
                    outlineColor='black'
                    activeOutlineColor='#e041b1'
                />
            </View>
        );
    }
}
