// Type definitions for react-svg-radar-chart 1.2
// Project: https://github.com/Spyna/react-svg-radar-chart
// Definitions by: Lukas Tutkus <https://github.com/luksys5>
//                 Alberto Francesco Motta <https://github.com/afmotta>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 3.5

declare module 'react-svg-radar-chart' {
    import * as React from 'react';
    export interface ChartData {
        data: {
            [value: string]: number;
        };
        meta: { color: string };
    }

    export interface ChartOptionsProps {
        /**
         * set size
         *
         * overwritten by size prop on component
         * @default 300
         */
        size?: number | undefined;
        /**
         * show axes
         * @default true
         */
        axes?: boolean | undefined;
        /**
         * show scale circles
         * @default 3
         */
        scales?: number | undefined;
        /**
         * show captions
         * @default true
         */
        captions?: boolean | undefined;
        /**
         * set caption margin
         * @default 10
         */
        captionMargin?: number | undefined;
        /**
         * show dots
         * @default false
         */
        dots?: boolean | undefined;
        /**
         * where on the axes are the captions
         * @default 1.2
         */
        zoomDistance?: number | undefined;
        /** custom viewBox */
        setViewBox?: ((options: ChartOptionsProps) => string) | undefined;
        /** custom smoothing fn */
        smoothing?: ((points: ReadonlyArray<[]>) => string) | undefined;
        /** custom axis props */
        axisProps?: (() => JSX.IntrinsicElements['svg']) | undefined;
        /** custom scale props */
        scaleProps?: (() => JSX.IntrinsicElements['svg']) | undefined;
        /** custom shape props */
        shapeProps?: (() => JSX.IntrinsicElements['path']) | undefined;
        /** rotation */
        rotation: LargeNumberLike;
        /** custom captions props */
        captionProps?: (() => JSX.IntrinsicElements['text']) | undefined;
        /** custom dot props */
        dotProps?: (() => JSX.IntrinsicElements['svg']) | undefined;
    }

    export interface ChartProps {
        captions: {
            [key: string]: string;
        };
        data: ChartData[];
        size: number;
        options?: ChartOptionsProps | undefined;
    }

    export default class RadarChart extends React.Component<ChartProps> {}
}
