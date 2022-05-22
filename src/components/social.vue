<template>
  <div class="social">
		<div class="social-container">
     <a href="https://www.facebook.com/PanasGold" target="_blank"><i class="fab fa-facebook-f"></i></a> &nbsp;
			<a href="https://www.instagram.com/panasgold" target="_blank"><i class="fab fa-instagram"></i></a> &nbsp;
			<i class="fab fa-discord"></i>
    </div>
    <h3> &copy; Copyright 2018-2022 PanasGold.com</h3>
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

  .social-container a {
    color: white;
  }
</style>