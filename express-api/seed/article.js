const faker = require("faker");
const articles = [];

for(let i =0; i<5 ; i++){
    articles.push({
        id: i,
        title: faker.lorem.sentence(),
        subTitle: faker.lorem.sentence(),
        creatDate: faker.date.past().toString(),
        content: faker.lorem.paragraphs(),
        // publish: [true,false][
        //     Math.floor(Math.random() * [true,false].length)
        // ],
        publish: true,
        url: `/articles/${i}`,
    });
}

module.exports = articles;