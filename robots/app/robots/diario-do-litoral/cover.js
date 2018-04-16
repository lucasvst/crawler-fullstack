const Article = require('./../../core/persistence/schema/article');

const run = require('./../../core/run');

const DATE = new Date();
const VEHICLE_NAME = 'DIARIO DO LITORAL';

run('http://m.diariodolitoral.com.br/', $ => {

    const rows = [];

    const items = $('a.linkNoticia');

    items.each((i, item) => {

        rows.push(new Article({
            date: DATE,
            origin: VEHICLE_NAME,
            category: $('small', item).text(),
            title: $('big', item).text(),
            excerpt: $('span', item).text(),
            url: $(item).attr('href'),
        }));
    });

    return rows;

});