import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import ModalAlert from '../../components/ModalAlert';

function Login({ navigation, route }) {
    const modalAlert = useRef(null);
    const [otpCode, setotpCode] = useState(null);

    const clearOTP = () => {
        setotpCode(null);
    }

    const _onChangeOtpCode = (otpCode) => {
        setotpCode(otpCode.replace(/\D/gm, ''));
    }

    const onSubmit = () => {
        const { confirmation } = route.params;
        console.log("onConfirm", confirmation)
        confirmation.confirm(otpCode).then(() => {
            // success login
            navigation.popToTop();
        }).catch((err) => {
            const obj = {
                title: 'Information',
                body: err.message,
            };
            modalAlert.current.onOpen(obj);
        })
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
                <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                    <TextInput
                        mode="outlined"
                        keyboardType='number-pad'
                        label="OTP"
                        right={<TextInput.Icon name="close" color={'#d8d8d8'} onPress={clearOTP} />}
                        onChangeText={(text) => _onChangeOtpCode(text)}
                        value={otpCode}
                        outlineColor='black'
                        maxLength={20}
                        activeOutlineColor='#e041b1'
                    />
                </View>
                <View>
                    <TouchableOpacity onPress={onSubmit}
                        style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: otpCode ? "#e041b1" : "#d8d8d8",
                            borderWidth: 1, borderRadius: 15, padding: 10, margin: 10, backgroundColor: otpCode ? "#e041b1" : "white"
                        }}
                        disabled={!otpCode}
                    >
                        <Text style={{ fontSize: 18, color: otpCode ? "white" : "#d8d8d8" }}>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ModalAlert
                ref={modalAlert}
                navigator={navigation}
            />
        </View>
    );
}

export default Login;