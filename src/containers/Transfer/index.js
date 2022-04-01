import React, { useState, useRef } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';
import numeral from 'numeral';
import PriceSuggestion from '../../components/PriceSuggestion';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';
import { reduxForm, Field, getFormSyncErrors, getFormValues } from 'redux-form';
import axios from 'axios';
import ModalAlert from '../../components/ModalAlert';

// reduxForm({
//     form: 'Transfer',
//     destroyOnUnmount: true,
//     validate: values => {
//         const errors = {};

//         return errors;
//     }
// })

// const moneyList = ['1000', '2000', '3000', '5000', '10000', '20000'];
// export default class Transfer extends React.PureComponent {

//     constructor(props) {
//         super(props);
//         this.state = {
//             priceList: moneyList,
//             isShowListSuggestion: true,
//             input: null,
//             inputAmount: null,
//             error: null,
//         };
//     }

//     checkPhoneNumber() {
//         let identifier = this.state.input.replace(/^0/gm, '+95');
//         return axios({
//             method: 'POST',
//             url: 'https://pay.etherio.fun/api/uat/account/identify',
//             data: { identifier }
//         }).then(response => response.data)
//     }

//     onSubmit() {
//         this.checkPhoneNumber().then((accounts) => {
//             if (!accounts.length) {
//                 return;
//             }
//             axios({
//                 method: 'POST',
//                 url: 'https://pay.etherio.fun/api/uat/transfer',
//                 data: {
//                     recipientId: accounts[0],
//                     amount: this.state.inputAmount
//                 }
//             }).then(() => {
//                 Alert.alert('Information', 'Transaction Success', [{
//                     text: "OK", onPress: () =>
//                         this.props.navigation.pop()
//                 }]);
//                 const obj = {
//                     title: 'Information',
//                     body: 'Transaction Success',
//                 };
//                 // modalAlert.onOpen(obj);

//             }).catch(err => console.error(err, 'failed to transfer'))
//         })
//             .catch(err => console.error(err, 'failed to get account '))
//     }

//     _onChangePhoneNumber(text) {
//         this.setState({ input: text }, () => this.checkPhoneNumber().then((accounts) => {
//             if (!accounts.length) {
//                 this.setState({ error: "Account Don't have Etherio Pay" });
//             }
//         }).catch(err =>
//             this.setState({ error: "Account Don't have Etherio Pay" }, () => {}))
//         );
//     }

//     onPressPhNo() {
//         this.setState({ input: null });
//     }

//     _onChangeAmount(text) {
//         this.setState({ inputAmount: numeral(text).format("0,0") });
//     }

//     onPressAmount() {
//         this.setState({ inputAmount: null });
//     }

//     renderItem = (item) => {
//         const { inputAmount } = this.state;
//         const Item = numeral(item).format("0,0");
//         const backgroundColor = Item === inputAmount ? "#e041b1" : "white";
//         const color = Item === inputAmount ? 'white' : 'black';
//         return (
//             <PriceSuggestion
//                 item={Item}
//                 inputAmount={inputAmount}
//                 onPress={() => this.selectedPrice(Item)}
//                 backgroundColor={backgroundColor}
//                 textColor={color}
//             />
//         );
//     }

//     selectedPrice(item) {
//         this.setState({ inputAmount: item });
//     }

//     render() {
//         const { isShowListSuggestion, priceList, input, inputAmount } = this.state;
//         return (
//             <View style={{ flex: 1, width: '100%', backgroundColor: 'white' }}>
//                 <View style={{ flex: 1 }}>
//                     <ScrollView
//                         ref="scrollview"
//                         showsVerticalScrollIndicator={false}
//                         keyboardShouldPersistTaps="handled"
//                     >
//                         <View style={{ marginTop: 25, paddingHorizontal: 16 }}>
//                             {/* <TextInput
//                                 style={{
//                                     height: 40,
//                                     margin: 12,
//                                     borderWidth: 1,
//                                     borderColor: input ? '#e041b1' : 'black',
//                                     padding: 10,
//                                     borderRadius: 10,
//                                 }}
//                                 onChangeText={(text) => this._onChangePhoneNumber(text)}
//                                 value={input}
//                                 placeholder="Phone Number"
//                                 keyboardType="numeric"
//                             />
//                             <View style={{ position: 'absolute', zIndex: 1, left: 370, top: 21 }}>
//                                 <TouchableOpacity onPress={() => this.onPressPhNo()}>
//                                     <Ionicons
//                                         name={'md-close'}
//                                         style={{ fontSize: 20, color: '#d8d8d8', paddingRight: 20 }}
//                                     />
//                                 </TouchableOpacity>
//                             </View> */}

