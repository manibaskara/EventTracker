import React from 'react';
import {View, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {onNameChangeAction, loginAction} from '../store/actions/loginActions';
import {Appbar, Button} from 'react-native-paper';

const LoginScreen = ({login, loginApi, onNameChange}) => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Login" />
      </Appbar.Header>
      <SafeAreaView style={styles.content}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Name"
          value={login.name}
          onChangeText={(text) => onNameChange(text)}
        />
        <Button style={styles.buttonStyle} onPress={() => loginApi(login.name)}>
          {'LOGIN'}
        </Button>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {alignItems: 'center', flex: 1, justifyContent: 'center'},
  textInput: {width: '80%', borderWidth: 1, borderColor: 'black', padding: 12},
  outline: {borderWidth: 1, borderColor: 'black', width: '50%'},
  buttonStyle: {marginTop: 12, padding: 12},
});

const mapStatesToProp = (state) => {
  return {login: state.login};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (name) => {
      dispatch(onNameChangeAction(name));
    },
    loginApi: (name) => {
      dispatch(loginAction(name));
    },
  };
};

export default connect(mapStatesToProp, mapDispatchToProps)(LoginScreen);
