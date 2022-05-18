<template>
  <div class="references">
    <h1>Seguridad Garantizada</h1>
    <h2>+500 referencias en Facebook</h2>

    <div class="star-source">
      <svg>
            <linearGradient x1="50%" y1="5.41294643%" x2="87.5527344%" y2="65.4921875%" id="grad">
                <stop offset="0%"></stop>
                <stop offset="60%"></stop>
                <stop offset="100%"></stop>
            </linearGradient>
        <symbol id="star" viewBox="153 89 106 108">   
          <polygon id="star-shape" fill="currentColor" points="206 162.5 176.610737 185.45085 189.356511 150.407797 158.447174 129.54915 195.713758 130.842203 206 95 216.286242 130.842203 253.552826 129.54915 222.643489 150.407797 235.389263 185.45085"></polygon>
        </symbol>
    </svg>

    </div>
    <div class="star-container">
      <input type="radio" name="star" id="five">
      <label for="five">
        <svg class="star">
          <use xlink:href="#star"/>
        </svg>
      </label>
      <input type="radio" name="star" id="four">
      <label for="four">
        <svg class="star">
          <use xlink:href="#star"/>
        </svg>
      </label>
      <input type="radio" name="star" id="three">
      <label for="three">
        <svg class="star">
          <use xlink:href="#star"/>
        </svg>
      </label>
      <input type="radio" name="star" id="two">
      <label for="two">
        <svg class="star">
          <use xlink:href="#star" />
        </svg>
      </label>
      <input type="radio" name="star">
      <label for="one">
        <svg class="star">
          <use xlink:href="#star" />
        </svg>
      </label>
    </div>
    <a 
      href="https://www.facebook.com/PanasGold/reviews/" 
      target="_blank"
      class="btn btn-transparent btn-xl no-margin"
    >
      CALIFICANOS!
    </a>
  </div>
</template>

<style lang="css" scoped>
  .references {
    text-align: center;
    margin-top: 5em;
    margin-bottom: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    margin-bottom: 0.15rem;
  }

  h2 {
    font-size: 1rem;
    letter-spacing: 1px;
    margin-bottom: 1rem;
  }

  label {
    cursor: pointer;
  }

  svg {
    width: 2rem;
    height: 2rem;
    padding: 0.15rem;
  }

  input[name="star"] {
    display: inline-block;
    width: 0;
    opacity: 0;
    margin-left: -2px;
  }

  .star-source {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .star {
    color: rgba(104,205,195);
    border: 0px;
    outline: none;
  }

  .star-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    margin-bottom: 1em;
  }

  label:hover ~ label .star,
  svg.star:hover,
  input[name="star"]:focus ~ label .star,
  input[name="star"]:checked ~ label .star {
    color: rgba(104,205,195);
  }

  .btn-xl {
    padding: 16px 48px;
    width: 12em;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 0;
    padding-top: 16px;
    padding-bottom: 14px;
  }

  .btn-xl .btn-transparent {
    padding-bottom: 16px;
  }

  .no-margin {
    margin: 0!important;
  }

  a {
    text-decoration: none;
  }

  .btn-transparent {
    background: transparent;
    border: 2px solid #FFF;
    color: #FFF;
    font-family: 'Lato','Arial','Helvetica',sans-serif;
    transition: ease-in-out 0.3s;
  }

  .btn-transparent:hover {
    background-color: #FFF;
    color: #444;
  }
</style>