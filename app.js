const express = require('express');
const mysql = require('mysql');

const app = express();

app.get('/', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password: 'root',
    });

    connection.connect((err) => {
        if (err) {
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
    })


    connection.query(`CREATE DATABASE IF NOT EXISTS test`, (err) => {
        if (err) throw err;
        console.log('Database created');
    });

    connection.query('USE test', (err) => {
        if (err) throw err;
        console.log('Database selected');
    });

    // make id autoincrement
    connection.query(`CREATE TABLE IF NOT EXISTS test (id int AUTO_INCREMENT PRIMARY KEY, name varchar(255))`, (err) => {
        if (err) throw err;
        console.log('Table created');
    });


    connection.query(`INSERT INTO test (name) VALUES ('test')`, (err) => {
        if (err) throw err;
        console.log('Data inserted');
    });


    connection.query(`SELECT * FROM test`, (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);

        return res.send(rows);
    });

});



app.listen(3000, () => {
    console.log('Server is up on 3000');
});
