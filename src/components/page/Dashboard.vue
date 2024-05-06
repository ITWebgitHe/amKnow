<template>
    <div class="chart-container">
        <!-- <h3>亲爱的用户，填写真实资料，有助于好友找到你哦。</h3> -->
        <div style="display:flex">
            <div>当前头像</div>
            <div style="width:100px;height:100px;margin-left:20px"><img src="../../assets/1.jpg" style="width:100%;height:100%;object-fit:cover;" /></div>
        </div>
        <div style="margin-top:10px">
            <el-form :model="ruleForm" :rules="rules" ref="formName" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="8"><el-form-item label="真实姓名" prop="name">
                            <el-input v-model="ruleForm.name" style="width:384px"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="8"><el-form-item label="密码" prop="password">
                            <el-input placeholder="请输入密码" v-model="ruleForm.password" style="width:384px" type="password"></el-input>
                        </el-form-item></el-col>

                    <el-col :span="8"><el-form-item label="年龄" prop="age">
                            <!-- <el-input v-model="ruleForm.age" ></el-input> -->
                            <el-input-number v-model="ruleForm.age" controls-position="right" :min="1" :max="100" style="width:384px"></el-input-number>
                        </el-form-item></el-col>
                </el-row>

                <el-row>
                    <el-col :span="8"><el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="ruleForm.sex">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item></el-col>
                    <el-col :span="8"><el-form-item label="学生证号" prop="stuNum">
                            <el-input v-model="ruleForm.stuNum" style="width:384px"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="8"><el-form-item label="手机号" prop="phone">
                            <el-input v-model="ruleForm.phone" style="width:384px"></el-input>
                        </el-form-item></el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="专业" prop="faculty">
                            <el-select v-model="ruleForm.faculty" placeholder="请选择" style="width:384px" @change="changefaculty()">
                                <el-option v-for="(item,index) in facultyList" :key="index" :label="item.faculty" :value="item.faculty" >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="班级" prop="className">
                            <el-select v-model="ruleForm.className" placeholder="请选择" style="width:384px">
                                <el-option v-for="(item,index) in classList" :key="index" :label="item.className" :value="item.className">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>

                    <el-col :span="8"><el-form-item label="现居住地" prop="delivery">
                            <el-col :span="6">
                                <el-form-item prop="province">
                                    <el-select v-model="ruleForm.province" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in provinceList" :key="item.value" :label="item.label" :value="item.value" @click.native="bindProvinceChange(index)">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6" style="margin-left:10px">
                                <el-form-item prop="city">
                                    <el-select v-model="ruleForm.city" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in cityList" :key="item.value" :label="item.label" :value="item.value" @click.native="bindCityChange(index)">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6" style="margin-left:10px">
                                <el-form-item prop="county">
                                    <el-select v-model="ruleForm.county" placeholder="请选择" style="width:100%">
                                        <el-option v-for="item in countyList" :key="item.value" :label="item.label" :value="item.value" @click.native="bindCountyChange(item.label)">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-form-item></el-col>
                    <el-col :span="8"></el-col>
                </el-row>

                <el-form-item label="备注" prop="remark">
                    <el-input v-model="ruleForm.remark" style="width:384px" type="textarea" :row="2"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">保存</el-button>
                    <el-button type="primary" @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
