const fs = require('fs')
const toys = require('../data/toy.json')

module.exports = {
    query,
    getById,
    remove,
    save
}

function query(filterBy) {
  //  const regex = new RegExp(filterBy.name ,'i')
  //  let filteredToys = toys.filter(toy => regex.test(toy.name))
  
  // filteredToys = filteredToys.filter(toy => checkLabels(filterBy.label , toy.labels ))
  return Promise.resolve(_filter(filterBy))
}
function _filter(filterBy) {
  console.log('filterBy:', filterBy)
  const { name, label, sort, inStock } = filterBy
  const regex = new RegExp(name, 'i')
  let filteredToys = toys.filter((toy) => regex.test(toy.name))
  console.log('FIrst filter',filteredToys)
  if(sort === 'none') filteredToys = filteredToys
  console.log('SECOND filter',filteredToys)
  sort === 'name'
  ? filteredToys.sort((toy1, toy2) => toy1[sort].localeCompare(toy2[sort]))
  : filteredToys.sort((toy1, toy2) => toy2[sort] - toy1[sort])
  
  console.log('THIRD filter',filteredToys)
  if(inStock === true){
    filteredToys = filteredToys.filter((toy) => toy.inStock)
    console.log('FOUR filter',filteredToys)
  }
  if(label){
    filteredToys = filteredToys.filter((toy) => {
      console.log('LABEL',label)
      return label.some((label) => toy.labels.includes(label))
    })
  }
  return filteredToys
}
// function checkLabels(arr , vals){
//   var res = []
// if(!arr || !vals)return true
//   for(var i = 0; i < vals.length; i++){
//      let answer = arr.some((arrVal) => vals[i] === arrVal)
//      res.push(answer)
//   }
//   if(res.includes(true)) return true
//   else return false
// }
function getById(toyId) {
    const toy = toys.find((toy) =>toy._id === toyId)
    return Promise.resolve(toy)
  }
  
  function remove(toyId) {
    const idx = toys.findIndex((toy) => toy._id === toyId)
    toys.splice(idx, 1)
    return _saveToys()
  }


  function save(toy) {
    if (toy._id) {
      const idx = toys.findIndex((currToy) => currToy._id === toy._id)
      toys[idx] = toy
    } else {
      toy._id = _makeId()
      toys.unshift(toy)
    }
    return _saveToys().then(() => toy)
  }

// PRIVATES

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _saveToys() {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(toys, null, 2)
  
      fs.writeFile('data/toy.json', data, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
