<template>
  <div>
    <!-- 学生的表 -->
    <el-table
    v-show="type=='student'"
    style="width: 100%"
    :data="
      tableData.filter(
        (data) =>
          !search ||
          data.realname.toLowerCase().includes(search.toLowerCase()) ||
          data.accountNumber.toLowerCase().includes(search.toLowerCase())
      )
    "
  >
    <el-table-column fixed prop="realname" :label="attr.name" width="150">
    </el-table-column>
    <el-table-column prop="accountNumber" :label="attr.number" width="150"> </el-table-column>
    <el-table-column prop="className" :label="attr.class" width="150"> </el-table-column>
    <el-table-column prop="telephone" :label="attr.phone" width="150"> </el-table-column>
    <el-table-column prop="email" :label="attr.email" width="200"> </el-table-column>
    <el-table-column prop="hasTutor" :label="attr.status" width="150">
    </el-table-column>
    <el-table-column prop="address" width="300">
      <template slot="header" slot-scope="scope">
        {{attr.address}}
        <el-button type="primary" size="mini" class="add-btn" @click="attr.addEvent"
          >{{attr.add}}</el-button
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" width="250">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row,attr.edit)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- 导师的表 -->
  <el-table
    v-show="type=='teacher'"
    style="width: 100%"
    :data="
      tableData.filter(
        (data) =>
          !search ||
          data.realname.toLowerCase().includes(search.toLowerCase()) ||
          data.accountNumber.toLowerCase().includes(search.toLowerCase())
      )
    "
  >
    <el-table-column fixed prop="realname" :label="attr.name" width="150">
    </el-table-column>
    <el-table-column prop="teacherType" :label="attr.number" width="150"> </el-table-column>
    <el-table-column prop="collegeName" :label="attr.class" width="150"> </el-table-column>
    <el-table-column prop="telephone" :label="attr.phone" width="150"> </el-table-column>
    <el-table-column prop="email" :label="attr.email" width="200"> </el-table-column>
    <el-table-column prop="untreatedRequestsCount" :label="attr.status" width="150">
    </el-table-column>
    <el-table-column prop="address" width="300">
      <template slot="header" slot-scope="scope">
        {{attr.address}}
        <el-button type="primary" size="mini" class="add-btn" @click="attr.addEvent"
          >{{attr.add}}</el-button
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" width="250">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleLock(scope.$index, scope.row)" :type="scope.row.isLock==1?'success':'warning'"
          >{{scope.row.isLock==1?'上锁':'解锁'}}</el-button
        >
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row,attr.edit)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  </div>
  
  
</template>

<script>
  import { reqDeleteStudentInfo , reqDeleteTeacherInfo, reqLockOrNotTeacher} from "@/api/index";
export default {
  name: "Manage",
  props: ["attr", "tableData",'type'],
  mounted(){
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    handleEdit(index, row,edit) {
      // console.log(index, row);
      edit(row)
    },
    handleDelete(index, row) {
      if(row.studentId){
        if(confirm("确定删除吗?")){
          reqDeleteStudentInfo({studentId:row.studentId}).then((resolve)=>{
            alert('删除成功!')
            setTimeout(() => {
                  location.reload();
            }, 1000);
          })
        }
      }
      if(row.teacherId){
        if(confirm("确定删除吗?")){
          reqDeleteTeacherInfo({teacherId:row.teacherId}).then((resolve)=>{
            alert('删除成功!')
            setTimeout(() => {
                  location.reload();
            }, 1000);
          })
        }
      }
    },
    handleLock(index,row){
      console.log(row);
      if(row.isLock==0){
        if(confirm('当前该导师处于锁定状态，确认解锁?')){
          reqLockOrNotTeacher({
            teacherId:row.teacherId,
            isLock:row.isLock
          }).then(resolve=>{
            alert('解锁成功!')
            setTimeout(() => {
                  location.reload();
            }, 1000);
          })
        }
      }
      if(row.isLock==1){
        if(confirm('当前该导师处于未锁定状态，确认上锁?')){
          reqLockOrNotTeacher({
            teacherId:row.teacherId,
            isLock:row.isLock
          }).then(resolve=>{
            alert('上锁成功!')
            setTimeout(() => {
                  location.reload();
            }, 1000);
          })
        }
      }
      
    }
  },
};
</script>

<style scoped>
.add-btn{
    margin-left: 50%;
}
</style>