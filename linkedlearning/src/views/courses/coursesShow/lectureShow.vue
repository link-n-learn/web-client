<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div>
    <CourseHead />
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
  <router-view />
</template>

<script>
import CourseHead from "../../../components/CourseHead.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      videoUrl: "https://youtu.be/dx4Teh-nv3A",
      embedUrl: "",
    };
  },
  mounted() {
    // Get the video ID from the original URL
    setTimeout(() => {
      this.$store.dispatch("setMsgandError");
    }, 5000);
    const videoId = this.videoUrl.split("/").pop();
    console.log("Found Course");
    console.log(this.getfoundCourse);
    // Set the new URL with the video ID
    this.embedUrl = `https://www.youtube.com/embed/${videoId}`;
    console.log(this.getfoundCourse._id);
  },
  components: {
    CourseHead,
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
</style>
