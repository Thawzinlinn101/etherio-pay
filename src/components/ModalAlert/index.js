import React, { Component } from 'react';
import { Image, Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class ModalAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            title: '',
            body: '',
            IsreturnFunction: false,
            btnLeftText: '',
            btnRightText: 'ok',
            titleColor: 'black',
            title_vou: '',
        };
    }

    onOpen(obj) {
        this.setState({
            isVisible: true,
            btnLeftText: obj.btnLeftText ? obj.btnLeftText : '',
            btnRightText: obj.btnRightText ? obj.btnRightText : 'ok',
            titleColor: obj.titleColor,
            ...obj,
        });
    }

    onClose() {
        this.setState({
            isVisible: false,
        });
    }

    confirm = () => {
        if (this.state.IsreturnFunction) {
            this.state.onConfirm();
        }
        this.onClose();
    };

    confirmLeft = () => {
        const { onClickLeftBtn } = this.props;
        onClickLeftBtn && onClickLeftBtn();
        this.onClose();
    };

    render() {
        const { isVisible } = this.state;
        return (
            <Modal
                visible={isVisible}
                animationType="fade"
                hideModalContentWhileAnimating
                transparent
                useNativeDriver
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    }}
                >
                    <View
                        style={{ backgroundColor: 'white', width: '90%', borderRadius: 12, justifyContent: 'center', alignItems: 'center', padding: 12 }}
                    >
                        {this.state.title && (
                            <View style={{ marginBottom: 20 }}>
                                <Text
                                    style={{ fontWeight: 'bold', color: this.state.titleColor, marginTop: 20, fontSize: 20, textAlign: 'center' }}
                                >
                                    {this.state.title}
                                </Text>
                            </View>
                        )}

                        {this.state.imageURL && (
                            <Image
                                source={this.state.imageURL}
                                style={{ width: 58, height: 58 }}
                                resizeMode="contain"
                            />
                        )}

                        <View
                            style={{ backgroundColor: 'white', width: '90%', borderRadius: 12, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}
                        >
                            <Text
                                style={{ lineHeight: 20, marginTop: 10, fontSize: 16, textAlign: 'center' }}
                            >
                                {this.state.body}
                            </Text>
                        </View>
                        <View style={{ height: 20 }} />
                        <View style={{ flexDirection: 'row' }}>
                            {this.state.btnLeftText !== '' ? (
                                <View style={{ marginRight: 10, flex: 1 }}>
                                    <TouchableOpacity
                                        style={{
                                            borderRadius: 6, borderColor: 'orange', borderWidth: 1, justifyContent: 'center', alignItems: 'center'
                                        }}
                                        onPress={() => this.confirmLeft()}>
                                        <Text style={{ lineHeight: 23, fontSize: 16, fontWeight: 'bold', margin: 14, backgroundColor: 'orange' }}>{this.state.btnLeftText}</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={{
                                        borderRadius: 6, borderColor: 'orange', borderWidth: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange'
                                    }}
                                    onPress={() => this.confirm()}>
                                    <Text style={{ lineHeight: 23, fontSize: 16, fontWeight: 'bold', margin: 14, color: 'white' }}>{this.state.btnRightText}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

