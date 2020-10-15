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
        host : 'ec2-75-101-232-85.compute-1.amazonaws.com',
        user : 'apumfwxtqagijr',
        password : '9c89090f232d9d780eb4339f64dd37fc16ebb2faaaf908990aaca3990c89703b',
        database : 'd2rb8tqkehgloj',
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

