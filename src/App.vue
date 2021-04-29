<template>
  <div id="app">
    <header class="header" />
    <main class="app__content">
      <router-view />
    </main>
  </div>
</template>

<style lang="stylus">
#app {
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  height: 100%;
  background: #F9F9F9;
}

.app__content {
  background: #fff;
  width: 944px;
  text-align: left;
  padding: 28px;
  margin: 0 auto;
  font-size: 13px;
  box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.1);
}
.header {
  height: 80px;
  background: #000;
}

h1 {
  font-size: 25px;
  font-weight: 500;
}
</style>
