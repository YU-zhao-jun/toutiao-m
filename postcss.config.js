// postcss运行在node.js中，所以使用node.js的语法module 而不是 import export
module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      //  rootValue：表示根元素字体大小，它会根据根元素大小进行单位转换
      // propList 用来设定可以从 px 转为 rem 的属性
      // 例如 * 就是所有属性都要转换，width 就是仅转换 width 属性
      // 按照你的设计稿来
      // 750px 宽的设计稿 rootValue:750 / 10 = 75px
      // 375px 宽的设计稿 rootValue:375 / 10 = 37.5px
      // 因为 Vant 是基于逻辑像素 375 写的，所以如果你设置为 75 的话，Vant 的样式就小了一半。
      // 所以如果设置为 37.5 的话，Vant 的样式是没有问题的，但是我们在测量设计稿的时候都必须除2才能使用，否则就会变得很大。
      rootValue: 37.5,
      propList: ['*']
    }
  }
}