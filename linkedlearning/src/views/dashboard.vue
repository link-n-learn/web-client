<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <FindBar/>
  <AdvertismentBar />
  <div>
  <h2 class="cur">Search by catergories</h2>
    <span v-for="category in categories" :key="category._id">
      <b class="select-category">{{ category.title }}</b>
    </span>
  </div>
  <hr/>
    <div> 
      <h2 class="cur">Currently learning</h2>
    <div class="row" id="cards">
      <CourseCard :courses="courses[0]"/>
      <CourseCard :courses="courses[1]"/>
      <CourseCard :courses="courses[2]"/>
    </div>
    <div id="viewdiv">
      <div id="viewall" @click="viewallpage"><b>View all</b></div>
    </div>
    <AdvertBar/>
    <h2 class="cur">Recommended Courses</h2>
    <div class="row" id="cards">
    <CourseCard @click="getshowcourse(course._id)" v-for="course in courses" :key="course._id" :courses="course">
        <router-link :to="`/course/${course._id}/details`"></router-link>
    </CourseCard>
    </div>
  </div>
  </div>
</template>

<script>
import FindBar from '../components/FindBar.vue'
import AdvertismentBar from '../components/AdvertismentBar.vue'
import AdvertBar from '../components/AdvertBar.vue'
import CourseCard from '../components/CourseCard.vue' 
import axios from 'axios'
import router from "../router/index";


export default{
  name:'App',
    created(){
        this.getcourse(),
        this.getcategory()
        },
        data(){
            return{
                courses:[],
                categories:[],
                errorMsg:''
            }
        },
        methods :{
            async getcourse(){
            try{
                const response = await axios.get("course/")
                console.log(response.data);
                this.courses = response.data.courses
            }
            catch(error){
                this.errorMsg='Error retreving data'
                console.log(error)
            }
           },
           async getcategory(){
            try{
                const response = await axios.get("course/category")
                console.log(response.data);
                this.categories = response.data.categories
            }
            catch(error){
                this.errorMsg='Error retreving data'
                console.log(error)
            }
           },
           viewallpage(){
                router.push({ name: "details" });
           },
           getshowcourse(id)
           {
            console.log("HIt")
                router.push({ path : `/course/${id}/details`});
           }
        },
  components:{
    FindBar,
    AdvertismentBar,
    AdvertBar,
    CourseCard,
  },
  
}

</script>

<style>
.select-category{
  margin:2vw 2vw;
}
.cur{
  margin:2vw 2vw;
}
#cards{
  justify-content: left;
  align-items: center;
}
#viewall{
  justify-content: center;
  text-align: center;
  width:8vw;
  height:2vw;
  color:blueviolet;
}
#viewdiv{
  width:80vw;
  display:flex;
  justify-content: center;
  align-items: center;
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>
