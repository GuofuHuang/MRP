import React from "react";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation} from '@/navigator/index';
import {FlatList, SafeAreaView, StyleSheet, ScrollView, Text, View, StatusBar} from "react-native";
import Touchable from "@/components/Touchable";
import IconFont from "@/assets/iconfont";
import {IconNames} from "@/assets/iconfont";
import {IModule} from "@/pages/Home/index";
import {navigate} from "@/utils/index";

const mapStateToProps = ({home}: RootState) => {
  return {
    home: home
  };
};

const connector = connect();

type ModelState = ConnectedProps<typeof connector>;
// interface IProps extends ModelState {
//   navigation: RootStackNavigation;
//   namespcae: string;
// }

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

interface IProps extends ModelState {
  module: IModule;
}

class ModuleContainer extends React.Component<IProps, any> {

  goTo = () => {
    const {module, dispatch} = this.props;
    console.log('goto', 'afasd', module.namespace);

    dispatch({
      type: module.namespace + '/loadCategories',
      payload: {
        component: module.component,
        parentCategoryId: null,
        level: 0
      }
    })
    // navigate(module.namespace);
  }

  render() {
    const {module} = this.props;

    return (
      <View style={styles.container}>
        <Touchable onPress={this.goTo} style={styles.center}>
          <IconFont name={module.icon} color={'red'} size={30} />
          <Text>{module.name}</Text>
        </Touchable>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  center: {
    alignItems: 'center',
  }
});

export default connector(ModuleContainer);
