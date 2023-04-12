<template>
  <div>
    <div v-if="parentIsReady">
      <CourseHead />
    </div>

    <div class="row selector-tabs">
      <span class="col-lg-3">
        <router-link
          id="highlighted-tab"
          :to="`/course/` + foundCourse._id + `/details`"
          >Syllabus</router-link
        >
      </span>
      <span class="col-lg-3">
        <router-link
          class="non-highlighted-tabs"
          :to="`/course/` + foundCourse._id + `/lecture`"
          >Lectures</router-link
        >
      </span>
      <span class="col-lg-3">
        <router-link
          class="non-highlighted-tabs"
          :to="`/course/` + foundCourse._id + `/discussion`"
          >Discussion</router-link
        >
      </span>
      <span class="col-lg-3"></span>
    </div>

    <ul
      v-for="sectionSyllabus in foundCourse.syllabus"
      :key="sectionSyllabus._id"
    >
      <h4>{{ sectionSyllabus.title }}</h4>
      <li v-for="topic in sectionSyllabus.subTopics" :key="topic">
        {{ topic }}
      </li>
    </ul>
  </div>
</template>
<script>
import CourseHead from "../../../components/CourseHead.vue";
import axios from "axios";
import store from "../../../store/mainIndex";
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["getfoundCourse"]),
  async created() {
    setTimeout(() => {
      this.$store.dispatch("setMsgandError");
    }, 5000);
    // await store.dispatch("syncfoundCourseLocalStorage");
    this.course_id = this.$route.params.course_id;
    const response = await axios.get(`course/details/${this.course_id}`);
    console.log(response.data);

    const syllabusCopy = response.data.foundCourse.syllabus;
    syllabusCopy.forEach((syllabus) => {
      const topics = syllabus.subTopics.split(",");
      syllabus.subTopics = topics;
    });
    this.foundCourse = response.data.foundCourse;
    this.foundCourse.syllabus = syllabusCopy;
    if (response.status == 200) {
      await store.dispatch("setfoundCourse", this.foundCourse);
      await this.$store.dispatch("syncfoundCourseLocalStorage");
    }
    this.parentIsReady = true;
  },
  data() {
    return {
      foundCourse: "",
      course_id: "",
      parentIsReady: false,
    };
  },
  methods: {
    // async getCourseDetails() {
    //   try {
    //   } catch (error) {
    //     this.errorMsg = "Error retreving data";
    //     console.log(error);
    //     store.dispatch("setError", error.response.data.err);
    //   }
    // },
  },

  components: {
    CourseHead,
  },
};
</script>
<style scoped>
ul {
  margin: 5vw 0vw;
}
li {
  list-style-type: disc;
  margin: 0vw 3vw;
  font-size: 1.2rem;
}
#mid-nav {
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 0vw 0vw;
  width: 100vw;
}
a {
  color: black !important;
}

.selector-tabs {
  text-align: center;
  width: 100vw;
}

#highlighted-tab {
  padding: 1vh 2vw;
  background-color: #8000ff;
  border-radius: 10px;
  color: white !important;
}

.non-highlighted-tabs {
  padding: 1vh 2vw;
  background-color: #dfbeff;
  border-radius: 10px;
  color: black !important;
}
</style>
