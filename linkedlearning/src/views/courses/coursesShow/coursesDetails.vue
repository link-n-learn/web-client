<template>
    <CourseHead/>
    <ul v-for="sectionSyllabus in foundCourse.syllabus" :key="sectionSyllabus._id">
        <h4>{{ sectionSyllabus.title }}</h4>
        <li  v-for="topic in  sectionSyllabus.subTopics" :key="topic" >
                    {{ topic }}
        </li>
    </ul>
    
</template>
<script>
import CourseHead from '../../../components/CourseHead.vue' 
import axios from 'axios'
import store from "../../../store/mainIndex";
import { mapGetters } from "vuex";

export default {
    computed:mapGetters([
        "getfoundCourse"
    ]),
    created(){
        this.course_id = this.$route.params.course_id
    },
    mounted(){
        console.log('mount')
        this.getCourseDetails()

    },
    data(){
        return{
            foundCourse:'',
            course_id:'',
        }   
    },
    methods:{
        async getCourseDetails(){
            try{
                const response = await axios.get(`course/details/${this.course_id}`)
                console.log(response.data);
                
                //this.foundCourse = response.data.foundCourse
                //console.log(this.foundCourse.syllabus)
                //this.syllabus=this.foundCourse.syllabus
                const syllabusCopy = response.data.foundCourse.syllabus
                syllabusCopy.forEach(syllabus => {
                    const topics = syllabus.subTopics.split(",");
                    syllabus.subTopics = topics;
                });
                this.foundCourse = response.data.foundCourse
                this.foundCourse.syllabus = syllabusCopy;
                if (response.status == 200) {
                    await store.dispatch("setfoundCourse", this.foundCourse);
                }
            }
            catch(error){
                this.errorMsg='Error retreving data'
                console.log(error)
                store.dispatch("setError", error.response.data.err);
                
            }
        },
        
    },
    
    components:{
        CourseHead,
    },
}
</script>
<style scoped>
    ul{
        margin:1vw 0vw;
    }
    li{
        list-style-type: disc;
        margin:0vw 3vw;
    }
</style>