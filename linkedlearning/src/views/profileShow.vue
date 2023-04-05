<template>
  <div @click="getprofile">
    <div id="mainps">
      <div id="firstps">
        <img
          :src="userdata.image"
          style="height: 7vw; width: 7vw; border-radius: 2.6vw"
        />
      </div>
      <div id="secondps">
        <h5>{{ userdata.username }}</h5>
      </div>
      <div>
        <p>{{ userdata.email }}</p>
      </div>
    </div>
    <div id="adps">
      <AdvertBar />
    </div>
    <div @click="getusercourses" id="centerps">
      <div
        class="row"
        style="
          width: 90vw;
          justify-content: left;
          text-align: left;
          align-items: left;
        "
      >
        <div class="column" style="width: 20vw; border: 0">
          <h4>Courses created</h4>
        </div>
        <div class="column" style="width: 10vw; border: 0; margin-left: 50vw">
          <button id="addnewcourse" style="width: 8vw">New Course</button>
        </div>
        <div class="row" id="cards">
          <CourseCard
            v-for="course in courses"
            :key="course._id"
            :courses="course"
            @click="getshowcourse(course._id)"
            id="coursecard"
          >
          </CourseCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import CourseCard from "../components/CourseCard.vue";
import AdvertBar from "../components/AdvertBar.vue";
import router from "../router/index";

export default {
  created() {
    this.getprofile(), this.getusercourses();
  },
  data() {
    return {
      userdata: {},
      courses: {},
    };
  },
  methods: {
    async getprofile() {
      try {
        const response = await axios.get("/user/");
        console.log(response.data);
        this.userdata = response.data.userData;
      } catch (err) {
        console.log(err);
      }
    },
    async getusercourses() {
      try {
        const response = await axios.get("/course/created");
        console.log(response.data);
        this.courses = response.data.courses;
      } catch (err) {
        console.log(err);
      }
    },
    getshowcourse(course_id) {
      console.log(course_id);
      this.$store.dispatch("setcourseId", course_id);
      this.$store.dispatch("syncCourseIdLocalStorage");
      router.push({ name: "details" });
    },
  },
  components: {
    CourseCard,
    AdvertBar,
  },
};
</script>
<style>
#cards {
  justify-content: left;
  align-items: center;
}
#mainps {
  justify-content: center;
  text-align: center;
  align-items: center;
}
#addnewcourse {
  margin: 0;
}
#centerps {
  justify-content: left;
  text-align: left;
  align-items: left;
  margin-top: 3vw;
}
#adps {
  margin-left: 3vw;
}
</style>
