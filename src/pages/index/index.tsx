import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button, Navigator } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  state = {
    menus: [
      {
        title: '壁纸',
        icon: '',
        url:'/pages/wallpaper/wallpaper'
      },
      {
        title: '头条',
        icon: '',
        url:''
      },
    ]
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleClickWallPaperButton(url) {
    return function(e) {
      if(url) {
        Taro.navigateTo({
          url
        })
      }else{
        e.preventDefault();
        return;
      }
      
    }
  }

  render() {
    return (
      <View className='index'>
        {
          this.state.menus.map((item) => {
            return (
              <View key='item.title' className='index__menu' onClick={this.handleClickWallPaperButton(item.url)}>
                <Text className='index__menu-title'>{item.title}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}
