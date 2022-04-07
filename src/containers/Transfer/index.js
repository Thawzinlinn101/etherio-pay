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

    const checkPhoneNumber = (text) => {
        let identifier = (text || input).replace(/^0/gm, '+95');
        return axios({
            method: 'POST',
            url: 'https://pay.etherio.fun/api/account/identify',
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
                url: 'https://pay.etherio.fun/api/transfer',
                data: {
                    recipientId: accounts[0],
                    amount: inputAmount.split(',').join('')
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