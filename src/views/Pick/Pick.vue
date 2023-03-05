<template>
  <div class="pick-wrap">
    <div class="title">
      <h1 v-show="!isTeacher">
        第{{ roundId === 1 ? "一" : "二" }}轮志愿选择将于{{
          stopTime
        }}结束,请尽快选择！
      </h1>
      <h1 v-show="isTeacher && roundId == 1">
        您的本轮可选名额为:{{ canChooseNumber - this.myStudentsList.length }}
      </h1>
      <h1 v-show="isTeacher && roundId == 2">
        您的本轮可选名额为:{{
          this.userInfo.totalStudent - this.myStudentsList.length
        }}
      </h1>
    </div>
    <div class="pick">
      <el-transfer
        style="text-align: left; display: inline-block; height: 600px"
        v-model="value"
        filterable
        :left-default-checked="[]"
        :right-default-checked="[]"
        :render-content="renderFunc"
        :titles="[attr.apply, attr.readyApply]"
        :button-texts="['取消备选', '作为备选']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}',
        }"
        @right-check-change="handleChange"
        :data="dataShow"
      >
        <el-button
          class="transfer-footer"
          slot="left-footer"
          size="small"
          @click="attr.goAllApplyEvent"
          >{{ attr.goAllApply }}</el-button
        >
        <el-button
          class="transfer-footer"
          slot="right-footer"
          size="small"
          @click="attr.selectEvent"
          >{{ attr.select }}</el-button
        >
        <!-- <el-button
          class="transfer-footer"
          slot="right-footer"
          size="small"
          @click="attr.selectEvent"
          >{{ attr.select }}</el-button
        > -->
      </el-transfer>
    </div>
  </div>
</template>

