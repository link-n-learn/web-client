<template>
  <div>
    <div class="row" id="maincd">
      <div class="column" id="titlecd">
        <h2>{{ foundCourse.title }}</h2>
      </div>
      <div class="column" id="maincdstar">
        <div class="row" id="box">
          <div class="rating" style="margin-top: 12vh">
            <img
              class="stars"
              src="../../src/assets/icons/goldstar.png"
              v-for="i in rate"
              :key="i"
            />
            <img
              class="stars"
              src="../../src/assets/icons/silver.png"
              v-for="i in 5 - rate"
              :key="i"
            />
          </div>
          <div class="row" id="review" style="margin-top: 2vh">
            <small>{{ ratingLen }} ratings </small>
          </div>
          <div class="row" id="enrollcd">
            <small>{{ foundCourse.EnrollmentCount }} enrolled</small>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column" id="descpcd">
        <p>{{ foundCourse.descp }}</p>
      </div>
    </div>

    <!-- <div class="rate-in">
      <h5>Rate the course</h5>
      <button @click="rateCourse(5)" class="rate-btn">5</button>
      <button @click="rateCourse(4)" class="rate-btn">4</button>
      <button @click="rateCourse(3)" class="rate-btn">3</button>
      <button @click="rateCourse(2)" class="rate-btn">2</button>
      <button @click="rateCourse(1)" class="rate-btn">1</button>
    </div> -->
    <button @click="getConfirm">Enroll Now</button>
    <button v-if="!value" style="display: none">Confirm</button>
    <button v-if="value" @click="getEnsure">Confirm</button>
    <!-- <p v-if="msgvalue" id="correct">{{ msg }}</p>
    <P v-if="errvalue" id="wrong">Already enrolled</P> -->
    <hr />
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
      <h6 class="nav">
        <router-link :to="`/course/` + foundCourse._id + `/discussion`"
          >Discussion</router-link
        >
      </h6>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  created() {
    this.course_id = this.$route.params.course_id;
  },
  async mounted() {
    this.foundCourse = this.getfoundCourse();
    this.foundCourse.ratings.forEach((rating) => {
      this.ratingTotal += rating.rate;
    });
    if (this.foundCourse.ratings.length > 0) {
      this.rate = this.ratingTotal / this.foundCourse.ratings.length;
      this.ratingLen = this.foundCourse.ratings.length;
    }
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
      ratingTotal: 0,
      rate: 0,
      ratingLen: 0,
    };
  },
  methods: {
    ...mapGetters(["getfoundCourse"]),
    getConfirm() {
      this.value = true;
    },
    async getEnsure() {
      try {
        const response = await axios.patch(`/course/${this.course_id}/enroll`);
        this.$store.dispatch("setMsg" , response.data.msg)
      } catch (error) {
        this.$store.dispatch("setError" , "You are already enrolled");
      }
    },
    async rateCourse(rate) {
      try {
        await axios.patch(`course/${this.foundCourse._id}/rate?rate=${rate}`);
        this.$store.dispatch("setMsg", "Thankyou for the rating");
      } catch (err) {
        console.log(err);
        this.$store.dispatch("setError", "You have already rated this course");
      }
    },
  },
};
</script>

<style scoped>
button {
  width: 10vw;
}
h5 {
  margin-top: 4vh;
  margin-left: 1vw;
}
a {
  color: rgb(48, 48, 48) !important;
}
p {
  font-size: 1.1rem;
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
  width: 100vw;
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
  height: fit-content;
  margin: 0 1vw;
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

.rate-btn {
  background-color: #888888;
  width: 3vw;
  margin: 1vh;
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>
