<template>
  <div class="admin-wrapper">
    <div class="admin-wrap">
      <div class="admin">
        <div class="set-time">
          <!-- <h1>设置第二轮选导师时间</h1>

          <div>第一轮导师选择将于xxxxxxx结束,请在结束前完成设置!</div>
          <div>
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            
            </el-date-picker>
            <el-button type="primary" style="margin-left:1.5%">确定</el-button>
          </div> -->
          <!-- <div class="start-info-form-wrap">
            <el-form class="start-info-form">
              <el-form-item label="输入年份轮次">
                <el-input  placeholder="审批人"></el-input>
              </el-form-item>
              <el-form-item label="输入开始日期">
                <el-input  placeholder="审批人"></el-input>
              </el-form-item>
              <el-form-item label="输入结束日期">
                <el-input  placeholder="审批人"></el-input>
              </el-form-item>
            </el-form>
          </div> -->
          <!-- <div> -->
            <h1>关闭系统</h1>
          <el-button class="shut-down" type="danger" @click="shutDownSystem">点击关闭</el-button>
          <!-- </div> -->
          
        </div>
        <div class="up-down-load">
          <div class="upload">
            <h1>上传学生信息</h1>
            <div style="margin-bottom:2%">
              <el-upload
                :on-success="upLoadHandler"
                class="upload-demo"
                drag
                action="http://zzzhong.cn:8081/Admin/UploadExcel/uploadStudentInfoExcel"
                multiple
                name="uploadFile"
                accept=".xls,.xlsx"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                  只能上传excel文件，且不超过20M
                </div>
              </el-upload>
            </div>
          </div>
          <div class="upload" style="margin-left: 5%;">
            <h1>上传导师信息</h1>
            <div style="margin-bottom:2%">
              <el-upload
                :on-success="upLoadHandler"
                class="upload-demo"
                drag
                action="http://zzzhong.cn:8081/Admin/UploadExcel/uploadTeacherInfoExcel"
                multiple
                name="uploadFile"
                accept=".xls,.xlsx"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                  只能上传excel文件，且不超过20M
                </div>
              </el-upload>
            </div>
          </div>
          <div class="download">
            <div>
              <h1>生成最终结果</h1>
            <el-button type="primary" style="margin-top:11%" @click="createResultFile">点击生成</el-button>
            </div>
            <div>
              <h1>下载最终选取结果(需先生成最终结果)</h1>
            <el-button type="primary" style="margin-top:11%" @click="downLoadResult">点击下载
            </el-button>
            </div>
            
          </div>
        </div>

        <!-- <div class="change-pass">
          <h1>修改密码</h1>
          <div class="change-pass">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="原密码" prop="oldPass">
                <el-input v-model.number="ruleForm.oldPass"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >提交</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div> -->
        <div class="change-pass">
          <div class="round">
            <div>
              <h1>开启第一轮学生向导师发送请求</h1>
              <el-button class="start" type="primary" @click="startStudentRoundOne">点击开启</el-button>
            </div>
            <div>
              <h1>开启第一轮导师选择学生</h1>
              <el-button class="start" type="primary" @click="startTeacherRoundOne">点击开启</el-button>
            </div>
            
          </div>
          <div class="round">
            <div>
              <h1>开启第二轮学生向导师发送请求</h1>
              <el-button class="start" type="primary" @click="startStudentRoundTwo">点击开启</el-button>
            </div>
            <div>
              <h1>开启第二轮导师选择学生</h1>
              <el-button class="start" type="primary" @click="startTeacherRoundTwo">点击开启</el-button>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { reqStudentOneRound,reqStudentTwoRound,reqTeacherOneRound,reqTeacherTwoRound,reqShutDownSystem,reqCreateResultFile } from "@/api/index";
import App from "@/App.vue";
export default {
    name: "Admin",
    data() {
        var checkOldPass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("旧密码不能为空"));
            }
            setTimeout(() => {
                if (value != this.prePass) {
                    callback(new Error("原密码不正确"));
                }
                else {
                    callback();
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }
            else if (value == this.prePass) {
                callback(new Error("请与原密码不同"));
            }
            else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            }
            else if (value !== this.ruleForm.pass) {
                callback(new Error("两次输入密码不一致!"));
            }
            else {
                callback();
            }
        };
        return {
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            value2: "",
            prePass: "111",
            ruleForm: {
                pass: "",
                checkPass: "",
                oldPass: "",
            },
            rules: {
                pass: [{ validator: validatePass, trigger: "blur" }],
                checkPass: [{ validator: validatePass2, trigger: "blur" }],
                oldPass: [{ validator: checkOldPass, trigger: "blur" }],
            },
        };
    },
    methods: {
      downLoadResult(){
        window.location = 'http://zzzhong.cn:8081/uploads/result.xlsx'
      },
      createResultFile(){
        reqCreateResultFile().then(resolve=>{
          alert('生成成功!')
        })
      },
      upLoadHandler(){
        alert('上传成功!')
      },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert("submit!");
                }
                else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        startStudentRoundOne() {
            if (confirm("确认开启学生第一轮选择吗?")) {
                reqStudentOneRound().then(resolve => {
                    alert("开启成功!");
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                });
            }
        },
        startStudentRoundTwo() {
            if (confirm("确认开启学生第二轮选择吗?")) {
                reqStudentTwoRound().then(resolve => {
                    alert("开启成功!");
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                });
            }
        },
        startTeacherRoundOne() {
            if (confirm("确认开启导师第一轮选择吗?")) {
                reqTeacherOneRound().then(resolve => {
                    alert("开启成功!");
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                });
            }
        },
        startTeacherRoundTwo() {
            if (confirm("确认开启导师第二轮选择吗?")) {
                reqTeacherTwoRound().then(resolve => {
                    alert("开启成功!");
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                });
            }
        },
        shutDownSystem() {
            if (confirm("确认全部选择工作已结束?关闭系统?")) {
                if (confirm("系统一经关闭无法开启,请再次确认关闭!")) {
                    reqShutDownSystem().then(resolve => {
                        alert("系统关闭!");
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    });
                }
            }
        }
    },
    components: { App }
};
</script>

<style>
.admin-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.admin-wrap {
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.admin {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.set-time {
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.up-down-load{
    height: 35%;
    display: flex;
    margin-top: 2%;
}
.upload {
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.download {
  margin-left: 4%;
  
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  
}
.change-pass {
  height: 45%;
}
h1 {
  font-size: 26px;
}
.change-pass{
    display: flex;
    /* flex-direction: column; */
    justify-content: space-around;
}
.start{
  width: 30%;
  margin-top: 5%;
}
.round{
  
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.shut-down{
  width: 30%;
}
.start-info-form{
  display: flex;
  justify-content: space-between;
}
</style>