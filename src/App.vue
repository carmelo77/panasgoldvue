<template>
  <div v-if="!loader">
    <div class="calculator">
      <section class="leftside-calculator">
        <div class="list-games">
          <div 
            class="game" 
            v-for="game in games" 
            :key="`game_${game.id}`"
          >
            <img 
              :src="`${base_image}/${game.logo}`" 
              :class="currentGame.id == game.id ? 'active-on' : 'active-off'" 
              :alt="game.name"
              @click="!loading && onChangeGame(game)"
            >
          </div>
        </div>
        <div class="content-calculator">
          <div class="countries-calculator">
            <section v-if="currentGame.id != 0">
              <div 
                class="country"
                v-for="country in countries" 
                :key="`country_${country.id}`"
              >
                <img 
                  :src="`${base_image}/${country.logo}`" 
                  class="img-country"
                  :alt="country.name"
                  @click="onChangeCountry(country)"
                >
                <img 
                  v-if="country.logo" 
                  :src="currentCountry.id == country.id ? selectedOption : deselectedIcon" 
                  class="img-radio" 
                  alt="radio-img"
                  @click="onChangeCountry(country)"
                >
              </div>
            </section>
          </div>
          <div class="main-calculator">
            <div class="form-control">
              Escribe la cantidad de {{ coinGame }}'s a vender
              <!-- <label for="sell">Escribe la cantidad de M's a vender</label> -->
              
              <input 
                type="number" 
                min="0"
                v-model="mainPrice" 
                class="form-input-qty"
                @keypress="isNumber($event)"
              />
              <!-- <img src="./assets/escribe.png" class="img-input1" alt=""> -->
            </div>
            <div class="btn-change">
              <img :src="selectedArrow" alt="">
            </div>
              <div class="row-form">
                <div class="form-control">
                  <label class="price-title" for="price">Precio</label>
                  <input 
                    type="text" 
                    class="form-input-price1" 
                    disabled
                    :value="`${(priceLocal.price * (mainPrice != '' ? mainPrice : 1)).toFixed(2)} ${priceLocal.country.iso} (${priceLocal.price} ${priceLocal.country.iso}/${coinGame})`"
                  >
                </div>
                <div class="form-control">
                  <label for="change">&nbsp;</label>
                  <input 
                    type="text" 
                    class="form-input-price2" 
                    disabled
                    :value="`${(priceUSD.price * (mainPrice != '' ? mainPrice : 1)).toFixed(2)} $ (${priceUSD.price} $/${coinGame})`"
                  >
                </div>
              </div>
              <div class="options-form">
                <label class="title-options" v-if="trades.length" for="method">Selecciona un Método de Venta</label>
                <label class="title-options" v-if="factions.length" for="faction">Faction</label>
                <label class="title-options" v-if="regions.length" for="region">Región</label>
              </div>
              <div class="options-form-res">
                <div class="opt-form">
                  <div 
                    class="box-opt-form"
                    v-for="trade in trades" 
                    :key="`trade_${trade.id}`"
                  >
                    <img 
                      :src="`${base_image}/${trade.logo}`" 
                      class="img-opt" 
                      :alt="trade.name"
                      @click="onChangeTrade(trade)"
                    >
                    <img 
                      v-if="trade.logo" 
                      :src="currentTrade.id == trade.id ? selectedOption : deselectedIcon" 
                      class="img-radio" 
                      alt="radio-img"
                      @click="onChangeTrade(trade)"
                    >
                  </div>

                  <div 
                    class="box-opt-form"
                    v-for="faction in factions" 
                    :key="`faction_${faction.id}`"
                  >
                    <img 
                      :src="`${base_image}/${faction.logo}`" 
                      class="img-opt" 
                      :alt="faction.name"
                      @click="onChangeFaction(faction)"
                    >
                    <img 
                      v-if="faction.logo" 
                      :src="currentFaction.id == faction.id ? selectedOption : deselectedIcon" 
                      class="img-radio" 
                      alt="radio-img"
                      @click="onChangeFaction(faction)"
                    >
                  </div>

                  <div 
                    class="box-opt-form"
                    v-for="region in regions" 
                    :key="`region_${region.id}`"
                  >
                    <img 
                      :src="`${base_image}/${region.logo}`" 
                      class="img-opt" 
                      :alt="region.name"
                      @click="onChangeRegion(region)"
                    >
                    <img 
                      v-if="region.logo" 
                      :src="currentRegion.id == region.id ? selectedOption : deselectedIcon" 
                      class="img-radio" 
                      alt="radio-img"
                      @click="onChangeRegion(region)"
                    >
                  </div>
                </div>
              </div>
              <div class="server" v-if="serversFiltered.length > 0">
                <fieldset>
                  <legend>Server</legend>
                  <div class="form-control">
                      <select 
                        name="servers"
                        v-if="currentFaction != 0 || currentRegion != 0 || currentTrade != 0"
                        v-model="currentServer"
                        @click="setSelect($event)"
                      >
                        <!-- <option value="">Selecciona un server</option> -->
                        <option
                          v-for="server in serversFiltered"
                          :key="`server_${server.id}`"
                          :value="server.id"
                        >
                          {{ server.name }}
                        </option>
                      </select>
                  </div>
                </fieldset>
              </div>
              <div class="nickname" v-if="serversFiltered.length == 0">
                <fieldset>
                  <legend>Escribe tu Nickname</legend>
                  <div>
                      <input type="text" v-model="nickname" />
                  </div>
                </fieldset>
              </div>
          </div>
          <div class="accounts-calculator">
            <div 
              class="account"
              v-for="payment in payments" 
              :key="`payment_${payment.id}`"
            >
              <img 
                :src="`${base_image}/${payment.logo}`" 
                class="img-account" 
                :alt="payment.name"
                @click="onChangePayment(payment)"
              >
              <img 
                v-if="payment.logo" 
                :src="currentPayment.id == payment.id ? selectedOption : deselectedIcon" 
                class="img-radio" 
                alt="radio-img"
                @click="onChangePayment(payment)"
              >
            </div>
            <div class="sell" v-if="payments.length && currentPayment.id != 0">
              <img 
                :src="selectedButtonSell" 
                :class="mainPrice != '' || mainPrice > 0 ? '' : 'not-sell' "
                @click="mainPrice > 0 && sellAction()" 
                alt="sell"
              >
            </div>
          </div>
        </div>
      </section>
      <section class="rightside-calculator">
          
      </section>
    </div>
    <ReferencesComponent />
    <SocialComponent />
  </div>

