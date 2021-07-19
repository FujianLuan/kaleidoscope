

import Taro from "@tarojs/taro";

interface RequestOptions {
    loading?: boolean,
    url: string,
    data?: object,
    header?: object,
    method?: keyof Taro.request.method
}

const tools = {
    beforeRequest(options: RequestOptions) {
        if (options.loading) {
            Taro.showLoading({
                title: 'Loading...'
            })
        }
        return options;
    },
    afterResponse(options: RequestOptions, response: any) {
        if (options.loading) {
            Taro.hideLoading()
        }
        return response.data
    }
}
export default function request(options: RequestOptions): Promise<any> {
    return new Promise((resolve, reject) => {
        const opt = tools.beforeRequest(options);
        let { url, data, header, method } = opt
        console.log(header);
        
        Taro.request({
            url,
            data,
            header,
            method,
            dataType:'其他',
            mode:'cors',
            success(res) {
                // console.log('success',res);
                const _res = tools.afterResponse(opt, res);
                resolve(_res);
            },
            fail(res) {
                // console.log(res,'fail res');
            },
            complete(res) {
                // console.log(res,'complete res');
            }

        })
    })
}

export const Methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}