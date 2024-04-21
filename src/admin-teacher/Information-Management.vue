// 信息管理
<template>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="用户姓名">
        </el-table-column>
        <el-table-column prop="name" label="账号" width="180">
        </el-table-column>
        <el-table-column prop="address" label="密码">
        </el-table-column>
        <el-table-column prop="date" label="性别">
        </el-table-column>
        <el-table-column prop="name" label="年龄" width="180">
        </el-table-column>
        <el-table-column prop="address" label="家庭地址">
        </el-table-column>
        <el-table-column prop="address" label="学生号">
        </el-table-column>
        <el-table-column prop="address" label="身份证号">
        </el-table-column>
        <el-table-column prop="address" label="手机号">
        </el-table-column>
        <el-table-column prop="address" label="院系信息备注">
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
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            pageNum:20,
            pageSize:1
        }
    },
    methods: {
        getInfoList () {
            let that = this;
            axios
                .get(
                    "http://10.8.0.216:9000/pic_lib/user/pageList", {
                    params: {
                        name:'',
                        pageNum:this.pageNum,
                        pageSize:this.pageSize
                    }
                }
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == '200') {
                        this.tableData = res.data.data
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
        this.getInfoList()
    }
}
</script>

<style>
</style>