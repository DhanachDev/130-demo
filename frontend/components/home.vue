<!-- Please remove this file from your project -->
<template>
  <div>
    <div class="center">
      <div class="title">
        <img src="../assets/img/logo.png" alt="" width="70">
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
          <button>ตอบคำถามชิงรางวัล</button>
        </a>
      </div>
    </div>    

    <div class="f-bt-l">
      <img src="../assets/img/flower.png" alt="">
    </div>

    <div class="f-bt-r">
      <img src="../assets/img/flower.png" alt="">
    </div>
  </div>

</template>
<script>
export default {
  head() {
    return {
      style: [
                {
                    cssText: `
                        body {
                          background: url(/library/demo/_nuxt/img/bg-seamless.svg) repeat;
                          background-color: #fdf6e8;
                        }
                    `
                }
            ]
    }
  },
  data() {
    return {
      path: 'https://www3.ago.go.th/library/demo'
    }
  }
}
</script>
<style lang="scss" scoped>

// * {
//     font-family: 'Prompt';
//     font-weight: 200;
// }

// body {
    
//     // background: url(../../assets/img/bottom-seamless.svg) no-repeat bottom;
//     background-size: cover;
//     background-attachment: fixed;
//     background-color: #f1f1f1;
// }

button:hover {
  color: white;
  background: rgb(223,192,111);
  background: linear-gradient(42deg, rgba(223,192,111,1) 0%, rgba(245,220,148,1) 26%, rgba(207,177,86,1) 51%, rgba(231,204,125,1) 89%, rgba(212,182,94,1) 100%);
}
.f-bt-l {
  position: fixed;
  bottom: -180px;
  left: -130px;
  z-index: -1;
}

.f-bt-r {
  position: fixed;
  -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
    -ms-filter: fliph; /*IE*/
    filter: fliph; /*IE*/
  bottom: -180px;
  right: -130px;
  z-index: -1;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
}

.title {
  text-align: center;
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

@media (max-width: 1170px) {
  .f-bt-l, .f-bt-r {
    img {
      width: 500px;
    }
  }
}


@media (max-width: 750px) {
  .f-bt-r {
    bottom: -119px;
    right: -96px;
    width: 400px;
    transform: rotate(275deg);
  }

  .f-bt-l {
    top: -177px;
    left: -130px;
    bottom: auto;
    transform: rotate(92deg);
  }
}
</style>
