// 信息管理
<template>
    <div style="height:100%">
        <el-table :data="tableData" border style="width: 100%;height:100%">
            <el-table-column prop="name" label="用户姓名">
            </el-table-column>
            <el-table-column prop="username" label="账号" width="180">
            </el-table-column>
            <el-table-column prop="password" label="密码">
            </el-table-column>
            <el-table-column prop="sex" label="性别">
            </el-table-column>
            <el-table-column prop="age" label="年龄">
            </el-table-column>
            <el-table-column prop="address" label="家庭地址" width="300">
            </el-table-column>
            <el-table-column prop="stuNum" label="学生号">
            </el-table-column>
            <el-table-column prop="idCard" label="身份证号">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <!-- <el-table-column prop="address" label="院系信息备注">
        </el-table-column> -->
            <el-table-column label="操作" width="100px">
                <!-- <i class="el-icon-edit" style="font-size:18px"></i> -->
                <i class="el-icon-delete" style="padding-left:10px;font-size:18px" @click="onDeleteUser"></i>
            </el-table-column>
        </el-table>
    </div>

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
            pageNum: 1,
            pageSize: 20
        }
    },
    methods: {
        getInfoList () {
            let that = this;
            axios
                .get(
                    "http://10.8.0.216:9000/pic_lib/user/pageList", {
                    params: {

                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                }
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == '200') {
                        this.tableData = res.data.data.list
                    }
                })
                .catch(error => {
                    that.$message({
                        message: "网络错误,请稍后再试",
                        type: "error"
                    });
                });
        },
        onDeleteUser () {
            axios
                .get(
                    "http://10.8.0.216:9000/pic_lib/user/delete", {
                    params: {

                    }
                }
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == '200') {
                        this.getInfoList()
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