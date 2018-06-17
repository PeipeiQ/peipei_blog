<template>
  <div class="article_background">
    <headerView class="header"/>
    <div class="box">
      <div class="title">{{contentItem.content}}</div>
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
        contentId: ''
      }
    },
    components: {
      headerView
    },
    methods: {
      loadData() {
         ajax.get('/api/getcontent?id='+this.contentId,function (res) {
           console.log(res)
         })
      }
    },
    mounted() {
      this.contentId = this.$route.params.id
      console.log(this.contentId)
      this.loadData()
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
    width: 60%;
  }

  .title {
    font-size: 50px;
  }

  .content {

  }
</style>
