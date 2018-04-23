
// Direccion de esta aplicacion: https://script.google.com/macros/s/AKfycbzfcsvynjbxDbYmX4I8DlM778HRGqHWI7cNlw29hlBaeFtxrsw/exec

function doPost(e) {
  
  var jsonString = e.postData.getDataAsString();
  var Data = JSON.parse(jsonString);
  
  // logstuff(e.postData,Data);
  
  var update_id = Data['update_id']
  var message = Data['message']
  var message_id = message['message_id']
  var date = message['date']
  var text = message['text']
  var fr = message['from']
  var chat = message['chat']
  var chat_id = chat['id']
  
  
  // var url = "https://s6a99m0aklc7.runscope.net";
  // var url = "https://script.google.com/macros/s/AKfycbyAVxHto9RcjyTuOBmzRSQj_41vJ-KXZA49GQGvi-A3N8_3I-Ju/exec";
  
  var url = "https://maker.ifttt.com/trigger/button_pressed/with/key/bZrp68OaJ5RIodflLh9c26" ;
  
  var headers = { "Accept":"application/json", 
                  "Content-Type":"application/json", };
              
  var Data2 =  { "value1" : text, "value2" : chat_id, "value3" : date } 
  
  
  var payload = JSON.stringify(Data2);
  
    
  var options =
      {
        "method"  : "POST",
        "contentType" : "application/json",
        "headers": headers,
        "payload" : payload,   
        "followRedirects" : true,
        "muteHttpExceptions": true
      };
  
  var result = UrlFetchApp.fetch(url, options);
  
  if (result.getResponseCode() == 200) {
    
    var params = JSON.parse(result.getContentText());
    
    logstuff(params,result); }
  
  
  
  }



function logstuff(value1,value2){
  var sheet = SpreadsheetApp.openById('1ptiWXo6XrgExbZP8mDk0TjJrfSbjAUbIEueb3vab15c').getSheetByName('hook');
  var row = sheet.getLastRow();
  row = row + 1;
  Logger.log('Row = ' + row);
  sheet.getRange('A' + row).setValue(value1);
  sheet.getRange('B' + row).setValue(value2);
  return;
}
