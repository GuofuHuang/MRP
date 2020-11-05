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

let IconnextM: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M769.792 476.032 416.48 125.92c-18.848-18.656-49.216-18.528-67.872 0.32-18.656 18.816-18.528 49.216 0.32 67.872l319.456 316.576-318.176 321.056c-18.656 18.816-18.528 49.216 0.32 67.872 9.344 9.28 21.568 13.92 33.792 13.92 12.352 0 24.704-4.736 34.08-14.208l350.112-353.312c0.512-0.512 0.672-1.248 1.184-1.792 0.128-0.128 0.288-0.16 0.416-0.288C788.736 525.088 788.64 494.688 769.792 476.032z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconnextM.defaultProps = {
  size: 18,
};

IconnextM = React.memo ? React.memo(IconnextM) : IconnextM;

export default IconnextM;
