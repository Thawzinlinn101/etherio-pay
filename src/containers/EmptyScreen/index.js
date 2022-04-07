import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

function EmptyScreen(props) {
    const [user, setUser] = useState()

    console.log(Object.keys(props.navigation));

    useFocusEffect(
        React.useCallback(() => {
            props.navigation.navigate({
                name: auth().currentUser ? 'HomeScreen' : 'Login',
            })
        })
    );

    return (
        <></>
    );
}

export default EmptyScreen;