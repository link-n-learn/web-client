<template>
    <CourseHead :foundCourse="foundCourse"/>
    
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
            id:''
        }   
    },
    methods:{
        async getCourseDetails(){
            try{
                const response = await axios.get(`course/details/${this.id}`)
                console.log(response.data);
                this.foundCourse = response.data.foundCourse
            }
            catch(error){
                this.errorMsg='Error retreving data'
                console.log(error)
            }
    }
    },
    components:{
        CourseHead,
    }
} 
</script>
<style scoped>

</style>