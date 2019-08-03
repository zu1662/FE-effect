/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-08-03 15:18:24
 * @LastEditTime: 2019-08-03 16:13:14
 * @Description:  静态图片资源加载类
 */
class StaticResourcesUtil {
  constructor () {
    // 所有的图片对象
    this.images = {}
    // 已经加载的数目
    this.alreadyLoadNum = 0
    // 总条目数
    this.allImagesNum = 0
  }

  // 加载单个图片
  loadImage (imgUrl, callback) {
     // 创建图片对象
     const image = new Image()
     // 设置图片对象的地址
     image.src = imgUrl
     // 图片加载完成
     image.onload = () => {
       // 回调传进的函数，返回当前数据
       callback(image)
     }
  }

  // 加载所有图片资源
  loadImageArray (jsonPath, callback) {
    // 使用ajax进行json的数据请求
    const xhr = new XMLHttpRequest()

    // readyState属性发生变化时调用回调
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {  // 请求完成
          // 请求回来的 json 文件内的文本数据转化为 json对象
          const jsonObj = JSON.parse(xhr.responseText)

          // 根据json设置总条目数 
          this.allImagesNum = jsonObj.images.length

          // 循环数据，请求每个图片
          jsonObj.images.forEach(item => {
            // 加载图片资源
            this.loadImage(item.url, image => {
              this.alreadyLoadNum ++
              this.images[item.name] = image
              // 回调传进的函数，返回当前数据
              callback(this.alreadyLoadNum,  this.allImagesNum, this.images)
            })
          })

        }
      }
    }

    // 发起ajax请求，设置为 true 为同步请求
    xhr.open('get', jsonPath, true)
    xhr.send(null)
  }
}

export default StaticResourcesUtil
