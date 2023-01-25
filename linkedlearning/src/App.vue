<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-show="this.getError.length > 0" class="error-msg">
    {{ this.getError }}
  </div>
  <div v-show="this.getMsg.length > 0" class="success-msg">
    {{ this.getMsg }}
  </div>

  <div class="wrapper" v-if="getisLoggedIn">
    <nav class="sidebar">
      <div class="box">
        <div class="log">
          <img src="./linked_learning_image.png" height="70vw" width="70vw" class="user" />
        </div>
        <div class="log2">
          <ul class="sidebar-side">
            <li class="side-item">
              <img src="./icons8-user-60.png" height="35vw" width="35vw" />
              <a href="#" class="side-link"><b>Profile</b></a>
            </li>
            <li class="side-item">
              <img src="./icons8-repository-50.png" height="35vw" width="35vw" />
              <a href="#" class="side-link"><b>Courses</b></a>
            </li>
            <li class="side-item">
              <img src="./icons8-gear-50.png" height="35vw" width="35vw" />
              <a href="#" class="side-link"><b>Settings</b></a>
            </li>
            <li class="side-item">
              <img src="./icons8-logout-rounded-64.png" />
              <a @click="logoutUser" class="side-link"><b>Logout</b></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <div class="container text-center">
    <br />
    <router-view />
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
* {
  margin: 0rem 0rem;
  padding: 0rem;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
.wrapper {
  display: flex;
  position: fixed;
}
.wrapper .sidebar {
  width: 7.5vw;
  height: 200vh;
  background-color: #212121;
}
a {
  color: white;
  margin: 0rem 1.5rem;
  margin-left: 0.4rem;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}
li {
  margin: 1rem 0rem;
}
ul {
  margin-top: 10rem;
}
.user {
  border-radius: 50px;
  margin: auto;
  border: 3px solid #aba9a9;
}
img {
  margin: 1rem 1rem;
  margin-right: 2rem;
}
.box {
  text-align: center;
  justify-content: center;
}
a:hover {
  text-decoration: none;
  color: grey;
}
.log {
  margin-top: 2rem;
  margin-bottom: 4rem;
  text-align: center;
  justify-content: center;
}
.log2 {
  text-align: center;
  justify-content: center;
}
.error-msg {
  width: 25%;
  text-align: center;
  margin: auto;
  margin-top: 2vh;
  background: #f7b2b2;
  border: none;
  border-radius: 10px;
  padding: 2vh 2vw;
}
.success-msg {
  width: 25%;
  text-align: center;
  margin: auto;
  margin-top: 2vh;
  background: #b2f7b2;
  border: none;
  border-radius: 10px;
  padding: 2vh 2vw;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
