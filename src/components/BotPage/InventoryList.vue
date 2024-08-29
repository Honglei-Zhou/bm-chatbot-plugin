<template>
  <div v-show="showFlag" ref="scrollList" :style="{backgroundColor: colors.inventoryList.bg}" class="sc-inventory-list">
    <div class="sc-inventory-list--header">
      <div :class="{clicked: allClicked}" class="sc-inventory-list--header-div" @click="showAllCars(1)"> All </div>
      <div :class="{clicked: newClicked}" class="sc-inventory-list--header-div" @click="showNewCars(1)"> New </div>
      <div :class="{clicked: usedClicked}" class="sc-inventory-list--header-div" @click="showUsedCars(1)"> Used </div>
    </div>

    <div class="sc-inventory-list-search">
      <select v-model="make" class="sc-search-make" @change="updateModelOptions">
        <option value="">Make</option>
        <option v-for="(item, idx) in makeOptions" :key="idx" :value="item.value">{{ item.label }}</option>
      </select>
      <button :disabled="make===''" class="sc-search-button" @click="toggleModels">Model</button>
      <button class="sc-search-button" @click="togglePrices">Price</button>
      <button v-if="!clicked" class="sc-search-button" style="background-color: #409EFF;" @click="filterCars">Search</button>
      <button v-else class="sc-search-button" style="background-color: #67C23A;" @click="resetFilters">Reset</button>
    </div>

    <div v-if="listData.length===0" class="sc-inventory-loading">
      <button class="sc-inventory-loading-button" @click="loadData">Click to Load Data</button>
    </div>

    <div v-if="showModelSelect" class="sc-search-model">
      <div v-for="(item, idx) in modelOptions" :key="idx" class="sc-search-model-item">
        <input :id="item.value" v-model="models" :value="item.value" type="checkbox">
        <label :for="item.value">{{ item.label }}</label>
      </div>
    </div>
    <div v-if="showPriceTags" class="sc-search-model-price">
      <div v-for="(item, idx) in priceOptions" :key="idx" class="sc-search-model-price-item">
        <input :id="item.value" v-model="prices" :value="item.value" type="checkbox">
        <label :for="item.value">{{ item.label }}</label>
      </div>
    </div>

    <div v-if="listData.length>0" class="scroll-content">
      <div class="sc-inventory-list--content">
        <InventoryElement v-for="task in tasksWithRandomKey" :data="task.car" :key="task.key" :message-colors="colors.inventoryElement"/>
      </div>
      <paginate
        v-model="page.pageCurrent"
        :page-count="page.pageCount"
        :page-range="6"
        :click-handler="clickHandler"
        :container-class="'pagination'"
        :page-class="'page-item'"
      />
    </div>
  </div>
</template>
<script>
import InventoryElement from '@/components/BotPage/InventoryElement'
import { mapActions, mapState } from 'vuex'
import Paginate from 'vuejs-paginate'

