var express = require('express');

// 修改返回的日期格式

function makeDate(date) {
    try {
        var newDate = new Date(date);
        //在小于10的月份前补0
        var month = eval(newDate.getMonth() + 1) < 10 ? '0'+eval(newDate.getMonth() + 1) : eval(newDate.getMonth() + 1);
        //在小于10的日期前补0
        var day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
        //在小于10的小时前补0
        var hours = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
        //在小于10的分钟前补0
        var minutes = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
        //在小于10的秒数前补0
        var seconds = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds(): newDate.getSeconds();
        //拼接时间
        var stringDate = newDate.getFullYear() + '-' + month + '-' + day + " " + hours + ":" + minutes + ":" + seconds;
    }catch(e){
        var stringDate = "0000-00-00 00:00:00";
    }finally{
        return stringDate;
    }

};


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
			console.log("res");
			console.log(res);
			callback(res);
		});
	}


	this.getList = function(time, callback){

		var sql = "select * from article order by post_time desc";
		connection.query(sql, function(err, res){
			for (i in res){
			  console.log(res[i].post_time);
			  res[i].post_time = makeDate(res[i].post_time);
			  console.log(res[i].post_time);

			}
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
