<template>
  
    <el-table
      :data="
        studentsRequestsList.filter(
          (data) =>
            !search || data.studentName.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="申请日期" prop="receiveTime"> </el-table-column>
      <el-table-column label="申请人" prop="studentName"> </el-table-column>
      <el-table-column label="申请轮次" prop="aroundName"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          > -->
          <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  
</template>

<script>
export default {
  name: "ApplyInfo",
  props:['studentsRequestsList'],
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      search: "",
    };
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
      this.$router.push({
        path:'/apply/detail',
        query:{
          info:row
        }
      })
    },
  },
};
</script>

<style>
</style>