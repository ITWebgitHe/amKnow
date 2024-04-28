// 首页
<template>
    <main  class="index-bg">
        <div style="display:flex;">
            <div style="position:absolute; top:20%;left:20%;writing-mode: vertical-rl;font-size:26px;">
                <div>公告信息展示</div></div>
            <el-carousel indicator-position="outside" style="width:800px;margin:0 auto">
            <el-carousel-item v-for="(item,index) in noticeList" :key="index">
                <img :src="item.imgWebUrl" style="width:100%;height:100%;object-fit:contain"/>
            </el-carousel-item>
        </el-carousel>
        </div>
        
        <div style="margin-top:10px">
            <ul class="ul" style="width:795px;margin:0 auto">
                <li v-for="item in noticeList" :key="item.id" class="notice-item" @click="onclickNotice(item)">
                    <div class="li-contnt">
                        <div style="color:#409EFF">{{item.title}}</div>
                    <div>{{item.createTime}}</div>
                    </div>
                    
                </li>
            </ul>

        </div>
    </main>
</template>

<script>
import axios from "axios";
export default {
    data () {
        return {
            imgList: [
                { url: require('@/assets/1.jpeg') },
                { url: require('@/assets/2.jpeg') },
                { url: require('@/assets/3.jpg') },
                { url: require('@/assets/4.jpeg') },
            ],
            noticeList: [],
            noticeContent:[]
        }
    },
    mounted () {
        console.log('用户信息',this.$store.state.userInfo)
        this.getNoticeList()
    },
    methods: {
        getNoticeList () {
            let that = this;
            axios
                .get(
                    "http://127.0.0.1:9000/pic_lib/notice/pageList", {
                    params: {
                        pageNum: 1,
                        pageSize: 10
                    }
                }
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == '200') {
                        this.noticeList = res.data.data.list
                    }
                })
                .catch(error => {
                    that.$message({
                        message: "网络错误,请稍后再试",
                        type: "error"
                    });
                });
        },
        onclickNotice(item) {
            this.$router.push({
                path:'noticeDetail',
                query:item
            })
        }
    }
}
</script>

<style>
.el-carousel__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.el-carousel__item:nth-child(2n) {
    background-color: #fff;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #fff;
}

.li-contnt {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
}
.notice-item {
    padding:5px 0px;
    font-size: 15px;
}
:root .el-carousel__container {
    height: 400px !important;
}
.index-bg {
    width:100%;
    height: 100%;
    background-image: url("../../assets/bg.png");
    background-size: 100%;
    background-repeat: no-repeat;
}
</style>

