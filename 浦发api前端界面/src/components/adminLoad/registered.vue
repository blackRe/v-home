<template>
    <div class="changePassword">
        
        <div class="change_content" >
            <div class="changeText">注册用户{{$store.state.count}}</div>
            <!--<div class="eMailAll">
                 <Input v-model="eMail" placeholder="请输入您的邮箱，用于找回密码" style="width: 300px"></Input>
            </div>-->
            <div class="userName">
                 <Input v-model="name" placeholder="请输入您的用户名" style="width: 300px"></Input>
            </div>
            <div class="userpassword">
                 <Input v-model="password" placeholder="请输入您的密码" style="width: 300px"></Input>
            </div>
            <div class="userpassword">
                 <Input v-model="password1" placeholder="请确认您的电话" style="width: 300px"></Input>
            </div>
            <!--<div class="verifyImage clear">
                 <Input v-model="eMailImg" placeholder="输入图片验证"  class="verifyImageInput l"></Input>
                 <div class="verify l" ><img class="validationImg" src="../../assets/img/login/yanzheng.png" alt=""></div>
            </div>
           
            <div class="getVerifyImage clear">
                <Input v-model="getVerify" placeholder="输入邮箱验证码"  class="getVerifyImageInput l"></Input>
                <Button class="getSendBtn" type="success" @click="send">获取验证嘛</Button>
            </div>-->
            <div class="sendContent">
                 <Button class="send" type="success" @click="send">发送</Button>
            </div>
        </div>
      
    </div>

</template>


<script>
var qs = require("qs");
export default {
  data() {
    return {
      msg: "欢迎进入浦发银行网站",
      eMail: '',
      eMailImg:'',
      getVerify:'',
      name:'',
      password:'',
      password1:'',
      modal1: false
    };
  },
  methods: {
    send() {
      let vm = this;
//    if (vm.eMail == "") {
//      vm.$Message.error("邮箱不能为空");
//      return false;
//    }
//
//    if(!vm.eMailRex(vm.eMail)){
//         vm.$Message.error("邮箱账户输入错误");
//         return false;
//    }
//    if (vm.name == "") {
//      vm.$Message.error("用户名不能位空");
//      return false;
//    }
//    if (vm.password == "") {
//      vm.$Message.error("用户名不能位空");
//      return false;
//    }
//    if(vm.eMailImg==""){
//        vm.$Message.error("图片验证码不能为空");
//        return false;
//    }
      let data = qs.stringify({
        name: vm.name,
        pwd:vm.password,
        phone:vm.password1
      });
       vm.$http({
          url: "/ajaxurl/PHP-klp/login/dl.php",
          method: "post",
          data: data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          withCredentials: true
        })
        .then(res => {
        		console.log(res);
        		if(res.status==200){
        			this.$router.push('/admin')
        		}
//        console.log(res);
//        console.log(55555);
        })
        .catch(err => {
          console.log("reserror");
        });
      vm.$Message.success("验证码已发送到邮箱");
      // vm.$router.push({path:"/changeok",registered:{index:1}});
    //   不需要验证邮箱的验证密码
    },
    sendOk(){
      let vm = this;
   
//    if (vm.eMail == "") {
//      vm.$Message.error("邮箱不能位空");
//      return false;
//    }
//    if(!vm.eMailRex(vm.eMail)){
//         vm.$Message.error("邮箱账户输入错误");
//         return false;
//    }
//    if (vm.name == "") {
//      vm.$Message.error("用户名不能位空");
//      return false;
//    }
//    if (vm.password == "") {
//      vm.$Message.error("用户名不能位空");
//      return false;
//    }
//    if(vm.eMailImg==""){
//        vm.$Message.error("图片验证码不能为空");
//        return false;
//    }
//    if(vm.getVerify==''){
//      vm.$Message.error("邮箱验证码不能为空");
//      return false;
//    }
    //   跳转
      vm.$router.push({path:"/changeok",query:{index:1}});
    },
    eMailRex(value){
        var reg=new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
        return reg.test(value);
   }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/registered.css";
</style>