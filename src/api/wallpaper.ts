import request, { Methods } from "../utils/request";

export function getWallPaperList(data) {
    //?r=paperapi/index/list&client_version=2&source=Pexels&limit=20&paper_id=0
    return request({
        // url: '/app/index.php',//H5下会有跨域问题
        url: 'http://wallpaper-api.smartisan.com/app/index.php',
        data,
    })
}