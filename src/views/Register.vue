<template>
    <div class="register">
      <div class="register-form">
        <div style="margin-top: 15px;margin-left: 15px;display: flex"><img src="../assets/logo.png"><h2 style="margin-top: 10px">欢迎注册</h2></div>
        <el-form
          :model="form"
          status-icon
          :rules="rules"
          ref="form"
          style="margin-top: 25px;margin-left: 20px;"
        >
          <el-form-item prop="telephone">
            <el-input class="input" v-model="form.telephone" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="verify" class="code">
            <el-input class="input" v-model="form.verify" placeholder="验证码"></el-input>
            <el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>
          </el-form-item>
          <el-form-item prop="account">
            <el-input class="input" type="text" v-model="form.account" auto-complete="off" placeholder="输入账号名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="input" type="password" v-model="form.password" auto-complete="off" placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input class="input" type="password" v-model="form.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')" style="width:300px;margin-left: 5px">注册</el-button>
            <p style="margin-left: 10px;cursor: pointer;" @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
      <div style="position: absolute;bottom: 0;left: 50%;transform: translate(-50%, -50%);font-size:14px;font-weight:400;color:rgba(153,153,153,1);">
        Copyright © {{new Date().getFullYear()}} {{'百度网盘'}}.
      </div>
    </div>
</template>

<script>
    export default {
        name: "Register",

      data(){
        // <!--验证手机号是否合法-->
        let checkTel = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入手机号码'))
          } else if (!this.checkMobile(value)) {
            callback(new Error('手机号码不合法'))
          } else {
            callback()
          }
        };
        //  <!--验证码是否为空-->
        let checkSmscode = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入手机验证码'))
          } else {
            callback()
          }
        };
        // <!--验证密码-->
        let validatePass = (rule, value, callback) => {
          if (value === "") {
            callback(new Error("请输入密码"))
          } else {
            if (this.form.checkPass !== "") {
              this.$refs.form.validateField("checkPass");
            }
            callback()
          }
        };
        // <!--二次验证密码-->
        let validatePass2 = (rule, value, callback) => {
          if (value === "") {
            callback(new Error("请再次输入密码"));
          } else if (value !== this.form.password) {
            callback(new Error("两次输入密码不一致!"));
          } else {
            callback();
          }
        };
          return{
            form:{
              telephone:'',
              verify:'',
              account:'',
              password:'',
              checkPass:'',
            },
            rules: {
              account: [{require:true, message:'账户名不能为空', trigger: 'change' }],
              password: [{ validator: validatePass, trigger: 'change' }],
              checkPass: [{ validator: validatePass2, trigger: 'change' }],
              telephone: [{ validator: checkTel, trigger: 'change' }],
              verify: [{ validator: checkSmscode, trigger: 'change' }],
            },
            buttonText: '发送验证码',
            isDisabled: false, // 是否禁止点击发送验证码按钮
            flag: true
          }
      },
      methods: {
        // <!--发送验证码-->
        sendCode() {
          let tel = this.form.telephone
          if (this.checkMobile(tel)) {
            console.log(tel);
            let time = 60;
            this.buttonText = '已发送';
            this.isDisabled = true;
            if (this.flag) {
              this.flag = false;
              let timer = setInterval(() => {
                time--;
                this.buttonText = time + ' 秒';
                if (time === 0) {
                  clearInterval(timer);
                  this.buttonText = '重新获取';
                  this.isDisabled = false;
                  this.flag = true;
                }
              }, 1000)
            }
          }
        },
        // <!--提交注册-->
        submitForm(formName) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              setTimeout(() => {
                alert('注册成功')
              }, 400);
            } else {
              console.log("error submit!!");
              return false;
            }
          })
        },
        // <!--进入登录页-->
        gotoLogin() {
          this.$router.push({
            path: "/login"
          });
        },
        // 验证手机号
        checkMobile(str) {
          let re = /^1\d{10}$/
          if (re.test(str)) {
            return true;
          } else {
            return false;
          }
        }
      },
    }
</script>

<style scoped>
  .register{
    position: absolute;
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-image: url("../assets/bg4.jpg");
  }
.register-form{
  background-color: white;
  overflow: hidden;
  width: 450px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
  .input{
    width: 300px;
    margin-top: 10px;
  }
</style>
