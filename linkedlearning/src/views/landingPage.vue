<template>
  <div id="page-container">
    <div id="logo-section">
      <div class="row">
        <div class="col-lg-5">
          <img src="../assets/_learn.jpg" alt="Brand Logo" />
        </div>
        <div class="col-lg-7">
          <h1>
            Learn for free with well organized
            <span style="margin-left: 5vw"
              >resources from all around the web</span
            >
          </h1>
          <router-link to="/signup"><button>Signup Now</button></router-link>
        </div>
      </div>
    </div>
    <hr />
    <div id="problem-section">
      <div class="row">
        <div class="col-lg-6">
          <h3>Want to learn something but cant find the right resources?</h3>
        </div>
        <div class="col-lg-6">
          <img src="../assets/_worry.jpg" alt="worring man" srcset="" />
        </div>
      </div>
    </div>
    <div id="roadmap-section">
      <div class="row">
        <div class="col-lg-6">
          <img src="../assets/_roadmap.jpg" alt="roadmap" srcset="" />
        </div>
        <div class="col-lg-6">
          <h3>Wish there was a more structured roadmap to follow?</h3>
        </div>
      </div>
    </div>
    <hr />
    <div id="product-intro">
      <h3>We've got you covered. Watch how Linked Learning can help you</h3>
      <iframe
        width="800"
        height="550"
        src="https://www.youtube.com/embed/Rzz5eL05gSc"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>

    <hr />
    <div id="CTA">
      <div class="row">
        <div class="col-lg-6">
          <h3>Signup now and begin learning</h3>
          <router-link to="/signup"><button>Signup Now</button></router-link>
        </div>
        <div class="col-lg-6">
          <img src="../assets/Linkedlearning.jpg" alt="" srcset="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["getisLoggedIn"]),
  mounted() {
    if (this.getisLoggedIn) {
      router.push("/dashboard");
    }
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
h1 {
  margin-left: 3vw;
  font-size: 2.2rem;
}
/* #page-container {
  margin: 0 5vw;
} */
button {
  width: 10vw;
  height: 3vw;
  margin-top: 3vh;
}
#logo-section {
  margin-left: auto;
  margin-top: 5vh;
  text-align: center;
}
#logo-section h1 {
  text-align: left;
  margin-top: 13vh;
}
#logo-section img {
  width: 40vw;
  height: 60vh;
}

#problem-section {
  margin-top: 10vh;
}
#problem-section img {
  width: 45vw;
  height: 60vh;
}

#problem-section h3 {
  text-align: center;
  margin-top: 25%;
  color: #7c0999;
}

#roadmap-section img {
  width: 45vw;
  height: 50vh;
}

#roadmap-section h3 {
  text-align: center;
  margin-top: 25%;
}

#product-intro {
  color: #7c0999;
  margin-top: 6vh;
  text-align: center;
}

iframe {
  margin-top: 5vh;
}

#CTA {
  text-align: center;
  margin-top: 5vh;
}
#CTA img {
  width: 250px;
  height: 250px;
}
#CTA h3 {
  margin-top: 10%;
}
</style>
