/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let Iconme: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M963.764706 963.764706v60.235294H60.235294v-60.235294c0-232.869647 202.270118-421.647059 451.764706-421.647059 249.494588 0 451.764706 188.777412 451.764706 421.647059zM752.941176 240.941176A240.941176 240.941176 0 1 1 271.058824 240.941176a240.941176 240.941176 0 0 1 481.882352 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconme.defaultProps = {
  size: 18,
};

Iconme = React.memo ? React.memo(Iconme) : Iconme;

export default Iconme;
