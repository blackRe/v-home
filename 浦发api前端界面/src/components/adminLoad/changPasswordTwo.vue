<template>
    <div class="changePassword">
        
        <div class="change_content"  >
            <div class="changeText">修改密码</div>
            <div class="eMailAll">
                 <Input type="password" v-model="enterPwd" placeholder="请输入设置密码" style="width: 300px"></Input>
            </div>
            <div class="verifyImage">
                 <Input type="password" v-model="epeatPassword" placeholder="请再次输入密码"  class="verifyImageInput l"></Input>
            </div>
            <div class="sendContent" >
                 <Button class="sendBtn" type="success" @click="sendOk">发送</Button>
            </div>
        </div>
        
          <!-- 判断页面显示 -->
       <div class="loadding" v-if="modal2">
         <div class="loaddingAuto">
            <Col class="demo-spin-col" span="8">
                <Spin fix>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                </Spin>
            </Col> 
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
      enterPwd: "",
      epeatPassword: "",
      modal1: false,
      modal2: false,
    };
  },
   beforeCreate: function() {
    console.group("beforeCreate 创建前状态===============》");
  },
  created: function() {
    this.isOk=this.$route.query.index;
    
    console.group("created 创建完毕状态===============》");
  },
  methods: {
    sendOk() {
      let vm = this;
      if (vm.enterPwd == "") {
        vm.$Message.error("密码不能为空");
        return false;
      }
      if (vm.epeatPassword == "") {
        vm.$Message.error("密码不能为空");
        return false;
      }
      if (vm.enterPwd !== vm.epeatPassword) {
        vm.$Message.error("两次密码输入不一致");
        return false;
      }
      let data = qs.stringify({
					user_name: vm.epeatPassword,
					user_password:vm.epeatPassword
				});
				vm.$http({
						url: "/ajaxurl/api/user/changePassword",
						method: "post",
						data: data,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						withCredentials: true
					})
					.then(res => {
						console.log(res);
						console.log(55555);
						if(res.data.code==200){
//							this.$router.push("apilist");

								this.$router.push('changepasswordtowo')
						}else{
							vm.$Message.error("账户活这密码错误");
						}
					})
					.catch(err => {
						vm.$Message.error("网络错误");
						console.log("reserror");
//							this.$router.push("list");
					});
      
      
      
      vm.modal2 = true;
      setTimeout(function() {
        // vm.$Message.success("密码设置成功");
        vm.modal2 = false;
        vm.$router.push("changeok");
      }, 1000);
    },
    eMailRex(value) {
      var reg = new RegExp(
        /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      );
      return reg.test(value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/changePasswordtwo.css";
</style>