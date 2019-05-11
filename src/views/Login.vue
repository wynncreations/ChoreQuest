<template>
  <div>
    <form @submit.prevent="login">
      <label for='username'>Email:<input type='email' id='username' v-model="username"></label>
      <label for='password'>Password:<input type="password" id="password" v-model="password"></label>
      <button>Login</button>
    </form>  
  </div>
</template>

<script>
export default {
  data: function(){
    return {  
      username: '',
      password: ''
    };
  },
  methods:{
    login: function(){
      let email = this.username;
      let password = this.password;
      this.$store
      .dispatch("login",{email,password})
      .then(()=>this.$router.push('/'))
      .catch();
    },
    check: function(){
      alert(this.username + this.password);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
