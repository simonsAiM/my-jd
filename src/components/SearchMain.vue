<template>
    <div class="search-main">
        <header class="top-bar">
            <a href="" onclick="window.history.go(-1)" class="icon-back"></a>
            <form v-on:submit.prevent class="goods-search">
                <input type="search" class="goods-search-content" placeholder="搜索" v-model="keyword" @keyup.enter="goSearch($event)">
            </form>
            <a href="#" class="search-menu"></a>
        </header>
        <section class="search-condition">
            <ul>
                <li>
                    <span class="all">全部</span>
                    <em class="all-icon"></em>
                </li>
                <li><span class="" @click="getByHot()">销量</span></li>
                <li>
                    <span>价格</span>
                    <em class="price_up" @click="getByPriceUp"></em>
                    <em class="price_down" @click="getByPriceDown"></em>
                </li>
                <li>
                    <span>筛选</span>
                    <em class="shaixuan"></em>
                </li>
            </ul>
        </section>
        <main class="main-goods-box">
            <ul>
                <li class="good-item" vv-for="item in mDatas">
                    <router-link to:"'/detail/'+item.product_id" class="goods-item-link">
                        <img v-lazy="item.product-img-url" alt="" class="goods-item-pic">
                        <div class="good-rights">
                            <div class="pp-name">
                                <span>{{item.product_name}}</span>
                            </div>
                            <div class="price-box">
                                <span>￥</span>
                                <span>{{item.product_uprice}}</span>
                                <span>.00</span>
                            </div>
                            <div class="pinglun-box">
                                <span>{{item.product_comment_num}}条评价</span>
                                <span>{{item.shop_name}}</span>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </main>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                keyword:'',
                mDatas :[]
            }
        },
        methods:{
            goSearch(event){
                let _this = this;
                if(_this.keyword == ''){
                    alert('请输入商品名称');
                }else{
                    _this.$http.get('/search',{
                        params : {
                            kw :_this.keyword,
                            hot :'',
                            priceUp:'',
                            priceDown :''
                        }
                    }).then((res)=>{
                        _this.mDatas = res.data;
                        console.log(_this.mDatas);
                    },(err)=>{
                        console.log(err);
                    });
                }
                window.event?window.event.returnValue = false:event.preventDefault();
                
            },
            getByHot(){
                let _this = this;
                if(_this.keyword == ''){
                    alert('请输入商品名称');
                }else{
                    _this.$http.get('/search',{
                        params : {
                            ke:_this.keyword,
                            hot : 'hot',
                            priceUp : '',
                            priceDown:''
                        }
                    }).then((res)=>{
                        _this.mDatas = res.data;
                        console.log(_this.mDatas);
                    },(err)=>{
                        console.log(err);
                    })
                }
            },
            getByPriceUp(){
                let _this = this;
                if(_this.keyword == ''){
                    alert('请输入商品名称');
                }else{
                    _this.$http.get('/search',{
                        params : {
                            kw:_this.keyword,
                            hot : 'hot',
                            priceUp :'priceUp',
                            priceDown:''
                        }
                    }).then((res)=>{
                        _this.mDatas = res.data;
                        console.log(_this.mDatas);
                    },(err)=>{
                        console.log(err);
                    })
                }
            },
            getByPriceDown(){
                let _this = this;
                if(_this.keyword == ''){
                    alert('请输入商品名称');
                }else{
                    _this.$http.get('/search',{
                        params : {
                            kw:_this.keyword,
                            hot : 'hot',
                            priceUp :'',
                            priceDown:'priceDown'
                        }
                    }).then((res)=>{
                        _this.mDatas = res.data;
                        console.log(_this.mDatas);
                    },(err)=>{
                        console.log(err);
                    })
                }
            }
        }
    }
</script>
