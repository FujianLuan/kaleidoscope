import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import * as API from '../../api/wallpaper'

import './wallpaper.scss'

interface IWallpaperItem {
    // smartisan's data type
    id?: string,
    title?: string,
    sub_title?: string,
    author?: string,
    url?: string,
    created_time?: string,
    publiced_time?: string,
    source?: string,
    width?: string,
    height?: string,
    desc?: string,
    sour_url?: string,

}
interface IState {
    wallpaperData: IWallpaperItem[],
    wallpaperSourceSmartisan: Array<string>,
    source: string,
    sourceSelected: boolean,
    pageNo: number,
    pageSize: number
}

enum E_SMARTISAN_SOURCE {
    Artand = 'Artand',
    Unsplash = 'Unsplash',
    Minimography = 'Minimography',
    Pexels = 'Pexels',
    Magdeleine = 'Magdeleine',
    Fancycrave = 'Fancycrave',
    Snapwiresnaps = 'Snapwiresnaps',
    Memento = 'Memento',
    壁纸摄影大赛精选 = '壁纸摄影大赛精选',
    Smartisan = 'Smartisan',
    '“足迹系列”壁纸' = '“足迹系列”壁纸',
    纹理与材质壁纸 = '纹理与材质壁纸'
}

export default class Wallpaper extends Component<{}, IState> {

    state: IState = {
        wallpaperData: [],
        wallpaperSourceSmartisan: [
            'Artand',
            'Unsplash',
            'Minimography',
            'Pexels',
            'Magdeleine',
            'Fancycrave',
            'Snapwiresnaps',
            'Memento',
            '壁纸摄影大赛精选',
            'Smartisan',
            '“足迹系列”壁纸',
            '纹理与材质壁纸'
        ],
        source: E_SMARTISAN_SOURCE.壁纸摄影大赛精选,
        sourceSelected: false,
        pageNo: 0,
        pageSize: 8
    }

    async componentWillMount() {
        try {

            let res = await API.getWallPaperList({
                r: encodeURI('paperapi/index/list'),
                client_version: 2,
                source: this.state.source,
                limit: this.state.pageSize,
                paper_id: this.state.pageNo
            })
            res = JSON.parse(res)
            this.setState(state => {
                return {
                    wallpaperData: state.wallpaperData.concat(res.data)
                }
            })

        } catch (error) {
            console.log(error);
            Taro.showToast({
                title: 'Request failed'
            })
        }

    }

    handleClickSourceChange() {
        let _this = this
        return function () {
            _this.setState((state, props) => {
                return {
                    sourceSelected: !state.sourceSelected
                }
            })
        }
    }

    handleClickOption(source:string) {
        let _this = this
        return function () {
            if(_this.state.source === source){
                _this.handleClickSourceChange()()
                return;
            }
            console.log(source);
            _this.setState((state, props) => {
                return {
                    source
                }
            }, function () {
                console.log(_this.state);
                this.setState({
                    wallpaperData: [],
                    pageNo: 0
                },function(){
                    _this.componentWillMount()
                    _this.handleClickSourceChange()()
                })
            })

        }
    }

    handleScrollToLower() {
        let _this = this
        if (this.state.wallpaperData.length) {
            let pageNo = +(this.state.wallpaperData[this.state.wallpaperData.length - 1].id as string)
            return function () {
                _this.setState({
                    pageNo
                }, function () {
                    this.componentWillMount()
                })
            }
        }
    }

    handleClickImage(url) {
        return function(){
            Taro.navigateTo({
                url: `/pages/wallpaper-detail/wallpaper-detail?link=${encodeURI(url)}`
            })
        }
    }

    render() {
        let dat = this.state.wallpaperData

        const items = dat.map(item => {
            return (
                // <View className='wallpaper__item' key={item.id}>
                <Image onClick={this.handleClickImage(item.url)} className='wallpaper__item' key={item.id} mode='widthFix' src={item.url as string} />
                // </View>
            )
        })
        return (
            <View className='wallpaper'>
                <View className='wallpaper__nav'>
                    <View className='wallpaper__source' onClick={this.handleClickSourceChange()}>{this.state.source}</View>
                    {
                        this.state.sourceSelected &&
                        <View className='wallpaper__select'>
                            {
                                this.state.wallpaperSourceSmartisan.map(item => {
                                    return (
                                        <View key='item' className='wallpaper__option' onClick={this.handleClickOption(item)}>{item}</View>
                                    )
                                })
                            }

                        </View>
                    }


                </View>
                <ScrollView
                    className='wallpaper__list'
                    scrollY
                    scrollWithAnimation
                    enableBackToTop
                    enableFlex
                    onScrollToLower={this.handleScrollToLower()}
                >
                    {items}
                </ScrollView>
            </View>
        )
    }
}