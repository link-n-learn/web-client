<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <img src="../../assets/linked_learning_image.png" id="image" />

    <div class="form-border">
      <h2>Login</h2>
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

            <router-link to="/" style="text-align: left"
              >Forgot Password?</router-link
            >
          </div>
          <div class="col-6 offset-3 justify-content-center">
            <button id="login_button"><h6>Login</h6></button>
          </div>
          <div class="col-6 offset-3">
            Don't have an account?
            <router-link to="/signup">Signup</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router/index";
import store from "../../store/mainIndex";
import { mapGetters } from "vuex";
export default {
  computed: mapGetters([
    "getError",
    "getMsg",
    "getisLoggedIn",
    "getRefreshToken",
    "getloggedInUser",
  ]),
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("setMsgandError");
    }, 5000);
  },
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
          // console.log("In Login redirect");
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
#image {
  height: 25vh;
  width: 25vh;
}
#login_button {
  background-color: #212121;
  border: 1px solid black;
  border-radius: 3px;
  color: white;
  padding: 5px 15px;
  margin: 2vh;
}
.form-border {
  margin-left: 15vw;
  margin-right: 15vw;
  margin-top: 2vh;
  padding: 1vh 0;
}

.form-control {
  padding: 0.5vh 0;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
