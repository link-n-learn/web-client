<template>
    <CourseHead :foundCourse="foundCourse"/>
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
export default {
    created(){
        this.id = this.$route.params.id,
        this.getCourseDetails()
    },
    data(){
        return{
            foundCourse:'',
            id:'',
        }   
    },
    methods:{
        async getCourseDetails(){
            try{
                const response = await axios.get(`course/details/${this.id}`)
                console.log(response.data);
                //this.foundCourse = response.data.foundCourse
                console.log(this.foundCourse.syllabus)
                //this.syllabus=this.foundCourse.syllabus
                const syllabusCopy = response.data.foundCourse.syllabus
                syllabusCopy.forEach(syllabus => {
                    const topics = syllabus.subTopics.split(",");
                    syllabus.subTopics = topics;
                });
                console.log('hi')
                this.foundCourse = response.data.foundCourse
                this.foundCourse.syllabus = syllabusCopy;
            }
            catch(error){
                this.errorMsg='Error retreving data'
                console.log(error)
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