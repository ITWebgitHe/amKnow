// 用户去向管理
<template>
    <div style="height:100%">
        <!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;background:none">
            <label style="margin-right:8px">去向类型</label>
            
            <label style="margin-right:8px">班级</label>
            <el-select v-model="faculty" placeholder="请选择" @change="changefaculty()">
                <el-option v-for="(item,index) in facultyList" :key="index" :label="item.faculty" :value="item.faculty">
                </el-option>
            </el-select>
            <label style="margin-right:8px">专业</label>
            
            
        </el-col> -->

        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
            <el-form-item label="去向类型">
                <el-select v-model="formInline.destinationId" placeholder="请选择" clearable>
                    <el-option v-for="item in automobiledestinationIds" :key="item.id" :label="item.type" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="专业">
                <el-select v-model="formInline.faculty" placeholder="请选择" @change="changefaculty()">
                    <el-option v-for="(item,index) in facultyList" :key="index" :label="item.faculty" :value="item.faculty">
                    </el-option>
                </el-select>

            </el-form-item>
            <el-form-item label="班级">
                <el-select v-model="formInline.className" placeholder="请选择">
                    <el-option v-for="(item,index) in classList" :key="index" :label="item.className" :value="item.className">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onClickDialog" style="margin-left:8px">查询</el-button>
                <el-button type="primary" @click="onExport" style="margin-left:8px">导出</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" height="calc(100% - 50px)" border style="width: 100%">
            <el-table-column prop="name" label="学生姓名">
            </el-table-column>
            <el-table-column prop="stuNum" label="学生学号" width="180">
            </el-table-column>
            <el-table-column prop="faculty" label="专业">
            </el-table-column>
            <el-table-column prop="className" label="班级">
            </el-table-column>
            <el-table-column prop="phone" label="学生手机号">
            </el-table-column>
            <el-table-column prop="destinationArea" label="去向地点">
            </el-table-column>
            <el-table-column prop="destinationId" label="就业状态" width="180">
            </el-table-column>
            <el-table-column prop="detail" label="详情">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
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
            automobiledestinationIds: [],
            formInline: {
                destinationId: '',
                faculty: '',
                className: '',
            },

            formData: {
                honorName: '',
                honorTime: '',
                honorLevel: '',
                honorUser: '',
                issuingAuthority: '',
                honorArea: '',
                id: ''
            },
            classList: [],
            facultyList: [],
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
        getestList () {
            let that = this;
            axios
                .get(
                    "http://192.168.43.37:9001/pic_lib/destination/destList", {}
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 200) {
                        this.automobiledestinationIds = res.data.data
                        // this.destinationId = res.data.data[0].id
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
        getClssList () {
            let that = this;
            axios
                .get(
                    "http://192.168.43.37:9001/pic_lib/faculty-class/list", {})
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 200) {
                        this.facultyList = res.data.data
                    }
                })
                .catch(error => {
                    that.$message({
                        message: "网络错误,请稍后再试",
                        type: "error"
                    });
                });
        },
        changefaculty () {
            for (let item of this.facultyList) {
                if (item.faculty == this.formInline.faculty) {
                    this.classList = item.classList
                }
            }
        },
        getInfoList () {
            let that = this;
            axios
                .get(
                    "http://192.168.43.37:9001/pic_lib/destination/pageList", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        destinationId: this.formInline.destinationId,
                        faculty: this.formInline.faculty,
                        className: this.formInline.className,
                    }
                }
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 200) {
                        this.tableData = res.data.data
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
            this.getInfoList()
        },
        onExport () {
            axios
                .post(
                    "http://192.168.43.37:9001/pic_lib/destination/exportDestination", '')
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 200) {
                        this.$message.success('导出成功')
                    }
                })
                .catch(error => {
                    that.$message({
                        message: "网络错误,请稍后再试",
                        type: "error"
                    });
                });
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
                                "http://192.168.43.37:9001/pic_lib/stu-honor/update", params)
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

                    } else {
                        axios
                            .post(
                                "http://192.168.43.37:9001/pic_lib/stu-honor/insert", params)
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
        onDeleteClick (row) {
            let params = {
                id: row.id
            }
            axios
                .post(
                    "http://192.168.43.37:9001/pic_lib//stu-honor/delete", params)
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 200) {
                        this.$message.success('删除成功')
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
    },
    mounted () {
        this.userInfo = this.$store.state.userInfo
        this.getestList()
        this.getClssList()
    }
}
</script>

<style>
</style>