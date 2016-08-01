var express = require('express');

function Maker(){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	});

	connection.query('use rodman');


	this.test = function(maker, callback){

		var ret;

		var sql = "select * from test";
		
		connection.query(sql, function(err, res){
			if(!res){
				ret = {err:"注册成功", data:""};
				callback(ret);
			}else{
				ret = {err:"", data:""};
				callback(ret);
			}
		});
	}

}

module.exports = Maker;
