// 公告详情
<template>
    <div style="height:100%;width:100%;">
        <h3 style="text-align:center">{{noticeDetail.title}}</h3>
        <div style="margin:10px auto;width:80%;background:#eee;padding:10px">
            <div style="padding:10px">{{noticeDetail.content}}</div>
            <div style="display:flex;justify-content:right">
                <div>
                    <div>创建人：{{noticeDetail.createUser}}</div>
                    <div>创建时间：{{noticeDetail.createTime}}</div>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script>
import axios from "axios";
export default {
    data () {
        return {
            noticeDetail: {}
        }
    },
    methods: {
        getNoticeDetail () {
            let that = this;
            axios
                .get(
                    "http://127.0.0.1:9000/pic_lib/notice/getNoticeContent", {
                    params: {
                        id: this.$route.query.id,
                    }
                }
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == '200') {
                        this.noticeDetail = res.data.data
                    }
                })
                .catch(error => {
                    that.$message({
                        message: "网络错误,请稍后再试",
                        type: "error"
                    });
                });
        }
    },
    mounted () {
        this.noticeDetail = this.$route.query
        console.log('this.noticeDetail',this.noticeDetail)
       
    }
}
</script>

<style>
</style>