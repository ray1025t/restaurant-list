const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')



// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurantLists: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const keywordList = keyword.trim().toLowerCase()
  
  const searchRestaurant = restaurantList.results.filter(restaurant => {
    if (restaurant.name.toLowerCase().includes(keywordList) || restaurant.category.toLowerCase().includes(keywordList))
    return true
  })

  res.render('index', { restaurantLists: searchRestaurant })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantw = restaurantList.results.find(restaurant => { return restaurant.id.toString() === req.params.restaurant_id })

  res.render('show', { restaurant: restaurantw })
})



// express listen
app.listen(port, () => {
  console.log(`server in running on http://localhost:${port}`)
})