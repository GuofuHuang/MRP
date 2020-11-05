/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import Iconme from './Iconme';
import Iconme1 from './Iconme1';
import Iconeditor from './Iconeditor';
import IconnextM from './IconnextM';
import Iconlike from './Iconlike';
import Iconhome from './Iconhome';

export type IconNames = 'me' | 'me1' | 'editor' | 'next-m' | 'like' | 'home';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'me':
      return <Iconme key="1" {...rest} />;
    case 'me1':
      return <Iconme1 key="2" {...rest} />;
    case 'editor':
      return <Iconeditor key="3" {...rest} />;
    case 'next-m':
      return <IconnextM key="4" {...rest} />;
    case 'like':
      return <Iconlike key="5" {...rest} />;
    case 'home':
      return <Iconhome key="6" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
