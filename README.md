# Express Logs

## Usefull code

**`models/Log.js`**
```js
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const logSchema = new Schema({
  ipAddress: String,
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  page: {
    method: String,
    url: String
  }
}, {
  timestamps: {
    createdAt: 'dateVisited' // We have a field `dateVisited` set to the current time
  }
});

module.exports = mongoose.model('Log', logSchema);
```

**`app.js`**
```js
// ...
// Our own middleware
app.use((req,res,next) => {
  console.log('This is my 1st middleware')
  Log.create({
    _user: req.user && req.user._id,
    ipAddress: req.ip,
    page: {
      method: req.method,
      url: req.url
    }
  })
  .then(() => {
    Log.count({"page.method": "GET"})
    .then(counter => {
      res.locals.nbOfVisits = counter // Define a view variable `nbOfVisits`
      next()
    })
  })
  .catch(err => {
    next(err) // Go to the error middleware in bin/www:13
  })
})
// ...
```

## Screenshot
![Screenshot](https://i.imgur.com/uYGmBa1.png)