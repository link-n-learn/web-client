<template>
    <div>
        <div class="row" id="maincd">
            <div class="column" id="titlecd">
                <h2>{{ foundCourse.title }}</h2>
            </div>
            <div class="column" id="maincdstar" >
            <div class="row" id="box">
                <div class="rating">
                <img class="stars" src="../../src/assets/icons/goldstar.png"/>
                <img class="stars" src="../../src/assets/icons/goldstar.png"/>
                <img class="stars" src="../../src/assets/icons/goldstar.png"/>
                <img class="stars" src="../../src/assets/icons/goldstar.png"/>
                <img class="stars" src="../../src/assets/icons/silver.png"/>
                </div>
                <div class="row" id="review">
                    <small>4.2</small>
                </div>
                <div class="row" id="review">
                    <small>400 reviews</small>
                </div>
                <div class="row" id="enrollcd">
                    <small>1000 enrolled</small>
                </div>
                <div class="row" id="box1">
                    <img id="creatorlogo" :src="foundCourse.image"/>
                </div>
                <div class="row" id="creatorname">
                    <small>Course Creator</small>
                </div>
            </div>
            </div>
            
            </div>
        <div class="row">
            <div class="column" id="descpcd">
            <p>{{ foundCourse.descp }}</p>
            </div>
            
        </div>
        <button>Enroll Now</button>
        <hr />
    </div>
</template>

<script>
export default{
    name:'CourseHead',
        props:{
            foundCourse:Object,
        }
}

</script>

<style scoped>
    #maincd{
        margin:0vw 0vw;
        border: 0vw;
    }
    #maincdstar{
        margin:0vw 5vw;
        border: 0vw;
        margin-left:0vw;
    }
    #creatorlogo{
    width: 4vw;
    height: 4vw;
    border-radius: 4vw;
    margin: 0;
    padding: 0.1vw 0.1vw; 
    }
    #creatorname{
        display:flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        margin:1vw 0vw;
        margin-bottom:0vw;
    }
    hr{
        margin:3vw 0vw;
        width: 70vw;
    }
    #box1{
        display:flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        margin-bottom:0vw;
    }
    #box{
        display:flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        margin-top:0vw;
    }
    #enrollcd{
        display:flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        margin:1vw 0vw;
        margin-bottom:0.5vw;
    }
    #review{
        display:flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        margin:0.1vw 0vw;
        margin-bottom:0vw;
    }
    h2{
        margin:0vw 0vw;
    }
    #titlecd{
        justify-content: left;
        text-align: left;
        align-items: left;
        width:50vw;
        margin:1vw 0vw;
        border: 0vw;
    }
    #descpcd{
        justify-content: left;
        text-align: left;
        align-items: left;
        width:50vw;
        margin:2vw 1vw;
        border: 0vw;
    }
    button{
        margin:1vw 1vw;
    }
    .rating{
        width:10vw;
        margin:0vw 0vw;
        justify-content: center;
        text-align: center;
        align-items: center;

    }
    .stars{
    margin:0vw 0vw;
    height: 1.6vw;
    width:1.6vw;
    }

@import "~bootstrap/dist/css/bootstrap.css";

</style>