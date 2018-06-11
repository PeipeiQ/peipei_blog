<template>
  <div class="content_view">
    <div class="box">
      <div class="title">{{contentItem.title}}</div>
      <div class="category">{{contentItem.category.name}}</div>
      <div class="description">{{contentItem.description}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "content_view",
    props: ['contentItem'],
    methods: {},
    mounted() {
    }

  }
</script>

<style scoped>
  .content_view {
    padding: 15px;
  }

  .content_view .box{
    width: 97%;
    box-shadow: 3px 3px 15px 0px #666666
  }

  .content_view .title {
    padding: 15px;

    font-size: 20px;
  }

  .content_view .category {

  }

  .content_view .description {
    padding: 15px;
    text-align: left;
  }
</style>
