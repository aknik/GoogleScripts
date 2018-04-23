
function xdoPost(e) {
  
  //var jsonString = e.postData.getDataAsString();
  //var Data = JSON.parse(jsonString);
  
  var Data = {"update_id":101513931,
           "message":{"message_id":9,"from":{"id":00000,
           "first_name":"El\u00edas","username":"000000"},
           "chat":{"id":6660201,"first_name":"El\u00edas","username":"0000"},
           "date":1435484730,"text":"\/help"}};
            
    
  // logstuff(Data);
  
  
  
  var update_id = Data['update_id']
  var message = Data['message']
  var message_id = message['message_id']
  var date = message['date']
  var text = message['text']
  var fr = message['from']
  var chat = message['chat']
  var chat_id = chat['id']
  
  
  
  // logstuff(message_id,date);
  
  logstuff(text,chat_id);
  
  
  
  
   //return ContentService.createTextOutput(JSON.stringify(e))
   // .setMimeType(ContentService.MimeType.JSON);

  
  

}

// Hace un log a la hoja de calculo y pagina elegida. Muy util par debug ;.)

function logstuff(value1,value2){
  var sheet = SpreadsheetApp.openById('1ptiWXo6XrgExbZP8mDk0TjJrfSbjAUbIEueb3vab15c').getSheetByName('hook');
  var row = sheet.getLastRow();
  row = row + 1;
  Logger.log('Row = ' + row);
  sheet.getRange('A' + row).setValue(value1);
  sheet.getRange('B' + row).setValue(value2);
  return;
}
