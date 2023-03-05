// 存放管理员端的所有值

import { reqAdminStudentInfoList ,reqAdminTeacherInfoList,reqSelectedResultByPage} from "@/api/index";

const state={
    // 管理员端的学生信息列表
    AdminStudentInfoList:[],
    // 管理员端的学生信息总数(用于分页)
    AdminStudentTotalSize:0,
    // 管理员端的导师信息列表
    AdminTeacherInfoList:[],
    // 管理员端的导师信息总数(用于分页)
    AdminTeacherTotalSize:0,
    // 管理员端的学生导师互选列表
    AdminTeacherStudentPickList:[],
    // 管理员端的学生导师互选总数(用于分页)
    AdminTeacherStudentPickTotalSize:0,
    // 还未拥有导师的学生列表
    noTeacherStudentList:[],
}
const mutations={
    GETADMINSTUDENTINFOLIST(state,AdminStudentInfoList){
        state.AdminStudentInfoList = AdminStudentInfoList
    },
    GETADMINSTUDENTTOTALSIZE(state,totalSize){
        state.AdminStudentTotalSize = totalSize
    },
    GETADMINTEACHERINFOLIST(state,AdminStudentInfoList){
        state.AdminTeacherInfoList = AdminStudentInfoList
    },
    GETADMINTEACHERTOTALSIZE(state,totalSize){
        state.AdminTeacherTotalSize = totalSize
    },
    GETADMINTEACHERSTUDENTPICKLIST(state,AdminTeacherStudentPickList){
        state.AdminTeacherStudentPickList = AdminTeacherStudentPickList
    },
    GETADMINTEACHERSTUDENTPICKTOTALSIZE(state,AdminTeacherStudentPickTotalSize){
        state.AdminTeacherStudentPickTotalSize = AdminTeacherStudentPickTotalSize
    },
    GETNOTEACHERSTUDENTLIST(state,noTeacherStudentList){
        state.noTeacherStudentList = noTeacherStudentList
    }
}
const actions={
    
    // 获取管理员端的学生信息列表
    async getAdminStudentInfoList({commit},data){
        let result = await reqAdminStudentInfoList(data)
        // console.log(result);
        if(result.code==0){
            commit('GETADMINSTUDENTINFOLIST',result.extend.studentsByPage.records)
            commit('GETADMINSTUDENTTOTALSIZE',result.extend.studentsByPage.total)
        }
    },
    // 获取管理员端的导师信息列表
    async getAdminTeacherInfoList({commit},data){
        let result = await reqAdminTeacherInfoList(data)
        if(result.code==0){
            commit('GETADMINTEACHERINFOLIST',result.extend.studentsByPage.records)
            commit('GETADMINTEACHERTOTALSIZE',result.extend.studentsByPage.total)
        }
    },
    // 获取管理员端的学生导师互选列表
    async getAdminTeacherStudentPickList({commit},data){
        let result = await reqSelectedResultByPage(data)
        // console.log(result);
        if(result.code==0){
            commit('GETADMINTEACHERSTUDENTPICKLIST',result.extend.selectedResultDTOPage.records)
            commit('GETADMINTEACHERSTUDENTPICKTOTALSIZE',result.extend.selectedResultDTOPage.total)
            commit('GETNOTEACHERSTUDENTLIST',result.extend.noTeacherStudentList)
        }
    },
}
const getters={

}

export default{
    state,
    mutations,
    actions,
    getters
}
