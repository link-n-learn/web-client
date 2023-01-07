<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container border border-3 col-6 offset-3" id="box">
      <div class="col-6 offset-3">
        <h1 class="text-center"></h1>
        <form @submit.prevent="login">
          <div class="text-center"><h1>Login</h1></div><br>
          <div>
            <label for="email" class="form-label">Enter the Email Address</label>
            <input
              type="email"
              id="email"
              class="form-control"
              v-model="loginDetails.email"
              placeholder="Email Address"
            />
          </div>
          <div>
            <label for="password" class="form-label">Enter the password</label>
            <input
              type="password"
              id="password"
              v-model="loginDetails.password"
              placeholder="Password"
              class="form-control"
            />
          </div>
          <br />
          <div>
            <button class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
</template>
  
  <script>
  import axios from 'axios';
  import router from "../../router/index";
  import store from "../../store/mainIndex";
  export default {
    data() {
      return {
        loginDetails: {
          email: "",
          password: "",
        },
      };
    },
    methods: {
      async login() {
        try{
          const login_data = {
              email : this.loginDetails.email,
              password : this.loginDetails.password,
          }
          const response = await axios.patch('auth/login', login_data)
          if(response.status == 200){
            //id, username
            console.log(response.data)
            // console.log('User in login', user)
            await store.dispatch("setLoggedInUser", response.data);
            router.push({name : 'dashboard'})
          }
        }catch(err){
          console.log("Error: ", err);
          store.dispatch('setError', err.response.data.err);
        }
        
      },
    },
  };
  </script>
  
  <style>
  #box{
    padding: 15px;
  }
  @import "~bootstrap/dist/css/bootstrap.css";
  </style>
  