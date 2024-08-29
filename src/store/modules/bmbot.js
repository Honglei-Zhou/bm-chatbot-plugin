import { carSearchService } from '@/api/carSearchService'

const state = {
  newCars: [],
  usedCars: [],
  cars: {
    type: 'new',
    data: [],
    options: {}
  },
  page: {
    pageSize: 8,
    pageCount: 1,
    pageCurrent: 1,
    totalCount: 0,
    hasNext: false
  },
  imagePrefix: ''
  // imagePrefix: 'https://www.dthondachicago.com/inventory/'
}

// actions
const actions = {

  getAllCars({ commit, state }, data) {
    carSearchService.getAllCars(data.pageNum, state.page.pageSize, data.key).then((resp) => {
      var results = resp.data
      // console.log(results)
      // var newCarInventory = []
      // var usedCarInventory = []
      var inventory = []
      var options = { makes: [], makeOptions: [], models: [], modelOptions: {},
        newMakes: [], newMakeOptions: [], newModels: [], newModelOptions: {},
        oldMakes: [], oldMakeOptions: [], oldModels: [], oldModelOptions: {}
      }
      for (var i = 0; i < results.length; i++) {
        var car = results[i]
        // var base_url = 'https://www.dthondachicago.com/inventory/'
        // console.log(car)
        var base_url = state.imagePrefix
        var payload = ''
        if (car.link !== '') {
          payload = car.link
        } else {
          // console.log(car)
          if (car.series === undefined || car.series === null) {
            payload = car.new_used.toLowerCase() + '-' + car.year + '-' + car.make.toLowerCase() + '-' + car.model.toLowerCase() + '-' + car.drivetrain_desc.toLowerCase() + '-' + car.body.trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + '-' + car.vin.toLowerCase()
          } else {
            payload = car.new_used.toLowerCase() + '-' + car.year + '-' + car.make.toLowerCase() + '-' + car.model.toLowerCase() + '-' + car.series.trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + '-' + car.drivetrain_desc.toLowerCase() + '-' + car.body.trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + '-' + car.vin.toLowerCase()
          }
          payload = base_url + payload
        }

        if (options.makes.indexOf(car.make) === -1) {
          options.makes.push(car.make)
          options.makeOptions.push({
            value: car.make,
            label: car.make
          })
          options.models.push(car.model)
          options.modelOptions[car.make] = [{
            value: car.model,
            label: car.model
          }]
        } else {
          if (options.models.indexOf(car.model) === -1) {
            options.models.push(car.model)
            options.modelOptions[car.make].push({
              value: car.model,
              label: car.model
            })
          }
        }

        var inventoryElement = {
          name: car.year + ' ' + car.make + ' ' + car.model + ' ' + car.series + ' ' + car.drivetrain_desc,
          title: 'VIN# ' + car.vin,
          subtitle: 'Stock# ' + car.stock,
          new_used: car.new_used,
          meta: {
            title: 'Price',
            value: '$' + car.price,
            price: car.price,
            make: car.make,
            model: car.model,
            msrp: '$' + car.msrp,
            exterior: car.colour,
            interior: car.interior_color
          },
          image_urls: car.photo_url_list,
          url: null,
          buttons: [
            {
              type: 'url',
              title: 'Select and Send',
              payload: payload
            }
          ]
        }

        inventory.push(inventoryElement)
        // console.log(inventoryElement)
        if (car.new_used === 'N' || car.new_used === 'New') {
          car.new_used = 'N'
          inventoryElement.name = 'NEW ' + inventoryElement.name

          if (options.newMakes.indexOf(car.make) === -1) {
            options.newMakes.push(car.make)
            options.newMakeOptions.push({
              value: car.make,
              label: car.make
            })
            options.newModels.push(car.model)
            options.newModelOptions[car.make] = [{
              value: car.model,
              label: car.model
            }]
          } else {
            if (options.newModels.indexOf(car.model) === -1) {
              options.newModels.push(car.model)
              options.newModelOptions[car.make].push({
                value: car.model,
                label: car.model
              })
            }
          }
          // newCarInventory.push(inventoryElement)
        } else {
          car.new_used = 'U'
          if (options.oldMakes.indexOf(car.make) === -1) {
            options.oldMakes.push(car.make)
            options.oldMakeOptions.push({
              value: car.make,
              label: car.make
            })
            options.oldModels.push(car.model)
            options.oldModelOptions[car.make] = [{
              value: car.model,
              label: car.model
            }]
          } else {
            if (options.oldModels.indexOf(car.model) === -1) {
              options.oldModels.push(car.model)
              options.oldModelOptions[car.make].push({
                value: car.model,
                label: car.model
              })
            }
          }
        }
      }
      // console.log(inventory)
      commit('updatePagination', { total: resp.total, pageCurrent: data.pageNum, hasNext: resp.has_next })
      commit('addCars', { type: 'new', data: inventory, options: options })
      // commit('addNewCars', newCarInventory)
      // commit('addUsedCars', usedCarInventory)
    })
  },

  getNewCars({ commit, state, dispatch }, data) {
    console.log('Search Cars')
    carSearchService.getNewCars(data.pageNum, state.page.pageSize, data.key).then((resp) => {
      var results = resp.data
      var inventory = []
      var options = { makes: [], makeOptions: [], models: [], modelOptions: {}}
      for (var i = 0; i < results.length; i++) {
        var car = results[i]
        // var base_url = 'https://www.dthondachicago.com/inventory/'
        var base_url = state.imagePrefix
        var payload = ''
        // if (car.series === undefined) {
        //   payload = car.new_used.toLowerCase() + '-' + car.year + '-' + car.make.toLowerCase() + '-' + car.model.toLowerCase() + '-' + car.drivetrain_desc.toLowerCase() + '-' + car.body.toLowerCase() + '-' + car.vin.toLowerCase()
        // } else {
        //   payload = car.new_used.toLowerCase() + '-' + car.year + '-' + car.make.toLowerCase() + '-' + car.model.toLowerCase() + '-' + car.series.toLowerCase() + '-' + car.drivetrain_desc.toLowerCase() + '-' + car.body.toLowerCase() + '-' + car.vin.toLowerCase()
        // }
        if (car.link !== '') {
          payload = car.link
        } else {
          // console.log(car)
          if (car.series === undefined || car.series === null) {
            payload = car.new_used.toLowerCase() + '-' + car.year + '-' + car.make.toLowerCase() + '-' + car.model.toLowerCase() + '-' + car.drivetrain_desc.toLowerCase() + '-' + car.body.trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + '-' + car.vin.toLowerCase()
          } else {
            payload = car.new_used.toLowerCase() + '-' + car.year + '-' + car.make.toLowerCase() + '-' + car.model.toLowerCase() + '-' + car.series.trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + '-' + car.drivetrain_desc.toLowerCase() + '-' + car.body.trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + '-' + car.vin.toLowerCase()
          }
          payload = base_url + payload
        }

        if (options.makes.indexOf(car.make) === -1) {
          options.makes.push(car.make)
          options.makeOptions.push({
            value: car.make,
            label: car.make
          })
          options.models.push(car.model)
          options.modelOptions[car.make] = [{
            value: car.model,
            label: car.model
          }]
        } else {
          if (options.models.indexOf(car.model) === -1) {
            options.models.push(car.model)
            options.modelOptions[car.make].push({
              value: car.model,
              label: car.model
            })
          }
        }

        var inventoryElement = {
          name: 'NEW ' + car.year + ' ' + car.make + ' ' + car.model + ' ' + car.series + ' ' + car.drivetrain_desc,
          title: 'VIN# ' + car.vin,
          subtitle: 'Stock# ' + car.stock,
          new_used: car.new_used,
          meta: {
            title: 'Price',
            value: '$' + car.price,
            msrp: '$' + car.msrp,
            price: car.price,
            make: car.make,
            model: car.model,
            exterior: car.colour,
            interior: car.interior_color
          },
          image_urls: car.photo_url_list,
          url: null,
          buttons: [
            {
              type: 'url',
              title: 'Select and Send',
              payload: payload
            }
          ]
        }

        inventory.push(inventoryElement)
      }
      commit('updatePagination', { total: resp.total, pageCurrent: data.pageNum, hasNext: resp.has_next })
      commit('addCars', { type: 'new', data: inventory, options: options })
    })
  },

  getUsedCars({ commit, state }, data) {
    carSearchService.getUsedCars(data.pageNum, state.page.pageSize, data.key).then((resp) => {
      var results = resp.data
      var inventory = []
      var options = { makes: [], makeOptions: [], models: [], modelOptions: {}}
      for (var i = 0; i < results.length; i++) {
        var car = results[i]
        // var base_url = 'https://www.dthondachicago.com/inventory/'
        var base_url = state.imagePrefix
        var payload = ''
        // if (car.series === undefined) {
        //   payload = car.new_used.toLowerCase() + '-' + car.year + '-' + car.make.toLowerCase() + '-' + car.model.toLowerCase() + '-' + car.drivetrain_desc.toLowerCase() + '-' + car.body.toLowerCase() + '-' + car.vin.toLowerCase()
        // } else {
        //   payload = car.new_used.toLowerCase() + '-' + car.year + '-' + car.make.toLowerCase() + '-' + car.model.toLowerCase() + '-' + car.series.toLowerCase() + '-' + car.drivetrain_desc.toLowerCase() + '-' + car.body.toLowerCase() + '-' + car.vin.toLowerCase()
        // }
        if (car.link !== '') {
          payload = car.link
        } else {
          // console.log(car)
          if (car.series === undefined || car.series === null) {
            payload = car.new_used.toLowerCase() + '-' + car.year + '-' + car.make.toLowerCase() + '-' + car.model.toLowerCase() + '-' + car.drivetrain_desc.toLowerCase() + '-' + car.body.trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + '-' + car.vin.toLowerCase()
          } else {
            payload = car.new_used.toLowerCase() + '-' + car.year + '-' + car.make.toLowerCase() + '-' + car.model.toLowerCase() + '-' + car.series.trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + '-' + car.drivetrain_desc.toLowerCase() + '-' + car.body.trim().replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + '-' + car.vin.toLowerCase()
          }
          payload = base_url + payload
        }

        if (options.makes.indexOf(car.make) === -1) {
          options.makes.push(car.make)
          options.makeOptions.push({
            value: car.make,
            label: car.make
          })
          options.models.push(car.model)
          options.modelOptions[car.make] = [{
            value: car.model,
            label: car.model
          }]
        } else {
          if (options.models.indexOf(car.model) === -1) {
            options.models.push(car.model)
            options.modelOptions[car.make].push({
              value: car.model,
              label: car.model
            })
          }
        }

        var inventoryElement = {
          name: car.year + ' ' + car.make + ' ' + car.model + ' ' + car.series + ' ' + car.drivetrain_desc,
          title: 'VIN# ' + car.vin,
          subtitle: 'Stock# ' + car.stock,
          new_used: car.new_used,
          meta: {
            title: 'Price',
            value: '$' + car.price,
            msrp: '$' + car.msrp,
            price: car.price,
            make: car.make,
            model: car.model,
            exterior: car.colour,
            interior: car.interior_color
          },
          image_urls: car.photo_url_list,
          url: null,
          buttons: [
            {
              type: 'url',
              title: 'Select and Send',
              payload: payload
            }
          ]
        }
        inventory.push(inventoryElement)
      }
      commit('updatePagination', { total: resp.total, pageCurrent: data.pageNum, hasNext: resp.has_next })
      commit('addCars', { type: 'used', data: inventory, options: options })
    })
  }
}

// mutations
const mutations = {

  addNewCars(state, cars) {
    cars.forEach((car) => {
      state.newCars.push(car)
    })
  },

  addUsedCars(state, cars) {
    cars.forEach((car) => {
      state.usedCars.push(car)
    })
  },
  addCars(state, cars) {
    state.cars = cars
  },
  updatePagination(state, data) {
    state.page.totalCount = data.total
    state.page.pageCount = Math.floor(data.total / state.page.pageSize) + 1
    state.page.hasNext = data.hasNext
    state.page.pageCurrent = data.pageCurrent
  }
}

export const bmbot = {
  namespaced: true,
  state,
  //   getters,
  actions,
  mutations
}
