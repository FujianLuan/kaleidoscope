import React from "react";
import Taro, { eventCenter } from "@tarojs/taro";
import { View, Text, Navigator, Image } from "@tarojs/components";
import * as API from '../../../api/news'
import { NewsItemType } from './news-list'

class NewsItem extends React.Component<NewsItemType, object> {
    constructor(parameters: NewsItemType) {
        super(parameters)
    }

    handleClickNewsItem = () => {
        Taro.navigateTo({
            url: '/pages/news-detail/news-detail'
        })
    }

    render() {
        const { title } = this.props
        return (
            <View className="item" onClick={this.handleClickNewsItem}>
                <Text className="item-title">{title}</Text>
            </View>
        )
    }
}

export { NewsItem }