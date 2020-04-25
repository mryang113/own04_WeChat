// components/NavHeader/NavHeader.js
// 组件使用需要在index.json文件里配置
Component({

  //  组件的属性列表 ===> 等同于Vue中的props
  properties: {
    title:{
      type: String, //多个可以写对象
      value: '我是默认的title值'
    },
    nav:{
      type: String, 
      value: ''
    }
  },
  data: {

  },

  // 组件的方法列表
  methods: {

  }
})
