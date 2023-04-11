<template>
  <div @click="getprofile">
    <div id="mainps">
      <div id="firstps">
        <img
          :src="userdata.image"
          style="height: 10vw; width: 10vw; border-radius: 2.6vw"
        />
        <div>
          <img
            style="width: 20px; height: 20px"
            @click="modalShow = true"
            src="../assets/icons/pencil.png"
          />
        </div>
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
          <button id="addnewcourse" style="width: 8vw">
            <router-link to="/details">New Course</router-link>
          </button>
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

    <div class="modal-cus" v-if="modalShow">
      <div class="modal-content">
        <h3>Edit profile picture</h3>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png,image/jpeg"
          placeholder="Upload Photo"
          @change="onImageSelected"
        />
        <div class="row">
          <button
            @click="modalShow = false"
            class="buttonc"
            id="b1"
            style="color: white; background-color: red"
          >
            <b>Cancel</b>
          </button>
          <button
            class="buttonc"
            id="b2"
            @click="uploadProfilePic"
            style="color: white; background-color: green"
          >
            <b>Save</b>
          </button>
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
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("setMsgandError");
    }, 5000);
  },
  data() {
    return {
      userdata: {},
      courses: {},
      modalShow: false,
      uploadedImage: "",
    };
  },
  methods: {
    onImageSelected(event) {
      this.uploadedImage = event.target.files[0];
    },
    async uploadProfilePic() {
      const fd = new FormData();
      fd.append("picture", this.uploadedImage, this.uploadedImage.name);
      try {
        await axios.put("user/profilePic", fd);
        this.$store.dispatch("setMsg", "Profile picture has been updated.");
      } catch (err) {
        this.$store.dispatch("setError", "Something went wrong");
      }
    },
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

.modal-cus {
  width: 50vw;
  height: 30vh;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  margin-left: 30vw;
  margin-top: 30vh;
  border: 1px solid black;
  border-radius: 25px;
}

.modal-content {
  margin: 2vh 3vw;
}

a {
  color: white !important;
  text-decoration: none;
}

a:hover {
  color: white !important;
}
</style>
