<template>
  <div class="row" id="firstdh">
    <input
      @input="getsearchs(title)"
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
  justify-content: right;
  align-items: right;
  margin: 3vh 3vw;
}
#searchdh {
  height: 3vw;
  padding: 0 1vw;
  width: 35vw;
  border-radius: 0.6vw;
  box-shadow: 2px 2px 2px 2px #80808099;
  background-color: #d1cbcb4d;
}
</style>
