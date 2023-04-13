<template>
  <div>
    <div class="row" id="seconddh">
      <div class="col-lg-4">
        <img src="../assets/heart.jpg" alt="" srcset="" />
      </div>
      <div class="col-lg-8" style="text-align: center; margin-top: 10vh">
        <h5>
          It takes a lot of effort and money to keep the platform
          <b>ad-free</b>
          <div style="color: purple; margin-top: 3vh">
            <b>We rely on your support.</b>
          </div>
          <div>
            <button>
              <a href="">Donate</a>
            </button>
          </div>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdvertismentBar",
};
</script>

<style scoped>
a {
  font-size: 1.2rem;
}
button {
  margin-top: 3vh;
}
#seconddh {
  box-shadow: 4px 4px 4px 4px #80808099;
  background-color: rgb(255, 244, 244);
  border-radius: 0.5vw;
  border: 1px solid rgb(180, 180, 180);
  margin: 3vh 3vw;
  height: 20vw;
  width: 80vw;
}
img {
  width: 80%;
  margin: 0 0;
  height: 20vw;
}
</style>
