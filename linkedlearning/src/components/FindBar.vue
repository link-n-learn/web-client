<template>
  <div @click="getsearchs(title)" class="row" id="firstdh">
    <input
      @click="getcourse"
      v-model="title"
      type="text"
      class="form-control"
      id="searchdh"
      placeholder="    Search For Courses"
    />
  </div>
</template>

<script>
export default {
  name: "FindBar",
  data() {
    return {
      title: "",
    };
  },
  props: {
    getsearchs: Function,
  },
};
</script>
<style>
#firstdh {
  justify-content: center;
  align-items: center;
  margin: 1vw 0vw;
}
#searchdh {
  height: 2vw;
  width: 30vw;
  border-radius: 0.6vw;
  box-shadow: 2px 2px 2px 2px #80808099;
  background-color: #d1cbcb4d;
}
</style>
