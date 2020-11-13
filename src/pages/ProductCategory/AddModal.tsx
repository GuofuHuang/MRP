import React, {Component, RefObject} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {Field, Formik} from "formik";
import Input from "@/components/Input";
import Touchable from "@/components/Touchable";
import {goBack} from "@/utils/index";
import * as Yup from "yup";

const connector = connect();

type ModelState = ConnectedProps<typeof connector>;
interface ModalVisible {
  visible: any;
}

interface IProps extends ModelState {
  modalVisible: boolean;
  childRef: any;
}

interface ProductCategory {
  name: string;
}

const initialValues = {
  name: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('请输入名称'),
});

class AddModal extends Component<IProps> {
  state = {
    modalVisible: this.props.modalVisible,
  };

  componentDidMount() {
    const { childRef } = this.props;
    childRef(this);
  }
  componentWillUnmount() {
    const { childRef } = this.props;
    childRef(undefined);
  }

  hideModal = () => {
    this.setState({modalVisible: false});
  };
  showModal = () => {
    this.setState({modalVisible: true});
  };

  onSubmit = (values: ProductCategory) => {
    const {dispatch} = this.props;
    // console.log('handle submit herer', values);
    dispatch({
      type: 'productCategory/add',
      payload: values,
    });
  };


  render() {
    const {modalVisible} = this.state;
    console.log('modal state1212', modalVisible);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>上级类别：无</Text>
            <Text style={styles.modalText}>名称：</Text>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={this.onSubmit}>
              {({handleSubmit}) => {
                return (
                  <View
                    style={{width: "100%"}}
                  >
                    <Field
                      name="name"
                      placeholder="请输入名称"
                      autoCapitalize="none"
                      component={Input}
                    />
                    <View style={styles.actionsContainer}>
                      <Touchable
                        onPress={handleSubmit}
                        style={styles.saveBtn}>
                        <Text style={styles.loginBtnText}>保存</Text>
                      </Touchable>
                      <Touchable
                        onPress={this.hideModal}
                        style={styles.cancelBtn}>
                        <Text style={styles.loginBtnText}>取消</Text>
                      </Touchable>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  loginBtnText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  saveBtn: {
    margin: 10,
    paddingHorizontal: 30,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtn: {
    margin: 10,
    paddingHorizontal: 30,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

export default connector(AddModal);
