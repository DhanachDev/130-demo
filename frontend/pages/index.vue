<template>
  <Home/>
</template>

<script>
export default {}
</script>

<style>
* {
  font-family: 'Prompt';
}

button {
  cursor: pointer;
  background: #ffe7d3;
  color: #523435;
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

@media (max-width: 1170px) {
  .f-bt-l, .f-bt-r {
      width: 500px
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
