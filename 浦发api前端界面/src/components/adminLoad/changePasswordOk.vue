<template>
    <div class="changePassword">
        
        <div class="change_content" >
            <div class="changeImg"><Icon type="checkmark-circled" class="goodImg"></Icon></div>
            <div class="changeText" v-if="isOk!=1">密码修改成功</div>
            <div class="changeText" v-if="isOk==1">用户添加成功</div>
            <div class="sendContent" >
                 <Button class="sendBtn" type="success" @click="sendOk">返回登陆</Button>
            </div>
        </div>
       </div>
      
    </div>

</template>


<script>
export default {
  data() {
    return {
      isOk:''

    };
  },
  beforeCreate: function() {
    console.group("beforeCreate 创建前状态===============》");
  },
  created: function() {
    this.isOk=this.$route.query.index;
    
    console.group("created 创建完毕状态===============》");
  },
  beforeMount: function() {
    
    console.group("beforeMount 挂载前状态===============》");
  },
  mounted: function() {
    console.group("mounted 挂载结束状态===============》");
  },
  beforeUpdate: function() {
    console.group("beforeUpdate 更新前状态===============》");
  },
  updated: function() {
    console.group("updated 更新完成状态===============》");
  },
  methods: {
    sendOk() {
      let vm = this;
     
      vm.$router.push("admin");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/changePasswordOk.css";
</style>