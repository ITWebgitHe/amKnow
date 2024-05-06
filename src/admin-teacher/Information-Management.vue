// 信息管理
<template>
    <div style="height:100%">
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;background:none">
            <el-button type="primary" @click="onClickDialog">新增</el-button>
            <el-upload class="upload-demo" ref="upload" accept=".xlsx, .xlsm, .xls" :auto-upload="true" :action="action" :limit="1" :on-exceed="handleExceed" :show-file-list="false" :on-success="onSuccess"><el-button type="primary" >导入</el-button></el-upload>

        </el-col>
        <el-table :data="tableData" border height="calc(100% - 70px)" style="width: 100%;">
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
             <el-table-column prop="faculty" label="专业">
            </el-table-column>
            <el-table-column prop="className" label="班级">
            </el-table-column>
            <el-table-column prop="stuNum" label="学生号">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column prop="address" label="家庭地址" width="300">
            </el-table-column>
            
            <!-- <el-table-column prop="address" label="院系信息备注">
        </el-table-column> -->
            <el-table-column label="操作" width="100px">
                <!-- <i class="el-icon-edit" style="font-size:18px"></i> -->
                <i class="el-icon-delete" style="padding-left:10px;font-size:18px" @click="onDeleteUser"></i>
            </el-table-column>
        </el-table>

        <el-dialog title="新增账户" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" label-width="80px">
            <div style="">
                <el-form :model="formData" :rules="formRules" ref="formData" :inline="true">
                    <el-form-item prop="username" label="账号">
                        <el-input type="text" v-model="formData.username" placeholder="请输入用户名" style="width:350px"></el-input>
                    </el-form-item>

                    <el-form-item prop="password" label="密码">
                        <el-input type="stext" v-model="formData.password" placeholder="请输入密码" style="width:350px">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
import axios from "axios";
export default {
    data () {
        return {
            tableData: [],
            pageNum: 1,
            pageSize: 20,
            dialogVisible: false,
            formData: {
                username: '',
                password: ''
            },
            action: 'http://127.0.0.1:9000/pic_lib/user/importUserInfo',
            formRules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
            },
        }
    },
    methods: {
        getInfoList () {
            let that = this;
            axios
                .get(
                    "http://127.0.0.1:9000/pic_lib/user/pageList", {
                    params: {

                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                }
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 200) {
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
                    "http://127.0.0.1:9000/pic_lib/user/delete", {
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
        },
        handleClose () {
            this.dialogVisible = false
        },
        onClickDialog () {
            this.formData.username = ''
            this.formData.password = ''
            this.dialogVisible = true
        },
        onConfirm () {
            this.$refs.formData.validate(valid => {
                if (valid) {
                    let params = {
                        username: this.formData.username,
                        password: this.formData.password,
                    }
                    axios
                        .post(
                            "http://127.0.0.1:9000/pic_lib/user/insert",
                            params

                        )
                        .then(res => {
                            this.dialogVisible = false
                            this.getInfoList()
                        })
                }
            })
        },
        handleExceed (files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        onSuccess() {
            this.$message.success('导入成功')
            this.getInfoList()
        }
    },
    mounted () {
        this.getInfoList()
    }
}
</script>

<style>
.upload-demo {
    display: inline;
}
</style>