//                             <TextInput
//                                 mode="outlined"
//                                 label="Phone Number"
//                                 placeholder="Enter Phone Number"
//                                 right={<TextInput.Icon name="close" color={'#d8d8d8'} onPress={() => this.onPressPhNo()} />}
//                                 value={input}
//                                 onChangeText={(text) => this._onChangePhoneNumber(text)}
//                                 maxLength={11}
//                                 error={this.state.error}
//                                 outlineColor='black'
//                                 activeOutlineColor='#e041b1'
//                             />
//                             {this.state.error ?
//                                 <Text style={{ color: 'red' }}>Account Not Found!</Text>
//                                 : <View />}
//                         </View>
//                         <View style={{ height: 25 }} />
//                         <View style={{ paddingHorizontal: 16 }}>
//                             {/* <TextInput
//                                 style={{
//                                     height: 40,
//                                     margin: 12,
//                                     borderWidth: 1,
//                                     borderColor: inputAmount ? '#e041b1' : 'black',
//                                     padding: 10,
//                                     borderRadius: 10,
//                                     flex: 1
//                                 }}
//                                 onChangeText={(text) => this._onChangeAmount(text)}
//                                 value={inputAmount}
//                                 placeholder="Amount"
//                                 keyboardType="numeric"
//                             />
//                             <View
//                                 style={{ position: 'absolute', zIndex: 1, left: 370, top: 21 }}
//                             >
//                                 <TouchableOpacity onPress={() => this.onPressAmount()}>
//                                     <Ionicons
//                                         name={'md-close'}
//                                         style={{ fontSize: 20, color: '#d8d8d8', paddingRight: 20 }}
//                                     />
//                                 </TouchableOpacity>
//                             </View> */}

//                             <TextInput
//                                 mode="outlined"
//                                 label="Amount"
//                                 placeholder="Enter Amount"
//                                 right={<TextInput.Icon name="close" color={'#d8d8d8'} onPress={() => this.onPressAmount()} />}
//                                 value={inputAmount}
//                                 onChangeText={(text) => this._onChangeAmount(text)}
//                                 outlineColor='black'
//                                 maxLength={11}
//                                 activeOutlineColor='#e041b1'
//                             />

//                         </View>
//                         <View style={{ height: 15 }} />
//                         <View style={{ margin: 5, alignItems: 'center', justifyContent: 'center' }}>
//                             {isShowListSuggestion ? (
//                                 <FlatList
//                                     keyboardShouldPersistTaps={'always'}
//                                     extraData={this.state}
//                                     keyExtractor={(item) => item.id}
//                                     data={priceList || []}
//                                     numColumns={3}
//                                     renderItem={({ item }) => this.renderItem(item)}
//                                 />
//                             ) : null}
//                         </View>
//                         <View style={{ height: 15 }} />
//                         <TouchableOpacity onPress={() => this.onSubmit()}
//                             style={{
//                                 flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: inputAmount && input ? "#e041b1" : "#d8d8d8",
//                                 borderWidth: 1, borderRadius: 15, padding: 10, margin: 10, backgroundColor: inputAmount && input ? "#e041b1" : "white"
//                             }}
//                             enabled={true}
//                         >
//                             <Ionicons
//                                 name={'send-sharp'}
//                                 style={{ fontSize: 20, color: inputAmount && input ? "white" : "#d8d8d8", paddingRight: 10 }}
//                             />
//                             <Text style={{ fontSize: 18, color: inputAmount && input ? "white" : "#d8d8d8" }}>Send</Text>
//                         </TouchableOpacity>
//                     </ScrollView>
//                 </View>
//                 {/* <ModalAlert
//                     ref={modalAlert}
//                     navigator={navigator}
//                 /> */}
//             </View>
//         );
//     }
// }


const moneyList = ['1000', '2000', '3000', '5000', '10000', '20000'];

const priceList = moneyList;
const isShowListSuggestion = true;
const phNO = null;
const amount = null;
const error_ = null;

let _t;

