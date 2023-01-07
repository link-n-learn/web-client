<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container border border-3 col-6 offset-3" id="box">
        <div class="col-6 offset-3">
            <h1 class="text-center">Verification Page</h1>
            <form @submit.prevent="verify">
                <div>
                    <label for="otp" class="form-label">Enter the OTP</label>
                    <input type="password" class="form-control" v-model="verifyDetails.otp" placeholder="Enter the OTP">
                </div><br>
                <div>
                    <button class="btn btn-primary">Verify</button>
                </div>
            </form><br>
            <div class="container text-center">Resend OTP: <button class="btn btn-info" @click.prevent="resendOtp" v-bind:disabled="pausedForAMinute">Resend OTP</button></div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import store from "../../store/mainIndex";
    import router from "../../router/index";
    import { mapGetters } from 'vuex';
    export default {
        computed: mapGetters(["getuserId"]),
        data(){
            return{
                verifyDetails : {
                    otp : null,
                },
                pausedForAMinute : false
            }
        },
        methods: {
            async verify(){
                try{
                    console.log(this.getuserId)
                    const data = {
                        otp : this.verifyDetails.otp,
                        userId : this.getuserId
                    }
                    console.log(data)
                    const response = await axios.post('auth/signup/verify', data)
                    if(response.status == 200){
                        console.log(response)
                        store.dispatch('setMsg', response.data.msg)
                        store.dispatch('setError', "")
                        router.push({name : 'login'})
                    }else{
                        console.log("Status code is not 200.")
                    }
                }catch(err){
                    console.log(err)
                    console.log("Caught in catch block.")
                    store.dispatch('setError', err.response.data.err)
                    
                }             

            },
            async resendOtp(){
                const data = {
                    userId : this.getuserId
                }
                try{
                    console.log(this.getuserId)
                    this.pausedForAMinute = true;
                    setTimeout(() => this.pausedForAMinute = false , 60000);
                    const response = await axios.patch('auth/signup/resendotp', data)
                    this.$store.dispatch('setMsgandError')
                    this.$store.dispatch('setMsg' , response.data.msg)
                }catch(err){
                    console.log("Error: ", err)
                    this.$store.dispatch('setError' , err.response.data.err)
                }
            }
        }
    }
</script>

<style>
#box{
    padding: 15px;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>