<template>
  <div id="mask">
    <div class="distribution-wrapper">
      <div class="distribution">
        <h1 id="teacher-name">{{row.teacherName}}</h1>
        <div class="student-list">
          <div v-for="(option,index) in distributeList" :key="option.number">
            学生{{index+1}}:
            <el-select v-model="value[index]" clearable >
              <el-option
                v-for="item in option.options"
                :key="item.value"
                :value="item.label"
                :label="item.label"
              >
              </el-option>
            </el-select>
            
          </div>
          
        </div>
        <div class="btn">
          <div class="check">
            <el-button type="primary" @click="submitResult">确认</el-button>
          </div>
          <div class="cancel">
            <el-button type="danger" @click="goCondition">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { reqDistribute } from "@/api/index";
export default {
  name: "Distribution",
  data() {
    return {
      value:[]
    };
  },
  computed: {
    blankValue(){
      let n = this.row.totalStudent-this.row.agreeCount
      let list = []
      for(let i=0;i<n;i++){
        list.push('')
      }
      this.value = list
    },
    row() {
      return this.$route.query.data;
    },
    // select() {
    //   return [
    //     {
          
    //       options: [
    //         {
    //           label: "李四",
    //           value: `${this.row.member1.number}1`,
    //         },
    //         {
    //           label: "王五",
    //           value: `${this.row.member1.number}2`,
    //         },
    //       ],
    //       value:'111'
    //     },
    //     {
    //       default: this.row.member2.name,
    //       number:this.row.member2.number,
    //       options: [
    //         {
    //           label: "李四",
    //           value: `${this.row.member2.number}1`,
    //         },
    //         {
    //           label: "王五",
    //           value: `${this.row.member2.number}2`,
    //         },
    //       ],
    //       value:'222'
    //     },
    //     {
    //       default: this.row.member3.name,
    //       number:this.row.member3.number,
    //       options: [
    //         {
    //           label: "李四",
    //           value: `${this.row.member3.number}1`,
    //         },
    //         {
    //           label: "王五",
    //           value: `${this.row.member3.number}2`,
    //         },
    //       ],
    //       value:''
    //     },
    //     {
    //       default: this.row.member4.name,
    //       number:this.row.member4.number,
    //       options: [
    //         {
    //           label: "李四",
    //           value: `${this.row.member4.number}1`,
    //         },
    //         {
    //           label: "王五",
    //           value: `${this.row.member4.number}2`,
    //         },
    //       ],
    //       value:''
    //     },
    //     {
    //       default: this.row.member5.name,
    //       number:this.row.member5.number,
    //       options: [
    //         {
    //           label: "李四",
    //           value: `${this.row.member5.number}1`,
    //         },
    //         {
    //           label: "王五",
    //           value: `${this.row.member5.number}2`,
    //         },
    //       ],
    //       value:''
    //     },
    //   ];
    // },
    submitList(){
      let list = []
      this.value.forEach((item)=>{
        let diff = item.split(',')
        let obj = {
          studentId:diff[1],
          studentName:diff[0]
        }
        list.push(obj)
      })
      return list
    },
    submitStr(){
      let str = ''
      console.log(this.value);
      for(let i=0;i<this.value.length;i++){
        let diff = (this.value[i]||'').split(',')
        if(diff[1]!==undefined){
            str+=diff[1]+','
        }
      }
      str = str.substr(0,str.length-1)
      return str
    },
    distributeList(){
      let list = []
      // 此老师还有几个学生可选
      let restPickNumber = this.row.totalStudent-this.row.agreeCount
      for(let i =0 ;i<restPickNumber;i++){
        let obj = {}
        obj.number = i
        obj.value = ''
        let studentList = []
        this.noTeacherStudentList.forEach((student)=>{
          let studentInfo = {
            label:student.realname+","+student.studentId,
            value:student.studentId,
            obj:{
              studentName:student.realname,
              studentId:student.studentId
            }
          }
          studentList.push(studentInfo)
        })
        obj.options = studentList
        list.push(obj)
      }
      return list
    },
    ...mapState({
      noTeacherStudentList:state=>state.admin.noTeacherStudentList
    })
  },
  methods: {
    goCondition() {
      this.$router.push("/condition");
    },
    submitResult(){
      console.log(
        {
          teacherId:this.row.teacherId,
          teacherName:this.row.teacherName,
          studentIdsStr:this.submitStr
        }
      );
      if(confirm("确认分配?")){
        reqDistribute({
          teacherId:this.row.teacherId,
          teacherName:this.row.teacherName,
          studentIdsStr:this.submitStr
        }).then(resolve=>{
          alert('分配成功!')
          setTimeout(()=>{
            location.reload()
          },1000)
          this.goCondition()
        })
      }
    }
  },
};
</script>

<style scoped>
#mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
.distribution-wrapper {
  width: 50%;
  height: 60%;
  background-color: white;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.distribution {
  width: 90%;
  height: 90%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  justify-content: center;
  position: relative;
}
#teacher-name {
  position: absolute;
  z-index: 200;
  left: 5%;
  font-size: 35px;
}
.student-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.btn {
  width: 20%;
  right: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  justify-content: space-between;
}
</style>