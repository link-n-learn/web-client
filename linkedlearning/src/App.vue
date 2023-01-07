<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <nav class="navbar col-6 offset-10 footer py-3 mt-auto">
            <div class="navbar-link">
                <router-link v-if="!this.getisLoggedIn" :to="{name : 'signup'}" class="text2" >SignUp</router-link>
                <router-link :to="{name:'dashboard'}" v-if="this.getisLoggedIn" class="text5">Dashboard</router-link>
            </div>
            <div class="navbar-link active">
                <a href="/" v-if="!this.getisLoggedIn" class="text4">Home</a>
                <span v-if="this.getisLoggedIn" class="text4">{{this.getloggedInUser.username}}</span>
            </div>
            <div class="navbar-link">
                <button v-if="this.getisLoggedIn" class="button_logout" @click="logoutUser">Logout</button>
                <router-link v-if="!this.getisLoggedIn" :to="{ name : 'login'}" class="text3" >Login</router-link> 
            </div>
      </nav>
  </div>
  
  
  <div v-show="this.getError.length > 0" class="error-msg">
    {{ this.getError }}
  </div>
  <div v-show="this.getMsg.length > 0" class="success-msg">
   {{ this.getMsg }}
  </div>
  <nav class="container text-center"><br>
    <router-view/>
  </nav><br><br>
</template>

<script>

import { mapGetters } from 'vuex';
import router from './router';
import refreshInstance from './Config/axios';

export default {
  computed: mapGetters(["getError", "getMsg", "getisLoggedIn" , "getRefreshToken", "getloggedInUser"]),
  beforeMount : function() {
    this.$store.dispatch('syncAuthLocalStorage');
  },
  methods : {
    logoutUser : async function (){
      try{
        // const res = await axios.patch('auth/logout' , {})
        // console.log(res)

        const config = {
          headers : {
            authorization : `Bearer ${this.getRefreshToken}`
          }
        }
        const res = await refreshInstance.patch('/auth/logout',{},config);

        this.$store.dispatch('clearAuthState');
        this.$store.dispatch('setMsg' , res.data.msg);
        router.push({name : "login"});
      }catch(err){
        console.log(this.getisLoggedIn)
        console.log(err)
        this.$store.dispatch("setError", err.response.data.err);
      }
    }
  }
}

</script>

<style>
.signupLogin{
  margin-top: -40px;
}
#topNavbar {
  background-color: #071C52;
}
#text1{
  color: #FFDE59;
  font-size: 2rem;
}
.text2{
  font-size: 1.3rem;
  color: #FFDE59;
  text-decoration: none;
  padding-right: 2rem;
}
.text3{
  font-size: 1.3rem;
  color: #FFDE59;
  text-decoration: none;
  padding-right: 2rem;
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
.button_logout{
  padding: 0;
  border: none;
  background: none;
  color: #FFDE59;
  font-size: 1.5rem;
  margin-top: -50px;
  margin-right: 50px;
}
*{
    font-family: 'Montserrat', sans-serif;
}
.navbar{
  /* align-self: center; */
	width: 50%;
	margin-left:20%;
	padding-top: 1vh;
	padding-bottom: 1vh;
	padding-left: 5vh;
	padding-right: 5vh;
	height: auto;
	border: 0.5px solid #00000079;
	border-radius: 5vh;
    background: white;
    position: fixed;
    bottom: 5vh;
}

.navbar-link{
	width: fit-content;
}

.navbar img{
	width: 24px;
}
.text4{
  color : #071C52;
  font-size: 1.5rem;
  text-decoration: none;
}
.text5{
  text-decoration: none;
  color:#FFDE59;
  font-size: 1.5rem;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>