<template>
  <div>
    <nav class="nav_menu">
      <div class="container nav_wrapper logo_wrapper">
        <a href="/" class="logo">
          <svg
            width="22"
            height="33"
            viewBox="0 0 22 33"
            fill="none"
            class="logo__img"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9681 19.8196C17.1154 16.3376 17.5453 12.3686 16.504 8.77216C15.4727 5.21073 12.9987 2.0147 9.32078 0.0188561C10.7826 2.39714 11.0833 5.10379 10.3877 7.56289C9.68551 10.0453 7.96806 12.2755 5.4049 13.6609C2.84174 15.0463 1.12428 17.2765 0.422092 19.7589C-0.274734 22.2224 0.0282716 24.9343 1.49682 27.3156C2.97666 29.7153 5.35878 31.3232 8.01034 31.9806C10.6417 32.633 13.6332 32.3271 16.1768 30.9522C18.74 29.5668 20.4388 27.324 21.141 24.8416C21.2839 24.3366 21.3822 23.839 21.4396 23.3182C20.9596 24.1018 20.1649 24.7323 19.1594 24.9846C18.1595 25.2354 17.1458 25.0839 16.3143 24.6359C15.4796 24.1863 14.8286 23.438 14.5596 22.4984C14.2902 21.5569 14.4832 20.6005 14.9681 19.8196Z"
              fill="#FB6C1C"
            />
          </svg>
          <span class="logo__title">Promeθeus Blockchain Explorer</span></a
        >
        <SearchBar />
      </div>
    </nav>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
export default {
  name: "Nav",

  components: {
    SearchBar
  },
  data() {
    return {};
  }
};
</script>

<style>
.nav_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  display: inline-block;
  margin-top: 4px;
  color: #fff !important;
}

.logo__title {
  display: inline-block;
  font-size: 30px;
  margin-left: 15px;
}
.logo__img {
  display: inline-block;
}
.nav_menu {
  display: flex;
  background-color: #131315;
  box-shadow: 0px 0px 2px rgba(42, 42, 42, 0.2);
}

@media screen and (max-width: 1200px) {
  .logo__title {
    font-size: 20px;
  }
  .nav_wrapper.logo_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    padding: 15px 0 !important;
  }
  .nav_menu {
    min-height: auto !important;
    height: auto !important;
  }
}
@media screen and (max-width: 420px) {
  .logo__title {
    font-size: 16px;
  }
}
</style>
