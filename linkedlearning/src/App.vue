<!-- eslint-disable vue/multi-word-component-names -->
<template>
  

  <div id="page-parent">
    <div class="wrapper" v-if="getisLoggedIn">
    <nav class="sidebar">
      <div class="box">
        <div class="log">
          <img id="profile" src="./assets/icons/linked_learning_image.png" height="70vw" width="70vw" class="user" />
        </div>
        <div class="log2">
          <ul class="sidebar-side">
            <li class="side-item">
              <img src="./assets/icons/icons8-user-60.png" height="35vw" width="35vw" />
              <router-link to="/login" class="side-link"><span class="navlinks">Profile</span></router-link>
            </li>
            <li class="side-item">
              <img src="./assets/icons/icons8-repository-50.png" height="35vw" width="35vw" />
              <a href="#" class="side-link"><span class="navlinks">Courses</span></a>
            </li>
            <li class="side-item">
              <img src="./assets/icons/icons8-gear-50.png" height="35vw" width="35vw" />
              <a href="#" class="side-link"><span class="navlinks">Settings</span></a>
            </li>
            <li class="side-item">
              <img src="./assets/icons/icons8-logout-rounded-64.png" />
              <a @click="logoutUser" class="side-link"><span class="navlinks">Logout</span></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  </div>
  
  <div class="container" id ="main-page">
    <div v-show="this.getError.length > 0" class="error-msg">
      {{ this.getError }}
    </div>
    <div v-show="this.getMsg.length > 0" class="success-msg">
      {{ this.getMsg }}
    </div>
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
* {
  margin: 0rem 0rem;
  padding: 0rem;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}

#page-parent{
  display: flex;
}

#main-page{
  flex: 80%;
}
#profile{
  width: 50px;
  height:50px
}

.side-item{
  text-align: center;
}
.wrapper {
  display: flex;
  position: fixed;
  top: 0;
  flex : 20%;
  bottom: 100vh;
}
.wrapper .sidebar {
  width: 7.5vw;
  height: 100vh;
  background-color: #212121;
}
a {
  color: white;
  margin: 0rem 1.5rem;
  
}
li {
  margin: 1rem 0rem;
}
ul {
  margin-top: 5rem;
  padding-left: 0;
}

a{
  text-decoration: none;
}

.user {
  border-radius: 50px;
  margin: auto;
  border: 3px solid #aba9a9;
}
img {
  margin: 0.5rem 0.5rem;
  width: 30px;
  height: 30px;
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
