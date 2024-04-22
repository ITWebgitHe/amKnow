// 首页
<template>
    <main>
        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="(item,index) in imgList" :key="index">
                <img :src="item.url" />
            </el-carousel-item>
        </el-carousel>
        <div style="margin-top:10px">
            <ul class="ul">
                <li v-for="item in noticeList" :key="item.id" class="notice-item" @click="onclickNotice(item)">
                    <div class="li-contnt">
                        <div>{{item.title}}</div>
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
            noticeList: []
        }
    },
    mounted () {
        this.getNoticeList()
    },
    methods: {
        getNoticeList () {
            let that = this;
            axios
                .get(
                    "http://10.8.0.216:9000/pic_lib/notice/pageList", {
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
                query:{id:item.id}
            })
        }
    }
}
</script>

<style scoped>
.el-carousel__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.li-contnt {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
}
</style>