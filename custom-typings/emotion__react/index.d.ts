import '@emotion/react';

import { ArwesTheme } from '@arwes/core';
declare module '@emotion/react' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Theme extends ArwesTheme {}
}
