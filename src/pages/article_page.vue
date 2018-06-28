<template>
  <div class="article_background">
    <headerView class="header" :isMobile="isMobile"/>
    <div :class="[isMobile?'box_mobile':'box']">
      <div class="title">{{contentItem.title}}</div>
      <div class="content" v-html="contentItem.content"></div>
    </div>

  </div>
</template>

<script>
  import headerView from '../components/home_header'
  import ajax from '../Utils/NetWork'

  export default {
    name: "article_page",
    data() {
      return {
        contentItem: {},
        contentId: '',
        isMobile:false
      }
    },
    components: {
      headerView
    },
    methods: {
      loadData() {
        var that = this;
         ajax.get('/api/getcontent?id='+this.contentId,function (res) {
           console.log(res)
           that.contentItem = res.data
         })
      },
      _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      }
    },
    mounted() {
      this.contentId = this.$route.params.id
      this.isMobile=this._isMobile();
      this.loadData()
      var that = this;
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight;
          window.fullWidth = document.documentElement.clientWidth;
          that.fullHeight = window.fullHeight;
          that.fullWidth = window.fullWidth;
          if(that.fullHeight<700||that.fullWidth<1000){
            that.isMobile = true
          }else {
            that.isMobile = false
          }
        })()
      }
    }
  }
</script>

<style scoped>
  .article_background {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .header {
    position: absolute;
    top: 4%;
    right: 6%;
  }

  .box {
    /*margin-top: 8%;*/
    width: 70%;
    padding: 30px;
    word-break:break-all;
    margin-bottom: 10%;
    margin-top: 10%;
    box-shadow: 5px 5px 15px 0px #666666
  }

  .box_mobile{
    width: 80%;
    padding: 30px;
    word-break:break-all;
    margin-bottom: 10%;
    margin-top: 20%;

  }

  .box_mobile .title {
    font-size: 30px;
  }

  .box .title {
    font-size: 50px;
  }

  .content {
    width: 100%;
    word-break:break-all;
    text-align: left;
  }
</style>
