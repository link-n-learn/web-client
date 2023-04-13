<template>
  <div id="wrapper">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" href="#" to="/"
        >Linked learning</router-link
      >
      <router-link class="nav-item" href="#" to="/dashboard">Home</router-link>
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
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">Signup</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div>
      <div v-show="this.getError.length > 0" class="error-msg">
        {{ this.getError }}
        <span @click="clearMsg"
          ><img
            src="./assets/icons/close.png"
            style="width: 18px; height: 18px; margin-bottom: 1vh"
        /></span>
      </div>
      <div v-show="this.getMsg.length > 0" class="success-msg">
        {{ this.getMsg }}
        <span @click="clearMsg"
          ><img
            style="width: 18px; height: 18px; margin-bottom: 1vh"
            src="./assets/icons/close.png"
        /></span>
      </div>
      <div id="wrapper-views">
        <router-view />
      </div>
    </div>
    <div id="footer">
      <div class="row">
        <div class="col-lg-4">
          <h5>Get the mobile application</h5>
          <a href="#">
            <img
              id="googlePlay"
              src="./assets/Googleplay.png"
              alt="Google play"
              srcset=""
            />
          </a>
          <div>
            <img src="./assets/icons/copyright.png" alt="" srcset="" />
            <span>2023 linkedlearning.in</span>
          </div>
        </div>
        <div class="col-lg-4">
          <h5>Contact us</h5>
          <p>mail : ganeshdagadi3@gmail.com</p>
          <router-link
            style="color: white !important; text-decoration: underline"
            to="/terms-conditions"
          >
            Terms and Conditions
          </router-link>
          <div></div>

          <router-link
            style="color: white !important; text-decoration: underline"
            to="/privacy-policy"
          >
            Privacy Policy
          </router-link>
          <div>
            <a href="">Donate</a>
          </div>
        </div>
        <div class="col-lg-4">
          <h5>Credits</h5>
          <a
            href="https://www.freepik.com/free-vector/milestones-business-projects-concept-illustration_23849167.htm#query=roadmap%20illustration&position=18&from_view=search&track=ais"
            >Image by storyset</a
          >
          on Freepik
          <div></div>
          <a
            href="https://www.freepik.com/free-vector/flat-creativity-concept-illustration_14620625.htm#query=idea%20illustration&position=0&from_view=search&track=ais"
            >Image by pikisuperstar</a
          >
          on Freepik
          <div></div>
          <a
            href="https://www.freepik.com/free-vector/donate-now-support-your-community-during-covid-19-outbreak-vector_26985623.htm#query=donation%20box&position=15&from_view=keyword&track=ais"
            >Image by rawpixel.com</a
          >
          on Freepik
        </div>
      </div>
    </div>
  </div>
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
    this.$store.dispatch("syncfoundCourseLocalStorage");
    this.$store.dispatch("syncCourseIdLocalStorage");
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
    clearMsg() {
      this.$store.dispatch("setMsgandError", "");
    },
  },
};
</script>

<style>
* {
  font-family: "Montserrat", sans-serif;
}
#wrapper-views {
  margin: 0 8vw;
  /* width: 80vw; */
}
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

.error-msg {
  width: 25%;
  text-align: center;
  margin: auto;
  margin-top: 2vh;
  background: #f7b2b2;
  border: none;
  border-radius: 10px;
  padding: 2vh 2vw;
  position: fixed;
  top: 5;
  left: 38%;
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
  position: fixed;
  top: 2vh;
  left: 38%;
}

#footer {
  text-align: center;
  margin-top: 5vh;
  height: 40vh;
  width: 100vw;
  background-color: #212121;
  color: white;
}
#footer h5 {
  margin: 1vh;
  text-align: center;
}
#googlePlay {
  width: 15vw;
  height: 20vh;
}

@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap");

@import "~bootstrap/dist/css/bootstrap.css";
</style>
