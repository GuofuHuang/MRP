import {StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";
import {Formik, Field, Form} from "formik";
import { Input } from 'react-native-elements';
import Touchable from "@/components/Touchable";
import IconFont from "@/assets/iconfont";
import {connect} from "react-redux";

const connector = connect();

const initialValues = {
  name: ''
};

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

class AddProductCategory extends React.Component<any, any> {
  state = {
    level: this.props.route.params.level,
    parentCategoryId: this.props.route.params.parentCategoryId
  }
  onSubmit = (values: any) => {
    const {dispatch, route} = this.props;
    dispatch({
      type: 'productCategory/add',
      payload: {
        ...values,
        ...route.params
      },
    });
  };

  render() {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.onSubmit}>
        {({handleSubmit}) => {
          return (
            <View style={{margin: 5}}>
              <Field
                name="name"
                placeholder="请输入类别名称"
                label='名称'
                autoCapitalize="none"
                component={MyInput}
              />
              <Touchable
                onPress={handleSubmit}
                style={styles.loginBtn}>
                <Text style={styles.loginBtnText}>保存</Text>
              </Touchable>
            </View>
          );
        }}
      </Formik>
    )
  }
}


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
export default connector(AddProductCategory);
