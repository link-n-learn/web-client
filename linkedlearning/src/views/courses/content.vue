<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div class="container">
  <div class="heading">
            <div class="coursec"><h3>Create a course</h3></div>
            <div class="row" id="firstc">
            <div class="column" id="detailc">Details</div>
            <div class="column" id="syllabusc">Syllabus</div>
            <div class="column" id="contentc">Content</div>
            </div>
            
  </div>

            <div id="secondc" v-for="section in courseContent" :key="section.id">
              <div class="row" id="thirdc">
                <input type="text" id="section-titlec" class="form-control" v-model="section.title" placeholder="    Section-Title">
                <img src="../../assets/icons/delete.png" id="deletec">
              </div>

              <div class="row" v-for="lecture in section.secContent" :key="lecture.id" id="fourthc">
                
                <div class="column" id="space-1c">
                        <img v-if="lecture.resourceType == 'video'" src="../../assets/icons/youtube.png" id="icon"> 
                        <img v-if="lecture.resourceType == 'article'" src="../../assets/icons/article.png" id="icon"> 
                </div>
                <div class="column" id="space-2c">
                        <h5>{{ lecture.title }}</h5>
                </div>
                <div class="column" id="space-3c">
                        <img src="../../assets/icons/delete.png" id="icon"> 
                </div>
              </div>
              <div class="row" id="sixthc">
                <button class="buttonc" id="b1"><b>+Video</b></button>
                <button class="buttonc" id="b2"><b>+Article</b></button>
              </div>
            </div>
            <!-- <div id="secondc">
              <div class="row" id="thirdc">
                <input type="text" id="section-titlec" class="form-control" placeholder="    Section-Title">
                <img src="../../assets/icons/delete.png" id="deletec">
              </div>
              <div class="row" id="fourthc">
                <div class="column" id="space-1c">
                        <img src="../../assets/icons/youtube.png" id="youtube"> 
                </div>
                <div class="column" id="space-2c">
                        <h5>What is web development</h5>
                </div>
                <div class="column" id="space-3c">
                        <img src="../../assets/icons/delete.png" id="youtube"> 
                </div>
              </div>
             
              <div class="row" id="sixthc">
                <button class="buttonc" id="b1"><b>+Video</b></button>
                <button class="buttonc" id="b2"><b>+Article</b></button>
              </div>
            </div> -->
            
            <div class="row" id="seventhc">
                <button id="addc"><b>+Section</b></button>
            </div>
            
</div>
</template>

<script>
// import router from "../../router/index";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  computed: mapGetters(["getcourseId"]),
  data(){
    return {

      courseContent : [
        {
          title : "",
          id :"kjdhajkhrjajfbajkbf",
          secContent : [
            {
              id : "fjhwkfkjsdnf",
              resourceType : "video",
              link : "",
              title : "How internet works"
            },
            {
              id : "fjhwkfkjsdnf",
              resourceType : "article",
              link : "",
              title : "How internet works"
            }

          ]
        }
      ]


    }
  },
  async mounted(){
    this.$store.dispatch("syncCourseIdLocalStorage");
    try{
      console.log("sending request")
      const response = await axios.get(`course/${this.getcourseId}/content`)
      console.log(response.data.content.length)
      if(response.data.content.length != 0){
        this.courseContent = response.data.content
      }
    }catch(err){
      console.log(err)
    }
  }
}
</script>


<style>
#container{
    justify-content: center;
    align-items: center;
    margin-left:5vw;
}
#detailc{
            border-right:0rem;
            border-top-left-radius:1rem;
            border-bottom-left-radius:1rem;
            background-color:#8000FF;
            color:white;
            box-shadow:0px 2px #80808099;
        }
#syllabusc{
            background-color:#8000FF;
            color:white;
            border-right:0;
            border-left:0;
            box-shadow:0px 2px #80808099;
}
#contentc{
            background-color:#8000FF;
            color:white;
            border-left:0rem;
            border-top-right-radius:1rem;
            border-bottom-right-radius:1rem;
            box-shadow:0px 2px #3a3a3a99;
}
#seventhc{
  justify-content: center;
  align-items: center;
}
#addc{
  margin-top: 2vw;
  margin-left:2vw;
}
#section-titlec{
      width:50vw;
      height:2.5vw;
      box-shadow: 0px 3px 3px grey;
      border-radius: 1px solid grey;
      border-radius: 0.5rem;
}
#icon{
    height: 2vw;
    width: 2vw;
}
#deletec{
  height: 2vw;
    width: 4vw;
    margin-left: 18vw;
    margin-top: 0.5vw;
}
#secondc{
  border:1px solid grey;
  width:75vw;
  box-shadow:0px 0px 3px 3px#80808099;
  background-color:#d1cbcb4d;
  border-radius:2vw;
  margin-top:2vw;
}
#thirdc{
  margin-top:2vw;
  margin-left: 1vw;
}
 #b1{
  margin-left:2vw;
  margin-right:2vw;
  background-color: #75737356;
  color: black;
  border-radius: 1vw;
  width: 10vw;
  height: 2vw;
 }
 #b2{
  margin-left:0vw;
  background-color: #75737356;
  color: black;
  border-radius: 1vw;
  width: 10vw;
  height: 2vw;
 }
 #addc{
  border-radius: 1vw;
  height: 2vw;
  width: 12vw;
 }
 #space-1c{
  border:0;
  width:4vw;
 }
 #space-3c{
  border:0;
  width:4vw;
  margin-left:25vw;
 }
 #fourthc{
  width:60vw;
  height:3vw;
  margin-top:2vw;
  margin-bottom:1vw;
  margin-left:2vw;
  box-shadow:  0px 3px 3px grey;
  background-color: white;
  border: 1px solid grey;
  border-radius: 0.3rem;
  color: black;
 }

 #space-2c{
  border:0;
  margin-top:0.5vw;
 }
#heading{
  justify-content: center;
  align-items: center;
}


</style>