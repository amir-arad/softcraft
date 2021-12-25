/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { Button, Table, Text } from '@arwes/core';
import { Dataset, getFromMap, logStore } from '../model';
import React, { FC, useState } from 'react';

import { Modal } from '../components/modal';
import { VecaSmall } from '../components/veca-big';
import { jsx } from '@emotion/react';
import { useAppState } from '../hooks/app-state';
import { useRequireAuth } from '../hooks/authentication';

const headers = [
    { id: '1', data: 'Dataset ID' },
    { id: '2', data: 'Title' },
    { id: '3', data: 'Veca effect' },
    { id: '4', data: 'Actions' },
];
const columnWidths = ['10%', '40%', '25%', '25%'];

export const DataSet: FC = () => {
    const auth = useRequireAuth();
    const state = useAppState();
    const [dataSetToDelete, setDataSetToDelete] = useState<Dataset | null>(null);
    const dataSetIds = auth.user.dataSets;
    const deleteDataSet = (id: string) => {
        const dataSetIndex = dataSetIds.indexOf(id);
        dataSetIndex !== -1 ? dataSetIds.splice(dataSetIndex, 1) : undefined;
        return;
    };
    const rows = getFromMap(state.dataSets, dataSetIds).map((ds) => ({
        id: ds.id,
        columns: [
            { id: '1', data: ds.id },
            { id: '2', data: ds.title },
            { id: '3', data: <VecaSmall value={ds.effect} /> },
            {
                id: '4',
                data: (
                    <Button onClick={() => setDataSetToDelete(ds)}>
                        <Text>Delete</Text>
                    </Button>
                ),
            },
        ],
    }));
    logStore(state);
    return (
        <>
            <Text as="h1">This is your dataset</Text>
            <Table headers={headers} dataset={rows} columnWidths={columnWidths} />
            <Modal
                isOpen={dataSetToDelete !== null}
                onRequestClose={() => setDataSetToDelete(null)}
                contentLabel="Deletion"
            >
                <Text>Are you sure you want to delete the data set?</Text>
                <div className="flex-break" />
                <div>
                    <Button
                        onClick={() => {
                            if (dataSetToDelete !== null) deleteDataSet(dataSetToDelete.id);
                            setDataSetToDelete(null);
                        }}
                    >
                        <Text>Yes</Text>
                    </Button>
                    <Button onClick={() => setDataSetToDelete(null)}>
                        <Text>No</Text>
                    </Button>
                </div>
            </Modal>
        </>
    );
};
