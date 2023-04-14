<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- <div class="container border border-3 col-6 offset-3" id="box">
        <div class="col-6 offset-3">
            <h1 class="text-center">Verification Page</h1>
            <form @submit.prevent="verify">
                <div>
                    <label for="otp" class="form-label">Enter the OTP</label>
                    <input type="password" class="form-control" v-model="verifyDetails.otp" placeholder="Enter the OTP">
                </div><br>
                <div>
                    <button class="btn btn-primary">Verify</button>
                </div>
            </form><br>
            <div class="container text-center">Resend OTP: <button class="btn btn-info" @click.prevent="resendOtp" v-bind:disabled="pausedForAMinute">Resend OTP</button></div>
        </div>
    </div> -->
  <div style="text-align: center">
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <img src="../../assets/Linkedlearning.jpg" id="image" />
        <h2>Verify email</h2>
      </div>
      <div class="col"></div>
    </div>
    <div>
      <form @submit.prevent="verify">
        <div class="form-floating">
          <div class="col-6 offset-3">
            <p class="text-center">Enter OTP</p>
            <input
              id="username"
              class="form-control"
              placeholder="OTP"
              v-model="verifyDetails.otp"
              required
            />
            <button
              @click.prevent="resendOtp"
              id="resend-btn"
              v-bind:disabled="pausedForAMinute"
            >
              Resend OTP
            </button>
          </div>
          <div class="col-6 offset-3 justify-content-center">
            <button id="button"><h6>Submit</h6></button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../../store/mainIndex";
import router from "../../router/index";
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["getuserId"]),
  data() {
    return {
      verifyDetails: {
        otp: null,
      },
      pausedForAMinute: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("setMsgandError");
    }, 5000);
  },
  methods: {
    async verify() {
      try {
        const data = {
          otp: this.verifyDetails.otp,
          userId: this.getuserId,
        };
        const response = await axios.post("auth/signup/verify", data);
        if (response.status == 200) {
          store.dispatch("setMsg", response.data.msg);
          store.dispatch("setError", "");
          router.push({ name: "login" });
        }
      } catch (err) {
        store.dispatch("setError", err.response.data.err);
      }
    },
    async resendOtp() {
      const data = {
        userId: this.getuserId,
      };
      try {
        this.pausedForAMinute = true;
        setTimeout(() => (this.pausedForAMinute = false), 60000);
        const response = await axios.patch("auth/signup/resendotp", data);
        this.$store.dispatch("setMsgandError");
        this.$store.dispatch("setMsg", response.data.msg);
      } catch (err) {
        this.$store.dispatch("setError", err.response.data.err);
      }
    },
  },
};
</script>

<style>
#box {
  padding: 15px;
}
#button {
  background-color: #212121;
  border: 1px solid black;
  border-radius: 3px;
  color: white;
}
#image {
  height: 25vh;
  width: 25vh;
}
#resend-btn {
  background-color: white;
  color: #127ebd;
  margin: 0;
  border: none;
  padding: 2vh 0;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
