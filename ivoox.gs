function myFunction() {

var agent = '"iVoox/2.203 (135) (Linux; Android 6.0; Scale/1.0)"';
var url  = "http://api.ivoox.com/1-1/?function=getSuscriptionAudios&format=json&session=00000000000000";

var headers = {
    'User-Agent': agent,
    'Accept-Encoding': 'gzip',
    'accept-language': 'es-ES',
    'Connection': 'Keep-Alive',
}
var options = {'method' : 'post','headers' : headers };
  
var i = 0;

while (1){
	var response = UrlFetchApp.fetch( url , options );
    if (response.getResponseCode() == 200 || i > 9) { break ;}
    i += 1
    Utilities.sleep(2000*i);
    //console.log(response);
}  
  //var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ss = SpreadsheetApp.openById("1Rzikpj5xl5EWyII0Ie7i8gwLVBXI7q717imqynHUMQM");
  var sheets = ss.getSheets();
  var sheet = ss.getActiveSheet();
  var dataAll = JSON.parse(response.getContentText()); //
  var dataSet = dataAll;
  var rows = [],data;
 
  for (i = 0; i < dataSet.length; i++) {
    data = dataSet[i];
    rows.push([data.podcasttitle, data.datetext, data.file]); //your JSON entities here
  }

  dataRange = sheet.getRange(1, 1, rows.length, 3); // 3 Denotes total number of entites
  dataRange.setValues(rows);
  
  var range = sheet.getRange("A1:C23");
  var values = sheet.getDataRange().getValues();
  for (var i=0 ; i<values.length ; i++){
    
    if (values[i][1] == "Hoy" && values[i][3] != "Enviado"){
     sheet.getRange(i+1,4).setValue('Enviado');
     telegram(values[i][0]);//console.log(values[i][0]);
     telegram(values[i][2]);//console.log(values[i][2]);
    }

}

};


function telegram(msg){
  
TOKEN = '000000000:AAH-1mZ3C-haAQAWqh4GvCZjhgjkff';
BASE_URL = 'https://api.telegram.org/bot' + TOKEN + '/';

 var formData = {'chat_id': '000000','text': msg };
 var options = {'method' : 'post','payload' : formData };
 UrlFetchApp.fetch(BASE_URL + 'sendMessage', options);
    
  return
}

function limpieza(){
  var ss = SpreadsheetApp.openById("1Rzikpj5xl5EWyII0Ie7i8gwLVBXI7q717imqynHUMQM");
  var sheets = ss.getSheets();
  var sheet = ss.getActiveSheet();
  
sheet.getRange(1,4,60,1).setValue('');
}
