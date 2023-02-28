<template>
    <div>
      <iframe :src="embedUrl" width="560" height="315"></iframe>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        videoUrl: "https://youtu.be/dx4Teh-nv3A",
        embedUrl: "",
      };
    },
    mounted() {
      // Get the video ID from the original URL
      const videoId = this.videoUrl.split("/").pop();
  
      // Set the new URL with the video ID
      this.embedUrl = `https://www.youtube.com/embed/${videoId}`;
    },
  };
  </script>
  