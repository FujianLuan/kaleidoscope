import React from "react";
import { View, Text } from "@tarojs/components";
import { NewsItem } from './news-item'

import './news-list.scss'

export interface NewsItemType {
    id: string,
    title: string
}

export interface Props {
    newsData: Array<NewsItemType>,
    loading: boolean
}

class NewsList extends React.Component<Props, object> {
    static defaultProps = {
        newsData: [],
        loading: true
    }

    render() {
        const { loading, newsData } = this.props;

         if(loading) {
            //  return <Loading/>
         }

        const items = newsData.map((item, index) => {
            return (
                <NewsItem
                    key={item.id}
                    title={item.title}
                />
            )
        })

        return (
            <View className="list">
                {items}
            </View>
        )
    }
}

export { NewsList }