export default {
  components: {
    InventoryElement,
    Paginate
  },
  data() {
    return {
      showFlag: false,
      colors: {
        inventoryList: {
          bg: '#ffffff'
        },
        inventoryElement: {
          color: 'rgb(34, 34, 34)',
          backgroundColor: '#ffffff'
        }
      },
      allClicked: false,
      newClicked: true,
      usedClicked: false,
      allLoaded: false,
      showPriceTags: false,
      makeOptions: [{
        value: 'Audi',
        label: 'Audi'
      }, {
        value: 'Honda',
        label: 'Honda'
      }],
      modelOptions: {
        Honda: [{
          value: 'Option1',
          label: 'Option1'
        }]
      },
      priceOptions: [
        {
          value: 'Under$10,000',
          label: 'Under$10,000'
        },
        {
          value: '$10,001~$20,000',
          label: '$10,001~$20,000'
        },
        {
          value: '$20,001~$25,000',
          label: '$20,001~$25,000'
        },
        {
          value: '$25,001~$30,000',
          label: '$25,001~$30,000'
        },
        {
          value: '$30,001&Above',
          label: '$30,001&Above'
        }
      ],
      clicked: false,
      make: '',
      models: [],
      prices: [],
      carList: [],
      listData: [],
      newUsedTags: ['N', 'New'],
      page: {
        pageSize: 8,
        pageCount: 1,
        pageCurrent: 1,
        totalCount: 0,
        hasNext: false
      },
      showModelSelect: false
    }
  },
  computed: {
    ...mapState('bmbot', ['cars']),
    ...mapState('telleChat', ['bot']),
    tasksWithRandomKey() {
      return this.carList.map(car => { return { car, key: this.randomKey() } })
    }
  },
  mounted() {
    this.initCarList()
  },
  methods: {
    ...mapActions('bmbot', ['getAllCars', 'getNewCars', 'getUsedCars']),
    sendItem(item) {
      this.$emit('sendItem', item)
    },
    toggleModels() {
      this.showModelSelect = !this.showModelSelect
      this.showPriceTags = false
    },
    togglePrices() {
      this.showPriceTags = !this.showPriceTags
      this.showModelSelect = false
    },
    loadData() {
      this.$store.dispatch('bmbot/getAllCars', { pageNum: 1, key: this.bot.cId })
      this.$nextTick(() => {
        this.initCarList()
      })
    },
    updateMakeOptions() {
      if (this.newClicked) this.makeOptions = this.cars.options.newMakeOptions
      else if (this.allClicked) this.makeOptions = this.cars.options.makeOptions
      else this.makeOptions = this.cars.options.oldMakeOptions
    },
    initCarList() {
      this.clearVariables()
      this.updateMakeOptions()
      this.listData = []
      // console.log(this.cars.data)
      this.cars.data.forEach(item => {
        // console.log(item)
        if (this.newUsedTags.indexOf(item.new_used) !== -1) this.listData.push(item)
      })
      // console.log(this.listData)
      var total = this.listData.length
      this.page.totalCount = total
      this.page.pageCount = Math.floor(total / (this.page.pageSize + 1)) + 1
      this.page.hasNext = true
      this.page.pageCurrent = 1
      this.getCurrentPage()
    },
    getCurrentPage() {
      this.carList = []
      var start = (this.page.pageCurrent - 1) * this.page.pageSize
      this.carList = this.listData.slice(start, start + this.page.pageSize)
    },
    updateModelOptions() {
      if (this.allClicked) this.modelOptions = this.cars.options.modelOptions[this.make]
      else if (this.newClicked) this.modelOptions = this.cars.options.newModelOptions[this.make]
      else this.modelOptions = this.cars.options.oldModelOptions[this.make]
    },
    filterCars() {
      this.clicked = true
      this.listData = this.listData.filter(item => {
        if (this.make !== '' && this.make !== item.meta.make) return false
        else if (this.models.length > 0 && this.models.indexOf(item.meta.model) === -1) return false
        else if (this.prices.length > 0) {
          if (this.prices.indexOf('Under$10,000') !== -1 && item.meta.price <= 10000) return true
          if (this.prices.indexOf('$10,001~$20,000') !== -1 && item.meta.price > 10000 && item.meta.price <= 20000) return true
          if (this.prices.indexOf('$20,001~$25,000') !== -1 && item.meta.price > 20000 && item.meta.price <= 25000) return true
          if (this.prices.indexOf('$25,001~$30,000') !== -1 && item.meta.price > 25000 && item.meta.price <= 30000) return true
          if (this.prices.indexOf('$30,001&Above') !== -1 && item.meta.price > 30000) return true
          return false
        }
        return true
      })
      var total = this.listData.length
      this.page.totalCount = total
      this.page.pageCount = Math.floor(total / (this.page.pageSize + 1)) + 1
      this.page.hasNext = true
      this.page.pageCurrent = 1
      this.getCurrentPage()
    },
    clearVariables() {
      this.clicked = false
      this.make = ''
      this.models = []
      this.prices = []
    },
    resetFilters() {
      // this.clearVariables()
      this.initCarList()
    },
    randomKey() {
      var length = 5
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    show() {
      this.showFlag = true
      if (this.cars.type === 'all') {
        this.allClicked = true
      } else if (this.cars.type === 'new') {
        this.newClicked = true
      } else {
        this.usedClicked = true
      }
    },
    hide() {
      this.showFlag = false
    },
    clickHandler(pageNum) {
      this.getCurrentPage()
      this.scrollUp()
    },
    showAllCars(pageNum) {
      this.newClicked = false
      this.usedClicked = false
      this.allClicked = true
      this.newUsedTags = ['N', 'U', 'New', 'Used', null]
      this.page.pageCurrent = pageNum
      this.initCarList()
      // this.$store.dispatch('bmbot/getAllCars', pageNum)
      // this.getAllCars(pageNum)
    },
    showNewCars(pageNum) {
      this.newClicked = true
      this.usedClicked = false
      this.allClicked = false
      this.newUsedTags = ['N', 'New']
      this.page.pageCurrent = pageNum
      this.initCarList()
      // this.$store.dispatch('bmbot/getNewCars', pageNum)
      // this.getNewCars(pageNum)
    },
    showUsedCars(pageNum) {
      this.newClicked = false
      this.usedClicked = true
      this.allClicked = false
      this.newUsedTags = ['U', 'Used']
      this.page.pageCurrent = pageNum
      this.initCarList()
      // this.$store.dispatch('bmbot/getUsedCars', pageNum)
      // this.getUsedCars(pageNum)
    },
    scrollUp() {
      this.$refs.scrollList.scrollTop = 0
    }
  }
}
</script>

<style lang="css">
.sc-inventory-list {
  height: 100%;
  /* overflow-y: auto; */
  background-size: 100%;
}
.sc-inventory-list--header{
    width: 100%;
    /* background-color: #19be6b; */
    color: white;
    border-top-left-radius: 9px;
    position: static;
    position: -webkit-sticky;
    display: flex;
    flex-direction: row;
    top: 0px;
    z-index: 10000;
}
.sc-inventory-list--header-div{
    width: 33.3%;
    height: 40px;
    font-weight: 300;
    font-size: 16px;
    line-height: 40px;
    background-color: #19be6b;
    border-left: 1px solid #ffffff;
    cursor: pointer;
}

.sc-inventory-list--header-div:first-of-type{
   border-top-left-radius: 9px;
}

.clicked {
  background-color: red;
}

.sc-inventory-list--header-div:first-of-type{
    border-left: none;
}

.sc-inventory-loading{
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.sc-inventory-loading-button {
  width: 40%;
  margin: 2px;
  background-color: white; /* Green */
  border: 1px solid rgba(0,0,0,0.4);
  border-radius: 5px;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}

.sc-inventory-list-search{
  width: 100%;
  height: 30px;
  margin-top: 20px;
  /* padding: 25px 15px 10px 15px; */
  display: flex;
  flex-direction: row;
}

.sc-search-make{
  width: 22%;
  background-color: white;
  border-radius: 5px;
  margin: 2px;
}

.sc-search-button{
  width: 25%;
  margin: 2px;
  background-color: white; /* Green */
  border: 1px solid rgba(0,0,0,0.4);
  border-radius: 5px;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}

.sc-search-model{
  width: 300px;
  height: 50px;
  margin: 5px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}

.sc-search-model-item{
  display: flex;
  flex-direction: row;
}

.sc-search-model-price{
  width: 300px;
  height: 50px;
  margin: 5px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}

.sc-search-model-price-item{
  display: flex;
  flex-direction: row;
}

.scroll-content {
  width: 100%;
  overflow: hidden;
}

.sc-inventory-list--content {
    padding: 20px 40px;
}

.sc-inventory-list-icon {
    padding-top: 5px;
    height: 30px;
    width: 30px;
    align-self: center;
    outline: none;
}

.sc-inventory-list-icon:hover path {
    filter: contrast(15%);
}

.pagination {
  padding: 20px 40px;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.page-item {
  width: 10px;
  /* user-select: none;
  border: none; */
}

.active {
  font-weight: bold;
}

</style>
