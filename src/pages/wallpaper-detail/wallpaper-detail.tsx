import { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, ScrollView, Image, Button } from "@tarojs/components";
import * as API from '../../api/wallpaper'

import './wallpaper-detail.scss'

export default class WallpaperDetail extends Component<{},{link:string}>{
    constructor() {
        super(arguments)
        this.handleClickDownload = this.handleClickDownload.bind(this)
    }
    state = {
        link: ''
    }
    componentWillMount() {
        console.log(getCurrentInstance().router?.params.link);
        
        this.setState({
            link: (getCurrentInstance().router?.params.link) as string
        })
    }

    handleClickDownload() {
        Taro.downloadFile({
            url:this.state.link,
            success(res){
                console.log(res);
                Taro.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success(ress) {
                        console.log(ress);
                        
                    }
                })
                
            }
        })
    }

    render() {
        return (
            <View className='wallpaper-detail'>
                <Image className='wallpaper-detail__image' mode='widthFix' src={this.state.link} />
                <View className='wallpaper-detail__button' onClick={this.handleClickDownload}>下载</View>
            </View>
        )
    }
}