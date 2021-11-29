/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import React, { FC } from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';

import { FrameLines } from '@arwes/core';
import { jsx } from '@emotion/react';

ReactModal.setAppElement('#root');

export type ModalProps = ReactModalProps & { children: React.ReactNode };
export const Modal: FC<ModalProps> = (props: ModalProps) => {
    return (
        <>
            <ReactModal
                {...props}
                style={{
                    overlay: {
                        backgroundColor: `rgba(0, 0, 0, .7)`,
                    },
                    content: {
                        margin: 'auto',
                        padding: '5px',
                        width: '100%',
                        height: 200,
                        inset: 0,
                        border: 'none',
                        backgroundColor: 'black',
                        overflow: 'hidden',
                    },
                }}
            >
                {/* @ts-ignore: FrameLines has bad property types */}
                <FrameLines style={{ width: '100%', height: '100%' }}>
                    <div className="flex-container" style={{ width: '100%', height: 200, justifyContent: 'center' }}>
                        {props.children}
                    </div>
                </FrameLines>
            </ReactModal>
        </>
    );
};
