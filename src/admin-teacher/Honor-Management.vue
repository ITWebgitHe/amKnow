// 荣誉管理
<template>
    <div style="height:100%">
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;background:none">
            <el-button type="primary" @click="onClickDialog">新增</el-button>
        </el-col>
        <el-table :data="tableData" height="calc(100% - 70px)" border style="width: 100%">
            <el-table-column prop="honorName" label="荣誉名称">
            </el-table-column>
            <el-table-column prop="honorTime" label="荣誉获得时间" width="180">
            </el-table-column>
            <el-table-column prop="honorUser" label="获得荣誉用户">
            </el-table-column>
            <el-table-column prop="honorLevel" label="荣誉等级">
            </el-table-column>
            <el-table-column prop="issuingAuthority" label="荣誉颁发机构" width="180">
            </el-table-column>
            <el-table-column prop="honorArea" label="获得荣誉的地点">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="100px">

                <template slot-scope="scope">
                    <div class="flex align-center">
                        <i class="el-icon-edit" style="font-size:18px;cursor:pointer" @click="onEditClick(scope.row)"></i>
                        <i class="el-icon-delete" style="padding-left:10px;font-size:18px" @click="onDeleteClick(scope.row)"></i> />
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" label-width="80px">
            <div style="">
                <el-form :model="formData" :rules="formRules" ref="formData" :inline="true" label-position="center" label-width="140px">
                    <el-row>
                        <el-rol :sapn="12">
                            <el-form-item prop="honorName" label="荣誉名称：">
                                <el-input type="text" v-model="formData.honorName" placeholder="请输入荣誉名称" style="width:240px"></el-input>
                            </el-form-item>
                        </el-rol>

                        <el-col :span="12"><el-form-item prop="honorUser" label="获得荣誉用户：">
                                <el-input type="text" v-model="formData.honorUser" placeholder="请输入获得荣誉用户" style="width:240px"></el-input>
                            </el-form-item></el-col>
                        <el-col :span="12">
                            <el-form-item prop="honorTime" label="荣誉获得时间：">
                                <el-date-picker v-model="formData.honorTime" type="date" placeholder="请选择荣誉获得时间" style="width:240px" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12"><el-form-item prop="honorLevel" label="荣誉等级：">
                                <el-input type="text" v-model="formData.honorLevel" placeholder="请输入荣誉等级" style="width:240px"></el-input>
                            </el-form-item></el-col>
                        <el-col :span="12"><el-form-item prop="issuingAuthority" label="荣誉颁发机构：">
                                <el-input type="text" v-model="formData.issuingAuthority" placeholder="请输入荣誉颁发机构" style="width:240px"></el-input>
                            </el-form-item></el-col>
                        <el-col :span="12">
                            <el-form-item prop="honorArea" label="获得荣誉的地点：">
                                <el-input type="text" v-model="formData.honorArea" placeholder="请输入获得荣誉的地点" style="width:240px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
                honorName: '',
                honorTime: '',
                honorLevel: '',
                honorUser: '',
                issuingAuthority: '',
                honorArea: '',
                id: ''
            },
            formRules: {
                honorName: [
                    { required: true, message: "请输入荣誉名称", trigger: "blur" }
                ],
                honorLevel: [
                    { required: true, message: "请输入荣誉等级", trigger: "blur" }
                ],
                honorUser: [
                    { required: true, message: "请输入获得荣誉用户", trigger: "blur" }
                ],
                issuingAuthority: [
                    { required: true, message: "请输入荣誉颁发机构", trigger: "blur" }
                ],
                honorArea: [
                    { required: true, message: "请输入获得荣誉的地点", trigger: "blur" }
                ],
            },
            title: '新增',
            userInfo: {}
        }
    },
    methods: {
        getInfoList () {
            let that = this;
            axios
                .get(
                    "http://10.8.0.216:9000/pic_lib/stu-honor/pageList", {
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
        handleClose () {
            this.dialogVisible = false
        },
        onClickDialog () {
            this.title = '新增'
            this.dialogVisible = true
            this.formData.honorName = ''
            this.formData.honorTime = ''
            this.formData.honorLevel = ''
            this.formData.honorUser = ''
            this.formData.issuingAuthority = ''
            this.formData.honorArea = ''
            this.formData.id = ''
            this.dialogVisible = true
        },
        onEditClick (row) {
            this.title = '修改'
            this.dialogVisible = true
            this.formData.honorName = row.honorName
            this.formData.honorTime = row.honorTime
            this.formData.honorLevel = row.honorLevel
            this.formData.honorUser = row.honorUser
            this.formData.issuingAuthority = row.issuingAuthority
            this.formData.honorArea = row.honorArea
            this.formData.id = row.id
        },
        onConfirm () {
            // this.formData.honorUserId = this.userInfo.id
            // this.formData.honorUser = this.userInfo.name
            this.$refs.formData.validate(valid => {
                if (valid) {
                    let that = this;
                    let params = this.formData
                    if (this.title == '修改') {
                        axios
                            .post(
                                "http://10.8.0.216:9000/pic_lib/stu-honor/update", params)
                            .then(res => {
                                console.log(res.data)
                                if (res.data.code == 200) {
                                    this.$message.success('保存成功')
                                    this.dialogVisible = fasle
                                    this.getInfoList()
                                }
                            })
                            .catch(error => {
                                that.$message({
                                    message: "网络错误,请稍后再试",
                                    type: "error"
                                });
                            });

                    } else {
                        axios
                            .post(
                                "http://10.8.0.216:9000/pic_lib/stu-honor/insert", params)
                            .then(res => {
                                console.log(res.data)
                                if (res.data.code == 200) {
                                    this.$message.success('保存成功')
                                    this.dialogVisible = false
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
                }
            })

        },
        onDeleteClick () {

        }
    },
    mounted () {
        this.userInfo = this.$store.state.userInfo
        this.getInfoList()
    }
}
</script>

<style>
</style>