</template>

<script>

import { BASE_HREF_IMAGE } from './utils/constants';

// document.getElementById("#amountInput").click(function() {
//   // $zopim.livechat.say('Muy Buenas,\r\nMétodo de Pago: ' + currentPaymentMethod + '\r\nMétodo de Venta: ' + currentTradeMethod + '\r\nMonto: ' +currentAmount + 'M = ' + currentValue + currentCurrency);
//   $zopim.livechat.window.show()
// });

export default {
  components: {
    ReferencesComponent: () => import('./components/references'),
    SocialComponent: () => import('./components/social'),
  },
  name: 'App',
  data() {
    return {
      prices:[],
      pricesFiltered:[],
      games: [],
      countries: [],
      payments: [],
      
      regions: [],
      trades: [],
      factions: [],
      servers: [],
      serversFiltered: [],

      currentGame: {},
      currentBg: 0,
      currentCountry: {},
      currentPayment: {},
      currentRegion: {},
      currentTrade: {},
      currentFaction: {},
      currentServer: 0,
      nickname: '',

      coinGame: 'M',

      priceLocal: {
        price: 0,
        country: {
          iso: '',
        }
      },
      priceUSD: {
        price: 0,
        country: {
          iso: '',
        }
      },

      mainPrice: 0,
      loading: false,
      loader: true,
      
      base_image: BASE_HREF_IMAGE,
      deselectedIcon: require('@/assets/Deselected.png')
    }
  },

  watch: {
    'currentBg': function() {
      document.body.style.backgroundImage = 'url(' + this.base_image + '/' + this.currentBg + ')';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    }
  },

  mounted() {
    this.getPrices();
    this.getGames();
    // this.getCountries();
  },

  computed: {
    selectedArrow() {
      let selRunescape = require.context('./assets/runescape', false, /\.png$/)
      let selWow = require.context('./assets/wowtbc', false, /\.png$/)
      let selLost = require.context('./assets/lostark', false, /\.png$/)

      return this.currentGame.id == 1 ? selRunescape('./' + 'Arrows' + ".png") : 
      this.currentGame.id == 2 ? selWow('./' + 'Arrows' + ".png") : 
      selLost('./' + 'Arrows' + ".png")
    },

    selectedButtonSell() {
      let selRunescape = require.context('./assets/runescape', false, /\.png$/)
      let selWow = require.context('./assets/wowtbc', false, /\.png$/)
      let selLost = require.context('./assets/lostark', false, /\.png$/)

      return this.currentGame.id == 1 ? selRunescape('./' + 'Vender' + ".png") : 
      this.currentGame.id == 2 ? selWow('./' + 'vender' + ".png") : 
      selLost('./' + 'Vender' + ".png")
    },

    selectedOption() {
      let selRunescape = require.context('./assets/runescape', false, /\.png$/)
      let selWow = require.context('./assets/wowtbc', false, /\.png$/)
      let selLost = require.context('./assets/lostark', false, /\.png$/)

      return this.currentGame.id == 1 ? selRunescape('./' + 'Selected' + ".png") : 
      this.currentGame.id == 2 ? selWow('./' + 'selected' + ".png") : 
      selLost('./' + 'selected' + ".png")
    },
  },

  methods: {
    async getPrices() {
      try {
        const { data } = await this.$http.get('/get-prices');
        this.prices = data.prices;

        this.getCountries(data.prices);
      } catch (err) {
        console.log(err);
      }
    },

    async getGames() {
      try {
        const { data } = await this.$http.get('/getAll-games');
        this.games = data.games;
        this.currentGame = data.games[0];
        this.currentBg = data.games[0].bg;

        this.regions = data.games[0].regions;
        this.trades = data.games[0].trades;
        this.factions = data.games[0].factions;

        this.currentRegion = data.games[0].regions[0];
        this.currentTrade = data.games[0].trades[0];
        this.currentFaction = data.games[0].factions[0];

        // this.getServers(data.games[0].regions[0] ? data.games[0].regions[0].id : null);
        this.getServers();

      } catch (err) {
        console.log(err);
      }
    },

    async getCountries(allPrices) {
      this.loader = true;

      try {
        const { data } = await this.$http.get('/getAll-countries');
        this.countries = data.countries;
        this.currentCountry = data.countries[0];

        this.payments = data.countries[0].payments;
        this.currentPayment = data.countries[0].payments[0];

        let resultLocal = allPrices.find(p => p.game_id == this.currentGame.id &&
           p.country_id == data.countries[0].id && p.type == 1);
        let resultUSD = allPrices.find(price => price.game_id == this.currentGame.id &&
           price.country_id == data.countries[0].id && price.type == 2);
        
        this.priceLocal = resultLocal;
        this.priceUSD = resultUSD;

      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
    },

    async onChangeGame(game) {
      this.currentGame = game; 
      this.currentBg = game.bg;

      this.currentRegion = {};
      this.currentTrade = {};
      this.currentFaction = {};
      this.currentServer = null;

      this.currentCountry = this.countries[0];
      this.coinGame = game.id == 1 ? 'M' : 'K';

      this.payments = this.countries[0].payments;
      this.currentPayment = this.countries[0].payments[0];

      this.regions = game.regions;
      this.trades = game.trades;
      this.factions = game.factions;

      this.currentRegion = game.regions[0];
      this.currentTrade = game.trades[0];
      this.currentFaction = game.factions[0];

      this.nickname = "";

      await this.getServersByGame(game.regions[0] ? game.regions[0].id : null);

      if(game.id == 1) {
        let resultLocal = this.prices.find(p => p.game_id == game.id &&
          p.country_id == this.countries[0].id && p.type == 1);
        let resultUSD = this.prices.find(price => price.game_id == game.id &&
            price.country_id == this.countries[0].id && price.type == 2);
        
        this.priceLocal = resultLocal;
        this.priceUSD = resultUSD;
      } else {
        let resultLocal = this.prices.find(p => p.game_id == game.id &&
          p.country_id == this.countries[0].id && p.server_id == this.currentServer && p.type == 1);
        let resultUSD = this.prices.find(price => price.game_id == game.id &&
            price.country_id == this.countries[0].id && price.server_id == this.currentServer && price.type == 2);
        
        this.priceLocal = resultLocal;
        this.priceUSD = resultUSD;
      }
    },

    onChangeCountry(country) {
      this.currentCountry = country;
      this.payments = country.payments;
      this.currentPayment = country.payments[0];

      if(this.currentGame.id == 1) {
        let resultLocal = this.prices.find(p => p.game_id == this.currentGame.id &&
          p.country_id == country.id && p.type == 1);
        let resultUSD = this.prices.find(price => price.game_id == this.currentGame.id &&
            price.country_id == country.id && price.type == 2);
        
        this.priceLocal = resultLocal;
        this.priceUSD = resultUSD;
      } else {
        let resultLocal = this.prices.find(p => p.game_id == this.currentGame.id &&
          p.country_id == country.id && p.server_id == this.currentServer && p.type == 1);
        let resultUSD = this.prices.find(price => price.game_id == this.currentGame.id &&
            price.country_id == country.id && price.server_id == this.currentServer && price.type == 2);
        
        this.priceLocal = resultLocal;
        this.priceUSD = resultUSD;
      }

    },

    onChangePayment(payment) {
      this.currentPayment = payment;
    },

    onChangeTrade(trade) {
      this.currentTrade = trade;
    },

    onChangeRegion(region) {
      this.currentRegion = region;

      this.getServersByGame(region.id);
    },

    onChangeFaction(faction) {
      this.currentFaction = faction;

      this.getServersByGame();
      this.currentServer = this.servers[0];
    },

    // async getServersByGame(region_id = null) {
    //   let info = {
    //     game_id: this.currentGame.id,
    //     region_id: region_id 
    //   }

    //   this.loading = true;

    //   try {
    //     const { data } = await this.$http.post(`/get-servers`, info);
    //       this.servers = data.servers;
    //       this.currentServer = data.servers.length > 0 ? data.servers[0].id : 0;
          
    //       if(data.servers.length > 0) {
    //         let resultLocal = this.prices.find(p => p.game_id == this.currentGame.id &&
    //           p.country_id == this.currentCountry.id && p.server_id == data.servers[0].id && p.type == 1);
    //         let resultUSD = this.prices.find(price => price.game_id == this.currentGame.id &&
    //             price.country_id == this.currentCountry.id && price.server_id == data.servers[0].id && price.type == 2);
            
    //         this.priceLocal = resultLocal;
    //         this.priceUSD = resultUSD;
    //       }

    //   } catch (err) {
    //     console.log(err);
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    async getServers() {
      try {
        const { data } = await this.$http.get(`/all-servers`);
          this.servers = data.servers;
          let current_server = data.servers.find(sv => sv.game_id == this.currentGame.id);
          this.currentServer = current_server
          
          if(data.servers.length > 0) {
            let resultLocal = this.prices.find(p => p.game_id == this.currentGame.id &&
              p.country_id == this.currentCountry.id && p.server_id == current_server && p.type == 1);
            let resultUSD = this.prices.find(price => price.game_id == this.currentGame.id &&
                price.country_id == this.currentCountry.id && price.server_id == current_server && price.type == 2);
            
            this.priceLocal = resultLocal;
            this.priceUSD = resultUSD;
          }

      } catch (err) {
        console.log(err);
      }
    }, 
    async getServersByGame(region_id = null) {
      if(this.currentGame.id > 1) {
        this.serversFiltered = this.servers.filter(sv => sv.game_id == this.currentGame.id && sv.region_id == region_id);
      } else {
        this.serversFiltered = this.servers.filter(sv => sv.game_id == this.currentGame.id);
      }

      this.currentServer = this.serversFiltered.length > 0 ? this.serversFiltered[0].id : null;
          
      if(this.serversFiltered.length > 0) {
        let resultLocal = this.prices.find(p => p.game_id == this.currentGame.id &&
          p.country_id == this.currentCountry.id && p.server_id == this.serversFiltered[0].id && p.type == 1);
        let resultUSD = this.prices.find(price => price.game_id == this.currentGame.id &&
            price.country_id == this.currentCountry.id && price.server_id == this.serversFiltered[0].id && price.type == 2);
        
        this.priceLocal = resultLocal;
        this.priceUSD = resultUSD;
      }
    },

    setSelect({target}) {
      this.currentServer = target.value;

      let resultLocal = this.prices.find(p => p.game_id == this.currentGame.id &&
          p.country_id == this.currentCountry.id && p.server_id == target.value && p.type == 1);
      let resultUSD = this.prices.find(price => price.game_id == this.currentGame.id &&
          price.country_id == this.currentCountry.id && price.server_id == target.value && price.type == 2);

      this.priceLocal = resultLocal;
      this.priceUSD = resultUSD;
    },

    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    sellAction() {

      let text = '';

      if(this.mainPrice < 1 || this.mainPrice == '') {
        alert('No puede haber un valor vacío');
        return;
      }

      if(this.currentGame.id == 1 && this.nickname == ''){
        alert('El nickname no puede estar vacio. Escribe tu nombre del juego y luego presiona vender.');
        return;
      }

      if(this.currentGame.id == 1) {


        if(this.currentTrade.id == 1){
          text = 'Muy Buenas, Juego: ' + this.currentGame.name +
          '\r\n Método de Pago: ' + this.currentPayment.name +
          '\r\n Método de Venta: ' + this.currentTrade.name +
          '\r\n *📍Lugar: Lumbridge - Telespot' +
          '\r\n *🌍 WORLD : 473' +
          '\r\n Nickname: ' + this.nickname.toUpperCase() +
          '\r\n Monto: ' + this.mainPrice + this.coinGame + ' = ' + 
          (this.priceLocal.price * this.mainPrice).toFixed(2) + this.priceLocal.country.iso + ' ' 
          + '$' + (this.priceUSD.price * this.mainPrice).toFixed(2);
        }else if(this.currentTrade.id == 2){
          text = 'Muy Buenas, Juego: ' + this.currentGame.name +
          '\r\n Método de Pago: ' + this.currentPayment.name +
          '\r\n Método de Venta: ' + this.currentTrade.name +
          '\r\n *📍Lugar : Rimmington' +
          '\r\n *🌍 WORLD : 465 ' +
          '\r\n Nickname: ' + this.nickname.toUpperCase() +
          '\r\n Monto: ' + this.mainPrice + this.coinGame + ' = ' + 
          (this.priceLocal.price * this.mainPrice).toFixed(2) + this.priceLocal.country.iso + ' ' 
          + '$' + (this.priceUSD.price * this.mainPrice).toFixed(2);
        }else if(this.currentTrade.id == 6){
          text = 'Muy Buenas, Juego: ' + this.currentGame.name +
          '\r\n Método de Pago: ' + this.currentPayment.name +
          '\r\n Método de Venta: ' + this.currentTrade.name +
          '\r\n *📍Lugar : Draynor bank' +
          '\r\n *🌍 WORLD : 392 ' +
          '\r\n Rango q recibimos: lvl 86-116' +
          '\r\n Nickname: ' + this.nickname.toUpperCase() +
          '\r\n Monto: ' + this.mainPrice + this.coinGame + ' = ' + 
          (this.priceLocal.price * this.mainPrice).toFixed(2) + this.priceLocal.country.iso + ' ' 
          + '$' + (this.priceUSD.price * this.mainPrice).toFixed(2);
        }
        else{
          text = 'Muy Buenas, Juego: ' + this.currentGame.name +
          '\r\n Método de Pago: ' + this.currentPayment.name +
          '\r\n Método de Venta: ' + this.currentTrade.name +
          '\r\n Nickname: ' + this.nickname.toUpperCase() +
          '\r\n Monto: ' + this.mainPrice + this.coinGame + ' = ' + 
          (this.priceLocal.price * this.mainPrice).toFixed(2) + this.priceLocal.country.iso + ' ' 
          + '$' + (this.priceUSD.price * this.mainPrice).toFixed(2);
        }

        //           text = 'Muy Buenas, Juego: ' + this.currentGame.name +
        // '\r\n Método de Pago: ' + this.currentPayment.name +
        // '\r\n Método de Venta: ' + this.currentTrade.name +
        // '\r\n Nickname: ' + this.nickname +
        // '\r\n Monto: ' + this.mainPrice + this.coinGame + ' = ' + 
        // (this.priceLocal.price * this.mainPrice).toFixed(2) + this.priceLocal.country.iso + ' ' 
        // + '$' + (this.priceUSD.price * this.mainPrice).toFixed(2);
      } else if(this.currentGame.id == 2) {
        text = 'Muy Buenas, Juego: ' + this.currentGame.name +
        '\r\n Método de Pago: ' + this.currentPayment.name +
        '\r\n Método de Venta: ' + this.currentTrade.name +
        '\r\n Facción: ' + this.currentFaction.name +
        '\r\n Server: ' + this.serversFiltered.find(sv => sv.id == this.currentServer).name.toUpperCase() +
        '\r\n Monto: ' + this.mainPrice + this.coinGame + ' = ' + 
        (this.priceLocal.price * this.mainPrice).toFixed(2) + this.priceLocal.country.iso + ' ' 
        + '$' + (this.priceUSD.price * this.mainPrice).toFixed(2);
      } else if(this.currentGame.id == 3) {
        text = 'Muy Buenas, Juego: ' + this.currentGame.name +
        '\r\n Método de Pago: ' + this.currentPayment.name +
        '\r\n Región: ' + this.currentRegion.name +
        '\r\n Server: ' + this.serversFiltered.find(sv => sv.id == this.currentServer).name.toUpperCase() +
        '\r\n Monto: ' + this.mainPrice + this.coinGame + ' = ' + 
        (this.priceLocal.price * this.mainPrice).toFixed(2) + this.priceLocal.country.iso + ' ' 
        + '$' + (this.priceUSD.price * this.mainPrice).toFixed(2);
      }

      console.log(text)
      this.$zendesk.zE('webWidget', 'open')
      this.$zendesk.zE(
        'webWidget', 
        'chat:send', 
        text
      )
    }
  }
}
</script>

<style lang="css">
  body {
    background-color: #090909;
    color: #FFF;
  }
</style>