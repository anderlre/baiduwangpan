<template>
    <div style="width: 400px;height: 500px;">
      <div style="margin-top: 25px;width: 88px;">
        <span style="font-size: 22px;font-weight: 600">修改密码</span>
        <hr style="border: 1px solid gainsboro"/>
      </div>
      <div class="update">
        <el-form ref="form" :model="form" >
          <el-form-item label="账号">
            <el-input v-model="form.account" class="input"></el-input>
          </el-form-item>
          <el-form-item label="密码" style="margin-top: 15px">
            <el-input v-model="form.password" class="input"></el-input>
          </el-form-item>
          <el-button type="primary" style="margin-left: 95px;margin-top: 15px" @click="update('form')">修 改</el-button>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "UpdateMessage",
      data(){
          return{
            form:{
              account:'',
              password:''
            }
          }
      },
      methods:{
          update(form){
            let vm=this;
            vm.$refs[form].validate((valid)=>{
              if(valid){
                console.log(vm.form)
              }
            })
          },
      }
    }
</script>

<style scoped>
.update{
  width: 300px;
  margin-top: 100px;
  margin-left: 100px;
}
  .input{
    width: 250px
  }
</style>
