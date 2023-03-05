<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div>
    <CourseHead />
  </div>
  <div class="container" id="lectures" v-for="i in getfoundCourse.content" :key="i">
    <h2>{{ i.title }}</h2>
    <div class="row" id="MainCard" v-for="item in i.secContent" :key="item">
      <div class="col" id="card1" v-if="item.resourceType == 'video'"><img src="../../../assets/icons/youtube.png"></div>
      <div class="col" id="card1" v-if="item.resourceType == 'article'"><img src="../../../assets/icons/article.png"></div>
      <div class="col-6  text-center"><router-link :to="`/course/`+getfoundCourse._id+`/lecture/`+item._id" id="link">{{ item.title }}</router-link></div>
      <div class="col text-end" id="card2">Image</div>
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
  computed: mapGetters([
    "getfoundCourse",
  ]),
};
</script>

<style scoped>
#lectures {
  padding-top: 2.5rem;
}
#MainCard{
  background: rgb(243, 240, 240);
  font-size: 1.5rem;
  width: 85%;
  border-radius: 1.2rem;
  margin-top:1.5rem;
}
#card1{
  padding-left: 2rem;
}
#card2{
  padding-right: 2rem;
}
#link{
  color: black;
}
</style>
