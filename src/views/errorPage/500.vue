<template>
  <div class="errpage">
    <div class="tableBg">
      <div class="info">
        <h1>哎呀！</h1>
        <h1>页面找不到了！！</h1>
        <p>请检查网络或联系管理员</p>
        <div class="btn-wrap">
          <!--<button class="btn" @click="back">原地复活</button>-->
          <button class="btn" @click="backHome">回到首页</button>
        </div>
      </div>
      <img src="../../assets/errorPage/errorimg.png" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    name:'errotpage404',
    methods:{
      back(){
        this.$router.go(-1);
      },
      backHome(){
        this.$router.push({path:'/entrance'});
      }
    }
  }
</script>
<style lang="less" scoped>
  .errpage {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .tableBg {
      width: 800px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      img {
        display: block;
        height: 366px;
      }
      .info {
        text-align: left;
        h1 {
          font-size: 44px;
          margin: 10px 0 ;
        }
        .btn-wrap {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          margin-top: 30px;
          .btn {
            outline-style: none;
            border-radius: 3px;
            background-color: #C0C0C0;
            border: none;
            padding: 8px 35px;
            color: #ffffff;
            font-size: 18px;
            opacity: 0.9;
            transition: opacity 0.2s;
            cursor: pointer;
            &:first-of-type {
              margin-right: 15px;
            }
            &:last-of-type {
              background-color: #3AC0C3;
            }
            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>
