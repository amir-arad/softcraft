/** @jsxRuntime classic */
/** @jsx jsx */
import { ChangeEvent, ReactNode, useRef } from 'react';

import { jsx } from '@emotion/react';
import { styles } from './select.styles';

let globalSelectCounter = 0;

export type SelectChangeEvent = ChangeEvent<HTMLSelectElement>;
export type SelectProps = {
    className?: string;
    labelText: string;
    value: string;
    onChange: (event: SelectChangeEvent) => unknown;
    children?: ReactNode;
};

export function Select({ className, labelText, value, onChange, children }: SelectProps): jsx.JSX.Element {
    const id = useRef('select-' + globalSelectCounter++);

    return (
        <div css={styles.root} className={className}>
            <label css={styles.labelText} htmlFor={id.current}>
                {labelText}
            </label>
            <select id={id.current} css={styles.select} value={value} onChange={onChange}>
                <option value="">-- Select {labelText} --</option>
                {children}
            </select>
            <span css={styles.arrow}>🔽</span>
        </div>
    );
}
