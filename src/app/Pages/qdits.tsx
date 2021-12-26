import React from 'react';
import { QditCard } from '../components/qditCard';
import { useQdit } from '../hooks/app-state';
import { useRequireAuth } from '../hooks/authentication';
import { Id } from '../model';

export const Qdits = () => {
    const auth = useRequireAuth();
    return (
        <>
            {auth.user.qdits.map((qdit, idx) => (
                <SingleQdit key={idx} qditId={qdit} />
            ))}
        </>
    );
};

const SingleQdit = ({ qditId }: { qditId: Id }) => {
    const qdit = useQdit(qditId);
    return <QditCard id={qdit.id} datasetNames={qdit.dataSetsTrained} value={qdit.value} />;
};
