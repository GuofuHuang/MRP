import React from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {Button} from "react-native";

// const mapStateToProps = ({category}: RootState) => {
//   return {
//     isEdit: category.isEdit,
//   };
// };

const connector = connect();

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  onSubmit: any;
}

class HeaderRightBtn extends React.Component<IProps> {
  render() {
    const {onSubmit} = this.props;
    return (
      <HeaderButtons>
        <Item title={'保存'} onPress={onSubmit} />
      </HeaderButtons>
    );
  }
}

export default connector(HeaderRightBtn);
