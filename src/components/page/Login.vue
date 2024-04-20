<template>
    <div class="login-container">
        <el-form :model="formData" :rules="formRules" ref="formData">
            <span class="title">毕业生管理系统</span>
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
            </el-form-item>
        </el-form>
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
            formData: {
                username: "admin",
                password: "123456"
            },
            formRules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
            }
        };
    },
    methods: {
        showOrHide () {
            this.state = !this.state;
        },
        handleLogin () {
            let userInfo = {
                name: '管理员',
                userType: 'admin'
            }
            if (this.formData.username == 'user') {
                userInfo = {
                    name: '张三',
                    userType: 'user'
                }
            }
            this.$store.dispatch('setUserInfo', userInfo);
            this.initMenus()
            this.$router.push({ path: "/automobileInfMng" });
            return
            this.$refs.formData.validate(valid => {
                if (valid) {
                    let that = this;
                    axios
                        .get(
                            "http://10.8.0.216:9000/pic_lib/user/test"
                        )
                        .then(response => {
                            let userInfs = response.data;
                            let flag = false;
                            let userInf = {};
                            for (let index in userInfs) {
                                if (
                                    userInfs[index].username == that.formData.username &&
                                    userInfs[index].password == that.formData.password
                                ) {
                                    flag = true;
                                    userInf = userInfs[index];
                                }
                            }
                            if (!flag) {
                                this.$message({
                                    message: "用户名或密码错误",
                                    type: "error"
                                });
                            } else {
                                sessionStorage.setItem("userInf", JSON.stringify(userInf));
                                this.$router.push({ path: "/automobileInfMng" });
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
        initMenus() {
            let menus  = [
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
                            name: "信息管理",
                            icon: "icon iconfont icon-viewgallery",
                            path: "InformationManagement"
                        }
                    },
                    {
                        //一级
                        entity: {
                            id: "DC",
                            name: "调查问卷管理",
                            icon: "icon iconfont icon-viewgallery",
                            path: "SurveyQuestionnaire"
                        }
                    },
                ]
            if (this.formData.username == 'user') {
               menus = [
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
                            id: "GR",
                            name: "个人中心",
                            icon: "icon iconfont icon-viewgallery",
                            path: "Dashboard"
                        }
                    }
                ]
            }
            this.$store.dispatch('setMenus',menus)
        }
    }
};
</script>
<style scoped>
.login-container {
    border-radius: 5px;
    background-clip: padding-box;
    margin: 25vh auto;
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
