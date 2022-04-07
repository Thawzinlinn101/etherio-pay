import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import ModalAlert from '../../components/ModalAlert';

function Login(props) {
    const modalAlert = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const _onChangePhone = (text) => {
        setPhoneNumber(text);
    }

    const clearPhone = () => {
        setPhoneNumber(null);
    }

    const onSubmit = async () => {
        // success login
        let phone = phoneNumber.replace(/^0/gm, '+95')
        try {
            const confirmation = await auth().signInWithPhoneNumber(phone);
            props.navigation.navigate({ name: 'OTPScreen', params: { confirmation } });
        } catch (e) {
            const obj = {
                title: 'Information',
                body: e.message,
            };
            console.log(e.error);
            modalAlert.current.onOpen(obj);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
            <View style={{ marginTop: -40, }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                    <Image
                        source={require('../../assets/Images/appIcon.png')}
                        style={{ width: 130, height: 130 }}
                        resizeMode='contain'
                    />
                </View>
                <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
                    <TextInput
                        mode="outlined"
                        keyboardType='phone-pad'
                        label="Phone"
                        right={<TextInput.Icon name="close" color={'#d8d8d8'} onPress={clearPhone} />}
                        value={phoneNumber}
                        onChangeText={(text) => _onChangePhone(text)}
                        outlineColor='black'
                        maxLength={11}
                        activeOutlineColor='#e041b1'
                    />
                </View>

                <View>
                    <TouchableOpacity onPress={onSubmit}
                        style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: phoneNumber || isLoading ? "#e041b1" : "#d8d8d8",
                            borderWidth: 1, borderRadius: 15, padding: 10, margin: 10, backgroundColor: phoneNumber || isLoading ? "#e041b1" : "white"
                        }}
                        disabled={!phoneNumber || isLoading}
                    >
                        <Text style={{ fontSize: 18, color: phoneNumber ? "white" : "#d8d8d8" }}>
                            Login with OTP
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ModalAlert
                ref={modalAlert}
                navigator={props.navigation}
            />
        </View>
    );
}

export default Login;