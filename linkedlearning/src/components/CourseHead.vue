<template>
    <div>
        <div class="row" id="maincd">
            <div class="column" id="titlecd">
                <h2>{{ foundCourse.title }}</h2>
            </div>
            <div class="column" id="maincdstar" >
            <div class="row" id="box">
                <div class="rating">
                <img class="stars" src="../../src/assets/icons/goldstar.png"/>
                <img class="stars" src="../../src/assets/icons/goldstar.png"/>
                <img class="stars" src="../../src/assets/icons/goldstar.png"/>
                <img class="stars" src="../../src/assets/icons/goldstar.png"/>
                <img class="stars" src="../../src/assets/icons/silver.png"/>
                </div>
                <div class="row" id="review">
                    <small>4.2</small>
                </div>
                <div class="row" id="review">
                    <small>400 reviews</small>
                </div>
                <div class="row" id="enrollcd">
                    <small>{{ foundCourse.EnrollmentCount }} enrolled</small>
                </div>
                <div class="row" id="box1">
                    <img id="creatorlogo" :src="foundCourse.image"/>
                </div>
                <div class="row" id="creatorname">
                    <small>Course Creator</small>
                </div>
            </div>
            </div>
            
            </div>
        <div class="row">
            <div class="column" id="descpcd">
            <p>{{ foundCourse.descp }}</p>
            </div>
            
        </div>
        <button @click="getConfirm">Enroll Now</button>
        <button v-if="!value" style="display:none;">Confirm</button>
        <button v-if="value" @click="getEnsure">Confirm</button>
        <p v-if="msgvalue" id="correct">{{ msg }}</p>
        <P v-if="errvalue" id="wrong">Already enrolled</P>
        <hr/>
        <div class="row" id="mid-nav">
            <h6 class="nav"><router-link :to="`/course/`+foundCourse._id+`/details`">Syllabus</router-link></h6>
            <h6 class="nav"><router-link :to="`/course/`+foundCourse._id+`/lecture`">Lecture</router-link></h6>
            <h6 class="nav"><router-link :to="`/course/`+foundCourse._id+`/discussion`">Discussion</router-link></h6>

        </div>
      </div>
    <!-- <div class="row">
      <div class="column" id="descpcd">
        <p>{{ foundCourse.descp }}</p>
      </div>
    </div> -->
    <!-- <button @click="getConfirm">Enroll Now</button>
    <button v-if="!value" style="display: none">Confirm</button>
    <button v-if="value" @click="getEnsure">Confirm</button>
    <p v-if="msgvalue" id="correct">{{ msg }}</p>
    <P v-if="errvalue" id="wrong">Already enrolled</P>
    <hr /> -->
    <!-- <div class="row" id="mid-nav">
      <h6 class="nav">
        <router-link :to="`/course/` + foundCourse._id + `/details`"
          >Syllabus</router-link
        >
      </h6>
      <h6 class="nav">
        <router-link :to="`/course/` + foundCourse._id + `/lecture`"
          >Lecture</router-link
        >
      </h6>
    </div> -->
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  created() {
    this.course_id = this.$route.params.course_id;
  },
  async mounted() {
    console.log("ho"), (this.foundCourse = this.getfoundCourse());
    console.log("vuex");
    console.log(this.foundCourse);
  },
  computed: mapGetters([
    "getError",
    "getMsg",
    "getisLoggedIn",
    "getRefreshToken",
    "getloggedInUser",
  ]),
  name: "CourseHead",
  data() {
    return {
      value: false,
      course_id: "",
      msg: "",
      msgvalue: false,
      errvalue: false,
      foundCourse: {},
    };
  },
  methods: {
    ...mapGetters(["getfoundCourse"]),
    getConfirm() {
      this.value = true;
    },
    async getEnsure() {
      try {
        // const data = {
        // foundCourse: this.getfoundCourse,
        // };
        const response = await axios.patch(`/course/${this.course_id}/enroll`);
        console.log("prev");
        console.log(response.data);
        this.msg = response.data.msg;
        this.msgvalue = true;
      } catch (error) {
        this.errorMsg = "Error retreving data";
        console.log(error);
        this.errvalue = true;
      }
    },
  },
};
</script>

<style scoped>
a {
  color: rgb(48, 48, 48);
}
#correct {
  background-color: rgb(57, 231, 57);
  border-radius: 0.5vw;
  width: 10vw;
  box-shadow: 2px 3px 2px 2px rgb(42, 146, 42);
  color: white;
  justify-content: center;
  text-align: center;
  margin: 0vw 1vw;
}
#wrong {
  background-color: rgb(252, 4, 4);
  border-radius: 0.5vw;
  width: 10vw;
  box-shadow: 2px 3px 2px 2px rgb(192, 21, 21);
  color: white;
  justify-content: center;
  text-align: center;
  margin: 0vw 1vw;
}
#mid-nav {
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 0vw 0vw;
}
.nav {
  margin: 0vw 0vw;
  width: 7vw;
}
#maincd {
  margin: 0vw 0vw;
  border: 0vw;
}
#maincdstar {
  margin: 0vw 5vw;
  border: 0vw;
  margin-left: 0vw;
}
#creatorlogo {
  width: 4vw;
  height: 4vw;
  border-radius: 4vw;
  margin: 0;
  padding: 0.1vw 0.1vw;
}
#creatorname {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 1vw 0vw;
  margin-bottom: 0vw;
}
hr {
  margin: 3vw 0vw;
  margin-bottom: 1vw;
  width: 70vw;
}
#box1 {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-bottom: 0vw;
}
#box {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-top: 0vw;
}
#enrollcd {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 1vw 0vw;
  margin-bottom: 0.5vw;
}
#review {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 0.1vw 0vw;
  margin-bottom: 0vw;
}
h2 {
  margin: 0vw 0vw;
}
#titlecd {
  justify-content: left;
  text-align: left;
  align-items: left;
  width: 50vw;
  margin: 1vw 0vw;
  border: 0vw;
}
#descpcd {
  justify-content: left;
  text-align: left;
  align-items: left;
  width: 50vw;
  margin: 2vw 1vw;
  border: 0vw;
}
button {
  margin: 1vw 1vw;
}
.rating {
  width: 10vw;
  margin: 0vw 0vw;
  justify-content: center;
  text-align: center;
  align-items: center;
}
.stars {
  margin: 0vw 0vw;
  height: 1.6vw;
  width: 1.6vw;
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>
