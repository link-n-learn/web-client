<template>
    <div>
        <FindBar/>
        <h3>Filter By</h3>
        <div class="row" id="filter">
            <div class="column" id="ratingscroll">
                <b>Rating:</b>
            </div>
            <div class="column" id="ratingscrolld">
                <select class="select">
                    <option class="values" value="4">4+</option>
                    <option class="values" value ="3">3+</option>
                    <option class="values" value="2">2+</option>
                    <option class="values" value="1">1+</option>
                </select>
            </div>
        </div>
        <div class="row" id="cards">
            <CourseCard :courses="courses[0]"/>
            <CourseCard :courses="courses[1]"/>
            <CourseCard :courses="courses[2]"/>
        </div>
    </div>

    
</template>

<script>
import FindBar from '../components/FindBar.vue'
import CourseCard from '../components/CourseCard.vue' 
import axios from 'axios'
    export default{
        name:'App',
    created(){
        this.getcourse()
        },
        data(){
            return{
                courses:[],
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
        },
        components:{
            FindBar,
            CourseCard,
        },
    }

</script>

<style scoped>
#filter{
    width:80vw;
    height: 2vw;
    border-radius: 0.5vw;
    background-color:#d1cbcb4d;
}
#cards{
  justify-content: left;
  align-items: center;
}
#ratingscroll{
    width:6vw;
    justify-content: center;
    text-align: center;
    border: 0vw;
}
#ratingscrolld{
    width:8vw;
    justify-content: center;
    text-align: center;
    border: 0vw;
    position: relative;
    display: flex;
    line-height: 3;
    overflow:hidden;
}
select{
    -webkit-appearance: none;
    -moz-appearance: none ;
    -ms-appearance: none;
    appearance: none;
    outline:0;
    border:0!important;
    border-radius:0.1vw;
}
select::-ms-expand{
    display:none;
}
select{
    flex:1;
    cursor:pointer;
}
#ratingscrolld::after{
    content:'\258C';
    position:absolute;
    top:0;
    right:0;
    cursor: pointer;
}

</style>