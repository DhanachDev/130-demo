<!-- Please remove this file from your project -->
<template>
  <div class="center">
    <div class="title">
      <h1>130 ปี องค์กรอัยการ</h1>      
    </div>
    <div class="content">

      <!-- <a :href="'https://www3.ago.go.th/library/demo/create-card'">
        <button>เขียนการ์ดอวยพร</button>
      </a>
      <a :href="'https://www3.ago.go.th/library/demo/cards'">
        <button>ดูการ์ดทั้งหมด</button>
      </a> -->

      <!-- test push -->

      <NuxtLink to="/create-card">
        <button>เขียนการ์ดอวยพร</button>
      </NuxtLink>
      <NuxtLink to="/cards">
        <button>ดูการ์ดทั้งหมด</button>
      </NuxtLink>

      <a href="#">
        <button>ร่วมสนุกตอบคำถาม</button>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      path: 'https://www3.ago.go.th/library/demo'
    }
  }
}
</script>
<style lang="scss" scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
}

a {
  margin-bottom: 15px;
}
.content {
  display: flex;
  flex-direction: column;

  button {
    padding: 20px;
    border-radius: 60px;
    font-size: 1.2rem;
    border: none;
    width: 100%;
  }
}

</style>
