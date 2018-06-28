<template>
  <div class="main">
    <div :class="[isMobile?'mainview_mobile':'mainview']" :style="{height:fullHeight+'px',marginTop:imgTop+'px'}">
      <headerView class="header" :isMobile="isMobile"/>
      <img src="../assets/background1.jpg" :style="{height:fullHeight+'px'}">
      <h1 :style="{top:fullHeight-180+imgTop+'px'}" v-if="currentCategory=='首页'">Peipei's Blog</h1>
      <h2 :style="{top:fullHeight-100+imgTop+'px'}" v-if="currentCategory=='首页'">ios developer</h2>
    </div>

    <menuview :categories="categories" class="menuview" :tap="tapCategory" :isMobile="isMobile"/>

    <div :class="[isMobile?'category_mobile':'category']">
      <p>博文分类：</p>
      <p>{{currentCategory}}</p>
    </div>

    <div class="loading" v-if="isloading">Loading...</div>
    <div :class="[isMobile?'content_mobile':'content']">
      <contentView class="view" v-for="(item,index) in contents" :key="index" :contentItem="item"/>
    </div>

    <div :class="[isMobile?'leave_msg_mobile':'leave_msg']">
      <p>留言区</p>
      <div>
        <textarea class="input_name" v-model="name" placeholder="input name"></textarea>
        <textarea class="input_message" v-model="message" placeholder="input message"></textarea>
        <button class="submit" @click="tapSubmit">提交</button>
      </div>
      <p>精选留言</p>
      <div class="sp_msg" v-for="(msg,index) in leaveMessage" v-if="msg.isSpecial">
        <div class="line"></div>
        <div class="nickname">昵称：<span>{{msg.name}}</span></div>
        <div class="message">留言：{{msg.message}}</div>
      </div>
    </div>

  </div>

</template>

<script>
  import ajax from '../Utils/NetWork'
  import menuview from '../components/categories_menu'
  import headerView from '../components/home_header'
  import contentView from '../components/content_view'

  export default {
    name: "home",
    data() {
      return {
        currentCategory: '首页',
        name: '',
        message: '',
        categories: [],
        menuTop: '',
        contents: [],
        fullHeight: document.documentElement.clientHeight,
        imgTop: 0,
        leaveMessage: [],
        isloading: false,
        isMobile: false,
        inputName:'d2423asda',
        inputMsg:''
      }
    },
    components: {
      menuview, headerView, contentView
    },
    methods: {
      loadData(category) {
        var that = this;
        that.isloading = true;
        that.contents = [];
        ajax.get('/getContent' + '?category=' + category, function (data) {
          that.categories = [];
          that.categories.push({name: '首页'});
          that.categories = that.categories.concat(data.data.categories);
          that.contents = data.data.contents;
          that.menuTop = 30 - that.categories.count * 2;
          that.isloading = false;
        });
        ajax.get('/api/getMsg', function (data) {
          that.leaveMessage = data.data;
        });
      },
      tapSubmit() {
        if(!this.name) {
          alert('请输入一个昵称');
          return;
        }
        if(!this.message){
          alert('请输入你的留言');
          return;
        }
        var data = {name: this.name, message: this.message};
        ajax.post('/api/leaveMsg', data, function (data) {
          console.log(data)
          //toast提示？
          location.reload()
        })
      },
      tapCategory(e) {
        this.imgTop = e._id ? (this.isMobile?-200: -500) : 0;
        this.loadData(e._id ? e._id : '');
        this.currentCategory = e.name;
      },
      _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      }

    },
    mounted() {
      this.isMobile = this._isMobile();
      this.loadData('');
      var that = this;
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight;
          window.fullWidth = document.documentElement.clientWidth;
          that.fullHeight = window.fullHeight;
          that.fullWidth = window.fullWidth;
          if (that.fullHeight < 700 || that.fullWidth < 1000) {
            that.isMobile = true
          } else {
            that.isMobile = false
          }
        })()
      }
    }
  }
</script>

