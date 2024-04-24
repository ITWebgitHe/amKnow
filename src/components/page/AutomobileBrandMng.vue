<template>
    <div style="background:#f2f3f5;height:100%;overflow-y:auto">
        <div style="padding-bottom:16px;background:#fff;cursor:pointer">
            <i class="el-icon-edit-outline" @click="handleEdit">发表留言</i>
        </div>
        <div style="background:#fff;margin-bottom:10px;padding-bottom:10px" v-for="(item,index) in tableData" :key="index">
            <div style="display:flex;border-bottom:solid 1px #eee;padding:20px;">
                <div style="width: 20px;"><img :src="image" style="vertical-align: middle;width:100%; border-radius: 20px;display:inline-block;" /></div>

                <div style="font-size:14px;margin-left:8px">
                    <span style="color:#de9075">{{item.createUser}}：</span><span>{{item.content}}</span>
                    <div style="font-size:12px;padding-top:5px"><span>{{item.createTime}}</span></div>
                </div>
            </div>
            <div style="height:40px;display:flex;justify-content:space-around;align-items:center">
                <i class="el-icon-chat-line-round" style="font-size:18px;cursor:pointer" @click="addLyinfo(item)"></i>
                <i class="el-icon-delete" style="font-size:24px;cursor:pointer" @click="onDelate(item)"></i>
            </div>
            <div style="margin:0px 50px;" v-if="item.returnList && item.returnList.length > 0">
                <div style=";margin-bottom:10px;background:#fff" v-for="(val,valindex) in item.returnList" :key="valindex">
                    <div style="display:flex;border-bottom:solid 1px #eee;padding:20px;background:#f2f3f5">
                        <div style="width: 20px;"><img :src="image" style="vertical-align: middle;width:100%; border-radius: 20px;display:inline-block;" /></div>

                        <div style="font-size:14px;margin-left:8px">
                            <span style="color:#de9075">{{val.createUser}}：</span><span>{{val.content}}</span>
                            <div style="font-size:12px;padding-top:5px"><span>{{val.createTime}}</span></div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
            <div style="">
                <el-form :model="formData" :rules="formRules" ref="formData" :inline="true" label-position="center" label-width="80px">
                    <el-rol :sapn="12">
                        <el-form-item prop="content" label="留言：">
                            <el-input v-model="formData.content" placeholder="请输入留言" type="textarea" :rows="3" style="width:400px"></el-input>
                        </el-form-item>
                    </el-rol>
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
            image: require("../../../static/image/male.jpg"),
            dialogVisible: false,
            formData: {
                content: '',
                parentMessageId: ""
            },
            formRules: {

            },
            userInfo: {},
            pageNum: 1,
            pageSize: 20,
            tableData: [],
            title: ''
        }
    },
    mounted () {
        this.getInfoList()
        this.userInfo = this.$store.state.userInfo
    },
    methods: {
        handleClose () {
            this.dialogVisible = false
        },
        onConfirm () {
            let params = {
                type: '0',
                content: this.formData.content,
                userId: this.userInfo.id
            }
            if (this.title = '回复留言') {
                params.parentMessageId = this.formData.parentMessageId
                params.type = '1'
                axios
                    .post(
                        "http://10.8.0.216:9000/pic_lib/message-board/insert", params)
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
                        "http://10.8.0.216:9000/pic_lib/message-board/insert", params)
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

        },
        handleEdit () {
            this.title = '创建留言'
            this.formData.parentMessageId = ''
            this.formData.content = ''
            this.dialogVisible = true
        },
        getInfoList () {
            let that = this;
            axios
                .get(
                    "http://10.8.0.216:9000/pic_lib/message-board/pageList", {
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
        addLyinfo (row) {
             this.dialogVisible = true
            this.title = '回复留言'
            this.formData.parentMessageId = row.id
        },
        onDelate(row) {
           let that = this;
            axios
                .get(
                    "http://10.8.0.216:9000/pic_lib/message-board/delete", {
                    params: {
                        id: row.id,
                        type: row.type,
                        userId:this.userInfo.id,
                        userType:this.userInfo.userType
                    }
                }
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 200) {
                        this.$message.success('删除成功')
                        
                            this.getInfoList()
                    }else {
                        this.$message.error(res.data.msg)
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
}
</script>

<style>
</style>