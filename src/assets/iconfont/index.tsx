/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import Iconplus from './Iconplus';
import IconiconXinyongXianxingJijin129 from './IconiconXinyongXianxingJijin129';
import Iconcategory from './Iconcategory';
import Iconme from './Iconme';
import Iconme1 from './Iconme1';
import Iconeditor from './Iconeditor';
import IconnextM from './IconnextM';
import Iconlike from './Iconlike';
import Iconhome from './Iconhome';

export type IconNames = 'plus' | 'icon_xinyong_xianxing_jijin-129' | 'category' | 'me' | 'me1' | 'editor' | 'next-m' | 'like' | 'home';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'plus':
      return <Iconplus key="1" {...rest} />;
    case 'icon_xinyong_xianxing_jijin-129':
      return <IconiconXinyongXianxingJijin129 key="2" {...rest} />;
    case 'category':
      return <Iconcategory key="3" {...rest} />;
    case 'me':
      return <Iconme key="4" {...rest} />;
    case 'me1':
      return <Iconme1 key="5" {...rest} />;
    case 'editor':
      return <Iconeditor key="6" {...rest} />;
    case 'next-m':
      return <IconnextM key="7" {...rest} />;
    case 'like':
      return <Iconlike key="8" {...rest} />;
    case 'home':
      return <Iconhome key="9" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
