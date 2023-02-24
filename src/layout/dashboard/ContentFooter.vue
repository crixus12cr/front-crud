<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="https://github.com/crixus12cr">
            <img src="https://img.icons8.com/nolan/40/github.png"/>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://www.linkedin.com/in/cristian-perdomo-b9346a227/">
            <img src="https://img.icons8.com/nolan/40/linkedin.png"/>
          </a>
        </li>
      </ul>
      <div class="copyright">
        © {{year}} made with <i class="tim-icons icon-heart-2"></i> by
        <a href="https://github.com/crixus12cr" target="_blank" rel="noopener">Cristian Perdomo</a> for a better web.
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>
