// 公告信息管理
<template>
    <el-table :data="noticeList" border style="width: 100%">
        <el-table-column prop="title" label="公告标题">
        </el-table-column>
        <el-table-column prop="name" label="公告内容" width="180">
        </el-table-column>
        <el-table-column prop="name" label="公告栏图片" width="180">
        </el-table-column>
        <el-table-column prop="creatTime" label="创建时间">
        </el-table-column>
        <el-table-column label="操作" width="100px">
            <i class="el-icon-edit" style="font-size:18px"></i>
            <i class="el-icon-delete" style="padding-left:10px;font-size:18px"></i>
        </el-table-column>
    </el-table>
</template>

<script>
import axios from "axios";
export default {
    data () {
        return {
            noticeList: []
        }
    },
    methods:{
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
                    if (res.data.code == 200) {
                        this.noticeList = res.data.data.list
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
    mounted() {
        this.getNoticeList()
    }
}
</script>

<style>

</style>