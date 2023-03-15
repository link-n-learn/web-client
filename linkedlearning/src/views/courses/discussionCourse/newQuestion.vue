<template>
    <div>
        <div>
            <h3 class="heading">New Question</h3>
        </div>
        <div class="container" id="newform">
            <input type="text" 
            placeholder="      Question title" 
            class="form-control" 
            id="title" 
            style="box-shadow: 4px 2px 4px 2px #80808099; background-color: #d1cbcb4d;"
            v-model="newquestion.title"/>
            <textarea type="text"
                class="form-control"
                id="description"
                placeholder="    Details"
                rows="5"
                cols="40" 
                style="box-shadow: 4px 4px 4px 4px #80808099; background-color: #d1cbcb4d;"
                v-model="newquestion.descp">
            </textarea>
            <button @click="sendquestion">Submit</button>
            <p  v-if="msgvalue" id="correct">{{ msg }}</p>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios'
export default{
    data(){
        return{
            courses_id:'',
            newquestion:{
                title:'',
                descp:'',
            },
            msg:"",
            msgvalue:false,

        }
    },
    methods:{
        async sendquestion(){
        this.courses_id = this.$route.params.course_id;
        const newquestionDetails = {
        question:this.newquestion
        };
      console.log(newquestionDetails)
        
        try{
            const response = await axios.post(`/course/${this.courses_id}/question`,newquestionDetails)
            console.log(response)
            this.msg = response.data.msg
            this.msgvalue = true
            console.log('hi')
        }
        catch(err){
            console.log(err)
        }
        }
    }
}
</script>

<style>
    #title{
        margin: 2vw 0vw;
    }
    .container{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #correct {
        background-color: rgb(57, 231, 57);
        border-radius: 0.5vw;
        width: 10vw;
        box-shadow: 2px 3px 2px 2px rgb(42, 146, 42);
        color: white;
        justify-content: center;
        text-align: center;
        margin: 0vw 1vw;
    }
</style>
