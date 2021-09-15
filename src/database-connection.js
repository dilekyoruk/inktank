const mongoose = require('mongoose');

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DATABASE;

mongoose
  .connect(`mongodb+srv://${username}:${password}@cluster0.fsakt.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connection established'))
  .catch(console.log);

// const Panda = mongoose.model('Panda', { name: String, age: Number });

// const panda = new Panda({ name: 'tim', age: 33 });

// panda.save().then(() => console.log(`We have a new panda, ${panda.name}!`));

/* async function main() {
  const pandas = await Panda.find({ age: { $gte: 21 } });
  console.log(pandas);
}
 */
/* async function main() {
  const pandas = await Panda.find({ age: { $gte: 18, $lte:21 } , name: 'haluk' });
  console.log(pandas);
} */

// main();
