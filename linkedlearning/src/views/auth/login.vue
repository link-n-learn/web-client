<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <img src="./linked_learning_image.png" id="image"/>
        <h2>Login</h2>
      </div>
      <div class="col"></div>
    </div>
  </div>

  <div class="container">
    <form @submit.prevent="login">
      <div class="form-floating">
        <div class="col-6 offset-3">
          <p class="text-center">Email</p>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="loginDetails.email"
            placeholder="Email"
            required
          />
          <p class="text-center">Password</p>
          <input
            type="password"
            id="password"
            v-model="loginDetails.password"
            class="form-control"
            placeholder="Password"
            required
          />

          <a>Forgot Password?</a>
        </div>
        <div class="col-6 offset-3 justify-content-center">
          <button id="login_button"><h6>Login</h6></button>
        </div>
        <div class="col-6 offset-3">
          <a href="/signup">Don't have an account?Signup</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
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
      try {
        const login_data = {
          email: this.loginDetails.email,
          password: this.loginDetails.password,
        };
        const response = await axios.patch("auth/login", login_data);
        if (response.status == 200) {
          await store.dispatch("setLoggedInUser", response.data);
          router.push({ name: "dashboard" });
        }
      } catch (err) {
        store.dispatch("setError", err.response.data.err);
      }
    },
  },
};
</script>

<style>
#box {
  padding: 15px;
}
#image{
  height: 25vh;
  width: 25vh;
}
#login_button{
  background-color:#212121;
  border:1px solid black;
  border-radius:3px;
  color:white;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
