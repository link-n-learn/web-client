<template>
  <div class="main">
    <div class="card">
      <img class="card-img-top" :src="courses.image" />
      <div class="card-body">
        <div class="cardtitle">
          <h4>{{ courses.title }}</h4>
        </div>
        <div class="card-text" id="first-text">
          <small>{{ courses.descp }}</small>
        </div>
        <div class="rating">
          <img
            class="stars"
            src="../../src/assets/icons/goldstar.png"
            v-for="i in rate"
            :key="i"
          />
          <img
            class="stars"
            src="../../src/assets/icons/silver.png"
            v-for="i in 5 - rate"
            :key="i"
          />
        </div>

        <div class="card-text">
          <div class="row" id="bottom-text">
            <div class="column" id="logod">
              <img id="creatorlogo" :src="courses.owner.image" />
            </div>
            <div class="column" id="course-creator">
              <small>{{ courses.owner.username }}</small>
            </div>
            <div class="column" id="enrolled">
              <small>{{ courses.EnrollmentCount }} enrolled</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    courses: Object,
  },
  data() {
    return {
      ratingTotal: 0,
      rate: 0,
    };
  },
  mounted() {
    this.courses.ratings.forEach((rating) => {
      this.ratingTotal += rating.rate;
    });

    if (this.courses.ratings.length > 0) {
      this.rate = this.ratingTotal / this.courses.ratings.length;
    }
  },
};
</script>

<style>
#bottom-text {
  display: flex;
}
.main {
  margin: 0vw 0vw;
  display: flex;
  flex-wrap: wrap;
  width: 26vw;
  margin-left: 2vw;
  margin-right: 0vw;
}
.card {
  width: 23vw;
  box-shadow: 2px 2px 3px 3px grey;
  margin: 2vw 0vw;
  border-radius: 0.7vw;
}
.card:hover {
  background-color: #a09f9f4d;
  cursor: pointer;
  transform: scale(1.03);
  transition: all 1s ease;
}
.card-img-top {
  width: 23vw;
  height: 13vw;
  border-radius: 0.6vw;
  padding: 0.5vw 0.5vw;
  margin: 0vw 0vw;
}
.card-body {
  justify-content: center;
  text-align: center;
  margin: 0vw 0vw;
}
.rating {
  margin: 2vw 0vw;
}
#first-text {
  height: 4vw;
  justify-content: left;
  text-align: left;
  margin: 0.3vw 0vw;
}
.stars {
  height: 1.6vw;
  width: 1.6vw;
  margin: 1vw 0vw;
  margin-bottom: 0vw;
}
#creatorlogo {
  width: 2vw;
  height: 2vw;
  border-radius: 3vw;
  margin: 0;
}
#course-creator {
  border: 0;
  margin-bottom: 0vw;
  margin: 1vw 1vw;
  width: 9vw;
}
#logod {
  width: 1vw;
  border: 0;
  margin: 1vw 0vw;
}
#enrolled {
  width: 8vw;
  justify-content: right;
  margin: 1vw 0vw;
  border: 0;
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>
