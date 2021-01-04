<script>
  export default {
    name: 'authredirect',
    created () {
      const hash = window.location.search.slice(1)
      window.location.href = window.location.origin + '/login#' + hash
      window.close()
    }
  }
</script>
