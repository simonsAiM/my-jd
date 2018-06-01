<template>
  <div class="home">
      <div class="m_layout"></div>
      <!-- 头部区域 -->
      <HomeHeaderView></HomeHeaderView>
      <!-- 轮播图 -->
      <HomeBannerView></HomeBannerView>
      <!-- 导航 -->
      <HomeNavView></HomeNavView>
      <!-- 商品区 -->
      <HomeMainView></HomeMainView>
  </div>
</template>

<script>
import HomeHeaderView from './HomeHeaderView';
import HomeBannerView from './HomeBannerView';
import HomeNavView from './HomeNavView';
import HomeMainView from './HomeMainView';

import { bingEvent,scrollPic} from '../assets/js/index';
export default{
    components : {
        HomeHeaderView,
        HomeBannerView,
        HomeNavView,
        HomeMainView
    }
}
</script>
<style>
@import '../assets/css/index.css'
</style>

