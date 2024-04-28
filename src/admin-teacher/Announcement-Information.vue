// 荣誉管理
<template>
    <div style="height:100%">
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;background:none">
            <el-button type="primary" @click="onClickDialog">新增</el-button>
        </el-col>
        <el-table :data="tableData" height="calc(100% - 70px)" border style="width: 100%">
            <el-table-column prop="title" label="公告标题" width="180">
            </el-table-column>
            <el-table-column prop="content" label="公告内容">
            </el-table-column>
            <el-table-column label="公告栏图片">
                <template slot-scope="scope">
                    <!-- <div @click="viewImg(scope.row.imgWebUrl)">查看</div> -->
                    <img :src="scope.row.imgWebUrl" width="100px" height="100px" style="objct-fit:cover" />
                    <!-- <a class="a-style" @click="handlePreView(scope.row)">预览</a> -->
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180">
            </el-table-column>
            <el-table-column label="操作" width="100px">
                <template slot-scope="scope">
                    <div class="flex align-center">
                        <i class="el-icon-edit" style="font-size:18px;cursor:pointer" @click="onEditClick(scope.row)"></i>
                        <i class="el-icon-delete" style="padding-left:10px;font-size:18px" @click="onDeleteClick(scope.row)"></i>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" label-width="80px">
            <div style="">
                <el-form :model="formData" :rules="formRules" ref="formData" :inline="true" label-position="center" label-width="140px">
                    <el-row>
                        <el-rol :sapn="12">
                            <el-form-item prop="title" label="公告标题名称：">
                                <el-input type="text" v-model="formData.title" placeholder="请输入公告标题名称" style="width:240px"></el-input>
                            </el-form-item>
                        </el-rol>

                        <el-col :span="12"><el-form-item prop="content" label="公告内容：">
                                <el-input type="text" v-model="formData.content" placeholder="请输入公告内容" style="width:240px"></el-input>
                            </el-form-item></el-col>

                        <el-col :span="12">
                            <el-form-item prop="files" label="上传公告图片：">
                                <el-upload class="upload-demo" ref="upload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :on-change="handleChangeFile" action="#" :limit="1">
                                    <el-button slot="trigger" size="small" type="primary" accept="png,jpg,jpeg">选取文件</el-button>
                                </el-upload>
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
                title: '',
                certTime: '',
                certLevel: '',
                content: '',
                certAreacertAuthority: '',
                certArea: '',
                id: '',
                files: null
            },
            formRules: {
                title: [
                    { required: true, message: "请输入证书名称", trigger: "blur" }
                ],

                content: [
                    { required: true, message: "请输入获得证书用户", trigger: "blur" }
                ],

                files: [
                    { required: true, message: "请上传公告图片", trigger: "blur" }
                ],
            },
            title: '新增',
            userInfo: {},
            fileList: [],
            currentFile: {}
        }
    },
    methods: {
        getInfoList () {
            let that = this;
            axios
                .get(
                    "http://127.0.0.1:9000/pic_lib/notice/pageList", {
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
            this.formData.title = ''
            this.formData.certTime = ''
            this.formData.content = ''
            this.formData.id = ''
            this.dialogVisible = true
        },
        onEditClick (row) {
            this.title = '修改'
            this.dialogVisible = true
            this.formData.title = row.title
            this.formData.content = row.content
            this.formData.certAreacertAuthority = row.certAreacertAuthority
            this.formData.id = row.id
        },
        onConfirm () {
            if (!this.currentFile) {
                this.$message.error('请上传证书！')
                return
            }
            this.formData.files = this.currentFile.raw
            this.$refs.formData.validate(valid => {
                if (valid) {
                    let fileName = this.currentFile.name
                    let type = fileName.substring(fileName.lastIndexOf('.') + 1);
                    console.log(type)
                    if ('image/jpeg/png/jpg'.indexOf(type) < 0) {
                        this.$message.error('只允许上传图片')
                        return
                    }
                    let that = this;
                    const formData = new FormData()
                    for (let i in this.formData) {
                        formData.append(i, this.formData[i]);
                    }
                    if (this.title == '修改') {
                        axios
                            .post(
                                "http://127.0.0.1:9000/pic_lib/notice/update", formData)
                            .then(res => {
                                console.log(res.data)
                                if (res.data.code == '200') {
                                    this.$message.success('公告信息保存成功')
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
                                "http://127.0.0.1:9000/pic_lib/notice/insert", formData)
                            .then(res => {
                                console.log(res.data)
                                if (res.data.code == 200) {
                                    this.$message.success('公告信息保存成功')
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
                id: row.id,
            }
            axios
                .post(
                    "http://127.0.0.1:9000/pic_lib/notice/delete",
                    params

                )
                .then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg)
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
        submitUpload () {
            this.$refs.upload.submit();
        },
        handleRemove (file, fileList) {
            this.currentFile = null
        },
        handlePreview (file) {
            console.log(file);
        },
        handleChangeFile (file) {
            this.currentFile = file
            console.log(file)
        },
        handlePreView (row) {
            const imgWebUrl = row.imgUrl;

            window.open(imgWebUrl, '_blank')


        }
    },
    mounted () {
        this.userInfo = this.$store.state.userInfo
        this.getInfoList()
    }
}
</script>

<style>
.img {
    width: 180px;
    height: 180px;
}
.el-dialog__header {
    border-bottom: solid 1px #eee;
}
</style>>
