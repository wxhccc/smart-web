<template>
  <div class="admin-index-page">
  </div>
</template>

<script>
export default {
  name: 'AdminIndex',
  created () {
    const { firstRoute } = this.$store.getters.sidebar
    firstRoute && this.$router.push({ name: firstRoute })
  },
  watch: {
    '$store.getters.sidebar.firstRoute' (newVal) {
      this.$router.push({ name: newVal })
    }
  }
}
</script>
