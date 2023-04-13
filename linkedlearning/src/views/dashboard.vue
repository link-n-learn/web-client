<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="row">
      <div class="col-lg-8"><FindBar :getsearchs="getshowsearch" /></div>
      <div class="col-lg-4">
        <button style="margin: 4vh 0" @click="getsearchcourse">Search</button>
      </div>
    </div>

    <AdvertismentBar />
    <div>
      <h2 class="cur">Search by catergories</h2>
      <span
        v-for="category in categories"
        :key="category._id"
        @click="selectCategory(category._id, category.title)"
        class="category-text"
      >
        <b class="select-category">{{ category.title }}</b>
      </span>
    </div>
    <hr />
    <div>
      <h2 class="cur">Currently learning</h2>
      <div class="row" id="cards">
        <CourseCard
          v-for="course in limitedenroll"
          :key="course._id"
          :courses="course"
          @click="getshowcourse(course._id)"
        />
      </div>
      <div id="viewdiv">
        <div id="viewall" @click="viewallpage"><b>View all</b></div>
      </div>
      <h2 class="cur">Recommended Courses</h2>
      <div class="row" id="cards">
        <CourseCard
          v-for="course in courses"
          :key="course._id"
          :courses="course"
          @click="getshowcourse(course._id)"
        >
        </CourseCard>
        <!-- <span
          v-for="i in courses.length"
          :key="courses[i]._id"
          @click="getshowcourse(courses[i]._id)"
        >
          <CourseCard :courses="courses[i]"> </CourseCard>
          <div v-if="i % 9 == 0">
            <AdvertBar></AdvertBar>
          </div>
        </span> -->
      </div>
    </div>
  </div>
</template>

<script>
import FindBar from "../components/FindBar.vue";
import AdvertismentBar from "../components/AdvertismentBar.vue";
// import AdvertBar from "../components/AdvertBar.vue";
import CourseCard from "../components/CourseCard.vue";
import axios from "axios";
import router from "../router/index";

export default {
  name: "App",
  async created() {
    setTimeout(() => {
      this.$store.dispatch("setMsgandError");
    }, 5000);
    this.getcourse(), this.getcategory();
    const response = await axios.get("/course/enrolled");
    console.log(response.data);
    this.enrolledCourses = response.data.enrolledCourses;
    if (this.enrolledCourses.length < 3) {
      for (var i = 0; i < this.enrolledCourses.length; i++) {
        this.limitedenroll[i] = this.enrolledCourses[i];
      }
      console.log(this.limitedenroll);
    } else {
      for (i = 0; i <= 2; i++) {
        this.limitedenroll[i] = this.enrolledCourses[i];
      }
    }
  },
  data() {
    return {
      courses: [],
      categories: [],
      enrolledCourses: [],
      limitedenroll: [],
      errorMsg: "",
      title: "",
    };
  },
  methods: {
    async getcourse() {
      try {
        const response = await axios.get("course/");
        console.log(response.data);
        this.courses = response.data.courses;
      } catch (error) {
        this.errorMsg = "Error retreving data";
        console.log(error);
      }
    },
    async getcategory() {
      try {
        const response = await axios.get("course/category");
        console.log(response.data);
        this.categories = response.data.categories;
      } catch (error) {
        this.errorMsg = "Error retreving data";
        console.log(error);
      }
    },
    async getsearchcourse() {
      // try {
      //   const response = await axios.get(`course/search?title=${this.title}`);
      //   console.log(response.data);
      //   this.courses = response.data.courses;
      // } catch (error) {
      //   this.errorMsg = "Error retreving data";
      //   console.log(error);
      // }
      router.push(`/searchCourse?searchText=${this.title}`);
    },
    viewallpage() {
      router.push({ name: "viewEnroll" });
    },
    getshowcourse(course_id) {
      console.log("HIt");
      router.push({ path: `/course/${course_id}/details` });
    },
    getshowsearch(title) {
      console.log(title);
      this.title = title;
    },
    async selectCategory(category_id, catTitle) {
      // try {
      //   console.log("sdf");
      //   const response = await axios.get(
      //     `/course/bycat?categoryId=${category_id}`
      //   );
      //   console.log(response.data);
      //   console.log(category_id);
      //   console.log("a;lsds;a");
      //   this.courses = response.data.courses;
      // } catch (error) {
      //   this.errorMsg = "Error retreving data";
      //   console.log(error);
      // }
      router.push(
        `/searchCourse?categoryId=${category_id}&categoryTitle=${catTitle}`
      );
    },
  },
  components: {
    FindBar,
    AdvertismentBar,
    // AdvertBar,
    CourseCard,
  },
};
</script>

<style>
.category-text:hover {
  cursor: pointer;
}
.select-category {
  margin: 2vw 2vw;
}
.cur {
  margin: 2vw 2vw;
}
#cards {
  justify-content: left;
  align-items: center;
}
#viewall {
  justify-content: center;
  text-align: center;
  width: 8vw;
  height: 2vw;
  color: blueviolet;
}
#viewdiv {
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>
