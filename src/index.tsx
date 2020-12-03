import React from 'react';
import {Alert} from 'react-native';
import store from '@/config/dva';
import '@/config/http';
import {Provider} from 'react-redux';
import Navigator from '@/navigator/index';
import {MenuProvider} from "react-native-popup-menu";
// export default Navigator;

export default class extends React.Component {
  onPress = () => {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      // <View>
      //   <Text onPress={this.onPress}>guofuasdfadsfwhat</Text>
      //   <Text onPress={this.onPress}>guofuasdfadsfwhat</Text>
      //   <Text onPress={this.onPress}>guofuasdfadsfwhat</Text>
      //   <Text onPress={this.onPress}>guofuasdfadsfwhat</Text>
      //   <Text onPress={this.onPress}>guofuasdfadsfwhat</Text>
      //   <Text onPress={this.onPress}>guofuasdfadsfwhat</Text>
      //   <Text onPress={this.onPress}>guofuasdfadsfwhat</Text>
      //   <Text onPress={this.onPress}>bushiba</Text>
      // </View>

      <Provider store={store}>
        <MenuProvider>
          <Navigator />
        </MenuProvider>
      </Provider>
    );
  }
}
