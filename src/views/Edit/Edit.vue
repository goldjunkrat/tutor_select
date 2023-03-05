<template>
  <div id="mask">
    
      <div class="edit-wrapper">
        <div class="edit" v-show="isStudent==='true'">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="form.realname"></el-input>
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="form.accountNumber"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="班级">
              <el-input v-model="form.className"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.telephone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="联系地址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <!-- <el-form-item label="选取状态">
              <el-radio-group v-model="form.hasTutor">
                <el-radio :label="1">已选取</el-radio>
                <el-radio :label="'0'">未选取</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="科研班">
              <el-radio-group v-model="form.hasScienceClass">
                <el-radio :label="1">已加入</el-radio>
                <el-radio :label="0">未加入</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="studentSubmit">完成</el-button>
              <el-button @click="gobackStudent">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="edit" v-show="isStudent==='false'">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="form.realname"></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-input v-model="form.birthday"></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="form.accountNumber"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="职称">
              <el-input v-model="form.teacherType"></el-input>
            </el-form-item>
            <el-form-item label="学院">
              <el-input v-model="form.collegeName"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.telephone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="联系地址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="总名额">
              <el-input v-model="form.totalStudent"></el-input>
            </el-form-item>
            <el-form-item label="头像链接">
              <el-input v-model="form.headImage"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">女</el-radio>
                <el-radio :label="0">男</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="履历">
              <el-input v-model="form.description" type="textarea"></el-input>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="teacherSubmit">完成</el-button>
              <el-button @click="gobackTeacher">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    
  </div>
</template>

<script>
import {reqModifyStudentInfo,reqModifyTeacherInfo} from '@/api/index'
export default {
  name: "Edit",
  data() {
    return {
      form: {
        
      },
      
    };
  },
  methods: {
    teacherSubmit() {
      console.log(this.form);
      if(confirm("确认修改?")){
        reqModifyTeacherInfo(this.form).then((resolve)=>{
          alert("修改成功!");
                setTimeout(() => {
                  location.reload();
                }, 1000);
                this.gobackTeacher()
        })
      }

    },
    studentSubmit() {
      // console.log("submit!");
      // console.log(this.form);
      if(confirm("确认修改?")){
        reqModifyStudentInfo(this.form).then((resolve)=>{
          alert("修改成功!");
                setTimeout(() => {
                  location.reload();
                  
                  
                }, 1000);
                this.gobackStudent()
        })
      }
    },
    gobackStudent() {
      this.$router.push("/student");
    },
    gobackTeacher(){
      this.$router.push("/teacher")
    }
  },
  computed:{
    isStudent(){
      return this.$route.query.isStudent
    },
  },
  mounted(){
    this.form = this.$route.query.data
    // console.log(this.form);
  }
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
.edit-wrapper {
  width: 50%;
  height: 95%;
  background-color: white;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.back {
  position: absolute;
  top: 5%;
  right: 3%;
  font-size: 24px;
}
.edit {
  width: 80%;
  height: 97%;
}
</style>