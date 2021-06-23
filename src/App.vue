<template>
  <div id="app">
  <h1>黑马头条</h1>
  <div class="flex">
  <div class="box">123</div>
  <div class="box2">456</div>
    <div class="box2">789</div>
  </div>
<van-cell title="选择多个日期" :value="text" @click="show = true" />
<van-calendar v-model="show" type="multiple" @confirm="onConfirm" />
   <!-- 路由的出口 -->
  <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="less">
.flex{
  display: flex;
}
 .box,.box2{
   width:500px;
   height: 200px;
   border:1px solid;
 }
</style>
