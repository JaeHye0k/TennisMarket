const mariadb = require("./database/connect/mariadb");
const fs = require("fs");
const mainView = fs.readFileSync("./src/main.html", "utf8");
const orderlistView = fs.readFileSync("./src/orderlist.html", "utf8");

function main(response) {
    mariadb.query("SELECT * FROM product", (err, rows) => {
        // console.log(rows);
    });

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(mainView);
    response.end();
}

function orderlist(response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(orderlistView);

    mariadb.query("SELECT * FROM orderlist", (err, rows) => {
        let table = "<table>";
        const keys = Object.keys(rows[0]);
        keys.forEach((key) => {
            table += `<th>${key}</th>`;
        });

        if (err) console.error(err);
        else {
            rows.forEach((row) => {
                table += `<tr>
                            <td>${row.id}</td>
                            <td>${row.date}</td>
                        </tr>`;
            });
        }
        table += "</table>";

        response.write(table);
        response.end();
    });
}

function redRacket(response) {
    fs.readFile("./img/redRacket.png", (err, res) => {
        response.writeHead(200, { "Content-Type": "image/png" });
        response.write(res);
        response.end();
    });
}

function blueRacket(response) {
    fs.readFile("./img/blueRacket.png", (err, res) => {
        response.writeHead(200, { "Content-Type": "image/png" });
        response.write(res);
        response.end();
    });
}

function blackRacket(response) {
    fs.readFile("./img/blackRacket.png", (err, res) => {
        response.writeHead(200, { "Content-Type": "image/png" });
        response.write(res);
        response.end();
    });
}

function mainCss(response) {
    fs.readFile("./style/main.css", (err, res) => {
        response.writeHead(200, { "Content-Type": "text/css" });
        response.write(res);
        response.end();
    });
}

function orderlistCss(response) {
    fs.readFile("./style/orderlist.css", (err, res) => {
        response.writeHead(200, { "Content-Type": "text/css" });
        response.write(res);
        response.end();
    });
}
function order(response, productId) {
    fs.readFile("./src/order.html", (err, res) => {
        mariadb.query(
            `INSERT INTO orderlist VALUES(${+productId},'${new Date().toLocaleDateString()}')`,
            (err, data) => {
                if (err) console.error(err);
                else console.log(data);
            },
        );

        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(res);
        response.end();
    });
}

const handle = {
    "/": main,
    "/orderlist": orderlist,
    "/img/redRacket.png": redRacket,
    "/img/blueRacket.png": blueRacket,
    "/img/blackRacket.png": blackRacket,
    "/style/main.css": mainCss,
    "/order": order,
    "/style/orderlist.css": orderlistCss,
};

exports.handle = handle;
