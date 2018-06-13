<template>
  <div class="main">
    <headerView class="header"/>
    <img src="../assets/b1.jpg" style="margin-top: 8%;width: 60%;box-shadow: 5px 5px 15px 0px #666666;">
    <h1>{{ msg }}</h1>

    <menuview :categories="categories" class="menuview" :tap="tapCategory"></menuview>

    <div class="category">
      <p>博文分类：</p>
      <p>{{currentCategory}}</p>
    </div>

    <div class="content">
      <contentView class="view" v-for="(item,index) in contents" :key="index" :contentItem="item" :gotoDetail="gotoDetail"/>
    </div>

    <div class="leave_msg">
      <p style="white-space: pre-line;">留言区</p>
      <div>
        <textarea class="input_name" v-model="name" placeholder="input name"></textarea>
        <textarea class="input_message" v-model="message" placeholder="input msg"></textarea>
        <button class="submit" @click="tapSubmit">提交</button>
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
        msg: 'Welcome to Peipei Blog',
        currentCategory: '全部',
        name: '',
        message: '',
        categories:[],
        menuTop:'',
        contents:[]
      }
    },
    components:{
      menuview,headerView,contentView
    },
    methods: {
      loadData(category) {
        var that = this;
        ajax.get('/getContent'+'?category='+category, function (data) {
          console.log(data)
          that.categories = [];
          that.categories.push({name:'全部'});
          that.categories = that.categories.concat(data.data.categories);
          that.contents = data.data.contents;
          that.menuTop = 30-that.categories.count*2;
        })
      },
      tapSubmit() {
        var data = {name: this.name, message: this.message};
        ajax.post('/api/leaveMsg', data, function (data) {
          console.log(data)
        })
      },
      tapCategory(e){
        console.log(e)
        this.loadData(e._id?e._id:'');
        this.currentCategory = e.name;
      },

    },
    mounted() {
      this.loadData('')
    }
  }
</script>

<style scoped>

  .main {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    background-color: #e3eae9;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header{
     position: absolute;
     top: 4%;
     right: 6%;
   }

  .menuview{
    position: fixed;
    top: 10%;
    left: 6%;
  }

  h1 {
    font-weight: normal;
    margin-top: 50px;
    font-size: 40px;
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


  .leave_msg {
    width: 60%;
    margin-bottom: 60px;
  }

  .leave_msg div {
    display: flex;
  }

  .leave_msg .input_name {
    height: 100px;
    width: 10%;
    box-shadow: 5px 5px 15px 0px #666666;
    border-radius: 5px;

  }

  .leave_msg .input_message {
    height: 100px;
    width: 70%;
    margin-left: 5%;
    box-shadow: 5px 5px 15px 0px #666666;
    border-radius: 5px;
  }

  .leave_msg .submit {
    height: 100px;
    width: 10%;
    margin-left: 5%;
    font-size: 18px;
    box-shadow: 5px 5px 15px 0px #666666;
    border-radius: 5px;
  }

  .content{
    width: 60%;
    -moz-column-count:2; /* Firefox */
    -webkit-column-count:2; /* Safari 和 Chrome */
    column-count:2;
    -moz-column-gap: 2em;
    -webkit-column-gap: 2em;
    column-gap: 2em;
  }

  .content .view{
    width: 100%;
    margin-bottom: 20px;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    border-radius: 10px;

  }
</style>
