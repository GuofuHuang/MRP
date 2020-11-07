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

let Iconcategory: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M896 682.666667a42.666667 42.666667 0 0 0-42.666667-42.666667h-85.333333v-85.333333a85.333333 85.333333 0 0 0-85.333333-85.333334h-128V384h85.333333a42.666667 42.666667 0 0 0 42.666667-42.666667V170.666667a42.666667 42.666667 0 0 0-42.666667-42.666667H384a42.666667 42.666667 0 0 0-42.666667 42.666667v170.666666a42.666667 42.666667 0 0 0 42.666667 42.666667h85.333333v85.333333H341.333333a85.333333 85.333333 0 0 0-85.333333 85.333334v85.333333H170.666667a42.666667 42.666667 0 0 0-42.666667 42.666667v170.666666a42.666667 42.666667 0 0 0 42.666667 42.666667h256a42.666667 42.666667 0 0 0 42.666666-42.666667v-170.666666a42.666667 42.666667 0 0 0-42.666666-42.666667H341.333333v-85.333333h341.333334v85.333333h-85.333334a42.666667 42.666667 0 0 0-42.666666 42.666667v170.666666a42.666667 42.666667 0 0 0 42.666666 42.666667h256a42.666667 42.666667 0 0 0 42.666667-42.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconcategory.defaultProps = {
  size: 18,
};

Iconcategory = React.memo ? React.memo(Iconcategory) : Iconcategory;

export default Iconcategory;
