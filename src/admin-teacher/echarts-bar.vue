// 统计学生去向
<template>
    <main style="height:100%;width:100%">
        <!-- <el-select v-model="destinationId" placeholder="请选择" clearable>
            <el-option v-for="item in automobiledestinationIds" :key="item.id" :label="item.type" :value="item.id"></el-option>
        </el-select>
        <div></div> -->
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div id="echarts1" style="width:100%;height:100%"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div id="echarts2" style="width:100%;height:100%"></div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div id="echarts3" style="width:100%;height:100%"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div id="echarts4" style="width:100%;height:100%"></div>
                </div>
            </el-col>
        </el-row>
    </main>
</template>

<script>
import * as echarts from 'echarts';
import axios from "axios";
export default {
    data () {
        return {
            destinationId: '',
            automobiledestinationIds: [],
            pieOption1: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '去向类型',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        // emphasis: {
                        //     label: {
                        //         show: true,
                        //         fontSize: 40,
                        //         fontWeight: 'bold'
                        //     }
                        // },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                    }
                ],
                graphic: {
                    type: 'text',
                    left: 'center', // 文字居中
                    top: 'center', // 文字居中
                    style: {
                        text: '全院', // 显示的文字
                        textAlign: 'center',
                        fill: '#000', // 文字颜色
                        fontSize: 20
                    }
                }
            },
            pieOption2: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '去向类型',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        // emphasis: {
                        //     label: {
                        //         show: true,
                        //         fontSize: 40,
                        //         fontWeight: 'bold'
                        //     }
                        // },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                    }
                ],
                graphic: {
                    type: 'text',
                    left: 'center', // 文字居中
                    top: 'center', // 文字居中
                    style: {
                        text: '网络工程', // 显示的文字
                        textAlign: 'center',
                        fill: '#000', // 文字颜色
                        fontSize: 20
                    }
                }
            },
            pieOption3: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '去向类型',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        // emphasis: {
                        //     label: {
                        //         show: true,
                        //         fontSize: 40,
                        //         fontWeight: 'bold'
                        //     }
                        // },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                    }
                ],
                graphic: {
                    type: 'text',
                    left: 'center', // 文字居中
                    top: 'center', // 文字居中
                    style: {
                        text: '软件工程', // 显示的文字
                        textAlign: 'center',
                        fill: '#000', // 文字颜色
                        fontSize: 20
                    }
                }
            },
            pieOption4: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '去向类型',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        // emphasis: {
                        //     label: {
                        //         show: true,
                        //         fontSize: 40,
                        //         fontWeight: 'bold'
                        //     }
                        // },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                    }
                ],
                graphic: {
                    type: 'text',
                    left: 'center', // 文字居中
                    top: 'center', // 文字居中
                    style: {
                        text: '计算机科学与技术', // 显示的文字
                        textAlign: 'center',
                        fill: '#000', // 文字颜色
                        fontSize: 20
                    }
                }
            },
        }

    },
    mounted () {
        this.getestList()
        this.getDataList()

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
                        this.destinationId = res.data.data[0].id
                    }
                })
                .catch(error => {
                    that.$message({
                        message: "网络错误,请稍后再试",
                        type: "error"
                    });
                });
        },
        getDataList () {
            let that = this;
            axios
                .get(
                    "http://127.0.0.1:9000/pic_lib/user/statistical", {}
                )
                .then(res => {
                    console.log(res.data)
                    if (res.data.code == 200) {
                        let result = res.data.data
                        this.pieOption1.series[0].data = result.resultMapList1
                        this.pieOption2.series[0].data = result.resultMapList2
                        this.pieOption3.series[0].data = result.resultMapList3
                        this.pieOption4.series[0].data = result.resultMapList4
                        this.$nextTick(() => {
                            this.drawPieChart1()
                            this.drawPieChart2()
                            this.drawPieChart3()
                            this.drawPieChart4()
                        })
                    }
                })
                .catch(error => {
                    that.$message({
                        message: "网络错误,请稍后再试",
                        type: "error"
                    });
                });
        },
        drawPieChart1 () {
            console.log('画饼');
            //初始化echarts实例
            var myChart = echarts.init(
                document.getElementById('echarts1')
            );
            myChart.clear();
            //使用刚指定的配置项和数据显示图表。
            myChart.setOption(this.pieOption1);
            window.addEventListener('resize', function () {
                myChart.resize();
            });
        },
        drawPieChart2 () {
            console.log('画饼');
            //初始化echarts实例
            var myChart = echarts.init(
                document.getElementById('echarts2')
            );
            myChart.clear();
            //使用刚指定的配置项和数据显示图表。
            myChart.setOption(this.pieOption2);
            window.addEventListener('resize', function () {
                myChart.resize();
            });
        },
        drawPieChart3 () {
            console.log('画饼');
            //初始化echarts实例
            var myChart = echarts.init(
                document.getElementById('echarts3')
            );
            myChart.clear();
            //使用刚指定的配置项和数据显示图表。
            myChart.setOption(this.pieOption3);
            window.addEventListener('resize', function () {
                myChart.resize();
            });
        },
        drawPieChart4 () {
            console.log('画饼');
            //初始化echarts实例
            var myChart = echarts.init(
                document.getElementById('echarts4')
            );
            myChart.clear();
            //使用刚指定的配置项和数据显示图表。
            myChart.setOption(this.pieOption4);
            window.addEventListener('resize', function () {
                myChart.resize();
            });
        },
    }
}
</script>

<style scoped>
.el-row {
    height: 48.5%;
    margin-bottom: 20px;
}

.el-col {
    height: 100%;
    border-radius: 4px;
}

.bg-purple {
    background: #f7f8fa;
}

.grid-content {
    border-radius: 4px;
    height: 100%;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>