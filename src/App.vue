<template>
<div id="app" style="height: 100%">
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row type="flex" style="height: 100%">
            <Col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="" theme="dark" width="auto" @on-select="router">
                    <div class="layout-logo-left">
                        <div class="title">
                                <Icon type="happy"></Icon>
                                <span class="layout-text">Gocron</span>
                        </div>   
                    </div>
                    <div v-if="islogin">
                        <MenuItem name="all">
                        <Icon type="android-settings" :size="iconSize"></Icon>
                        <span class="layout-text">All</span>
                        </MenuItem>
                        <MenuItem name="ping">
                            <Icon type="ios-star" :size="iconSize"></Icon>
                            <span class="layout-text">Ping</span>
                        </MenuItem>
                        <MenuItem name="addjob">
                            <Icon type="plus" :size="iconSize"></Icon>
                            <span class="layout-text">添加任务</span>
                        </MenuItem>
                    </div>
                </Menu>
            </Col>
            <Col :span="spanRight">
                <div class="layout-header">
                    <Row type="flex" justify="center" align="middle" class="code-row-bg">
                        <Col span="1">
                            <Button type="text" @click="toggleClick">
                                <Icon type="navicon" size="32"></Icon>
                            </Button>
                        </Col>
                        <Col span="22">
                            <div class="right-title" v-text="headername">
                            </div>
                        </Col>
                        <Col span="1">
                            <div v-if="this.islogin === true">
                                <Tooltip content="退出" placement="left">
                                <Button type="text" @click="logout">
                                    <Icon type="log-out" size="32"></Icon>
                                </Button>
                                </Tooltip>
                            </div>
                            <div v-else>
                                <Tooltip content="登录" placement="left">
                                <Button type="text">
                                    <Icon type="log-in" size="32"></Icon>
                                </Button>
                                </Tooltip>
                            </div>
                        </Col>
                    </Row>
                </div>
                
                <div class="layout-content">
                    <div class="layout-content-main">
                        <div v-if="islogin">
                            <router-view></router-view>
                        </div>
                        <div v-else>
                            <div class="login">
                                <Form label-position="right" :label-width="100" >
                                    <FormItem label="用户名">
                                        <Input type="text" v-model="formLogin.user" placeholder="Username"></Input>
                                    </FormItem>
                                    <FormItem label="密码">
                                        <Input type="password" v-model="formLogin.password" placeholder="Password"></Input>
                                    </FormItem>
                                    <div class="loginerr" v-if="this.formLogin.loginerror">
                                        <Alert type="error" show-icon>{{this.formLogin.info}}</Alert>
                                    </div>
                                    
                                    <FormItem>
                                        <Checkbox v-model="formLogin.remember">记住登录</Checkbox>
                                        <Button type="success" @click="handleSubmit()" style="float: right;">Signin</Button>
                                    </FormItem> 
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            islogin: false,
            spanLeft: 4,
            spanRight: 20,
            headername: "登录",
            formLogin: {
                user: '',
                password: '',
                remember: false,
                loginerror: "",
                info: "",
            },
            userinfo: "",
        }
    },
    computed: {
        iconSize () {
        return this.spanLeft === 4 ? 14 : 24;
        }
    },
    methods: {
        toggleClick () {
            if (this.spanLeft === 4) {
                this.spanLeft = 1;
                this.spanRight = 23;
            } else {
                this.spanLeft = 4;
                this.spanRight = 20;
            }
        },
        router(value) {
            switch(value) {
                case "all": this.headername = "All";break;
                case "ping": this.headername = "Ping";break;
                case "addjob": this.headername = "添加任务";break;
            }
            this.$router.push(value)
        },
        handleSubmit() {
            //console.log(this.formLogin)
            if (this.formLogin.user === "" || this.formLogin.password === "") {
                this.formLogin.info = "用户名，密码不能为空!"
                this.formLogin.loginerror = true
            } else {
                var formData = JSON.stringify(this.formLogin); // 这里才是你的表单数据
                this.$http.post('http://127.0.0.1:4321/api/userlogin',formData)
                .then((response) => {
                    this.userinfo = response.data
                    if (this.userinfo.code == 0) {
                        if (this.formLogin.remember) {
                            this.setcookie("userName", "admin", 7)
                        }
                        this.headername="All"
                        this.islogin=true
                        this.formLogin.loginerror=false
                        this.formLogin.info = ""
                        this.$router.push({path: '/all'})
                    } else {
                        this.formLogin.info = this.userinfo.info
                        this.formLogin.loginerror = true
                    }
                }).catch( (response) => {
                    // 这里是处理错误的回调
                    console.log(response)
                });
            }
        },
        logout() {
            this.islogin=false
            this.deletecookie("uid")
            this.$router.push({path: '/'})
        },


        setcookie(name, value, days) {
            //获取当前时间
            var date=new Date();
            //将date设置为10天以后的时间
            date.setTime(date.getTime()+days*24*3600*1000);
            //将userId和userName两个cookie设置为10天后过期
            document.cookie=name+"="+value+"; expires="+date.toGMTString();
        },
        getcookie(name) {
            var search = name + "="//查询检索的值
            var returnvalue = "";//返回值
            if (document.cookie.length > 0) {
                var sd = document.cookie.indexOf(search);
                if (sd!= -1) {
                    sd += search.length;
                    var end = document.cookie.indexOf(";", sd);
                    if (end == -1)
                    end = document.cookie.length;
                    //unescape() 函数可对通过 escape() 编码的字符串进行解码。
                    returnvalue=unescape(document.cookie.substring(sd, end))
                }
            } 
            return returnvalue;
        },
        deletecookie(name) {
            //获取当前时间
            var date=new Date();
            //将date设置为过去的时间
            date.setTime(date.getTime()-10000);
            //将userId这个cookie删除
            document.cookie="userName=; expires="+0
        }
    },
    created() {
        var name = this.getcookie("userName")
        if (name != "") {
            this.headername="All"
            this.islogin=true
            this.$router.push({path: "/all"})
        }
    }
}
</script>

<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height:100%;
}
.layout-breadcrumb{
    padding: 10px 15px 0;
}
.layout-content{
    height: 100%;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}
.layout-content-main{
    padding: 10px;
}
.layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
.layout-menu-left{
    background: #464c5b;
}
.layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
}
.layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
    text-align: center;
}
.layout-ceiling-main a{
    color: #9ba7b5;
}
.layout-hide-text .layout-text{
    display: none;
}
.ivu-col{
    transition: width .2s ease-in-out;
}
.title{
    color: #d7dde4;
    font-size: 20px;
}
.right-title{
    font-size: 20px;
    text-align: left;
}
.layout-text-color{
    color: #f5f7f9
}

.login {
    width: 30%;
    align-items: center;
}
.text {
    font-size: 14px;
}
.loginerr {
    width: 80%;
    float: right;
}
</style>
