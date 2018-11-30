<template>
  <el-container>
    <el-container>
      <v-menu></v-menu>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
   import Menu from './components/Menu';

  export default {
    name: 'app',
    components: {
      'v-menu' : Menu
    }
  }
</script>

<style>
  .container {
    height: 500px;
  }

  .aside {
    background-color: rgb(238, 241, 246);
  }



</style>
