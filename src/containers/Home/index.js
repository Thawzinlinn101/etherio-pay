import * as React from 'react';
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

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPrice: false,
            services: [
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
                {
                    id: 8,
                    serviceName: 'Setting',
                    iconName: 'ios-list'
                }
            ],
            images: [
                { url: "https://pay.etherio.fun/assets/img/banner-1.jpg" },
                { url: "https://pay.etherio.fun/assets/img/banner-2.jpg" },
                { url: "https://pay.etherio.fun/assets/img/banner-3.jpg" }
            ],
            balance: 0,
            phoneNumber: null,
        };
    }

    _reload() {
        this.setState({ isShowPrice: !this.state.isShowPrice }, () => { });
    };

    goProfile() {
        return (
            this.props.navigation.navigate({
                name: 'Profile',
                // params: { data: sample_data },
            })
        );
    };


    renderTopCard() {
        const { isShowPrice, balance, phoneNumber } = this.state;
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
                            onPress={() => this.goProfile()}
                        >
                            <FontAwesome5
                                name={'user-circle'}
                                size={35}
                                style={{ color: 'black' }}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', marginLeft: 15 }}>
                            Thaw Zin Linn
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
                            onPress={() => this._reload()}
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

    renderServicesList(navigation) {
        const { services } = this.state;
        return (
            <View style={{ backgroundColor: '#dce1e8', margin: 6, borderRadius: 10 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}
                    numColumns={4}
                    extraData={this.state}
                    keyExtractor={(item) => item.id}
                    data={services}
                    renderItem={({ item }) => (
                        <Services item={item} navigation={navigation} />
                    )}
                />
            </View>
        );
    }

    imageSlider() {
        return (
            <View style={{ margin: 6, paddingVertical: 6, flex: 1 }}>
                <ImageSlider listBanner={this.state.images} />
            </View>
        );
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://pay.etherio.fun/api/uat/account',
        }).then((response) => {
            console.log("thaw --- account api");
            this.setState({ balance: response.data.balance, phoneNumber: response.data.identifier });
        });

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeArea>
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        {this.renderTopCard()}
                        {this.renderServicesList(this.props.navigation)}
                        {this.imageSlider()}
                    </View>
                </SafeArea>
            </View>
        );
    }
}

export default Home;
