<template>
  <div class="teacher-list-wrapper">
    <div class="teacher-list-wrap">
      <div class="teacher-list">
        <div>
          <el-table
            style="width: 100%"
            :data="
              tableData.filter(
                (data) =>
                  !search ||
                  data.teacherName.toLowerCase().includes(search.toLowerCase())
              )
            "
          >
            <el-table-column fixed prop="teacherName" label="导师" width="150">
            </el-table-column>
            <el-table-column label='学生' width="1100" >
              <el-table-column  prop="studentName" label="姓名" width="1238">
              </el-table-column>
            </el-table-column>
            

            <el-table-column  width="150">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"
                />
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <!-- <el-button size="mini" type="danger">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <transition name="el-fade-in">
        <router-view></router-view>
      </transition>
      <Paganation :totalSize="AdminTeacherStudentPickTotalSize" @getCurrentPage="getCurrentPage" :pageSize="pageSize"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Condition",
  data() {
    return {
      // tableData: [
      //   {
      //     name: "张鑫南",
      //     member1: {
      //       name: "张三",
      //       number: 2016212304,
      //     },
      //     member2: {
      //       name: "孙三",
      //       number: 2016212305,
      //     },
      //     member3: {
      //       name: "李三",
      //       number: 2016212306,
      //     },
      //     member4: {
      //       name: "钱三",
      //       number: 2016212307,
      //     },
      //     member5: {
      //       name: "胡三",
      //       number: 2016212308,
      //     },
      //   },
      //   {
      //     name: "张鑫南",
      //     member1: {
      //       name: "张三",
      //       number: 2016212304,
      //     },
      //     member2: {
      //       name: "孙三",
      //       number: 2016212305,
      //     },
      //     member3: {
      //       name: "李三",
      //       number: 2016212306,
      //     },
      //     member4: {
      //       name: "钱三",
      //       number: 2016212307,
      //     },
         
      //   },
      // ],
      search: "",
      pageSize:11,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({ path: "/condition/distribution" ,query:{data:row}});
    },
    async getCurrentPage(currentPage){
      await this.$store.dispatch('getAdminTeacherStudentPickList',{page:currentPage})
    }
  },
  computed:{
    ...mapState({
      AdminTeacherStudentPickTotalSize:state=>state.admin.AdminTeacherStudentPickTotalSize,
      AdminTeacherStudentPickList:state=>state.admin.AdminTeacherStudentPickList
    }),
    tableData(){
      let list = []
      this.AdminTeacherStudentPickList.forEach((teacher)=>{
        let str=''
        if(teacher.studentNameList){
          let i=0
          teacher.studentNameList.forEach((studentName)=>{
            i++
            if(i!==teacher.studentNameList.length){
              str+=studentName+'，'
            }else{
              str+=studentName
            }
          })
        }
        list.push({
          teacherName:teacher.teacherName,
          studentName:str,
          agreeCount:teacher.agreeCount,
          totalStudent:teacher.totalStudent,
          teacherId:teacher.teacherId
        })
      })
      return list
    }
     
  },
  mounted(){
    this.$store.dispatch('getAdminTeacherStudentPickList',{page:1})
    // console.log(this.AdminTeacherStudentPickTotalSize());
    // console.log(this.AdminTeacherTotalSize);
  }
};
</script>

<style scoped>
.teacher-list-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.teacher-list-wrap {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.teacher-list {
  width: 100%;
  height: 92%;
}
</style>