import { observable } from 'mobx'

const playStore = observable({

  curPlayerRole: '',

  playersRoleMap: {},
  setPlayersRoleMap (val) {
    this.playersRoleMap = val
  },

})

export default playStore
