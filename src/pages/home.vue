<template>
  <div class="main">
    <headerView class="header"/>
    <img src="../assets/background.jpg" style="margin-top: 10%;width: 60%;box-shadow: 5px 5px 15px 0px #666666;">
    <h1>{{ msg }}</h1>

    <menuview :categories="categories" class="menuview"></menuview>

    <div class="category">
      <p>博文分类：</p>
      <p>{{currentCategory}}</p>
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
      }
    },
    components:{
      menuview,headerView
    },
    methods: {
      loadData() {
        var that = this;
        ajax.get('/getContent', {}, function (data) {
          that.categories = data.data.categories;
          that.menuTop = 30-that.categories.count*2;
        })
      },
      tapSubmit() {
        var data = {name: this.name, message: this.message};
        ajax.post('/api/leaveMsg', data, function (data) {
          console.log(data)
        })
      }
    },
    mounted() {
      this.loadData()
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


  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
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
</style>
