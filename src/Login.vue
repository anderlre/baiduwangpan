<template>

    <div class="login" @keyup.enter="login">
      <transition-group tag='ul' name='img'>
        <li v-for='(image,index) in img' :key='image' v-show='index===n'>
          <div class="divImg" :style="{backgroundImage: 'url('+image+')'}">
            <div class="form">
              <div style="font-size: 18px;font-weight: 600;margin-top: 15px;margin-left: 25px;">账号密码登陆</div>
              <div>
                <el-form ref="form" :model="form" :rules="formRules" class="el-form">
                  <el-form-item prop="account">
                    <el-input
                      class="input"
                      prefix-icon="el-icon-user"
                      :autofocus="true"
                      placeholder="请输入用户名"
                      v-model="form.account">
                    </el-input>
                  </el-form-item>

                  <el-form-item prop="password">
                    <el-input
                      class="input"
                      prefix-icon="el-icon-lock"
                      placeholder="请输入密码"
                      type="password"
                      v-model="form.password">
                    </el-input>
                  </el-form-item>
                  <el-button class="button" type="primary" @click.native="login" :loading="isBtnLoading">{{btnText}}
                  </el-button>
                </el-form>
              </div>
              <el-button style="width: 300px;margin-left: 25px;margin-top: 15px;" @click="$router.push({path:'/register'})">立即注册
              </el-button>
            </div>
            <div style="position: absolute;bottom: 0;left: 50%;transform: translate(-50%, -50%);font-size:14px;font-weight:400;color:rgba(153,153,153,1);">
              Copyright © {{new Date().getFullYear()}} {{'百度网盘'}}.
            </div>
          </div>
        </li>
      </transition-group>

    </div>


</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        form: {
          account: '',
          password: '',
        },
        n: 0,
        img:['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=297177211,3111466220&fm=26&gp=0.jpg',
          'http://img1.imgtn.bdimg.com/it/u=686391473,2478204362&fm=26&gp=0.jpg',
          'http://img4.iyiou.com/ThinkTank/2018-08-17/a0001.jpg'],
        formRules: {
          account: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
        },
        isBtnLoading: false,
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    methods: {
      time() {
        let vm=this;
        setInterval(function () {
          vm.n++;
          if (vm.n === vm.img.length) {
            vm.n = 0
          }
        }, 6000);
      },
      login() {

        this.isBtnLoading = true;
        let vm = this;

            if (vm.form.account === 'admin' && vm.form.password === '123456') {
              vm.$router.push({
                path: '/home',
                name: 'home'
              });
              sessionStorage.setItem('login-user-info',JSON.stringify(vm.form));
            } else {
              vm.$message.error('错误');
              vm.isBtnLoading = false;
            }

          }

    },
    mounted() {
      this.time()
    }
  }
</script>

<style scoped>
  .login {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .login ul li {
    position: absolute;
    width: 100%;
    height: 100%;
    list-style: none;
  }

 .login .divImg {
    background-color: rgba(255,255,255,1);
    background-size: cover;
    background-repeat: no-repeat;
   width: 100%;
   height: 100%;
  }
  .img-enter-active, .img-leave-active {
    transition: all 4s;
  }

  .img-enter, .img-leave-to {
    opacity: 0;
  }

  .img-enter-to, .img-leave {
    opacity: 1;
  }

  .form {
    width: 350px;
    height: 350px;
    background-color: rgba(255,255,255,1);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .el-form {
    margin-left: 25px;
    margin-top: 40px;
  }

  .input {
    width: 300px;
  }

  .button {
    width: 300px;
  }
</style>
