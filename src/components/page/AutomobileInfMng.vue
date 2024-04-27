<template>
    <div>
        <h4 style="text-align:center">填报我的毕业去向</h4>
        <div style="padding-bottom: 20px;">
            <el-row :gutter="20">
                <el-form :inline="true" :model="filters" label-width="100px">
                    <el-col :span="8">
                        <el-form-item label="学生姓名">
                            <el-input v-model="filters.username" placeholder="请输入学生姓名" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="学生学号">
                            <el-input v-model="filters.xsxh" placeholder="请输入学生学号" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="学生手机号">
                            <el-input v-model="filters.sjh" placeholder="请输入学生手机号" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="去向地点">
                            <el-input v-model="filters.destinationArea" placeholder="请输入去向地点"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="就业状态">
                            <el-select v-model="filters.destinationId" placeholder="请选择就业状态">
                                <el-option value>请选择</el-option>
                                <el-option v-for="item in automobiledestinationIds" :key="item.id" :label="item.type" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div style="height:1px;width:100%;margin:20px 0px;background-color:#eee"></div>
            <el-row :gutter="20"><el-form :inline="true" :model="filters" label-width="100px" v-if="filters.destinationId == '001'">

                    <el-col :span="8">
                        <el-form-item label="单位名称：">
                            <el-input v-model="filters.dwmc" placeholder="请输入单位名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="单位地址：">
                            <el-input v-model="filters.dwdz" placeholder="请输入单位地址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="岗位">
                            <el-input v-model="filters.gw" placeholder="请输入岗位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="薪资：">
                            <el-input v-model="filters.xz" placeholder="请输入薪资"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form> </el-row>
            <el-row :gutter="20">
                <el-form :inline="true" :model="filters" label-width="100px" v-if="filters.destinationId == '002'">
                    <el-col :span="8">
                        <el-form-item label="军种">
                            <el-input v-model="filters.jz" placeholder="请输入军种"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="地址">
                            <el-input v-model="filters.dz" placeholder="请输入地址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出发日期">
                            <el-date-picker v-model="filters.cfrq" type="date" placeholder="请选择出发日期" style="width:240px" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <el-row :gutter="20"><el-form :inline="true" :model="filters" label-width="100px" v-if="filters.destinationId == '003'">
                    <el-col :span="8">
                        <el-form-item label="学校名称">
                            <el-input v-model="filters.xxmc" placeholder="学校名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="考研专业">
                            <el-input v-model="filters.kyzy" placeholder="考研专业"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="考研分数">
                            <el-input v-model="filters.kyfs" placeholder="考研分数"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form></el-row>
            <el-row :gutter="20">
                <el-form :inline="true" :model="filters" label-width="100px" v-if="filters.destinationId == '004'">
                    <el-col :span="8">
                        <el-form-item label="备注">
                            <el-input v-model="filters.remark" placeholder="备注"></el-input>
                        </el-form-item>
                    </el-col>

                </el-form>
            </el-row>
            <el-row>
                <el-col :span="24" style="margin-left:20px">
                    <el-button type="primary" size="small" on="el-icon-search" @click="searchAutomobile">确认提交</el-button>
                    <!-- <el-button size="small" @click="searchAutomobile">还原至现有填报</el-button> -->

                </el-col>
            </el-row>

        </div>
    </div>
