<template>
    <div class="chart-container">
        <h3>亲爱的摄图用户，填写真实资料，有助于好友找到你哦。</h3>
        <div style="display:flex">
            <div>当前头像</div>
            <div style="width:100px;height:100px;margin-left:20px"><img src="../../assets/1.jpg" style="width:100%;height:100%;object-fit:cover;" /></div>
        </div>
        <div style="margin-top:20px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="密码" prop="region">
                    <el-input placeholder="请输入密码" v-model="ruleForm.password" style="width:384px" type="password"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="ruleForm.name" style="width:384px"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="region">
                    <el-input v-model="ruleForm.name" style="width:384px"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="生日" required>
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker v-model="ruleForm.date1" type="date" placeholder="选择日期" style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                </el-form-item>
                <el-form-item label="属性地" prop="delivery">
                    <el-col :span="6">
                        <el-form-item prop="date2">
                            <el-select v-model="date2" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="margin-left:10px">
                        <el-form-item prop="date2">
                            <el-select v-model="date2" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="margin-left:10px">
                        <el-form-item prop="date2">
                            <el-select v-model="date2" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="地址" prop="delivery">
                    <el-col :span="6">
                        <el-form-item prop="province">
                            <el-select v-model="ruleForm.province" placeholder="请选择">
                                <el-option v-for="(item,index) in provinceList" :label="item.label" :value="item.value" :key="item.value" @click.native="bindProvinceChange(index)"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="margin-left:10px">
                        <el-form-item prop="city">
                            <el-select v-model="ruleForm.city" placeholder="请选择">
                                <el-option v-for="(item,index) in cityList" :label="item.label" :value="item.value" @click.native="bindCityChange(index)" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="margin-left:10px">
                        <el-form-item prop="county">
                            <el-select v-model="ruleForm.county" placeholder="请选择">
                                <el-option v-for="(item,index) in countyList" :label="item.label" :value="item.value" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">返回</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
import echarts from "echarts";

import products from '../common/cityData';
export default {
    name: "Dashboard",
    data () {
        return {
            chartBar: null,
            chartPie: null,
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                password: '',
                city: '',
                province: '',
                county: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                ]
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            provinceList: '',
            cityList: [],
            countyList: []
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
            }
        },
        // 市
        bindCityChange (index) {
            this.ruleForm.county = '';
            this.ruleForm.street = '';
            if (this.ruleForm.city == this.cityList[index].value) {
                this.countyList = this.cityList[index].area
            }
        },
      
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        }

    },
    mounted: function () {
        this.provinceList = JSON.parse(JSON.stringify(products))
        console.log('this.provinceList', this.provinceList)
        // this.drawCharts();
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
    margin-bottom: 16px;
}
</style>
