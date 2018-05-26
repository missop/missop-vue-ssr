<template>
    <div :class="$style.mainHeader">
        <h1>JTodo</h1>
    </div>
</template>

<script>
    export default {
      name: 'header',
      computed: {
        $style () {
          return {
            mainHeader: ''
          }
        }
      }
    }
</script>

<style scoped lang="less">
    .main-header {
        text-align: center;
        h1 {
            font-size: 100px;
            color: rgba(175, 47, 47, 0.4);
            font-weight: 100;
            margin: 20px;
        }
    }
</style>
