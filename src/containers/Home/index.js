import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Services from '../Services';
import ImageSlider from '../../components/ImageSlide';
import axios from 'axios';
import numeral from 'numeral';
import SafeArea from '../../components/SafeAreaView';
import { useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const showPrice = false;
const services = [
    {
        id: 1,
        serviceName: 'Transfer',
        iconName: 'send-sharp'
    },
    {
        id: 2,
        serviceName: 'Recharge',
        iconName: 'flash'
    },
    {
        id: 3,
        serviceName: 'Scan',
        iconName: 'qr-code-outline'
    },
    {
        id: 4,
        serviceName: 'Cards',
        iconName: 'ios-card-sharp'
    },
    {
        id: 5,
        serviceName: 'Gifts',
        iconName: 'md-gift-sharp'
    },
    {
        id: 6,
        serviceName: 'Received',
        iconName: 'receipt'
    },
    {
        id: 7,
        serviceName: 'Transfered',
        iconName: 'receipt'
    },
    // {
    //     id: 8,
    //     serviceName: 'Setting',
    //     iconName: 'ios-list'
    // }
];
const images = [
    { url: "https://pay.etherio.fun/assets/img/banner-1.jpg" },
    { url: "https://pay.etherio.fun/assets/img/banner-2.jpg" },
    { url: "https://pay.etherio.fun/assets/img/banner-3.jpg" }
];
const bal = 0;
const phoneNo = null;

function Home(props) {
    const { navigation } = props;
    const [isShowPrice, setisShowPrice] = useState(showPrice);
    const [balance, setBalance] = useState(bal);
    const [phoneNumber, setPhoneNumber] = useState(phoneNo);
    const [user, setUser] = useState(null);

    const fetchProfile = () => {
        setUser(auth().currentUser.displayName);
        setPhoneNumber(auth().currentUser.phoneNumber);
        console.log("useEffect:auth");
    }

    useEffect(() => {
        console.log('UseEffect:App #user', user);
        callAPI();
        fetchProfile();
    });


    const callAPI = () => {
        console.log("thaw --- call account");
        axios({
            method: 'get',
            url: 'https://pay.etherio.fun/api/account',
        }).then((response) => {
            console.log("thaw --- account api", response);
            setBalance(response.data.balance);
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            console.log("...........--- useFocusEffect");
            callAPI();
            fetchProfile();
        })
    );

    const _reload = () => {
        setisShowPrice(!isShowPrice);
    };

    const goProfile = () => {
        return (
            navigation.navigate({
                name: 'Profile',
            })
        );
    };


    const renderTopCard = () => {
        return (
            <LinearGradient
                colors={['#942ad1', '#e041b1']}
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 0.5, y: 1.0 }}
                style={{ marginHorizontal: 6, borderRadius: 10, marginBottom: 6 }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 15, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => goProfile()}
                        >
                            <FontAwesome5
                                name={'user-circle'}
                                size={35}
                                style={{ color: 'black' }}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', marginLeft: 15 }}>
                            {user}
                        </Text>
                    </View>
                    <Ionicons
                        name={'notifications'}
                        size={25}
                        style={{ color: 'black' }}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, justifyContent: 'space-between', paddingVertical: 20 }}>
                    <Text
                        style={{ color: 'white', fontSize: 16, letterSpacing: 2 }}
                    >
                        {(phoneNumber || '').replace(/^\+95/, '0')}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => _reload()}
                            style={{ paddingRight: 8 }}
                        >
                            <Entypo
                                name={isShowPrice ? 'eye' : 'eye-with-line'}
                                size={20}
                                style={{ color: 'white', marginRight: 8 }}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20 }}>
                            {isShowPrice ? numeral(balance).format("0,0") : '******'}
                        </Text>
                        <Text style={{ fontSize: 15, color: 'white' }}>{' '}MMK</Text>
                    </View>
                </View>
            </LinearGradient>
        );
    }

    const renderServicesList = (navigation) => {
        return (
            <View style={{ backgroundColor: '#dce1e8', margin: 6, borderRadius: 10 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}
                    numColumns={4}
                    keyExtractor={(item) => item.id}
                    data={services}
                    renderItem={({ item }) => (
                        <Services item={item} navigation={navigation} />
                    )}
                />
            </View>
        );
    }

    const imageSlider = () => {
        return (
            <View style={{ margin: 6, paddingVertical: 6, flex: 1 }}>
                <ImageSlider listBanner={images} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeArea>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    {renderTopCard()}
                    {renderServicesList(navigation)}
                    {imageSlider()}
                </View>
            </SafeArea>
        </View>
    );
}

export default Home;