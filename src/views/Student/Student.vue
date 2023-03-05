<template>
  <div class="student-list-wrapper">
    <div class="student-list-wrap">
      <div class="student-list">
        <Manage :tableData="adminStudentInfoList" :attr="attr" :type="type"/>
      </div>
      <transition name="el-fade-in">
        <router-view></router-view>
      </transition>
      <Paganation :totalSize="AdminStudentTotalSize" @getCurrentPage="getCurrentPage" :pageSize="pageSize" />
    </div>
  </div>
</template>

<script>
import Manage from "@/components/Manage/Manage.vue";
import { mapState } from 'vuex';
export default {
  name: "Student",
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    async getCurrentPage(currentPage){
      await this.$store.dispatch('getAdminStudentInfoList',{page:currentPage})
    }
  },
  components: {
    Manage,
  },
  data() {
    return {
      tableData: [
        {
          name: "张鑫南",
          number: "s210231264",
          class: "生信二班",
          phone: "18892133830",
          email: "1016217659@qq.com",
          status: 0,
          address: "陕西省渭南市临渭区光电高层8楼b2",
          scienceClass:1
        },
        {
          name: "张鑫南",
          number: "s210231265",
          class: "生信二班",
          phone: "18892133830",
          email: "1016217659@qq.com",
          status: false,
          address: "陕西省渭南市临渭区光电高层8楼b2",
          scienceClass:true
        },
        {
          name: "张鑫南",
          number: "s210231264",
          class: "生信二班",
          phone: "18892133830",
          email: "1016217659@qq.com",
          status: true,
          address: "陕西省渭南市临渭区光电高层8楼b2",
          scienceClass:true
        },
        {
          name: "张鑫南",
          number: "s210231264",
          class: "生信二班",
          phone: "18892133830",
          email: "1016217659@qq.com",
          status: true,
          address: "陕西省渭南市临渭区光电高层8楼b2",
          scienceClass:true
        },
        {
          name: "张鑫南",
          number: "s210231264",
          class: "生信二班",
          phone: "18892133830",
          email: "1016217659@qq.com",
          status: true,
          address: "陕西省渭南市临渭区光电高层8楼b2",
          scienceClass:true
        },
        {
          name: "张鑫南",
          number: "s210231264",
          class: "生信二班",
          phone: "18892133830",
          email: "1016217659@qq.com",
          status: true,
          address: "陕西省渭南市临渭区光电高层8楼b2",
          scienceClass:true
        },
        {
          name: "张鑫南",
          number: "s210231264",
          class: "生信二班",
          phone: "18892133830",
          email: "1016217659@qq.com",
          status: true,
          address: "陕西省渭南市临渭区广电高层8楼b2",
          scienceClass:true
        },
        {
          name: "张鑫南",
          number: "s210231264",
          class: "生信二班",
          phone: "18892133830",
          email: "1016217659@qq.com",
          status: true,
          address: "陕西省渭南市临渭区广电高层8楼b2",
          scienceClass:true
        },
        {
          name: "张鑫南",
          number: "s210231264",
          class: "生信二班",
          phone: "18892133830",
          email: "1016217659@qq.com",
          status: true,
          address: "陕西省渭南市临渭区广电高层8楼b2",
          scienceClass:true
        },
        {
          name: "张鑫南",
          number: "s210231264",
          class: "生信二班",
          phone: "18892133830",
          email: "1016217659@qq.com",
          status: true,
          address: "陕西省渭南市临渭区广电高层8楼b2",
          scienceClass:true
        },
        {
          name: "张鑫南",
          number: "s210231264",
          class: "生信二班",
          phone: "18892133830",
          email: "1016217659@qq.com",
          status: true,
          address: "陕西省渭南市临渭区广电高层8楼b2",
          scienceClass:true
        },
        {
          name: "张鑫南",
          number: "s210231264",
          class: "生信二班",
          phone: "18892133830",
          email: "1016217659@qq.com",
          status: true,
          address: "陕西省渭南市临渭区广电高层8楼b2",
          scienceClass:true
        },
      ],
      attr: {
        name: "姓名",
        number: "学号",
        class: "班级",
        phone: "电话",
        email: "邮箱",
        status: "选取状态",
        address: "联系地址",
        add: "添加学生",
        addEvent: () => {
          this.$router.push({
            path: "/student/edit",
            query: {
              isStudent: true,
              data: {
                realname: "",
                accountNumber: "",
                password:'',
                className: "",
                telephone: "",
                email: "",
                address: "",
                status: false,
                hasScienceClass:0,
              },
            },
          });
        },
        edit: (data) => {
          this.$router.push({
            path: "/student/edit",
            query: { isStudent: true, data },
          });
        },
      },
      pageSize:12,
      // 进入的是学生页面
      type:'student'
    };
  },
  async mounted(){
    await this.$store.dispatch('getAdminStudentInfoList',{page:1})
  },
  computed:{
    adminStudentInfoList(){
      return this.$store.state.admin.AdminStudentInfoList
    },
    ...mapState({
      AdminStudentTotalSize:state=>state.admin.AdminStudentTotalSize
    })
  }
};
</script>

<style scoped>
.student-list-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.student-list-wrap {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.student-list {
  width: 100%;
  height: 92%;
}
</style>