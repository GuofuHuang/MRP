import { SearchBar } from 'react-native-elements';
import React from "react";
import {Text, View} from "react-native";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import HeaderRightBtn from "./HeaderRightBtn";
import {connect} from "react-redux";

const connector = connect();

class Product extends React.Component<any, any> {
  state = {
    search: '',
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => <HeaderRightBtn onSubmit={this.onSubmit} />
    });
  }

  onSubmit = () => {

  }

  updateSearch = (search: any) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      // <>
      //   <IconAntDesign name='stepforward' size={50} />
      // </>
      // <View>
      //   <Text>aasdf</Text>
      // </View>
      <SearchBar
        platform='ios'
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}

export default connector(Product);