import axios from "axios";
import products from '../common/cityData';
export default {
    name: "Dashboard",
    data () {
        return {
            chartBar: null,
            chartPie: null,
            ruleForm: {
                name: '',
                address: '',
                idCard: '',
                sex: '',
                phone: '',
                age: '',
                stuNum: '',
                password: '',
                city: '',
                province: '',
                county: '',
                provinceName: '',
                cityName: '',
                countyName: '',
                remark: '',
                faculty:'',
                className:''

            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],

                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请填写地址', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请填写真实姓名', trigger: 'blur' }
                ],
                stuNum: [
                    { required: true, message: '请填写学生证号', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur' }
                ],
                idCard: [
                    { required: true, message: '请填写身份证号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                ]
            },
            provinceList: '',
            cityList: [],
            countyList: [],
            userInfo: {},
            classList: [],
            facultyList:[]
        };
    },

    methods: {
        bindProvinceChange (index) {
            this.ruleForm.city = '';
            this.ruleForm.county = '';
            this.ruleForm.street = '';
            // 拿到对应的城市
            if (this.ruleForm.province == this.provinceList[index].value) {
                this.cityList = this.provinceList[index].city
                this.ruleForm.provinceName = this.provinceList[index].label
            }
        },
        // 市
        bindCityChange (index) {
            this.ruleForm.county = '';
            this.ruleForm.street = '';
            if (this.ruleForm.city == this.cityList[index].value) {
                this.countyList = this.cityList[index].area
                this.ruleForm.cityName = this.cityList[index].label
            }
        },
        bindCountyChange (name) {
            this.ruleForm.countyName = name
        },
        submitForm () {
            this.ruleForm.address = this.ruleForm.provinceName + this.ruleForm.cityName + this.ruleForm.countyName
            this.ruleForm.addressCode = this.ruleForm.province + ',' + this.ruleForm.city + ',' + this.ruleForm.county
            this.$refs.formName.validate((valid) => {
                if (valid) {
                    this.ruleForm.id = this.userInfo.id
                    let params = this.ruleForm
                    if (this.$route.query.isEdit) {
                        axios
                            .post(
                                "http://127.0.0.1:9000/pic_lib/user/update",
                                params

                            )
                            .then(res => {
                                console.log(res.data)
                                if (res.data.code == 200) {
                                    this.$message.success('保存成功')
                                }
                            })
                            .catch(error => {
                                that.$message({
                                    message: "网络错误,请稍后再试",
                                    type: "error"
                                });
                            });
                    }
                    axios
                        .post(
                            "http://127.0.0.1:9000/pic_lib/user/insert",
                            params

                        )
                        .then(res => {
                            console.log(res.data)
                            if (res.data.code == 200) {
                                this.$message.success('保存成功')
                            }
                        })
                        .catch(error => {
                            that.$message({
                                message: "网络错误,请稍后再试",
                                type: "error"
                            });
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm () {
            this.$refs[formName].resetFields();
        },
        getUserInfo () {
            let that = this;
            axios
                .get(
                    "http://127.0.0.1:9000/pic_lib/user/userInfo", {
                    params: {
                        id: this.$store.state.userInfo.id,
                    }

                }
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 200) {
                        this.userInfo = res.data.data
                        this.ruleForm.password = this.userInfo.password
                        this.ruleForm.name = this.userInfo.name
                        this.ruleForm.idCard = this.userInfo.idCard
                        this.ruleForm.sex = this.userInfo.sex
                        this.ruleForm.age = this.userInfo.age
                        this.ruleForm.province = this.userInfo.province
                        this.ruleForm.stuNum = this.userInfo.stuNum
                        this.ruleForm.phone = this.userInfo.phone
                        this.ruleForm.faculty = this.userInfo.faculty
                        this.ruleForm.className = this.userInfo.className
                        for (let item of this.provinceList) {
                            if (item.value == this.userInfo.province) {
                                this.cityList = item.city
                            }

                        }
                        for (let item of this.cityList) {
                            if (item.value == this.userInfo.city) {
                                this.countyList = item.area
                            }
                        }
                        this.ruleForm.city = this.userInfo.city
                        this.ruleForm.county = this.userInfo.county
                        this.ruleForm.remark = this.userInfo.remark
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
                    "http://127.0.0.1:9000/pic_lib/faculty-class/list", {})
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
        changefaculty() {
            for(let item of this.facultyList) {
                if(item.faculty == this.ruleForm.faculty) {
                    this.classList = item.classList
                }
            }
        }


    },
    mounted: function () {
        this.provinceList = JSON.parse(JSON.stringify(products))
        this.getUserInfo()
        this.getClssList()
    }
};
</script>
<style scoped>
.chart-container {
    height: 100%;
    overflow: auto;
}
.el-col {
    padding: 30px 20px;
}
.chart-style {
    width: 100%;
    height: 400px;
}
.el-col {
    padding: 0px;
}
.el-form-item {
    margin-bottom: 14px;
}
</style>
