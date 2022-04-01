/* @flow */
import React, { PureComponent } from "react";
import { TouchableOpacity, Text, View } from "react-native";

export default class PriceSuggestion extends PureComponent<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            selectedAmount: null,
        };
    }

    render() {
        const { item, backgroundColor, textColor, onPress, inputAmount } = this.props;
        const { isActive } = this.state;

        return (
            <View style={{ marginVertical: 0, marginHorizontal: 15 }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onPress}
                    style={{
                        backgroundColor: backgroundColor, borderColor: isActive || inputAmount === item ? "#e041b1" : "#c9c9c9", borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 15, width: 100, borderWidth: 0.5
                    }}
                >
                    <Text
                        style={{
                            color: textColor, fontSize: 14, paddingVertical: 8, paddingHorizontal: 5, textAlign: 'center'
                        }}
                    >
                        {item}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
