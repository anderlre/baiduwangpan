<template>
  <div class="menu">
<!--      <div style="background-color: gainsboro;width: 200px"><img style="width: 200px" src="../assets/logo.png" alt=""/></div>-->
      <el-menu
        :default-active="$route.path"
        style="width: 200px;"
        >
        <el-menu-item class="item" index="/all-files" @click="goTo('/all-files')">
          <i class="el-icon-folder"></i>
          <span slot="title">全部文件</span>
        </el-menu-item>
        <el-menu-item class="item" index="/image" @click="goTo('/image')">
          <i class="el-icon-picture-outline"></i>
          <span slot="title">图片</span>
        </el-menu-item>
        <el-menu-item class="item" index="/video" @click="goTo('/video')">
          <i class="el-icon-video-camera"></i>
          <span slot="title">视频</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
  export default {
    name: "Menu",
    methods:{
      goTo(path) {
        this.$router.replace(path);
      }
    }
  }
</script>

<style scoped>

</style>
