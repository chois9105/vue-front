<template>
  <div class="login">
    <el-card>
      <h2>Login</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="email">
          <el-input
            v-model="model.email"
            placeholder="Email"
            prefix-icon="el-icon-user"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
            prefix-icon="el-icon-view"
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block 
            >Login</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'loginForm',
  data() {
      return {
        model: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            {required: true, message: 'email is required'},            
          ],
          password: [
            {required: true, message: 'password is required'}
          ]
        },
        loading: false,
        loginUser : {
          email: 'test@email.com',
          password: '12345678'
        }
      }
  },
  methods: {
    simulateLogin(model) {
      let result = false;

      if(model.email == this.loginUser.email &&
         model.password == this.loginUser.password){
          result = true;
      }

      return new Promise(resolve => {                
        setTimeout(function(){
          resolve(result);
        }, 800);
      });

    },
    async login() {
      let validRules = await this.$refs.form.validate();
     
      if(!validRules){
        return;
      }

      this.loading = true;
      let validUser = await this.simulateLogin(this.model);
      this.loading = false;

      if(validUser){
        this.$router.push('profile')
      }else{
        this.$alert('Fail!', 'Message', {
          confirmButtonText: 'Close'
        });
      }
      
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 290px;
  flex: 1;
}
.login-button {
  width: 100%;
  margin-top: 40px;
}
</style>
