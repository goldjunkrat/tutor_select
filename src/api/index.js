import {request,teacherRequest,adminRequest} from './request'

//在这里写请求
export const reqStudentLogin = (data)=>request({
    // url:`/StudentLogin?accountNumber=${data.accountNumber}&password=${data.password}`,
    url:`/StudentLogin`,
    method:'post',
    data:data
})

export const reqStudentInfo = ()=>request({
    url:'/findStudentByToken',
    method:'post'
})

export const reqTeacherList = (data)=>request({
    url:'/ShowTeacher/findAllTeachers',
    method:'post',
    data:data
})

export const reqTeacherListBySex = (data)=>request({
    url:'/ShowTeacher/findAllTeachersBySex',
    method:'post',
    data
})

export const reqChoiceTeacher = ()=>request({
    url:'/ChoiceTeacher/hasSpareTeachers',
    method:'get'
})

export const reqSendChoice = (data)=>request({
    url:'/ChoiceTeacher/sendRequest',
    method:'post',
    data
})

export const reqTeacherLogin = (data)=>teacherRequest({
    url:'/TeacherLogin',
    method:'post',
    data
})

export const reqTeacherInfo = ()=>teacherRequest({
    url:'/findTeacherByToken',
    method:'post'
})

// 导师收到的请求
export const reqReceiveRequests = (data)=>teacherRequest({
    url:'/ReceiveAllRequests/searchRequestsByPage',
    method:'post',
    data
})

export const reqChangePassword = (data)=>request({
    url:'/ChangePassword/changePassword',
    method:'post',
    data
})

// 请求获取导师在对应轮次收到的所有请求
export const reqAllStudentsRequests = (data)=>teacherRequest({
    url:'/ChoiceStudentController/showStudentRequests',
    method:'post',
    data
})

// 导师选择学生(第一轮)
export const reqAgreeStudentRequests = (data)=>teacherRequest({
    url:'/ChoiceStudentController/agreeStudentRequests',
    method:'post',
    data
})

// 导师选择学生(第二轮)
export const reqAgreeStudentRequestsAgain = (data)=>teacherRequest({
    url:'/ChoiceStudentController/agreeStudentRequestsAgain',
    method:'post',
    data
})

// 管理员登录
export const reqAdminLogin = (data)=>adminRequest({
    url:'/adminLogin',
    method:'post',
    data
})

// 获取管理员信息
export const reqAdminInfo = ()=>adminRequest({
    url:'/findAdminByToken',
    method:'post',
})

// 获取管理员端学生信息
export const reqAdminStudentInfoList = (data)=>adminRequest({
    url:'/StudentManager/showAllStudentByPage',
    method:'post',
    data
})

// 获取管理员端导师信息
export const reqAdminTeacherInfoList = (data)=>adminRequest({
    url:'/TeacherManager/showAllTeacherByPage',
    method:'post',
    data
})

// 修改(添加)学生信息
export const reqModifyStudentInfo = (data)=>adminRequest({
    url:'/StudentManager/modifyStudentInfo',
    method:'post',
    data
})


// 删除学生信息
export const reqDeleteStudentInfo = (data)=>adminRequest({
    url:'/StudentManager/deleteStudentInfo',
    method:'post',
    data
})

//修改(添加)导师信息
export const reqModifyTeacherInfo = (data)=>adminRequest({
    url:'/TeacherManager/modifyTeacherInfo',
    method:'post',
    data
})

// 删除导师信息
export const reqDeleteTeacherInfo = (data)=>adminRequest({
    url:'/TeacherManager/deleteTeacherInfo',
    method:'post',
    data
})

// 为导师上锁/解锁
export const reqLockOrNotTeacher = (data)=>adminRequest({
    url:'/TeacherManager/lockOrNotTeacher',
    method:'post',
    data
})

// 获取导师学生互选信息
export const reqSelectedResultByPage = (data)=>adminRequest({
    url:'/SelectedResult/showSelectedResultByPage',
    method:'post',
    data
})

// 开启学生第一轮选择
export const reqStudentOneRound = ()=>adminRequest({
    url:'/LockUnlockInSeq/studentOneRound',
    method:'post',
})

// 开启学生第二轮
export const reqStudentTwoRound = ()=>adminRequest({
    url:'/LockUnlockInSeq/studentTwoRound',
    method:'post',
})

// 开启导师第一轮
export const reqTeacherOneRound = ()=>adminRequest({
    url:'/LockUnlockInSeq/teacherOneRound',
    method:'post',
})

// 开启导师第二轮
export const reqTeacherTwoRound = ()=>adminRequest({
    url:'/LockUnlockInSeq/teacherTwoRound',
    method:'post',
})

// 关闭系统
export const reqShutDownSystem = ()=>adminRequest({
    url:'/LockUnlockInSeq/closeSystem',
    method:'post',
})

// 为导师分配学生
export const reqDistribute = (data)=>adminRequest({
    url:'/SelectedResult/distribute',
    method:'post',
    data
})

// 生成结果文件
export const reqCreateResultFile = ()=>adminRequest({
    url:'/DownloadResult/createResultFile',
    method:'post',
})

// 下载结果文件
// export const reqDownLoadResult = ()=>adminRequest({
//     url:''
// }) 