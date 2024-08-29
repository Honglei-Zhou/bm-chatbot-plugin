<template>
  <div class="user-list">
    <table class="" style="padding: 0px 10px">
      <tbody>
        <tr v-for="user in participants" :key="user.id">
          <td style="text-align: center;"><img :src="user.imageUrl" class="img-msg"></td>
          <td>{{ user.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    participants: {
      type: Array,
      required: true
    }
  }
}
</script>
<style scoped>
  .user-list {
    height: 100%;
    overflow: auto;
    padding: 40px 0px;
  }
  .img-msg {
    border-radius: 50%;
    width: 50px;
    margin-right: 5px;
    padding: 10px;
  }
</style>
