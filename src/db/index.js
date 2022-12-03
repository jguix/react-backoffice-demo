var fs = require('fs');
var faker = require('faker/locale/en');
faker.locale = 'en';

let customers = [];
let products = [];

for (let i = 1; i <= 100; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  customers.push({
    address: `${faker.address.streetAddress()}, ${faker.address.zipCode()}, ${faker.address.city()}, ${faker.address.country()}`,
    email: faker.internet.email(firstName, lastName),
    id: i,
    name: faker.name.findName(firstName, lastName),
  });
}

for (let i = 1; i <= 500; i++) {
  products.push({
    id: i,
    name: faker.commerce.productName(),
    photo: faker.random.image(),
    price: parseInt(faker.commerce.price()),
  });
}

const data = {
  customers,
  products,
};

fs.writeFile('src/db/db.json', JSON.stringify(data, null, 2), (err) => {
  if (err) return console.log(err);
  console.log('Created database at src/db/db.json');
});
