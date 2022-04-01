import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

const numberOfItemsPerPageList = [2, 3, 4];

const items = [
    {
        key: 1,
        name: 'Page 1',
    },
    {
        key: 2,
        name: 'Page 2',
    },
    {
        key: 3,
        name: 'Page 3',
    },
];

// const data = [
//     {
//         from: '+959758035929',
//         amount: '10,000',
//         transferedAt: '19/02/2022 02:36AM',
//     },
//     {
//         from: '+959758035929',
//         amount: '60,000',
//         transferedAt: '19/02/2022 02:36AM',
//     },
//     {
//         from: '+959758035929',
//         amount: '210,000',
//         transferedAt: '19/02/2022 02:36AM',
//     },
//     {
//         from: '+959758035929',
//         amount: '1,000',
//         transferedAt: '19/02/2022 02:36AM',
//     },
//     {
//         from: '+959758035929',
//         amount: '4,000',
//         transferedAt: '19/02/2022 02:36AM',
//     },
//     {
//         from: '+959758035929',
//         amount: '9,000',
//         transferedAt: '19/02/2022 02:36AM',
//     },
// ];


const Received = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

    axios({
        method: 'get',
        url: 'https://pay.etherio.fun/api/uat/transaction/recieved',
    }).then((response) => {
        setData(response.data)
    });

    useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ color: '#e041b1', margin: 15, fontSize: 20 }}>Received Logs</Text>
            <ScrollView style={{ paddingHorizontal: 15 }}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{ justifyContent: 'center', alignContent: 'center' }}>From</DataTable.Title>
                        <DataTable.Title style={{ justifyContent: 'center', alignContent: 'center' }}>Amount</DataTable.Title>
                        <DataTable.Title style={{ justifyContent: 'center', alignContent: 'center' }}>Transfered At</DataTable.Title>
                    </DataTable.Header>

                    {data.map(row => (
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: 'center', alignContent: 'center' }}>{(row.senderName || '').replace(/^\+95/, '0')}</DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: 'center', alignContent: 'center' }}>{row.amount}</DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: 'center', alignContent: 'center' }}>{new Date(row.createdAt).toLocaleDateString()} {new Date(row.createdAt).toLocaleTimeString()}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                    {/* <DataTable.Row>
                        <DataTable.Cell>+959686983852</DataTable.Cell>
                        <DataTable.Cell>555,555</DataTable.Cell>
                        <DataTable.Cell>15/02/2022 12:31PM</DataTable.Cell>
                    </DataTable.Row> */}

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
                        onPageChange={page => setPage(page)}
                        label={`${from + 1}-${to} of ${items.length}`}
                        showFastPaginationControls
                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                        numberOfItemsPerPage={numberOfItemsPerPage}
                    // onItemsPerPageChange={onItemsPerPageChange}
                    // selectPageDropdownLabel={'Rows per page'}

                    />
                </DataTable>
                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
    );
}

export default Received;