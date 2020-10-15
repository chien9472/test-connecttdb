function datasetup() {

    this.version = '0.0.1';
    var db = null;
    var mysql = require('mysql');
    // var config = {
    //     host : 'gametankonline.000webhostapp.com',
    //     user : 'id15127859_chiennd',
    //     password : 'Chien9472@@@',
    //     database : 'id15127859_tankonline',
    // }

    var config = {
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'test',
    }


    this.connect = function (callback){

        db = mysql.createConnection(config);
        db.connect(function (err) {
            
            if (err) {
                console.error('error connecting myslq :' + err);
                return;
            }
            
            console.log('Connected as database ' + config.database);

            callback(err);
        });

    };
    
    this.addUser = function (user, color, callback) {

        db.query("INSERT INTO users (username,password) VALUES (?,1)",[user,color], function (err, data) {
            if (err) { console.error(err); }
            
            callback(err, data);
        });

    };

    this.loadallUser = function (callback) {

        var sql = 'SELECT  * FROM users';

        db.query(sql, function (err, data) {
            if (err) { console.error(err); }

            callback(err, data);
        });
    };


    this.searchUser = function (user, callback) {
        db.query('SELECT username FROM users WHERE username like ?','%' + user + '%', function(err, data) {

            if (err) { console.error(err); }

            callback(err, data);
        });

    };

    this.loadUser = function (user, callback) {

        db.query('SELECT * FROM users WHERE username = ?',[user], function (err, data) {

            if(err){ console.error(err);}

            callback(err, data);
        });

    };

    this.UpdatePosition = function (user, value, callback) {
        
        var dataUpdate = {

            Position : value,
        }
        
        db.query("UPDATE users set ? WHERE username = ? ",[dataUpdate,user], function (err, data) {
            
            if (err) { console.error(err); }
            
            callback(err, data);
        });

    };


}

module.exports = new datasetup;

