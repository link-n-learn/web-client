<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <img src="../../assets/linked_learning_image.png" id="image" />
  <h2>Signup</h2>
  <div class="form-border">
    <form @submit.prevent="createNewAccount">
      <div class="form-floating">
        <div class="col-6 offset-3">
          <p class="text-center">Email</p>
          <input
            type="email"
            id="email"
            class="form-control"
            placeholder="Email"
            v-model="signupDetails.email"
            required
          />
          <p class="text-center">Username</p>
          <input
            id="username"
            class="form-control"
            placeholder="Username"
            v-model="signupDetails.username"
            required
          />
          <p class="text-center">Password</p>
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="Password"
            v-model="signupDetails.password"
            required
          />
          <p class="text-center">Confirm Password</p>
          <input
            type="password"
            id="password1"
            class="form-control"
            placeholder="Password"
            v-model="signupDetails.confirm_password"
            required
          />
          <input type="checkbox" name="agree" v-model="signupDetails.agree" />
          <label id="agree_i"
            >I agree to the Terms and Conditions and Privacy policy</label
          >
        </div>
        <div class="col-6 offset-3 justify-content-center">
          <button id="button"><h6>Signup</h6></button>
        </div>
        <div class="col-6 offset-3">
          Already have an account
          <router-link to="/login" style="text-align: left">Login</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import store from "../../store/mainIndex";
import router from "../../router/index";

export default {
  data() {
    return {
      signupDetails: {
        username: "",
        password: "",
        email: "",
        confirm_password: "",
        agree: null,
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("setMsgandError");
    }, 5000);
  },
  methods: {
    // ...mapActions(["setError"]),
    async createNewAccount() {
      // To check if the password is equal to confirm password
      if (
        this.signupDetails.password == this.signupDetails.confirm_password &&
        this.signupDetails.agree != null
      ) {
        const data = {
          username: this.signupDetails.username,
          email: this.signupDetails.email,
          password: this.signupDetails.password,
        };
        console.log(this.signupDetails.agree);
        try {
          const response = await axios.post("auth/signup", data);
          if (response.status == 200) {
            store.dispatch("setError", "");
            store.dispatch("setMsg", response.data.msg);
            store.dispatch("setSignupUser", { userId: response.data.user._id });
            router.push({ name: "verify" });
          }
        } catch (err) {
          store.dispatch("setError", err.response.data.err);
        }
      } else {
        alert(
          "Password and Confirm Password are not matching or please select the checkbox."
        );
      }
    },
  },
};
</script>

<style>
#button {
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
  margin: 2vh;
  padding: 1vh 0;
}

.form-control {
  padding-top: 0.5vh 0;
  padding-bottom: 1vh;
}
#image {
  height: 25vh;
  width: 25vh;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
