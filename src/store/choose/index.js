// 存放选择导师过程相关

import {reqChoiceTeacher,reqReceiveRequests,reqAllStudentsRequests} from '@/api/index'



const state={
    // 原始roundId
    originRoundId:0,
    // 选择的轮次
    roundId:0,
    // 判断当前轮次的选人权限拥有者是老师还是学生
    roundOwner:-1,
    // 当前轮次截止时间
    stopTime:'',
    // 第一轮的导师列表
    chooseList_1 : [],
    // 第二轮的导师列表
    chooseList_2 : [],
    // 已选的导师ID列表
    haveChooseList:[],
    // 已发送请求列表
    sendRequestsList:[],
    // 导师收到的请求列表(分页)
    studentsRequestsList:[],
    // 导师收到的请求总数
    totalRequests:0,
    // 导师同意选择的学生名单
    myStudentsList:[],
    // 导师收到的请求列表(全部)
    allStudentsRequests:[],
}
const mutations={
    GETROUNDID(state,roundId){
        state.originRoundId = roundId
        // console.log(roundId);
        if(roundId==0){
            state.roundId = -1
            return
        } 
        if(roundId%2==0){
            state.roundId = 2
        }else{
            state.roundId = 1
        }
    },
    GETSTOPTIME(state,stopTime){
        state.stopTime = stopTime
    },
    // 获取第一轮选择名单
    GETCHOOSELIST_1(state,chooseList_1){
        state.chooseList_1 = chooseList_1
    },
    // 获取第二轮选择名单
    GETCHOOSELIST_2(state,chooseList_2){
        state.chooseList_2 = chooseList_2
    },
    // 获取学生发送的请求的导师id列表
    GETHAVECHOOSELIST(state,haveChooseList){
        state.haveChooseList = haveChooseList
    },
    // 获取学生发送的请求列表
    GETSENDREQUESTSLIST(state,sendRequestsList){
        state.sendRequestsList = sendRequestsList
    },
    // 获取导师收到学生的请求列表(分页)
    GETSTUDENTSREQUESTSLIST(state,studentsRequestsList){
        state.studentsRequestsList = studentsRequestsList||[]
    },
    // 获取导师收到的学生的请求总数
    GETTOTALREQUESTS(state,totalRequests){
        state.totalRequests = totalRequests
    },
    // 获取导师同意选择的学生名单
    GETMYSTUDENTSLIST(state,myStudentsList){
        state.myStudentsList = myStudentsList
    },
    // 获取导师收到学生的请求列表(全部)
    GETALLSTUDENTSREQUESTS(state,allStudentsRequests){
        state.allStudentsRequests = allStudentsRequests||[]
    },
    // 获取当前轮次的权限拥有者是老师还是学生
    GETROUNDOWNER(state,roundOwner){
        state.roundOwner = roundOwner
    }
}
const actions={
    async getChooseList_1({commit}){
        let result = await reqChoiceTeacher()
        if(result.code===0){
            commit('GETCHOOSELIST_1',result.extend.teachers)
        }
    },
    async getChooseList_2({commit}){
        let result = await reqChoiceTeacher()
        if(result.code===0){
            commit('GETCHOOSELIST_2',result.extend.teachers)
        }
    },
    // 获取申请的学生列表(分页版)
    async getReceiveRequestsList({commit},data){
        let result = await reqReceiveRequests(data)
        if(result.code===0){
            commit('GETSTUDENTSREQUESTSLIST',result.extend.allReceiveRequestsDTOPage.records)
            commit('GETTOTALREQUESTS',result.extend.allReceiveRequestsDTOPage.total)
            
        }
    },
    // 获取申请的学生列表(所有)
    async getAllStudentsRequests({commit},data){
        let result = await reqAllStudentsRequests(data)
        if(result.code==0){
            commit('GETALLSTUDENTSREQUESTS',result.extend.showRequestsList)
        }
    }
}

export default {
    namespace:true,
    state,
    actions,
    mutations
}