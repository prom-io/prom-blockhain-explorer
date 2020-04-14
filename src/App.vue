<template>
  <div id="app">
    <header>
      <Nav />
    </header>
    <div class="container">
      <router-view />
    </div>
    <footer class="footer">
      <div class="container">
        <span class="text_secondary__lighten">
          Prometeus Blockchain Explorer</span
        >
        <span class="text_secondary__lighten">
          © Copyright - Promeθeus Team 2019-2020</span
        >
      </div>
    </footer>
  </div>
</template>

<script>
import Nav from "@/components/Nav";

export default {
  name: "App",

  components: {
    Nav
  }
};
</script>
<style>
.footer .container span:first-child {
  margin-right: 20px;
}
.footer .container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.footer {
  background-color: #2b2b2b;
  height: 65px;
  width: 100%;
  padding: 15px !important;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
}
</style>
