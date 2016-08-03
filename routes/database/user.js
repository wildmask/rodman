var express = require('express');

function User(){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	});

	connection.query('use rodman');


	this.test = function(user, callback){

		var ret;

		var data = [1];

		var sql = "select * from test";
		
		connection.query(sql, function(err, res){
			console.log(res);
			callback(res);
		});
	}


	this.login = function(user, callback){

		var ret;

		var data = [1];

		var sql = "select * from test";
		
		connection.query(sql, function(err, res){
			console.log(res);
			callback(res);
		});
	}

}

module.exports = User;