<script>
import { reqSendChoice, reqAgreeStudentRequests, reqAgreeStudentRequestsAgain } from "@/api";
import { mapState } from "vuex";
export default {
  name: "Pick",
  data() {
    return {
      checkId: [],
      data1: [],
      value: [],
      value4: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      },
      teacherAttr: {
        apply: "可选学生列表",
        readyApply: "备选申请",
        goAllApply: "查看申请",
        goAllApplyEvent: () => {
          this.$router.push("/apply");
        },
        select: "选择选中的学生",
        selectEvent: () => {
          // console.log(this.checkId);
          if (this.checkId.length === 0) {
            alert("请选择学生之后提交");
          } else if (
            this.roundId == 1 &&
            this.checkId.length >
              this.canChooseNumber - this.myStudentsList.length
          ) {
            alert(
              `超过本轮可选学生数,您本轮的剩余可选学生数为${
                this.canChooseNumber - this.myStudentsList.length
              }`
            );
          } else if (
            this.roundId == 2 &&
            this.checkId.length >
              this.userInfo.totalStudent - this.myStudentsList.length
          ) {
            alert(
              `超过本轮可选学生数,您本轮的剩余可选学生数为${
                this.userInfo.totalStudent - this.myStudentsList.length
              }`
            );
          } else {
            if (confirm("确认选择?")) {
              if(this.roundId==1){
                reqAgreeStudentRequests({
                studentIds: this.checkId,
                roundId: this.originRoundId,
                }).then((resolve) => {
                  alert("选择成功!");
                  setTimeout(() => {
                    location.reload();
                  }, 1000);
                });
              }
              if(this.roundId==2){
                reqAgreeStudentRequestsAgain({
                  studentIds: this.checkId,
                  roundId: this.originRoundId,
                }).then(reslove=>{
                  alert('选择成功!')
                  setTimeout(()=>{
                    location.reload()
                  },1000)
                })
              }
            }
          }
        },
      },
      studentAttr: {
        apply: "可选导师",
        readyApply: "备选导师",
        goAllApply: "进入导师预览",
        goAllApplyEvent: () => {
          this.$router.push("/list");
        },
        select: "选择选中的导师",
        selectEvent: () => {
          if (this.checkId.length === 0) {
            alert("请选择导师之后提交");
          } else if (this.checkId.length > 5 - this.haveChooseList.length) {
            alert(
              `超过总可发送导师数,您的剩余可发送导师数为${
                5 - this.haveChooseList.length
              }`
            );
          } else {
            if (confirm("确认提交?")) {
              reqSendChoice({
                checkId: this.checkId,
                roundId: this.roundId,
              }).then((resolve) => {
                alert("提交成功!");
                setTimeout(() => {
                  location.reload();
                }, 1000);
              });
            }
          }
        },
      },
    };
  },

  computed: {
    attr() {
      let attr = {};
      if (this.isTeacher) {
        attr = this.teacherAttr;
      }
      if (this.isStudent) {
        attr = this.studentAttr;
      }
      return attr;
    },
    ...mapState({
      isStudent: (state) => state.login.isStudent,
      isTeacher: (state) => state.login.isTeacher,
      roundId: (state) => state.choose.roundId,
      stopTime: (state) => state.choose.stopTime,
      haveChooseList: (state) => state.choose.haveChooseList,
      // 导师收到的请求列表
      studentsRequestsList: (state) => state.choose.studentsRequestsList,
      // 获取当前老师轮次的原始roundId
      originRoundId: (state) => state.choose.originRoundId,
      // 导师的信息
      userInfo: (state) => state.user.userInfo,
      // 导师已选学生的列表
      myStudentsList: (state) => state.choose.myStudentsList,
    }),
    dataShow() {
      let processData = [];
      if (this.isStudent) {
        if (this.haveChooseList.length === 5) {
          this.data1.forEach((item) => {
            processData.push({
              ...item,
              disabled: true,
            });
          });
          return processData;
        } else {
          this.data1.forEach((item) => {
            if (this.haveChooseList.indexOf(item.key) !== -1) {
              processData.push({
                ...item,
                disabled: true,
              });
            } else {
              processData.push(item);
            }
          });
          return processData;
        }
      }
      if(this.isTeacher){
        if(this.roundId==1&&this.myStudentsList.length===this.canChooseNumber){
          this.data1.forEach((item)=>{
            processData.push({
              ...item,
              disabled:true
            })
          })
          return processData
        }
        if(this.myStudentsList.length===this.userInfo.totalStudent){
          this.data1.forEach((item)=>{
            processData.push({
              ...item,
              disabled:true
            })
          })
          return processData
        }else{
          this.data1.forEach((item)=>{
            processData.push(item)
          })
          return processData
        }
      }
    },
    // 导师本轮可选的人数
    canChooseNumber() {
      return this.userInfo.totalStudent % 2 == 0
        ? Math.floor(this.userInfo.totalStudent / 2)
        : Math.floor(this.userInfo.totalStudent / 2) + 1;
    },
  },
  methods: {
    handleChange(checkId) {
      this.checkId = checkId;
    },
  },
  async mounted() {
    // console.log(this.data);
    // 当学生第一轮时
    if (this.roundId === 1 && this.isStudent) {
      let list = [];
      await this.$store.dispatch("getChooseList_1");
      this.$store.state.choose.chooseList_1.forEach((item) => {
        list.push({
          key: item.teacherId,
          label: item.realname,
        });
      });
      this.data1 = list;
    }
    // 当学生第二轮时
    if (this.roundId === 2 && this.isStudent) {
      let list = [];
      await this.$store.dispatch("getChooseList_2");
      this.$store.state.choose.chooseList_2.forEach((item) => {
        list.push({
          key: item.teacherId,
          label: item.realname,
        });
      });
      this.data1 = list;
    }

    // 当导师第一轮时
    if (this.roundId === 1 && this.isTeacher) {
      let list = [];
      await this.$store.dispatch("getAllStudentsRequests", {
        originRoundId: this.originRoundId,
      });
      this.$store.state.choose.allStudentsRequests.forEach((item) => {
        list.push({
          key: item.studentId,
          label: item.studentName,
        });
      });
      this.data1 = list;
      
    }
    // 当导师第二轮时
    if (this.roundId === 2 && this.isTeacher) {
      let list = [];
      await this.$store.dispatch("getAllStudentsRequests", {
        originRoundId: this.originRoundId,
        
      });

      this.$store.state.choose.allStudentsRequests.forEach((item) => {
        list.push({
          key: item.studentId,
          label: item.studentName,
        });
      });
      this.data1 = list;
    }
  },
};
</script>

<style scoped>
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
.pick-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.title {
  align-self: flex-start;
  margin-left: 30px;
  font-size: 30px;
}
.pick {
  margin-top: -60px;
}
</style>