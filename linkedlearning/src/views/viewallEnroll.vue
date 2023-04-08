<template>
  <div>
    <h2 class="enrolledcourses">Enrolled courses</h2>
    <div>
      <div class="row" id="cards">
        <CourseCard
          v-for="course in enrolledCourses"
          :key="course._id"
          :courses="course"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CourseCard from "../components/CourseCard.vue";
import axios from "axios";
export default {
  async created() {
    setTimeout(() => {
      this.$store.dispatch("setMsgandError");
    }, 5000);
    const response = await axios.get("/course/enrolled");
    console.log(response.data);
    this.enrolledCourses = response.data.enrolledCourses;
  },
  data() {
    return {
      enrolledCourses: [],
    };
  },
  components: {
    CourseCard,
  },
};
</script>
<style scoped>
#cards {
  justify-content: left;
  align-items: center;
}
.enrolledcourses {
  margin: 1vw 2vw;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