function Transfer(props) {

    const modalAlert = useRef(null);
    const { navigation } = props;
    const [inputAmount, setInputAmount] = useState(amount);
    const [input, setInput] = useState(phNO);
    const [error, setError] = useState(error_);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [note, setNote] = useState(0);
    // props.hideBottomTab();

    const checkPhoneNumber = (text) => {
        let identifier = (text || input).replace(/^0/gm, '+95');
        return axios({
            method: 'POST',
            url: 'https://etherio-pay.herokuapp.com/uat/account/identify',
            data: { identifier }
        }).then(response => response.data).then((accounts) => {
            setAccounts(accounts);
            setError(accounts.length ? null : "Account Don't have Etherio Pay")
            return accounts;
        })
    }

    const onSubmit = () => {
        const cb = () => {
            if (!accounts.length) {
                const obj = {
                    title: 'Information',
                    body: 'Account Not Found!',
                };
                modalAlert.current.onOpen(obj);
                return;
            }
            setLoading(false);
            axios({
                method: 'POST',
                url: 'https://pay.etherio.fun/api/uat/transfer',
                data: {
                    recipientId: accounts[0],
                    amount: inputAmount
                }
            }).then(() => {
                setLoading(false);
                const obj = {
                    title: 'Information',
                    body: 'Transaction Success.',
                    IsreturnFunction: true,
                    onConfirm: () => navigation.pop(),
                };
                modalAlert.current.onOpen(obj);

            }).catch(err => {
                setLoading(false);
                const obj = {
                    title: 'Information',
                    body: err.response?.data?.error || 'Something went wrong!',
                };
                modalAlert.current.onOpen(obj);
            });
        };
        if (Array.isArray(accounts)) {
            cb();
        } else {
            checkPhoneNumber().then(cb);
        }

    }

    const _onChangePhoneNumber = (text) => {
        setInput(text);
        setError(null);
        _t && clearTimeout(_t);
        _t = setTimeout(() => {
            setLoading(true);
            checkPhoneNumber(text)
                .then(() => setLoading(false))
                .catch(err => setError("Something went wrong"));
        }, 1200);
    }

    const onPressPhNo = () => {
        setInput(null);
    }

    const _onChangeAmount = (text) => {
        setInputAmount(numeral(text).format("0,0"));
    }

    const onPressAmount = () => {
        setInputAmount(null);
    }

    const renderItem = (item) => {
        const Item = numeral(item).format("0,0");
        const backgroundColor = Item === inputAmount ? "#e041b1" : "white";
        const color = Item === inputAmount ? 'white' : 'black';
        return (
            <PriceSuggestion
                item={Item}
                inputAmount={inputAmount}
                onPress={() => selectedPrice(Item)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    }

    const selectedPrice = (item) => {
        setInputAmount(item);
    }

    const isValid = () => input && inputAmount && accounts.length;

    const _onChangeNote = (text) => {
        setNote(text.length);
    }


    return (
        <View style={{ flex: 1, width: '100%', backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    // ref="scrollview"
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ marginTop: 25, paddingHorizontal: 16 }}>
                        <TextInput
                            mode="outlined"
                            keyboardType='phone-pad'
                            label="Phone Number"
                            placeholder="Enter Phone Number"
                            right={<TextInput.Icon name="close" color={'#d8d8d8'} onPress={onPressPhNo} />}
                            value={input}
                            onChangeText={(text) => _onChangePhoneNumber(text)}
                            maxLength={11}
                            error={error}
                            outlineColor='black'
                            activeOutlineColor='#e041b1'
                        />
                        {error ?
                            <Text style={{ color: 'red' }}>Account Not Found!</Text>
                            : <View />}
                    </View>
                    <View style={{ height: 25 }} />
                    <View style={{ paddingHorizontal: 16 }}>
                        <TextInput
                            mode="outlined"
                            keyboardType='numeric'
                            label="Amount"
                            placeholder="Enter Amount"
                            right={<TextInput.Icon name="close" color={'#d8d8d8'} onPress={onPressAmount} />}
                            value={inputAmount}
                            onChangeText={(text) => _onChangeAmount(text)}
                            outlineColor='black'
                            maxLength={11}
                            activeOutlineColor='#e041b1'
                        />

                    </View>
                    <View style={{ height: 25 }} />
                    <View style={{ margin: 5, alignItems: 'center', justifyContent: 'center' }}>
                        {isShowListSuggestion ? (
                            <FlatList
                                keyboardShouldPersistTaps={'always'}
                                keyExtractor={(item) => item.id}
                                data={priceList || []}
                                numColumns={3}
                                renderItem={({ item }) => renderItem(item)}
                            />
                        ) : null}
                    </View>
                    <View style={{ flex: 1, marginTop: 15, paddingHorizontal: 16 }}>
                        <TextInput
                            mode="flat"
                            label="Note"
                            placeholder="Transaction Content"
                            right={<TextInput.Affix text={`${note}/100`} />}
                            onChangeText={(text) => _onChangeNote(text)}
                            activeUnderlineColor='#e041b1'
                            underlineColor='black'
                            maxLength={100}
                        />
                    </View>
                    <View style={{ height: 20 }} />
                </ScrollView>

                <View>
                    <TouchableOpacity onPress={onSubmit}
                        style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: !loading && isValid() ? "#e041b1" : "#d8d8d8",
                            borderWidth: 1, borderRadius: 15, padding: 10, margin: 10, backgroundColor: !loading && isValid() ? "#e041b1" : "white"
                        }}
                        disabled={!isValid()}
                    >
                        <Ionicons
                            name={'send-sharp'}
                            style={{ fontSize: 20, color: !loading && isValid() ? "white" : "#d8d8d8", paddingRight: 10 }}
                        />
                        <Text style={{ fontSize: 18, color: !loading && isValid() ? "white" : "#d8d8d8" }}>Send</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 20 }} />
            </View>
            <ModalAlert
                ref={modalAlert}
                navigator={navigation}
            />
        </View>
    );
}

export default Transfer;
// export default reduxForm({
//     form: 'TransferStore' // a unique identifier for this form
// })(Transfer)