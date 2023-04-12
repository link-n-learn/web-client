<!-- eslint-disable vue/no-parsing-error -->
<template>
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
        id="highlighted-tab"
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
  <div id="lectures" v-for="i in getfoundCourse.content" :key="i">
    <h2>{{ i.title }}</h2>
    <div class="row" id="MainCard" v-for="item in i.secContent" :key="item">
      <div class="col-1" id="card1" v-if="item.resourceType == 'video'">
        <img src="../../../assets/icons/youtube.png" />
      </div>
      <div class="col-1" id="card1" v-if="item.resourceType == 'article'">
        <img src="../../../assets/icons/article.png" />
      </div>
      <div class="col-11" v-if="item.resourceType == 'video'">
        <router-link
          :to="`/course/` + getfoundCourse._id + `/lecture/` + item._id"
          id="link"
          >{{ item.title }}</router-link
        >
      </div>
      <div class="col-11" v-if="item.resourceType == 'article'">
        <a :href="item.link">{{ item.title }}</a>
      </div>
    </div>
  </div>
  <div class="rating">
    <h5>Rate the course</h5>
    <button @click="rateCourse(5)" class="rate-btn">5</button>
    <button @click="rateCourse(4)" class="rate-btn">4</button>
    <button @click="rateCourse(3)" class="rate-btn">3</button>
    <button @click="rateCourse(2)" class="rate-btn">2</button>
    <button @click="rateCourse(1)" class="rate-btn">1</button>
  </div>
  <router-view />
</template>

<script>
import CourseHead from "../../../components/CourseHead.vue";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      videoUrl: "https://youtu.be/dx4Teh-nv3A",
      embedUrl: "",
      foundCourse: "",
    };
  },
  mounted() {
    // Get the video ID from the original URL
    setTimeout(() => {
      this.$store.dispatch("setMsgandError");
    }, 5000);
    const videoId = this.videoUrl.split("/").pop();
    console.log("Found Course");
    this.foundCourse = this.getfoundCourse;
    // Set the new URL with the video ID
    this.embedUrl = `https://www.youtube.com/embed/${videoId}`;
    console.log(this.getfoundCourse._id);
  },
  components: {
    CourseHead,
  },
  methods: {
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
  computed: mapGetters(["getfoundCourse"]),
};
</script>

<style scoped>
/* #lectures {
  text-align: left;
} */
a {
  color: black !important;
  font-size: 1.2rem;
}
#MainCard {
  box-shadow: 4px 2px 4px 2px #80808099;
  background-color: #d1cbcb4d;
  font-size: 1.5rem;
  width: 85%;
  border-radius: 0.5vw;
  margin-top: 1.5rem;
}

#card1 {
  padding-left: 2rem;
}
h2 {
  margin-top: 8vh;
}
#card2 {
  padding-right: 2rem;
}
#link {
  color: black;
}

img {
  margin-top: -7px;
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
  font-size: 1rem;
}

.non-highlighted-tabs {
  padding: 1vh 2vw;
  background-color: #dfbeff;
  border-radius: 10px;
  color: black !important;
  font-size: 1rem;
}

.rating {
  width: 80vw;
  margin: 5vw 0vw;
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
</style>
