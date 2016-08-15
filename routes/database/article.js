var express = require('express');

function Article(){
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
			callback(res);
		});
	}

	this.get = function(article_id, callback){
		console.log(article_id);
		var data = [article_id];
		var sql = "select * from article where article_id = ?";
		connection.query(sql, data, function(err, res){
			callback(res);
		});
	}


	this.getList = function(time, callback){

		var sql = "select * from article order by post_time desc";
		connection.query(sql, function(err, res){
			callback(res);
		});
	}


	this.update = function(article, callback){
		var data = [article.title, article.content, article.summary, article.key_word, article.article_id];
		var sql = "update article set title=?, content=?, summary=?, key_word=? where article_id=?";
		connection.query(sql, data, function(err,res){
			callback(res);
		});
	}

	this.delete = function(article, callback){
		var data = [article.article_id];
		console.log(data);
		var sql = "delete from article where article_id=?";
		console.log(sql);
		connection.query(sql, data, function(err,res){
			callback(res);
		});
	}


	this.create = function(article, callback){
		var data = ['hello', 'test'];
		var sql = "insert into article (title, content) values (?, ?)";
		connection.query(sql, data, function(err,res){
			callback(res);
		});
	}

	this.readCountInc = function(article_id, callback){
		var data = [article_id];
		var sql = "update article set read_count = read_count+1 where article_id=?";
		connection.query(sql, data, function(err,res){
			callback(res);
		});
	}

	this.commentCountInc = function(article_id, callback){
		var data = [article_id];
		var sql = "update article set comment_count = comment_count+1 where article_id=?";
		connection.query(sql, data, function(err,res){
			callback(res);
		});
	}

	this.setStatus = function(article, callback){
		var data = [article.status, article.article_id];
		console.log(data);
		var sql = "update article set status = ? where article_id=?";
		connection.query(sql, data, function(err,res){
			callback(res);
		});
	}

}

module.exports = Article;
