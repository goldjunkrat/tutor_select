<template>
  <div class="bg">
    <!-- <canvas id="sakura"> </canvas> -->
    <main>
      <!-- 登录框 -->
      <div class="login-wrapper">
        <div class="login-wrap">
          <!-- 登录框标题 -->
          <div class="title-wrapper">
            <!-- logo -->
            <div class="logo-wrap">
              <img src="@/assets/logo.png" />
            </div>
            <!-- 标题 -->
            <div class="title">毕设导师选择平台</div>
          </div>
          <!-- 登录表单 -->
          <div class="login-form">
            <!-- 用户名 -->
            <div id="username">
              <i class="el-icon-user"></i>
              <input
                type="text"
                placeholder="请输入用户名"
                v-model="username"
              />
            </div>
            <!-- 密码 -->
            <div id="password">
              <i class="el-icon-lock"></i>
              <input
                type="password"
                placeholder="请输入密码"
                v-model="password"
              />
            </div>

            <!-- 选择登陆身份 -->
            <div id="login-type">
              <el-radio
                v-for="item in loginType"
                :key="item.value"
                v-model="radio"
                :label="item.typeId"
                style="color: white"
                >{{ item.type }}</el-radio
              >
            </div>
            <!-- 记住密码和自动登录 -->
            <!-- <div class="save-auto">
                        
                        <div id="save-password">
                            <input type="checkbox"><div>记住密码</div> 
                        </div>
                        
                        <div id="auto-login">
                            <input type="checkbox"><div>自动登录</div> 
                        </div>
                    </div> -->
            <!-- 登录 -->
            <div id="login">
              <button @click="login">登录</button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="btnbg"></div>
  </div>
</template>

<script>
import { setLoginType } from "@/utils/loginType";
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      loginType: [
        { type: "学生", typeId: "1", isChecked: true, value: "学生" },
        { type: "导师", typeId: "2", isChecked: false, value: "导师" },
        { type: "管理", typeId: "3", isChecked: false, value: "管理" },
      ],
      radio: "1",
    };
  },
  computed: {
    loginInfo() {
      return {
        accountNumber: this.username,
        password: this.password,
      };
    },
    ...mapState({
      token: (state) => state.user.token,
    }),
  },
  methods: {
    login() {
      switch (this.radio) {
        case "1":
          this.$store.dispatch("studentLogin", this.loginInfo);
          // console.log(this.token);
          

          // if (this.token) {
          //   this.$store.dispatch("getIsStudent", true);
          //   this.$store.dispatch("getStudentInfo");
          //   setLoginType("isStudent");
          //   this.$router.push("/home");
          // }

          break;
        case "2":
          this.$store.dispatch("teacherLogin",this.loginInfo)
          
          // sessionStorage.setItem('isTeacher',true)
          // this.$store.dispatch("getIsTeacher", true);
          // setLoginType("isTeacher");
          // this.$router.push("/apply");
          break;
        case "3":
          this.$store.dispatch("adminLogin",this.loginInfo)
          // this.$store.dispatch("getIsAdmin", true);
          // sessionStorage.setItem('isAdmin',true)
          // setLoginType("isAdmin");
          // this.$router.push("/student");
          break;
      }
    },
  },
  watch: {
    token() {
      this.$nextTick(() => {
        switch(this.radio){
          case '1':
            this.$store.dispatch("getIsStudent", true);
            this.$store.dispatch("getStudentInfo");
            setLoginType("isStudent");
            this.$router.push("/home");
            break
          case '2':
            this.$store.dispatch('getIsTeacher',true)
            this.$store.dispatch("getTeacherInfo");
            this.$store.dispatch('getReceiveRequestsList',{limit:12,page:1})
            setLoginType("isTeacher");
            
            this.$router.push('/apply')
            break
          case '3':
            this.$store.dispatch('getIsAdmin',true)
            setLoginType("isAdmin");
            this.$router.push('/student')
            break
        }
        
      });
    },
  },
};
</script>


<style scoped>
  main{
    position: relative;
  }
.bg {
  background: no-repeat;
  background-image: url('@/views/Login/imgs/bg1.jpg');
  background-size: cover;
  height: 100%;
  width: 100%;
  /* overflow: hidden; */
  display: flex;
  justify-content: center;
  align-items: center;
}
canvas {
  padding: 0;
  margin: 0;
}

div.btnbg {
  position: fixed;
  left: 0;
  top: 0;
}

.login-wrapper {
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 5px;
}

.login-wrap {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
}

.title-wrapper {
  display: flex;
  flex: 1;
}

.logo-wrap {
  flex: 1;
}

.login-wrap img {
  width: 100%;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 20px;
  line-height: 47.5px;
  font-weight: bold;
}

.login-form {
  margin: 0 auto;
  width: 70%;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 9;
  /* font-size: 20px; */
}

.login-form > div {
  width: 100%;
}

#login-type {
  display: flex;
  justify-content: space-between;
}

#username {
  width: 100%;
}

#username,
#password {
  display: flex;
  align-items: center;
  font-size: 20px;
}

#username input,
#password input {
  width: 100%;
  padding: 0;
  border: none;
  height: 25px;
  font-size: 16px;
  background-color: transparent;
  border-bottom: 1px solid white;
  color: white;
  margin-left: 10px;
}

#username input:focus,
#password input:focus {
  outline: none;
  /* border-color: rgb(63, 102, 187); */
  border-color:skyblue ;
}

#username input::placeholder,
#password input::placeholder {
  color: white;
}

.save-auto {
  display: flex;
  justify-content: space-between;
}

#login-type > div,
.save-auto > div {
  display: flex;
  align-items: center;
}

#login-type input,
.save-auto input {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0;
  margin-right: 5px;
}

#login {
  width: 100%;
}

#login button {
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 5px;
}

#login button:hover {
  transition: 0.3s;
  background-color: rgb(207, 198, 198);
}
</style>