// 异步控制并发数量
function limitRequest(urls, limit = 3) {
  return new Promise((resolve, reject) => {
    const len = urls.length
    let count = 0
    let newLimit = limit

    while (newLimit > 0) {
      start()
      newLimit -= 1
    }

    function start(){
      const url = urls.shift()
      if(url) {
        console.log('---------',url);
        mockFetch(url).then(result => {
          console.log(result);
        }).catch(err => {
          console.log(err);
        }).finally(() => {
          if(count === len - 1) {
            resolve()
          } else {
            count++
            start()
          }
        })
      }
    }
  })
}

const mockFetch = url => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(Math.random() < 0.15) {
        reject(`fetch err: ${url}`)
      } else {
        resolve(`fetch ok: ${url}`)
      }
    }, Math.random() * 1000 * 3)
  })
}

const urls = ['http://www.baidu.com', 'http://www.huazite.cn', 'http://www.google.com', 'http://www.so.com', 'http://www.sogou.com']
limitRequest(urls).then(res => {
  console.log('ok');
})