const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;

const makeListing = (i) => {
  const randomCoord = Math.random() * 2;
  return {
    listingId: i,
    user: faker.internet.userName(),
    needController: faker.random.boolean(),
    location: {
      type: "Point",
      coordinates: [-121.0856086 + randomCoord, 36.4224082 + randomCoord],
    },
    timeFrame: faker.random.number(4) + 1,
    timeStart: faker.random.number(11) + 11,
  }
};

const size = 500;
const total = 5000;
let batch = 0;

let seedDB = () => {
  MongoClient.connect('mongodb://localhost/').then(client => {
    const db = client.db('findMelee');
    const collection = db.collection('listings');
    async function insert() {
      let insertArray = new Array(size)
      for (let i = 1; i <= size; i++) {
        let data = makeListing(i + batch * size);
        insertArray[i - 1] = { insertOne: data }
      }
      await collection.bulkWrite(insertArray, { ordered: false });
      batch += 1;
      if (batch < total / size) {
        console.log('inserted batch: ', batch);
        insert();
      } else {
        await collection.createIndex({location: "2dsphere"});
        client.close();
      }
    }
    insert();
  })
    .catch(e => {
      console.log(e);
    })
}
seedDB();