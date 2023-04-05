<template>
  <div id="wrapper">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" href="#" to="/dashboard"
        >Linked learning</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto" v-if="getisLoggedIn">
          <li class="nav-item active">
            <router-link to="/user" class="nav-link" href="#"
              >Profile</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              @click="logoutUser"
              to="/user"
              class="nav-link"
              href="#"
              >Logout</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ms-auto" v-if="!getisLoggedIn">
          <li class="nav-item active">
            <a class="nav-link" href="#">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Signup</a>
          </li>
        </ul>
      </div>
    </nav>
    <div style="margin-left: 10vw">
      <div v-show="this.getError.length > 0" class="error-msg">
        {{ this.getError }}
      </div>
      <div v-show="this.getMsg.length > 0" class="success-msg">
        {{ this.getMsg }}
      </div>
      <router-view />
    </div>
  </div>

  <br /><br />
</template>

<script>
import { mapGetters } from "vuex";
import router from "./router";
import refreshInstance from "./Config/axios";

export default {
  computed: mapGetters([
    "getError",
    "getMsg",
    "getisLoggedIn",
    "getRefreshToken",
    "getloggedInUser",
  ]),
  beforeMount: function () {
    this.$store.dispatch("syncAuthLocalStorage");
  },
  methods: {
    logoutUser: async function () {
      try {
        // const res = await axios.patch('auth/logout' , {})
        // console.log(res)

        const config = {
          headers: {
            authorization: `Bearer ${this.getRefreshToken}`,
          },
        };
        const res = await refreshInstance.patch("/auth/logout", {}, config);

        this.$store.dispatch("clearAuthState");
        this.$store.dispatch("setMsg", res.data.msg);
        this.$store.dispatch("clearCourseIdState");
        router.push({ name: "login" });
      } catch (err) {
        console.log(this.getisLoggedIn);
        console.log(err);
        this.$store.dispatch("setError", err.response.data.err);
      }
    },
  },
};
</script>

<style>
.bg-light {
  background-color: #212121 !important;
  color: white !important;
}
.navbar-brand {
  color: white;
}
.nav-link {
  color: white;
}

.nav-link:hover {
  color: rgb(199, 199, 199);
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>