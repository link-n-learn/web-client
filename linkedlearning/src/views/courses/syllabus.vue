<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="heading">
    <h3>Create a course</h3>
  </div>

  <div class="row" id="first">
    <div id="d" class="col-md-4" @click="detailsPage">Details</div>
    <div id="s" class="col-md-4" @click="syllabusPage">Syllabus</div>
    <div id="c" class="col-md-4">Content</div>

    <!-- <a href="#"><div id="d" class="col-md-4">Details</div></a>
      <a href="#"><div id="s" class="col-md-4">Syllabus</div></a>
      <a href="#"><div  id="c" class="col-md-4">Content</div></a> -->
  </div>

  <div class="row" id="second">
    <div class="column" id="syllabus"><h4>Syllabus</h4></div>
    <!-- <div class="column" id="empty"></div> -->
    <div class="column" id="save"><button id="saveb" @click.prevent="SaveButton">save</button></div>
  </div>
  <div v-for="data in information" :key="data.title" id="MainContainer">
    <div class="row" id="third">
      <div class="column" id="inti">
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="Section title"
          v-model="data.title"
        />
      </div>
      <div class="column" id="dustbin"><img src="./delete.png" @click="DeleteButton(data)" /></div>
    </div>
    <div class="row" id="fourth">
      <input
        type="text"
        class="form-control"
        id="topic"
        placeholder="Enter topics separated by commas.Example:Topic 1,Topic 2,Topic 3,etc "
        v-model="data.subTopics"
      />
    </div>
    <div class="row" id="fifth">
      <div id="line"></div>
    </div>
  </div>
  <div class="row" id="sixth">
    <button id="AddButton" @click.prevent="addButton"><b>+Add</b></button>
  </div>
</template>

<script>
import router from "../../router/index";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      information: [
        {
          title: "",
          subTopics: "",
        },
      ],
    };
  },
  computed: mapGetters(["getcourseId"]),
  methods: {
    syllabusPage() {
      router.push({ name: "syllabus" });
    },
    detailsPage() {
      router.push({ name: "details" });
    },
    contentPage() {
      router.push({ name: "content" });
    },
    addButton() {
      const newData = {
        title : "",
        subTopics : "",
      }
      this.information.push(newData)
    },  
    DeleteButton(data) {
      const index = this.information.indexOf(data);
      console.log(index);
      this.information.splice(index, 1);
    },
    async SaveButton() {
      console.log("On CLicking Save Button!");
      console.log(this.information);
      try{
        const syllabus = {
          syllabus : this.information
        }
        const response = await axios.patch(`course/${this.getcourseId}/syllabus`, syllabus);
        console.log(response);
        this.$store.dispatch("setMsg", response.data.msg);  
      }catch(err){
        console.log("Error on Clicking Save Button");
        console.log(err);
      }
    },
  },
  async beforeMount() {
    this.$store.dispatch("syncCourseIdLocalStorage");
    try {
      const response = await axios.get(`course/${this.getcourseId}/syllabus`);
      this.information = response.data.syllabus;
      if(this.information.length == 0){
        this.information = [
          {
            title : "",
            subTopics : "",
          },
        ]
      }
      console.log(this.information);
      console.log(this.getcourseId);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  },
};
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
#MainContainer{
  margin-top: -8rem;
}
#first {
  text-align: center;
  height: 2vw;
  width: 75vw;
  margin-top: 4vh;
  margin-left: 5vw;
  margin-bottom: -2vh;
}

#AddButton {
  margin-top: -6rem;
  margin-left: 75rem;
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
  background-color: #8000ff;
  color: white;
  border-top: 1px #80808099 solid;
  box-shadow: 0px 2px #80808099;
}
#c {
  border-left: 0rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  background-color: #8000ff;
  border-top: 1px #80808099 solid;
  box-shadow: 0px 2px #80808099;
}

#description {
  height: 15vw;
  width: 40vw;
  border-radius: 0.7rem;
  box-shadow: 4px 6px #80808099;
}

#second {
  width: 80vw;
  margin: 1vw 1vw;
  margin-top: 2vw;
  padding-bottom: 7.5rem;
}
#syllabus {
  border: 0;
  justify-content: left;
  text-align: left;
  margin: 1rem 1rem;
}
#save {
  border: 0;
  margin: 1vw 7vw;
}
#inti {
  text-align: none;
  justify-content: none;
  border: 0;
}

#empty {
  text-align: none;
  justify-content: center;
  border: 0;
}
#third {
  /* width: 100vw;
  max-width: 100%;
  justify-content: left;
  margin: 2vw 12vw; */
  margin-top: -2rem;
  padding-top: -5rem;
  margin: 2vw 1vw;
  max-width: 100%;
  height: 17vw;
}
#title {
  height: 2.5vw;
  width: 40vw;
  box-shadow: 1px 3px #80808099;
  border-radius: 0.7rem;
}
#desc {
  border: 0;
}

#fourth {
  /* height: 1vw;
  justify-content: left;
  margin: 0vw 12vw; */
  height: 1vw;
  justify-content: left;
  margin: 2vw 1vw;
  margin-top: -2vh;
}
#topic {
  height: 5vw;
  width: 78vw;
  margin-top: -12rem;
  box-shadow: 1px 4px 3px 3px #80808099;
  border-radius: 0.7rem;
  background-color: #d1cbcb4d;
}
#fifth {
  width: 100vw;
  justify-content: center;
  margin: 6vw 12vw;
  margin-bottom: 10rem;
}
#line {
  width: 78vw;
  height: 0;
  margin-top: -8rem;
  border: 0.1px solid grey;
}
#sixth {
  width: 8vw;
  justify-content: center;
  margin: 2vw 0vw;
}
button {
  margin: 0vw 10vw;
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
  background-color: #80808099;
  color: black;
  border-radius: 10px;
  border: 0;
  width: 7vw;
}
#dustbin {
  border: 0;
  width: 2vw;
  margin: 5vw 70vw;
  margin-top: -8.5rem;
}
#saveb {
  background-color: #8000ff;
  color: white;
  margin-top: 1rem;
  margin-left: 33rem;
}
img {
  width: 2vw;
  height: 2vw;
  margin-top: 7px;
}
</style>
