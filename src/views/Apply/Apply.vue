<template>
  <div class="apply-wrapper">
    <div class="apply-wrap">
      <ApplyInfo style="margin-bottom:2%" :studentsRequestsList="studentsRequestsList"/>
      <Paganation style="position:absolute;bottom:2%" :totalSize="totalSize" @getCurrentPage="getCurrentPage" :pageSize="pageSize"/>
    </div>
    <transition name="el-fade-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ApplyInfo from "./ApplyInfo/ApplyInfo.vue";
export default {
  name: "Apply",
  data() {
    return {
      pageSize:12
    }
  },
  computed:{
    ...mapState({
      studentsRequestsList:state=>state.choose.studentsRequestsList,
      totalSize:state=>state.choose.totalRequests
    })
  },
  components: {
    ApplyInfo,
  },
  methods:{
    async getCurrentPage(currentPage){
      await this.$store.dispatch('getReceiveRequestsList',{page:currentPage,limit:this.pageSize})
    },
  }
};
</script>

<style scoped>
.apply-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.apply-wrap{
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
</style>