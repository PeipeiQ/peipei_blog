<template>
  <div class="content_view">
    <div class="box">
      <div class="title">{{contentItem.title}}</div>
      <div class="category">分类：{{contentItem.category.name}}</div>
      <p>简介</p>
      <div class="description" v-html="contentItem.description"></div>
      <div class="detail"><router-link :to="detailUrl">详细>></router-link></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "content_view",
    props: ['contentItem'],
    data(){
      return{
        detailUrl:''
      }
    },
    methods: {

    },
    mounted() {
      this.detailUrl = '/article/'+this.contentItem._id
    }

  }
</script>

<style scoped>
  .content_view {
    padding: 15px;
  }

  .content_view .box {
    width: 97%;
    box-shadow: 3px 3px 10px 0px #666666;
    border-radius: 8px;
    /*background-color:  #ffffcc;*/
  }

  .box p {
    color: orange;
    text-align: left;
    margin-left: 20px;
    font-size: 20px;

  }

  .box .detail {
    width: 95%;
    color: orange;
    text-align: right;
    font-size: 15px;
    padding-bottom: 20px;
  }

  .content_view .box .title {
    padding: 15px;
    font-size: 25px;
  }

  .content_view .box .category {

  }

  .content_view .box .description {

    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    text-align: left;
  }
</style>