<style scoped>

  .main {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mainview {
    width: 100%;
    background: -webkit-linear-gradient(left, #f7f7f7, #eeeeee);
  }

  .mainview_mobile {
    width: 100%;
    background: -webkit-linear-gradient(left, #f7f7f7, #eeeeee);
    overflow-x: auto;
    overflow-y: hidden;
  }

  .mainview_mobile img {

  }

  .header {
    position: absolute;
    top: 50px;
    right: 6%;
  }

  .menuview {
    position: absolute;
    top: 50px;
    left: 4%;
  }

  .mainview_mobile h1 {
    font-weight: normal;
    font-size: 30px;
    position: absolute;
    left: 30px;
  }

  .mainview_mobile h2 {
    font-weight: normal;
    font-size: 20px;
    position: absolute;
    left: 30px;
  }

  .mainview h1 {
    font-weight: normal;
    font-size: 40px;
    position: absolute;
    right: 30px;
  }

  .mainview h2 {
    font-weight: normal;
    font-size: 20px;
    position: absolute;
    right: 30px;
  }

  .category {
    display: flex;
    flex-direction: row;
    font-size: 20px;
    font-family: "Helvetica Neue";
    font-weight: bold;
    width: 60%;
    justify-content: flex-start;
  }

  .category_mobile {
    display: flex;
    flex-direction: row;
    font-size: 18px;
    font-family: "Helvetica Neue";
    font-weight: bold;
    width: 80%;
    justify-content: flex-start;
  }

  .leave_msg {
    width: 60%;
    margin-bottom: 60px;
  }

  .leave_msg_mobile {
    width: 70%;
    margin-bottom: 60px;
  }

  .leave_msg div {
    display: flex;
  }

  .leave_msg_mobile div {
    display: flex;
    flex-direction: column;
  }

  .leave_msg .input_name {
    height: 100px;
    width: 10%;
    box-shadow: 5px 5px 15px 0px #666666;
    border-radius: 5px;
  }

  .leave_msg_mobile .input_name {
    height: 20px;
    width: 100%;
    box-shadow: 5px 5px 15px 0px #bbbbbb;
    margin-bottom: 20px;
  }

  .leave_msg p {
    margin-top: 60px;
    font-size: 20px;
  }

  .leave_msg_mobile p {
    margin-top: 40px;
    font-size: 20px;
  }

  .leave_msg .input_message {
    height: 100px;
    width: 70%;
    margin-left: 5%;
    box-shadow: 5px 5px 15px 0px #666666;
    border-radius: 5px;
  }

  .leave_msg_mobile .input_message {
    height: 100px;
    width: 100%;
    margin-bottom: 20px;
    box-shadow: 5px 5px 15px 0px #bbbbbb;
  }

  .leave_msg .submit {
    height: 100px;
    width: 10%;
    margin-left: 5%;
    font-size: 18px;
    box-shadow: 5px 5px 15px 0px #666666;
    border-radius: 5px;
  }

  .leave_msg_mobile .submit {
    height: 40px;
    width: 100%;
    margin-bottom: 20px;
    font-size: 15px;
    box-shadow: 5px 5px 15px 0px #bbbbbb;
  }

  .content {
    width: 60%;
    -moz-column-count: 2; /* Firefox */
    -webkit-column-count: 2; /* Safari 和 Chrome */
    column-count: 2;
    -moz-column-gap: 2em;
    -webkit-column-gap: 2em;
    column-gap: 2em;
  }

  .content_mobile {
    width: 90%;
    -moz-column-count: 1; /* Firefox */
    -webkit-column-count: 1; /* Safari 和 Chrome */
    column-count: 1;
    -moz-column-gap: 0em;
    -webkit-column-gap: 0em;
    column-gap: 0em;
  }

  .content .view {
    width: 100%;
    margin-bottom: 20px;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    border-radius: 10px;

  }

  .loading {
    width: 100%;
    color: #666666;
    font-size: 20px;
  }

  .sp_msg {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .sp_msg .line {
    /*margin-top: 30px;*/
    height: 2px;
    background-color: #2c3e50;
  }

  .sp_msg .nickname {
    display: flex;
    flex-direction: row;
    margin-top: 5px;
  }

  .sp_msg .nickname span {
    font-size: 20px;

  }

  .sp_msg .message {
    margin-bottom: 30px;
  }
</style>
