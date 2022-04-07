import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

function Profile() {
    const [inputName, setInputName] = useState(auth().currentUser.displayName);
    const [phoneNumber, setPhoneNumber] = useState(auth().currentUser.phoneNumber);
    const [showPass, setShowPass] = useState(null);
    const [input, setInput] = useState(null);


    const _onChangeName = (text) => {
        setInputName(text);
    }

    const clearName = () => {
        console.log("clearName")
        setInputName(null);
    }

    const _onChangePhone = (text) => {
        setPhoneNumber(text);
    }

    const clearPhone = () => {
        setPhoneNumber(null);
    }

    const _onChangePasscode = (text) => {
        setInput(text);
    }

    const showPassCode = () => {
        setShowPass(!showPass);
    }

    const onSubmit = () => {
        auth().currentUser.updateProfile({ displayName: inputName }).then(console.log).catch(console.error);
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                    <Image
                        source={require('../../assets/Images/profile.png')}
                        style={{ width: 130, height: 130, borderRadius: 70, borderColor: 'black', borderWidth: 0.5 }}
                        resizeMode='stretch'
                    />
                </View>
                <View style={{ paddingHorizontal: 15 }}>
                    <TextInput
                        mode="outlined"
                        keyboardType='default'
                        label="Name"
                        right={<TextInput.Icon name="close" color={'#d8d8d8'} onPress={clearName} />}
                        value={inputName}
                        onChangeText={(text) => _onChangeName(text)}
                        outlineColor='black'
                        maxLength={20}
                        activeOutlineColor='#e041b1'
                    />
                </View>
                <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
                    <TextInput
                        mode="outlined"
                        keyboardType='numeric'
                        label="Phone"
                        right={<TextInput.Icon name="close" color={'#d8d8d8'} onPress={clearPhone} />}
                        value={phoneNumber}
                        onChangeText={(text) => _onChangePhone(text)}
                        outlineColor='black'
                        maxLength={11}
                        activeOutlineColor='#e041b1'
                    />
                </View>
                <View style={{ paddingHorizontal: 15 }}>
                    <TextInput
                        mode="outlined"
                        keyboardType='default'
                        label="Update or create new password"
                        placeholder="Update or create new password"
                        right={<TextInput.Icon name={showPass ? "eye-off" : "eye"} color={'#d8d8d8'} onPress={showPassCode} />}
                        onChangeText={(text) => _onChangePasscode(text)}
                        outlineColor='black'
                        secureTextEntry={showPass}
                        maxLength={6}
                        activeOutlineColor='#e041b1'
                    />
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={onSubmit}
                    style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: "#e041b1",
                        borderWidth: 1, borderRadius: 15, padding: 10, margin: 10, backgroundColor: "#e041b1"
                    }}
                >
                    <Text style={{ fontSize: 18, color: "white" }}>Save Changes</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 20 }} />
        </View>
    );
}

export default Profile;