<template>
  <div class="navMenu" >

    <div v-for="navMenu in navMenus"  :key="navMenu.id" :value="navMenu.label" >
      <router-link :to="{path:navMenu.path}" v-if="navMenu.children==null">
        <el-menu-item :key="navMenu.id" :data="navMenu" :index="navMenu.label" >
          <i :class="navMenu.icon!=undefined?navMenu.icon:'el-icon-management'"></i>
          <span slot="title">{{navMenu.label}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu :key="navMenu.id" :data="navMenu" :index="navMenu.label" v-if="navMenu.children" syu>
        <template slot="title">
          <i :class="navMenu.icon!=undefined?navMenu.icon:'el-icon-management'"></i>
          <span slot="title">{{navMenu.label}}</span>
        </template>
        <NavMenu :navMenus="navMenu.children"></NavMenu>
      </el-submenu>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
  }
</script>

<style scoped>
</style>
