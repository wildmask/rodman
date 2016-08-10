var express = require('express');

function Home(){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	});

	connection.query('use rodman');



	this.get = function(name, callback){

		var data = [name];

		var sql = "select * from home where name=? ";
		
		connection.query(sql, data, function(err, res){
			callback(res);
		});
	}

	this.getall = function(name, callback){

		var sql = "select * from home";
		console.log(sql);
		connection.query(sql, function(err, res){
			callback(res);
		});
	}


	this.update = function(para, callback){

		var data = [para.content, para.name];

		var sql = "update home set content = ? where name=?";
		
		connection.query(sql, data, function(err, res){
			callback(res);
		});
	}

}

module.exports = Home;
