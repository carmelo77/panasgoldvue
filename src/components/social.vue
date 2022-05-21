<template>
  <div class="social">
		<div class="social-container">
      <i class="fab fa-facebook-f"></i> &nbsp;
			<i class="fab fa-instagram"></i> &nbsp;
			<i class="fab fa-discord"></i>
    </div>
    <h3> &copy; Copyright 2018-2020 PanasGold.com</h3>
  </div>
</template>

<style lang="css" scoped>
  .social {
    text-align: center;
    margin-top: 5em;
    margin-bottom: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .social-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    margin-bottom: 1em;
  }

	.social-container i {
		font-size: 2.5em;
		margin: 0 6px;
		cursor: pointer;
	}
</style>