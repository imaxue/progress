import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

export default class App extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor (props) {
    super()
    this.state = {
      weather: '',
      temperature: '',
      time:'',
    }
  }

  componentDidMount = () => {
    let request = new XMLHttpRequest()
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 200) {
        let res = JSON.parse(request.responseText)
        let date = new Date();

        this.setState({
          weather: res.lives[0].weather,
          temperature: res.lives[0].temperature,
          time: date.getMonth() + 1 + '月' + date.getDate() + '日'
        })
      } else {
        console.warn('error')
      }
    }

    request.open('GET', 'https://restapi.amap.com/v3/weather/weatherInfo?key=9b3837a3a859797e20e2dda1ceb31ce0&city=110000&extensions=base')
    request.send()
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 100}}>
          <Text style={styles.weatherText}>天气: {this.state.weather}</Text>
          <Text style={styles.weatherText}>温度: {this.state.temperature}</Text>
          <Text style={styles.weatherText}>当前时间: {this.state.time}</Text>


        </View>

        <View style={styles.workList}>
          <View style={styles.workItem}>
            <Text>工单任务</Text>
          </View>
        </View>

        <View style={styles.btnBar}>
          <TouchableOpacity style={styles.btn}>
            <Text>地图</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text>工作</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text>我的</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    alignItems: 'center'
  },
  weatherText: {
    fontSize: 18,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workList: {
    marginTop: 200,

    width:'100%',
    height:'100%',
  },
  workItem: {
    width: 150,
    height: 150,
    borderColor:'#000',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems:'center',
  }

})