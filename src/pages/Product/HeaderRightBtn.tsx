import React from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {Alert, Button, Text, View} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger} from 'react-native-popup-menu';
import AntDesign from 'react-native-vector-icons/AntDesign';


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
      <View>
        <Menu>
          <MenuTrigger>
            <AntDesign name='plus' size={25}/>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => Alert.alert(`Save`)} text='Save' />
            <MenuOption onSelect={() => Alert.alert(`Delete`)} >
              <Text style={{color: 'red'}}>Delete</Text>
            </MenuOption>
            <MenuOption onSelect={() => Alert.alert(`Not called`)} disabled={true} text='Disabled' />
          </MenuOptions>
        </Menu>
      </View>
    );
  }
}

export default connector(HeaderRightBtn);
