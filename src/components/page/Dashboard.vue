<template>
    <div class="chart-container">
        <h3>亲爱的摄图用户，填写真实资料，有助于好友找到你哦。</h3>
        <div style="display:flex">
            <div>当前头像</div>
            <div style="width:100px;height:100px;margin-left:20px"><img src="../../assets/1.jpg" style="width:100%;height:100%;object-fit:cover;" /></div>
        </div>
        <div style="margin-top:20px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="密码" prop="region" >
                    <el-input placeholder="请输入密码" v-model="ruleForm.password"  style="width:384px" type="password"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="ruleForm.name" style="width:384px"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="region">
                    <el-input v-model="ruleForm.name"   style="width:384px"></el-input>
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
                    <el-col :span="4"  style="margin-left:10px">
                        <el-form-item prop="date2">
                            <el-select v-model="date2" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="家乡" prop="delivery">
                    <el-col :span="6">
                        <el-form-item prop="date2">
                            <el-select v-model="date2" placeholder="请选择"  style="width:100%">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4"  style="margin-left:10px">
                        <el-form-item prop="date2">
                            <el-select v-model="date2" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4"  style="margin-left:10px">
                        <el-form-item prop="date2">
                            <el-select v-model="date2" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
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
                password:''
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
                password:[
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
        };
    },

    methods: {
        drawBarChart () {
            var option = {
                title: { text: "库存量" },
                tooltip: {},
                xAxis: {
                    axisLabel: {
                        interval: 0
                    },
                    data: [
                        "朗逸",
                        "卡罗拉",
                        "捷达",
                        "速腾",
                        "汉兰达",
                        "本田CR-V",
                        "揽胜",
                        "奔驰GLC",
                        "RAV4荣放",
                        "奥德赛",
                        "保时捷911",
                        "日产GT-R",
                        "索罗德",
                        "五菱宏光",
                        "柯斯达"
                    ]
                },
                yAxis: {},
                series: [
                    {
                        name: "库存量",
                        type: "bar",
                        data: [13, 16, 24, 21, 8, 13, 3, 6, 9, 9, 2, 4, 5, 18, 3]
                    }
                ]
            };
            this.chartColumn = echarts.init(document.getElementById("chartBar"));
            this.chartColumn.setOption(option);
        },
        drawPieChart () {
            var option = {
                title: {
                    text: "国家品牌数",
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: [
                        "中国",
                        "德国",
                        "美国",
                        "法国",
                        "意大利",
                        "日本",
                        "韩国",
                        "其他"
                    ]
                },
                series: [
                    {
                        name: "品牌数",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: [
                            { value: 1, name: "中国" },
                            { value: 5, name: "德国" },
                            { value: 3, name: "美国" },
                            { value: 1, name: "法国" },
                            { value: 1, name: "意大利" },
                            { value: 3, name: "日本" },
                            { value: 1, name: "韩国" },
                            { value: 2, name: "其他" }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            };
            this.chartPie = echarts.init(document.getElementById("chartPie"));
            this.chartPie.setOption(option);
        },
        drawLineChart () {
            var option = {
                title: {
                    text: "车型占有率"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["轿车", "SUV", "MPV", "其他"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: ["2012年", "2013年", "2014年", "2015年", "2016年", "2017年", "2018年"]
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        name: "MPV",
                        type: "line",
                        stack: "占有率",
                        data: [0.1, 0.1, 0.11, 0.11, 0.13, 0.15, 0.2]
                    },
                    {
                        name: "SUV",
                        type: "line",
                        stack: "占有率",
                        data: [0.1, 0.09, 0.12, 0.13, 0.15, 0.19, 0.24]
                    },
                    {
                        name: "轿车",
                        type: "line",
                        stack: "占有率",
                        data: [0.3, 0.32, 0.35, 0.36, 0.4, 0.44, 0.46]
                    }
                ]
            };
            this.chartLine = echarts.init(document.getElementById("chartLine"));
            this.chartLine.setOption(option);
        },
        drawCharts () {
            this.drawBarChart();
            this.drawPieChart();
            this.drawLineChart();
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
    padding:0px
}
.el-form-item {
    margin-bottom: 16px;
}
</style>
