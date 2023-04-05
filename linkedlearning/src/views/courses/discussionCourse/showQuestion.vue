<template>
    <div class="container" id="main-sq">

    <div class="column" id="maincol">
    <div class="mainsq">
        <div @click="showOneQuestion">
            <div class="row" id="firstsq"> 
                <h3 class="column" id="headsq">
                    {{ question.title }} 
                </h3>
                
            </div>
            <div class="row" id="secondsq">
                <h6>{{ question.descp }}</h6>
            </div>
            <div class="row" id="thirdsq">
                <h4>
                    Answers
                </h4>
            </div>
            <div v-for="answer in question.answers" :key="answer._id" class="row" id="fourthsq">
                <h6 class="answersq">{{ answer.answer }}</h6>
                <hr class="answersq" style="width:52vw"/>
            </div>
            <div class="row" id="fifthsq">
                <textarea type="text"
                class="form-control"
                id="description"
                placeholder="Your Answer"
                rows="5"
                cols="40"
                style="box-shadow: 4px 4px 4px 4px #80808099; background-color: #d1cbcb4d;"
                v-model="answers.answer">
                </textarea>
            </div>
            <div>
                <button @click="updateAnswer" class="submitsq" style="width:7vw">Submit</button>
            </div>
            
    </div>
    </div>
</div>
</div>
<div class="column" id="addsq">
                
</div>

    
</template>

<script>
import axios from 'axios';

export default {
    async created(){
        this.showOneQuestion()
    },
    data(){
        return{
            question:{

            },
            answers:{
                answer:'',
            },
        }
    },
    methods:{
        async showOneQuestion(){
            try{
                this.course_id = this.$route.params.course_id;
                this.question_id = this.$route.params.question_id;
                const response = await axios.get(`/course/${this.course_id}/question/${this.question_id}`) 
                console.log(response.data)
                this.question = response.data.question
            }
            catch(err){
                console.log(err)
            }
        },
        async updateAnswer(){
            try{
                this.course_id = this.$route.params.course_id;
                this.question_id = this.$route.params.question_id;
                const sendanswer = {
                    answer:this.answers
                };
                const response = await axios.post(`/course/${this.course_id}/question/${this.question_id}/answer`,sendanswer)
                console.log(response)
            }
            catch(err){
                console.log(err)
            }
        },
    }
}
</script>

<style>
#maincol{
    width:90vw;
    height:90vh;
    justify-content: left;
    text-align:left;
    align-items:left;
    margin-left:0vw;
    border:0;
}
#main-sq{
    margin-left: 0vw;
    display: flex;
    justify-content: left;
    text-align: left;
    align-items: left;
    border:0;
}
#firstsq{
    margin:2vw 0vw;
    width:20vw;
    margin-right:0vw;
}
#headsq{
    border:0;
    text-align: left;
}
#secondsq{
    margin:1vw 0vw;
    width:50vw;
}
#thirdsq{
    margin:2vw 0vw;
    width:50vw;
}
#fourth{
    margin:1vw 0vw;
    width:50vw;
}
.answersq{
    margin:1vw 1vw;
    margin-top:0vw;
    width:50vw;
}
#fifthsq{
    margin:1vw 0vw;
    width:50vw;
}
#sixthsq{
    margin:1vw 0vw;
    width:10vw;
    justify-content: left;
}
.submitsq{
    justify-content: left;
    align-items: left;
    margin:2vw 0vw;
}
#addsq{
    border: 0;
    height: 90vh;
    width: 25vw;
    margin-left: 47vw;
    margin-top: -42vw;
    box-shadow: 4px 2px 4px 2px #80808099;
    background-color: #d1cbcb4d;
    border-radius: 0.5vw;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>