</template>
<script>
// import store from "@/vuex/store";
import axios from "axios";
export default {
    name: "AutomobileInfMng",
    // store,
    data () {
        return {
            filters: {
                username: "",
                xsxh: "",
                sjh: "",
                destinationId: '',
                dwmc: '',
                dwdz: '',
                gw: '',
                xz: '',
                jz: '',
                dz: '',
                cfrq: '',
                xxmc: '',
                kyzy: '',
                kyfs: '',
                remark: '',
                destinationArea: ''
            },
            automobiledestinationIds: [],
            formRules: {
                destinationId: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
            },
            userInfo: {}
        };
    },
    mounted () {
        this.getestList()
        this.userInfo = this.$store.state.userInfo
        console.log(this.userInfo)
        this.destDetail()
        this.getUseInfo()
    },
    methods: {
        getestList () {
            let that = this;
            axios
                .get(
                    "http://127.0.0.1:9000/pic_lib/destination/destList", {}
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 200) {
                        this.automobiledestinationIds = res.data.data
                        this.filters.destinationId = res.data.data[0].id
                    }
                })
                .catch(error => {
                    that.$message({
                        message: "网络错误,请稍后再试",
                        type: "error"
                    });
                });
        },
        getUseInfo () {
            let that = this;
            axios
                .get(
                    "http://127.0.0.1:9000/pic_lib//user/userInfo", {
                    params: {
                        id: this.userInfo.id
                    }
                }
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 200) {
                        this.userInfo = res.data.data
                        this.filters.xsxh = this.userInfo.stuNum
                        this.filters.sjh = this.userInfo.phone
                        this.filters.username = this.userInfo.name
                          this.$store.dispatch('setUserInfo', res.data.data);
                    }
                })
                .catch(error => {
                    that.$message({
                        message: "网络错误,请稍后再试",
                        type: "error"
                    });
                });
        },
        destDetail () {
            let that = this;
            axios
                .get(
                    "http://127.0.0.1:9000/pic_lib/destination/destDetail", {
                    params: {
                        userId: that.userInfo.id,
                    }
                }
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 200) {
                        let result = res.data.data
                        this.filters.dwmc = result.map.dwmc
                        this.filters.dwdz = result.map.dwdz
                        this.filters.gw = result.map.gw
                        this.filters.xz = result.map.xz
                        this.filters.jz = result.map.jz
                        this.filters.dz = result.map.dz
                        this.filters.cfrq = result.map.cfrq
                        this.filters.xxmc = result.map.xxmc
                        this.filters.kyzy = result.map.kyzy
                        this.filters.kyfs = result.map.kyfs
                        this.filters.remark = result.map.bz
                        this.filters.destinationId = result.destinationId
                        this.filters.destinationArea = result.destinationArea
                    }
                })
                .catch(error => {
                    that.$message({
                        message: "网络错误,请稍后再试",
                        type: "error"
                    });
                });
        },
        searchAutomobile () {
            let map = {}
            if (this.filters.destinationId == '001') {
                map.dwmc = this.filters.dwmc
                map.dwdz = this.filters.dwdz
                map.gw = this.filters.gw
                map.xz = this.filters.xz
            } else if (this.filters.destinationId == '002') {
                map.jz = this.filters.jz
                map.dwdz = this.filters.dwdz
                map.dz = this.filters.dz
                map.cfrq = this.filters.cfrq
            } else if (this.filters.destinationId == '003') {
                map.xxmc = this.filters.xxmc
                map.kyzy = this.filters.kyzy
                map.kyfs = this.filters.kyfs

            } else if (this.filters.destinationId == '004') {
                map.remark = this.filters.remark

            }
            let params = {
                userId: this.userInfo.id,
                destinationId: this.filters.destinationId,
                destinationArea: this.filters.destinationArea,
                map: map
            }

            axios
                .post(
                    "http://127.0.0.1:9000/pic_lib/destination/insert",
                    params

                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg)
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
};
</script>

<style scoped>
.small-input {
    width: 60px;
}
.middle-input {
    width: 100px;
}
.normal-input {
    width: 180px;
}
.small-select {
    width: 80px;
}
.middle-select {
    width: 120px;
}
.normal-select {
    width: 200px;
}
.col-position {
    position: relative;
    right: 5px;
}
.dialog-minwidth {
    min-width: 560px;
}
/deep/ .el-form-item {
    width: 100%;
}
/deep/ .el-form-item__content {
    width: 72%;
}
/deep/ .el-select {
    width: 100%;
}
</style>
