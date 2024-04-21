<template>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="证书名称">
        </el-table-column>
        <el-table-column prop="name" label="证书获得时间" width="180">
        </el-table-column>
        <el-table-column prop="address" label="获得证书用户">
        </el-table-column>
        <el-table-column prop="date" label="证书等级">
        </el-table-column>
        <el-table-column prop="name" label="证书颁发机构" width="180">
        </el-table-column>
        <el-table-column prop="address" label="获得证书的地点">
        </el-table-column>
        <el-table-column prop="address" label="创建时间">
        </el-table-column>
        <el-table-column label="操作" width="100px">
            <i class="el-icon-edit" style="font-size:18px"></i>
            <i class="el-icon-delete" style="padding-left:10px;font-size:18px"></i>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    data () {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    }
}
</script>
<style>
</style>