/**
 * Created by Administrator on 2017-05-19.
 */


exports.getCode = function () {

}


var https = require('https');
var querystring = require('querystring');

var postData = {
  mobile:'13761428267',
  message:'验证码:28261【铁壳测试】'
};

var content = querystring.stringify(postData);

var options = {
  host:'sms-api.luosimao.com',
  path:'/v1/send.json',
  method:'POST',
  auth:'api:key-12312389d10fe16c98896ced5a09945188',
  agent:false,
  rejectUnauthorized : false,
  headers:{
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Content-Length' :content.length
  }
};

var req = https.request(options,function(res){
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log(JSON.parse(chunk));
  });
  res.on('end',function(){
    console.log('over');
  });
});

req.write(content);
req.end();