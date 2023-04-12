<template>
  <div>
    <h1 v-if="isCategoryResult">{{ categoryName }}</h1>
    <h1 v-if="!isCategoryResult">Search result</h1>
    <div class="row">
      <CourseCard
        v-for="course in courses"
        :key="course._id"
        :courses="course"
        @click="getshowcourse(course._id)"
      >
      </CourseCard>

      <div v-if="courses.length == 0">No courses found</div>
    </div>
  </div>
</template>

<script>
// import FindBar from "../components/FindBar.vue";
import CourseCard from "../components/CourseCard.vue";
import router from "@/router";
import axios from "axios";
export default {
  name: "App",
  async created() {
    if (this.$route.query.categoryId) {
      this.isCategoryResult = true;
      this.categoryName = this.$route.query.categoryTitle;
      try {
        const response = await axios.get(
          `/course/bycat?categoryId=${this.$route.query.categoryId}`
        );
        this.courses = response.data.courses;
      } catch (err) {
        this.$store.dispatch("setError", "Something went wrong");
      }
    } else {
      this.isCategoryResult = false;
      try {
        const response = await axios.get(
          `course/search?title=${this.$route.query.searchText}`
        );
        this.courses = response.data.courses;
      } catch (err) {
        console.log(err);
        this.$store.dispatch("setError", "Something went wrong");
      }
    }
  },
  data() {
    return {
      courses: [],
      isCategoryResult: false,
      categoryName: "",
    };
  },
  methods: {
    // async getcourse() {
    //   try {
    //     const response = await axios.get("course/");
    //     console.log(response.data);
    //     this.courses = response.data.courses;
    //   } catch (error) {
    //     this.errorMsg = "Error retreving data";
    //     console.log(error);
    //   }
    // },
    getshowcourse(course_id) {
      console.log("HIt");
      router.push({ path: `/course/${course_id}/details` });
    },
  },
  components: {
    // FindBar,
    CourseCard,
  },
};
</script>

<style scoped>
#filter {
  width: 80vw;
  height: 2vw;
  border-radius: 0.5vw;
  background-color: #d1cbcb4d;
}
#cards {
  justify-content: left;
  align-items: center;
}
#ratingscroll {
  width: 6vw;
  justify-content: center;
  text-align: center;
  border: 0vw;
}
#ratingscrolld {
  width: 8vw;
  justify-content: center;
  text-align: center;
  border: 0vw;
  position: relative;
  display: flex;
  line-height: 3;
  overflow: hidden;
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  border: 0 !important;
  border-radius: 0.1vw;
}
select::-ms-expand {
  display: none;
}
select {
  flex: 1;
  cursor: pointer;
}
#ratingscrolld::after {
  content: "\258C";
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
</style>
