<template>
    <div class="main">
        <div class="login-container">
            <el-form :model="formData" :rules="formRules" ref="formData">
                <span class="title">毕业生追踪系统</span>
                <el-form-item prop="username">
                    <el-input type="text" v-model="formData.username" auto-complete="off" @change="formData.username=formData.username.replace(/\s+/g,'')" prefix-icon="icon iconfont icon-peoplefill" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :type="state ? 'text' : 'password'" v-model="formData.password" auto-complete="off" prefix-icon="icon iconfont icon-mima" placeholder="请输入密码">
                        <i slot="suffix" @click="showOrHide" style="cursor:pointer;" :class="state ? 'icon iconfont icon-yanjing_kai' : 'icon iconfont icon-yanjing_bi'"></i>
                    </el-input>
                </el-form-item>
                <el-form-item style="padding-top:20px">
                    <el-button class="login-button" @click.native.prevent="handleLogin">登录</el-button>
                    <!-- <el-button class="login-button" @click.native.prevent="handleRegister" v-else>注册</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>
<script>
import axios from "axios";
import store from "@/vuex/store";
import { mapActions } from 'vuex';
export default {
    //登录  校验
    name: "Login",
    data () {
        return {
            state: false,
            logining: false,
            isRegister: true,
            formData: {
                username: "",
                password: ""
            },
            formRules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
            },
            userInfo: {}
        };
    },
    methods: {
        showOrHide () {
            this.state = !this.state;
        },
        handleLogin () {
            this.$refs.formData.validate(valid => {
                if (valid) {
                    let that = this;
                    axios
                        .get(
                            "http://192.168.43.37:9001/pic_lib/login/loginIn", {
                            params: {
                                username: this.formData.username,
                                password: this.formData.password
                            }
                        }
                        )
                        .then(res => {
                            console.log(res.data)
                            if (res.data.code == '200') {
                                this.userInfo = res.data.data
                                this.$store.dispatch('setUserInfo', res.data.data);
                                this.initMenus()
                                if(this.userInfo.userType == '1') {
                                    this.$router.push({ path: "Index" });
                                }else {
                                    this.$router.push({ path: "echartsBar" });
                                }
                                
                                sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
                            } else if (res.data.code == '500') {
                                this.$message({
                                    message: res.data.msg,
                                    type: "error"
                                });
                            } else {
                                this.isRegister = false
                                this.formData.username = '',
                                    this.formData.password = ''
                                this.$message({
                                    message: "未查询到注册信息！",
                                    type: "error"
                                });

                            }
                        })
                        .catch(error => {
                            that.$message({
                                message: "网络错误,请稍后再试",
                                type: "error"
                            });
                        });
                }
            });
        },
        initMenus () {
            let menus = [
                {
                    //一级
                    entity: {
                        id: "SY",
                        name: "主页",
                        icon: "icon iconfont icon-box",
                        path: "echartsBar"
                    },
                },
                {
                    //一级
                    entity: {
                        id: "RY",
                        name: "荣誉管理",
                        icon: "icon iconfont icon-box",
                        path: "HonorManagement"
                    },
                },
                {
                    //一级
                    entity: {
                        id: "ZS",
                        name: "证书管理",
                        icon: "icon iconfont icon-viewgallery",
                        path: "CertificateManagement"
                    }
                },
                {
                    //一级
                    entity: {
                        id: "GG",
                        name: "公告信息管理",
                        icon: "icon iconfont icon-viewgallery",
                        path: "AnnouncementInformation"
                    }
                },
                {
                    //一级
                    entity: {
                        id: "XX",
                        name: "用户信息管理",
                        icon: "icon iconfont icon-viewgallery",
                        path: "InformationManagement"
                    }
                },
                {
                    //一级
                    entity: {
                        id: "QX",
                        name: "用户去向管理",
                        icon: "icon iconfont icon-viewgallery",
                        path: 'UserDestinationManagement',
                    }
                },
                {
                    entity: {
                        id: "ABM",
                        name: "校友论坛",
                        icon: "",
                        path: "automobileBrandMng"
                    }
                }
            ]
            if (this.userInfo.userType == '1') {
                menus = [
                    {
                        //一级
                        entity: {
                            id: "SY",
                            name: "主页",
                            icon: "icon iconfont icon-box",
                            path: "Index"
                        },
                    },
                    {
                        //一级
                        entity: {
                            id: "AM",
                            name: "学生界面",
                            icon: "icon iconfont icon-box",
                            path: "automobileMng"
                        },
                        //二级
                        childs: [
                            {
                                entity: {
                                    id: "AIM",
                                    name: "我的毕业去向",
                                    icon: "",
                                    path: "automobileInfMng"
                                }
                            },
                            {
                                entity: {
                                    id: "ABM",
                                    name: "校友论坛",
                                    icon: "",
                                    path: "automobileBrandMng"
                                }
                            }
                        ]
                    },
                    {
                        //一级
                        entity: {
                            id: "RY",
                            name: "荣誉管理",
                            icon: "icon iconfont icon-box",
                            path: "HonorManagement"
                        },
                    },
                    {
                        //一级
                        entity: {
                            id: "ZS",
                            name: "证书管理",
                            icon: "icon iconfont icon-viewgallery",
                            path: "CertificateManagement"
                        }
                    },
                    {
                        //一级
                        entity: {
                            id: "GR",
                            name: "个人中心",
                            icon: "icon iconfont icon-viewgallery",
                            path: "Dashboard"
                        }
                    }
                ]
            }
            this.$store.dispatch('setMenus', menus)
        },
        // handleRegister(){ // 注册
        //     this.$refs.formData.validate(valid => {
        //         if (valid) {
        //             let that = this;
        //             axios
        //                 .get(
        //                     "http://192.168.43.37:9001/pic_lib/login/register", {
        //                         params: {
        //                             username: this.formData.username,
        //                             password: this.formData.password
        //                         }

        //                 }
        //                 )
        //                 .then(res => {
        //                     console.log(res.data)
        //                     if (res.data.code == '200') {
        //                         this.$message.success('注册成功')
        //                         this.userInfo = res.data.data
        //                         this.$store.dispatch('setUserInfo', res.data.data);
        //                         this.initMenus()
        //                         this.$router.push({ path: "/Index" });
        //                         sessionStorage.setItem("userInf", JSON.stringify(res.data.data));
        //                     }
        //                 })
        //                 .catch(error => {
        //                     that.$message({
        //                         message: "网络错误,请稍后再试",
        //                         type: "error"
        //                     });
        //                 });
        //         }
        //     });
        // }
    },
    mounted () {
        this.isRegister = true
    }
};
</script>
<style scoped>
.main {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/2.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-container {
    border-radius: 5px;
    background-clip: padding-box;
    /* margin: 200px auto; */
    width: 300px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.title {
    display: block;
    text-align: center;
    margin: 0px auto 40px auto;
    color: #505458;
    font-size: 40px;
}
.el-form-item {
    margin-bottom: 22px;
}
.login-button {
    width: 100%;
    background-color: #f6db63;
    border-color: #f6db63;
    color: #505458;
    font-size: 16px;
}
button:hover {
    background-color: #ffec8b;
    border-color: #ffec8b;
}
button:active {
    background-color: #f6db63;
    border-color: #f6db63;
}
</style>
