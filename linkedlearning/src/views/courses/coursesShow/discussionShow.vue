<template>
    <div @click="showquestion" >
        <div>
            <CourseHead />
        </div>
        <div class="row" id="first-ds">
            <button id="newquestion" @click="getnewquestion">New question</button>            
        </div>
        <div v-for="question in questions" :key="question._id" @click="getonequestion(question._id)" >
                <div class="row" id="choose-question">
                    <h3>{{ question.title }}</h3>  
                </div>
                <div class="row" id="choose-question" style="width:70vw;">
                    <p style="width: 70vw">{{ question.descp }}</p>
                </div>
                <hr style="width: 70vw;"/>
        </div>
    </div>
</template>
<script>
import CourseHead from "../../../components/CourseHead.vue";
import router from "../../../router/index";
import axios from 'axios';

export default{
    created(){
        this.showquestion()
    },
    data(){
        return{
            course_id:'',
            questions:{}
        }
    },
    methods:{
        getnewquestion(){
            this.course_id = this.$route.params.course_id;
        router.push({ path: `/course/${this.course_id}/question/new` });
        },
        async showquestion(){
            try{
                this.course_id = this.$route.params.course_id;
            const response = await axios.get(`/course/${this.course_id}/question`)
            console.log(response.data)
            this.questions = response.data.questions
            }
            catch(err){
                console.log(err)
            }  
        },
        getonequestion(question_id){
            router.push({ path: `/course/${this.course_id}/question/${question_id}` });
        },
    },
    components: {
        CourseHead,
    },
    
}
</script>
<style scoped>
#choose-question{
    cursor:pointer;
}
#newquestion{
    width:9vw;
}
#first-ds{
    display:flex;
    justify-content: right;
}
@import "~bootstrap/dist/css/bootstrap.css";

</style>
