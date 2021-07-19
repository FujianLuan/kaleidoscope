import { Component } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { NewsList } from './components/news-list'
import * as API from '../../api/news'

import './news.scss'

export default class News extends Component {
    constructor() {
        super({})
    }

    config = {
        navigationBarTitleText: '关注信息'
    }

    state = {
        loading: true,
        newsData: []
    }

    async componentDidMount() {
        try {
            const res = await API.getNewsData();
            this.setState({
                loading: false,
                newsDate: res.data
            })
        } catch (error) {
            console.log(error);
            Taro.showToast({
                title: 'Request failed'
            })
        }
    }

    render() {
        const { loading, newsData } = this.state;
        return (
            <View className="news">
                <NewsList
                    newsData = { newsData }
                    loading = { loading }
                />
            </View>
        )
    }
}