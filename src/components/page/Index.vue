// 首页
<template>
    <main>
        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="(item,index) in imgList" :key="index">
                <img :src="item.url" />
            </el-carousel-item>
        </el-carousel>
    </main>
</template>

<script>
export default {        
    data () {
        return {
            imgList: [
                { url: require('@/assets/1.jpeg') },
                {url:require('@/assets/2.jpeg')},
                { url: require('@/assets/3.jpg') },
                { url: require('@/assets/4.jpeg') },
            ]
        }
    },
    mounted(){

    },
    methods:{
        
    }
}
</script>

<style>
.el-carousel__item img {
    width:100%;
    height:100%;
    object-fit: cover;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>