<template>
  <div @click="showquestion">
    <div>
      <CourseHead />
    </div>

    <div class="row selector-tabs">
      <span class="col-lg-3">
        <router-link
          class="non-highlighted-tabs"
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
          id="highlighted-tab"
          :to="`/course/` + foundCourse._id + `/discussion`"
          >Discussion</router-link
        >
      </span>
      <span class="col-lg-3"></span>
    </div>
    <div class="row" id="first-ds">
      <button id="newquestion" @click="getnewquestion">New question</button>
    </div>
    <div
      v-for="question in questions"
      :key="question._id"
      @click="getonequestion(question._id)"
    >
      <div class="row" id="choose-question">
        <h3>{{ question.title }}</h3>
      </div>
      <div class="row" id="choose-question" style="width: 70vw">
        <p style="width: 70vw">{{ question.descp }}</p>
      </div>
      <hr style="width: 70vw" />
    </div>
  </div>
</template>
<script>
import CourseHead from "../../../components/CourseHead.vue";
import router from "../../../router/index";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["getfoundCourse"]),
  created() {
    setTimeout(() => {
      this.$store.dispatch("setMsgandError");
    }, 5000);
    this.showquestion();
  },
  data() {
    return {
      course_id: "",
      questions: {},
      foundCourse: {},
    };
  },
  mounted() {
    this.foundCourse = this.getfoundCourse;
    console.log("bla bla");
    console.log(this.getfoundCourse);
  },
  methods: {
    getnewquestion() {
      this.course_id = this.$route.params.course_id;
      router.push({ path: `/course/${this.course_id}/question/new` });
    },
    async showquestion() {
      try {
        this.course_id = this.$route.params.course_id;
        const response = await axios.get(`/course/${this.course_id}/question`);
        console.log(response.data);
        this.questions = response.data.questions;
      } catch (err) {
        console.log(err);
      }
    },
    getonequestion(question_id) {
      router.push({
        path: `/course/${this.course_id}/question/${question_id}`,
      });
    },
  },
  components: {
    CourseHead,
  },
};
</script>
<style scoped>
button {
  width: 10vw;
}
#choose-question {
  cursor: pointer;
}
#newquestion {
  width: 12vw;
  margin-top: 5vh;
}
#first-ds {
  display: flex;
  justify-content: right;
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
@import "~bootstrap/dist/css/bootstrap.css";
</style>
