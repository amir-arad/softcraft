import { AppStateDecorator } from '../hooks/app-state';
import { AuthDecorator } from '../hooks/authentication';
import { Meta } from '@storybook/react';
import { Page } from './page';
import React from 'react';
import { StyleDecorator } from '../style';
import { Text } from '@arwes/core';
import { stateBuilder } from '../model';

export default {
    title: 'Component/Page',
    component: Page,
    decorators: [
        AppStateDecorator(stateBuilder().user({ id: '1', name: 'alice' }).user({ id: '2', name: 'bob' }).build()),
        AuthDecorator('1'),
        StyleDecorator,
    ],
} as Meta;

export const TextHeavy = (): JSX.Element => (
    <Page>
        <header>
            <Text as="h1">Lorem Ipsum</Text>
        </header>
        <div>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </Text>
            <div dir="rtl">
                <Text as="p">
                    לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולהע צופעט למרקוח איבן איף, ברומץ כלרשט
                    מיחוצים. קלאצי סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם
                    גדדיש. קוויז דומור ליאמום בלינך רוגצה. לפמעט להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך.
                    הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת
                    יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק.
                </Text>
            </div>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </Text>
        </div>
    </Page>
);
