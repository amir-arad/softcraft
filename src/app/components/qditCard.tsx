import { Button, Card, FrameBox, FrameLines, FramePentagon, Text } from '@arwes/core';
import { FrameCorners } from '@arwes/core/lib/FrameCorners/FrameCorners.component';
import React from 'react';
import { Id, Veca } from '../model';
import { VecaBig } from './veca-big';

export interface QditCardProps {
    id: Id;
    datasetNames: string[];
    value: Veca;
    // Actions TBD
}

export const QditCard = ({ id, datasetNames, value }: QditCardProps) => {
    return (
        <div style={{ display: 'flex' }}>
            <VecaBig value={value} size={200} />
            <Card
                animator={{ activate: true }}
                title={<>{id}</>}
                landscape
                // we should consider contributing the usage of component in place of image
                // image={{
                //     src: 'https://picsum.photos/200/200',
                // }}
                options={
                    <>
                        <Button FrameComponent={FrameBox} style={{ margin: '0 10px 10px 0' }}>
                            <Text>Train</Text>
                        </Button>
                        <Button FrameComponent={FramePentagon} style={{ margin: '0 10px 10px 0' }}>
                            <Text>Share</Text>
                        </Button>
                    </>
                }
                hover
                style={{ width: '700px' }}
            >
                <Text>
                    Generation: {datasetNames.length}
                    <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {datasetNames.length ? (
                            datasetNames.map((name, i) => (
                                <Button key={i} FrameComponent={FrameCorners}>
                                    {name}
                                </Button>
                            ))
                        ) : (
                            <Button FrameComponent={FrameLines} disabled palette="secondary">
                                No datasets
                            </Button>
                        )}
                    </div>
                </Text>
            </Card>
        </div>
    );
};
