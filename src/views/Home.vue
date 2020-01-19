<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: 60px;border-bottom: 2px solid gainsboro;overflow: hidden">
      <div style="width: 200px;height: 60px;float: left;overflow: hidden"><img style="width: 200px;height: 60px;" src="../assets/logo.png" alt="#"/></div>
      <div style="width: 120px;height: 60px;float: right;overflow: hidden;margin-right: 255px;cursor: pointer;"class="user-portrait">
        <i class="el-icon-user-solid" style="font-size: 25px;line-height:60px;vertical-align: middle;display: inline-block;"></i>
        <span style="">{{username}}</span>
        <ul class="dropdown-list user-info">
          <li class="li" @click.stop="handle">修改密码</li>
          <li class="li" @click.stop="logout">退出登录</li>
        </ul>
      </div>
    </div>
    <div style="width: 200px;height: calc(100% - 62px);float: left;overflow: hidden">
      <Menu></Menu>
    </div>
    <div style="height: calc(100% - 62px);width: calc(100% - 200px);float: left;overflow: hidden">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Menu from '../components/Menu'

  export default {
    name: "Home",
    data(){
      return{
        username:''
      }
    },
    components: {Menu},
    created(){

        if(!sessionStorage.getItem('login-user-info')){
          this.$router.push('/login');
        }

      let userInfo = sessionStorage.getItem('login-user-info');
      let userMessage=JSON.parse(userInfo);
      this.username = userMessage.account;
    },
    methods:{
      handle(){
        this.$router.push('/update')
      },
      logout(){
        sessionStorage.removeItem('login-user-info');
        this.$router.push('/login');
      },
    }
  }
</script>

<style lang="scss" scoped>

  .user-portrait:hover {
  .user-info {
    display: inline-block;
  }
  }

  .dropdown-list{
    display: none;
    padding: 0;
    margin-right: 235px;
    position: absolute;
    right: 0;
    z-index: 99999;
    list-style: none;
    font-size: 12px;
    line-height: 12px;
    top: 50px;
    background-color: #ffffff;
    min-width: 100px;
    border: 1px solid #dcdfe6;
    border-radius: 10px;
    pointer-events: initial;
  }

  .li {
    color: #515a6e;
    padding: 8px 20px;
    text-align: center;
  }

  .li:hover {
    background-color: #dcdfe6;
  }

</style>
