<template>
  <div>
    <div class="profile">
      <el-card>
        <h2>Profile</h2>    
        <el-form
          class="profile-form"
          :model="model"
          :rules="rules"
          ref="form"
          @submit.native.prevent="submit"
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
          <el-form-item prop="confirm_password">
            <el-input
              v-model="model.confirm_password"
              placeholder="Password"
              type="password"
              prefix-icon="el-icon-view"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="submit-button"
              type="primary"
              native-type="submit"
              block 
              >Submit</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>     
    </div>
    <el-row :gutter="20" >
      <div class="block" v-for="(image, index) in image.list" :key="image.id">
        <el-col :span="6" :offset="index%3 === 0 ? 2 : 1">
          <el-image    
            :src="image.url"
            :alt="image.title"
          >
          </el-image>
          <span class="demonstration">{{ image.albumId }}</span>
        </el-col>
      </div>
    </el-row>
    <infinite-loading @infinite="getImages"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: 'profileForm',
  components: {
    InfiniteLoading,
  },
  data() {
      let validatePassword = (rule, value, callback) => {
        
        if( value === ''){
          callback(new Error('Please input the password'));
        }else{
          if(this.model.confirm_password === ''){
            this.$refs.model.validateField('confirm_password');
          }
          callback();          
        }
      };
      let validateConfirmPassword = (rule, value, callback) => {
        if( value === ''){
          callback(new Error('Please input the password'));
        }else if(value !== this.model.password){
          callback(new Error('Two inputs don\'t match'))
        }else{
          callback();
        }
      }
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        model: {
          email: 'test@email.com',
          password: '',
          confirm_password: ''
        },
        image: {
          list: [],
          page: 1,
          limit: 30,
          isLoading: false
        },
        rules: {
          email: [
            {required: true, message: 'Email is required.'},
            {required: true, pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/, message: 'Check an email address.'},
          ],
          password: [
            {required: true, message: 'Password is required'},
            {min: 6, max: 10, message: 'Check a password between 6 to 10 characters'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          confirm_password: [
            {required: true, message: 'Password is required'},
            {min: 6, max: 10, message: 'Check a password between 6 to 10 characters'},
            {validator: validateConfirmPassword},
          ]
        }
      }
  },
  methods: {    
    getImages($state) {      
      if(this.image.isLoading){
        return;
      }
      this.$set(this.image, 'isLoading', true);

      fetch(`https://jsonplaceholder.typicode.com/photos?_page=${this.image.page}&_limit=${this.image.limit}` )
      .then(res => res.json())
      .then(res => {
        
        if(res.error){
          this.$alert('Image loading error', 'Error', {
            confirmButtonText: 'Close',
          });
        }else{
          if(res.length != 0){
            this.$set(this.image, 'list', this.image.list.concat(res));
            this.$set(this.image, 'page', this.image.page+1);
            $state.loaded();
          }else{
            $state.complate();
          }
        }

        this.$set(this.image, 'isLoading', false);

      });
    },
    async submit() {
      let validRules = await this.$refs.form.validate();
      if(validRules){
        this.$alert('Success!', 'Message', {
          confirmButtonText: 'OK'
        });
      }      
    }
  }
};
</script>

<style scoped lang="scss">
.profile {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.profile-form {
  width: 290px;
  flex: 1;
}
.submit-button {
  width: 100%;
  margin-top: 40px;
}
.el-row {
  margin: 40px;
}
</style>
