<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="heading">
    <h3>Create a course</h3>
  </div>

  <div class="row" id="first">
   <div id="d" class="col-md-4">Details</div>
   <div id="s" class="col-md-4">Syllabus</div>
   <div id="c" class="col-md-4">Content</div>

      <!-- <a href="#"><div id="d" class="col-md-4">Details</div></a>
      <a href="#"><div id="s" class="col-md-4">Syllabus</div></a>
      <a href="#"><div  id="c" class="col-md-4">Content</div></a> -->
  </div>
  <div id="cd"><h4>Course Details</h4></div>
  <div class="row" id="second">
    <div class="column" id="inti">
      <input type="text" class="form-control" id="title" placeholder="Title" />
    </div>
    <div class="column" id="empty"></div>
    <div class="column" id="select"><h5>Select Category</h5></div>
  </div>
  <div class="row" id="third">
    <div class="column" id="desc">
      <textarea
        type="text"
        class="form-control"
        id="description"
        placeholder="Description"
        rows="5"
        cols="40"
      ></textarea>
    </div>
    <div class="column" id="empty2"></div>
    <div class="column" id="scrollp">
      <div class="scroll-bg">
        <div class="scroll-div">
          <div class="scroll-object">
            <div class="scr">sdfd</div>
            <div class="scr">dsf</div>
            <div class="scr">sdf</div>
            <div class="scr">g</div>
            <div class="scr">re</div>
            <div class="scr">v</div>
            <div class="scr">er</div>
            <div class="scr">er</div>
            <div class="scr">er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
            <div>er</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div  id="fourth">
    <label for="avatar">Thumbnail:</label>
    <input
      type="file"
      id="avatar"
      name="avatar"
      accept="image/png,image/jpeg"
      placeholder="Upload Photo"
    />
  </div>

  <div id="fifth">
    <button class="prev">Previous</button>
    <button>Save</button>
    <button>Next</button>
  </div>

</template>

<script>
// import store from "../../store/mainIndex";
// import axios from 'axios';
// import { mapGetters } from 'vuex';

export default {};
</script>

<style>
.heading {
  text-align: center;
  justify-content: center;
  text-align: center;
  margin: 1vw 0vw;
}
.container {
  margin-right: 0;
}
#first {
  text-align: center;
  height: 2vw;
  width: 75vw;
  margin-top: 4vh;
  margin-left: 5vw;
  margin-bottom: -2vh;
}

.column {
  border: 0.5px solid grey;
  text-align: center;
  height: 1.5vw;
  width: 25vw;
  padding-bottom: 1.5rem;
  margin-right: 0;
}
#d {
  border-right: 0rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  background-color: #8000ff;
  color: white;
  box-shadow: 0px 2px #80808099;
}
#s {
  border-right: 0;
  border-left: 0;
  border-top: 1px #80808099 solid;
  box-shadow: 0px 2px #80808099;
}
#c {
  border-left: 0rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-top: 1px #80808099 solid;
  box-shadow: 0px 2px #80808099;
}
#title {
  height: 2.5vw;
  width: 40vw;
  box-shadow: 1px 3px #80808099;
  border-radius: 0.7rem;
}
#description {
  height: 15vw;
  width: 40vw;
  border-radius: 0.7rem;
  box-shadow: 4px 6px #80808099;
}
#cd {
  margin: 2vw 2vw;
  border: 0;
}
#sc {
  border: 0;
  padding: 0rem 5rem;
}
#ti {
  border: 0;
}
#part2 {
  justify-content: left;
}
label {
  display: block;
  font: 1.3rem "Fira Sans", sans-serif;
}
input,
label {
  margin: 0.4rem 0;
}

#second {
  width: 80vw;
  margin: 1vw 1vw;
  margin-top: 2vw;
}
#inti {
  border: 0;
}

#select {
  text-align: none;
  justify-content: none;
  border: 0;
}
#empty {
  text-align: none;
  justify-content: none;
  border: 0;
}
#third {
  margin: 2vw 1vw;
  max-width: 100%;
  height: 17vw;
}
#desc {
  border: 0;
}
.scroll-bg {
  width: 20vw;
  margin: 0% auto;
}
.scroll-div {
  width: 20vw;
  height: 15vw;
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 6px;
}
#scrollp {
  border: 0;
}
#empty2 {
  text-align: none;
  justify-content: none;
  border: 0;
}

#fourth {
  height: 1vw;
  /* justify-content: left; */
  margin: 2vw 1vw;
  margin-top: -2vh;
}
#fifth {
  max-width: 100%;
  justify-content: left;
  margin: 1vw 1vw;
}
button {
  margin: 10vh 10vw;
}
#s:hover {
  background-color: #8000ff;
}
#c:hover {
  background-color: #8000ff;
}

a:hover {
  text-decoration: none;
  color: white;
}
a {
  color: black;
}
button {
  background-color: #5020ff;
  color: white;
  border-radius: 10px;
  border: 0;
  width: 7vw;
}
.scroll-div {
  border: 0.5px solid #787676;
  box-shadow: 4px 4px #80808099;
}
.prev {
  background-color: #787676;
}
.scr:hover {
  background-color: #80808099;
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>
