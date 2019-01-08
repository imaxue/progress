import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text, Image,
  TextInput,
  TouchableOpacity,
} from 'react-native'

export default class App extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor (props) {
    super()
    this.state = {
      account: '',
      password: '',
    }
  }

  login = () => {
    if(this.state.account !== '15901548418' && this.state.password !== '111111') {
      return
    }
    this.props.navigation.navigate('App')
  }

  render () {
    return (
      <View>
        <Image source={require('./img/home-bg.jpeg')}
               style={styles.bgImage}>
        </Image>

        <View style={styles.form}>
          <Text style={styles.formItemTitle}>账号</Text>
          <KeyboardAvoidingView behavior="padding"
                                style={styles.inputView}>
            <TextInput style={styles.formInput}
                       onChangeText={(account) => this.setState({ account })}
                       value={this.state.account}/>
          </KeyboardAvoidingView>
          <Text style={styles.formItemTitle}>密码</Text>
          <KeyboardAvoidingView behavior="padding"
                                style={styles.inputView}>
            <TextInput style={styles.formInput}
                       secureTextEntry={true}
                       onChangeText={(password) => this.setState({ password })}
                       value={this.state.password}/>
          </KeyboardAvoidingView>
          <TouchableOpacity style={styles.formButton}
                            onPress={this.login}>
            <Text style={styles.buttonText}>登录</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bgImage: {
    height: 400,
    width: '100%',
    // resizeMode: 'contain',
    backgroundColor: 'red',
    marginTop: 0,
  },
  form: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center'
  },
  formItemTitle: {
    fontSize: 24,
  },
  inputView: {
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  formInput: {
    textAlign: 'center',
  },
  formButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 40,
    backgroundColor: '#00b3ff'
  },
  buttonText: {
    color: '#fff',
  }

})