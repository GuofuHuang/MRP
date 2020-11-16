import React from "react";
import {connect} from "react-redux";
import {StyleSheet, Text, View} from "react-native";
import HeaderRightBtn from "@/pages/ProductCategory/HeaderRightBtn";
import {Field, Formik} from "formik";
import Touchable from "@/components/Touchable";
import {Input} from "react-native-elements";
import IconFont from "@/assets/iconfont";

const connector = connect();

const MyInput = ({field, form, ...props }: any) => {
  return <Input
    {...props}
    onChangeText={form.handleChange(field.name)}
    onBlur={form.handleBlur(field.name)}
    value={form.values[field.name]}
    leftIcon={
      <IconFont
        name={props.icon}
        size={20}
        color='black'
      />
    }
  />
}

class CategoryDetail extends React.Component<any, any> {
  state = {
    name: this.props.route.params.name
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => <HeaderRightBtn onSubmit={this.onSubmit12} />,
    });
  }

  onSubmit12 = () => {
    const {dispatch} = this.props;
    const {name} = this.state;
    console.log('dispatch', name, values);
  };


  render() {

    const {name} = this.state;
    const value = {
      name: name
    };
    return (
      <Formik
        initialValues={value}
        onSubmit={this.onSubmit}>
        {() => {
          return (
            <View style={{margin: 5}}>
              <Field
                name="name"
                placeholder="请输入类别名称"
                label='名称'
                autoCapitalize="none"
                component={MyInput}
              />
            </View>
          );
        }}
      </Formik>
    )
  }}

const styles = StyleSheet.create({
  logo: {
    color: '#ff4000',
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    marginTop: 40,
  },
  loginBtn: {
    marginTop: 40,
    margin: 10,
    height: 40,
    borderRadius: 20,
    borderColor: '#ff4000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#ff4000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default connector(CategoryDetail);
