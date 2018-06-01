<template>
  <div id="home-h">
      <header class="m-header" >
          <div class="m-header-box" id="my-search">
              <a href="#" class="icon-logo"></a>
              <form action="#">
                  <span class="icon-search"></span>
                  <input type="search" class="search" placeholder="点击搜索" @click="goSearch($event)">
              </form>
              <router-link to="/login">登录</router-link>
          </div>
      </header>
  </div>
</template>
<script>
    export default{
        methods : {
            goSearch(event){
                this.$router.push('/search');
                window.event?window.event.returnValue = false : event.preventDefault();
            }
        }
    }
</script>
