<template>
    <div>
        <div>
            <CourseHead />
        </div>
        <button id="newquestion" @click="getnewquestion">New question</button>
    </div>
</template>
<script>
import CourseHead from "../../../components/CourseHead.vue";
import router from "../../../router/index";

export default{
    
    data(){
        return{
            course_id:''
        }
    },
    methods:{
    getnewquestion(){
        this.course_id = this.$route.params.course_id;
      router.push({ path: `/course/${this.course_id}/question/new` });
    }
    },
    components: {
    CourseHead,
    },
    
}
</script>
<style scoped>
#newquestion{
    width:8vw;
}
</style>
