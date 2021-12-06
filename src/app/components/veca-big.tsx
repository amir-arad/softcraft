/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import 'react-svg-radar-chart/build/css/index.css';

import { FONT_FAMILY_ROOT, PALETTE_PRIMARY, PALETTE_SECONDARY, PALETTE_TEXT } from '../theme';

import RadarChart from 'react-svg-radar-chart';
import { Veca } from '../model';
import { jsx } from '@emotion/react';
import { useMemo } from 'react';

export type VecaProps = {
    value: Veca;
    size: number;
};
const captions = {
    v: 'Variance',
    e: 'Entropy',
    c: 'Cohesion',
    a: 'Analysis',
};
const captionProps = {
    className: '',
    textAnchor: 'middle',
    fontSize: 20,
    style: {
        fontFamily: FONT_FAMILY_ROOT,
        textShadow: 'none',
        fill: PALETTE_TEXT,
    },
};
const axisProps = {
    stroke: PALETTE_SECONDARY,
    strokeWidth: 1,
    opacity: 0.5,
};
export function VecaBig({ value, size }: VecaProps) {
    const [v, e, c, a] = value;
    const options = useMemo(
        () => ({
            scales: 0,
            rotation: -45,
            // setViewBox: (options: ChartOptionsProps) =>
            //     `-${options.captionMargin} 0 ${options.size + options.captionMargin * 2} ${options.size}`,
            captionProps: () => captionProps,
            axisProps: () => axisProps,
            shapeProps: () => ({
                className: 'shape',
                children: <title>{'V' + v + ' E' + e + ' C' + c + ' A' + a}</title>,
            }),
        }),
        [v, e, c, a]
    );
    const max = Math.max(v, e, c, a, 1) * 1.1;
    const data = useMemo(
        () => [
            {
                data: {
                    v: v / max,
                    e: e / max,
                    c: c / max,
                    a: a / max,
                },
                meta: { color: PALETTE_PRIMARY },
            },
        ],
        [v, e, c, a, max]
    );
    return <RadarChart size={size} options={options} captions={captions} data={data} />;
}
