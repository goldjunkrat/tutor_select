<template>
  <div class="process-content">
    <div class="process-line">
      <el-steps :active="2" align-center>
        <el-step
          title="步骤1"
          description="输入学号以及身份证后六位完成登录"
          status="success"
        ></el-step>
        <el-step
          title="步骤2"
          description="进入预览导师页面,浏览自己导师信息"
          status="success"
        ></el-step>
        <el-step
          title="步骤3"
          description="通过一志愿以及二志愿选择意向导师"
          :status="haveChooseList.length==0&&userInfo.hasTutor==0?'wait':'success'"
        ></el-step>
        <el-step
          title="步骤4"
          description="导师同意你的请求,整个选择流程结束"
          :status="userInfo.hasTutor==0?'wait':'success'"
        ></el-step>
      </el-steps>
    </div>
    <div class="process-introduction">
      <div class="box1">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>步骤一</span>
            <el-button style="float: right; padding: 3px 0;color:green;" type="text"
              >GO</el-button
            >
          </div>
          <!-- <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div> -->
          <div>
            <p>登陆账号是每个人的学号</p>
            <br>
            <p>初始密码为每个人的身份证号后6位</p>
            <br>
            <p>不要多个终端同时登录系统</p>
          </div>
        </el-card>
      </div>
      <div class="box1">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>步骤二</span>
            <el-button style="float: right; padding: 3px 0;color:green" type="text"
              >GO</el-button
            >
          </div>
          <!-- <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div> -->
          <div>
            <p>在此部分预览导师的信息</p>
          </div>
        </el-card>
      </div>
      <div class="box1">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>步骤三</span>
            <el-button style="float: right; padding: 3px 0;color:green" type="text"
              >GO</el-button
            >
          </div>
          <!-- <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div> -->
          <div>
            <p>每个学生被允许在整个选择导师期间向导师发送总计5次请求</p>
            <br>
            <p>若一志愿未被导师选取,则在二志愿再使用剩余机会向导师发送请求</p>
            <br>
            <p>若两轮志愿均未被导师选择,则等待分配</p>
          </div>
        </el-card>
      </div>
      <div class="box1">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>步骤四</span>
            <el-button style="float: right; padding: 3px 0;color:green" type="text"
              >GO</el-button
            >
          </div>
          <!-- <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div> -->
          <div>
            <p>导师同意你的请求,选择流程结束</p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Process",
  computed:{
    ...mapState({
      haveChooseList:state=>state.choose.haveChooseList,
      userInfo:state=>state.user.userInfo
    })
  }
};
</script>

<style scoped>
.process-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.process-introduction {
  display: grid;
  grid-template-columns: 600px 600px;
  gap: 100px 300px;
  margin-top: 80px;
}
.box1 {
  width: 600px;
  height: 200px;
  /* border: 1px solid; */
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  height: 100%;
}
</style>