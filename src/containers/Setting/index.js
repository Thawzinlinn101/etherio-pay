import auth from '@react-native-firebase/auth';
import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';


export default function Setting(props) {

    const onSubmit = () => {
        auth().signOut().then(() =>
            props.navigation.popToTop()
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <TouchableOpacity onPress={onSubmit}
                    style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: "#e041b1",
                        borderWidth: 1, borderRadius: 15, padding: 10, margin: 10, backgroundColor: "#e041b1"
                    }}
                >
                    <Text style={{ fontSize: 18, color: "white" }}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}