require('dotenv').config();
const mongoose = require("mongoose");
 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: {type: [String], default: []},
})

let Person =  mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({ name: 'Ben', age: 20, favoriteFoods: ['rice', 'beans'] });
  person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
  // done(null /*, data*/);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) =>{
    if (err) return console.log(err);
    done(null, data);
  })
  // done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
  // done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) =>{
    if (err) return console.log(err);
    done(null, data);
    
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err, foundPerson) =>{
    if(err) return console.log(err); 

    foundPerson.favoriteFoods.push(foodToAdd)
    
    foundPerson.save(function(err, updatedPerson) {
      if (err) return console.error(err);
      done(null, updatedPerson)
    });
    // if (err) return console.log(err);
    // done(null, data);
  })
  // done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, {new: true }, (err, updatedPerson) => {
    if(err) return console.log(err);
    done(null, updatedPerson);
  })
  // done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, removedPerson) => {
    if(err) return console.log(err);
    done(null, removedPerson);
  })
  // done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, res) => {
    if(err) return console.log(err);
    done(null, res);
  })
  // done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((err, data) => {
    if(!err) {
    done(null, data);
    console.log(`Chained  Successfully. Results: ${data}`)
    } else {
      console.log(err);
    };
  });
  // .exec(function(err, docs) {
  //   if(err) return console.log(err);
  //   done(null, docs);
  // });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
