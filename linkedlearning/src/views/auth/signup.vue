<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container border border-3 col-6 offset-3" id="box">
      <div class="col-6 offset-3">
        <h1 class="text-center" id="heading">Sign Up</h1>
        <form @submit.prevent="createNewAccount">
          <div>
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              v-model="signupDetails.username"
              placeholder="Username"
              class="form-control"
            />
          </div>
          <div>
            <label for="email" class="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              class="form-control"
              v-model="signupDetails.email"
              placeholder="Email Address"
            />
          </div>
          <div>
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="signupDetails.password"
              placeholder="Password"
            />
          </div>
          <div>
            <label for="confirm_password" class="form-label">Cofirm Password</label>
            <input
              type="password"
              id="confirm_password"
              class="form-control"
              v-model="signupDetails.confirm_password"
              placeholder="Confirm Password"
            />
          </div>
          <br />
          <div class="text-center">Already have an account? <router-link :to="{ name : 'login'}" class="text5">Login</router-link></div>
          <div class="text-center">I accept the terms and condition</div>
          <div>
            <button class="btn btn-primary" id="button">Create a New Account</button>
          </div>
        </form>
      </div>
    </div>
</template>
  
  <script>
  import axios from 'axios'
  import store from "../../store/mainIndex";
  import router from "../../router/index";
  export default {
    data() {
      return {
        signupDetails: {
          username: "",
          password: "",
          email: "",
          confirm_password : "",
        },
      };
    },
    methods: {
      // ...mapActions(["setError"]),
      async createNewAccount() {
        // To check if the password is equal to confirm password
        if (this.signupDetails.password == this.signupDetails.confirm_password){
            const data = {
              username :this.signupDetails.username,
              email : this.signupDetails.email,
              password : this.signupDetails.password,
            }
          try{
            console.log("Before the request");
            const response = await axios.post('auth/signup', data)
            console.log("After the request, ", response);
            if(response.status == 200){
              console.log(response)
              store.dispatch("setError", "");
              store.dispatch("setMsg", response.data.msg);
              console.log(response)
              store.dispatch('setSignupUser', {userId : response.data.user._id})
              router.push({ name: "verify" });
            }else{
              console.log('Error else block')
            }
          }catch(err){
            console.log("Caught in the catch block")
            console.log(err)
            store.dispatch("setError", err.response.data.err);
        }}
        else{
          alert("Password and Confirm Password are not matching.");
        }
      },
    },
  };
  </script>
  
  <style>
  #box{
    border-radius: 10px;
  }
  #button{
    background-color: #071C52;
    color: #FFDE59;
    margin-top: 10px;
    margin-bottom: 25px;
  }
  #heading{
    padding-top: 15px;
    padding:32px;
  }
  .text5{
    text-decoration: none;
  }
  @import "~bootstrap/dist/css/bootstrap.css";
  </style>