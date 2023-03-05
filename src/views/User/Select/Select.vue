<template>
  <div>
    <h2 style="font-weight: 700; margin-bottom: 18px">选择结果</h2>
    <el-table
      ref="filterTable"
      :data="sendRequestsList"
      style="width: 100%"
      v-show="isStudent"
    >
      <el-table-column
        prop="requestTime"
        label="日期"
        sortable
        width="180"
        column-key="requestTime"
        :filters="dateList"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column prop="teacherName" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="roundName" label="选择轮次" width="180">
      </el-table-column>
      <el-table-column prop="teacherRestCount" label="剩余名额" width="180">
      </el-table-column>
      <el-table-column
        prop="teacherAddress"
        label="联系地址"
        :formatter="formatter"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="标签"
        width="100"
        :filters="[
          { text: '等待中', value: '等待中' },
          { text: '已同意', value: '已同意' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 0 ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.status === 0 ? "等待中" : "已同意" }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>

    
    <div class="result" v-show="isTeacher">
      <el-table
      ref="filterTable"
      :data="myStudentsList"
      style="width: 100%"
      v-show="isTeacher"
    >
      <el-table-column
        prop="receiveTime"
        label="日期"
        sortable
        width="180"
        column-key="receiveTime"
        :filters="dateList"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column prop="studentName" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="studentNumber" label="学号" width="180">
      </el-table-column>
      <el-table-column prop="className" label="专业班级" width="180">
      </el-table-column>
      <el-table-column prop="telephone" label="联系电话" :formatter="formatter">
      </el-table-column>
      <el-table-column
        prop="status"
        label="标签"
        width="100"
        :filters="[
          { text: '等待中', value: '等待中' },
          { text: '已同意', value: '已同意' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 0 ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.status === 0 ? "等待中" : "已同意" }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
    </div>

    
      
    
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Select",

  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "等待中",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "等待中",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "已拒绝",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "已选取",
        },
      ],
    };
  },

  computed: {
    dateList() {
      let list = [];
      let temp = [];
      if (this.isStudent) {
        
        
        this.sendRequestsList.forEach((item) => {
          temp.push(item.requestTime);
        });
        let noRepeat = new Set(temp);
        noRepeat.forEach((item) => {
          let dateObj = {};
          dateObj.text = item;
          dateObj.value = item;
          list.push(dateObj);
        });
      }
      if (this.isTeacher) {
        
        if (this.myStudentsList) {
          this.myStudentsList.forEach((item) => {
            temp.push(item.receiveTime);
          });
          let noRepeat = new Set(temp);
          noRepeat.forEach((item) => {
            let dateObj = {};
            dateObj.text = item;
            dateObj.value = item;
            list.push(dateObj);
          });
        }
      }

      return list;
    },
    ...mapState({
      isStudent: (state) => state.login.isStudent,
      isTeacher: (state) => state.login.isTeacher,
    }),
  },

  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.telephone;
    },
    filterTag(value, row) {
      return (row.status === 0 ? "等待中" : "已同意") === value;
    },
    filterHandler(value, row, column) {
      console.log(value, row, column);
      const property = column["property"];
      return row[property] === value;
    },
  },
  props: ["sendRequestsList", "haveChooseList", "myStudentsList"],
};
</script>

<style scoped>
  .result{
    overflow-y: scroll;
    height: 400px;
  }
</style>