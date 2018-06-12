<template>
  <div class="main">
    <headerView class="header"/>
    <div class="box">
      <div class="title">{{contentItem.title}}</div>
      <div class="content" v-html="contentItem.content"></div>
    </div>
  </div>
</template>

<script>
  import headerView from '../components/home_header'

  export default {
    name: "article_page",
    data() {
      return {
        contentItem: this.$route.params.contentItem
      }
    },
    components: {
      headerView
    },
    mounted() {
      console.log(this.$route.params)
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

  .header {
    position: absolute;
    top: 4%;
    right: 6%;
  }


  .box{
    /*margin-top: 8%;*/
    width: 60%;
  }



  .title {
    font-size: 30px;
  }

  .content{

  }
</style>
