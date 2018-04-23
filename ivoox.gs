function ivoox() {

var agent = '"iVoox/2.203 (Linux; Android 6.0; Scale/1.0)"';
var url  = "http://api.ivoox.com/1-1/?function=getSuscriptionAudios&format=json&session=888888888888";

var headers = {
    'User-Agent': agent,
    'Accept-Encoding': 'gzip',
    'accept-language': 'es-ES',
    'Connection': 'Keep-Alive',}

var options = {
    'method' : 'post',
    'headers' : headers };
  
var i = 0;

while (1){
	var response = UrlFetchApp.fetch( url , options );
    if (response.getResponseCode() == 200 || i > 9) { break ;}
    i += 1
    Utilities.sleep(2000*i);
    //console.log(response);
}  
  var ss = SpreadsheetApp.openById("1Rzikpj5xl5EWyII0Ie7i8gwLVBXI7q717imqynHUMQM");
  var sheet = ss.getSheetByName("hoja1");
  var pasteSheet = ss.getSheetByName("hoja2");
  
  var dataAll = JSON.parse(response.getContentText()); //
  var dataSet = dataAll;
  var rows = [],data;
 
  for (i = 0; i < dataSet.length; i++) {
    data = dataSet[i];
    rows.push([data.podcasttitle, data.datetext, data.id, data.file ]); //your JSON entities here
  }

  dataRange = sheet.getRange(1, 1, rows.length, 4); // 3 Denotes total number of entites
  dataRange.setValues(rows);
  
  var range = sheet.getRange("A1:C23");
  var values = sheet.getDataRange().getValues();
  for (var i=0 ; i<values.length ; i++){
    
    if (values[i][1] == "Hoy" || values[i][1] == "hace 1 día" ) {  
      
      var source = sheet.getRange(i+1,3,1,1);
      var destination = pasteSheet.getRange(pasteSheet.getLastRow()+1,1);
      var yades = pasteSheet.getDataRange().getValues();
      
      var encontrado = 0;for (var j=0 ; j<yades.length ; j++){ if (yades[j][0] == values[i][2] )  { encontrado = 1; }
                                                              
                                                             }  
      if (encontrado == 0 ) {
        source.copyTo(destination);     
        telegram(values[i][0]);
        //telegram(values[i][3]);//console.log(values[i][2]);
        telegram((sheet.getRange(i+1,4,1,1)).getValue()); 
        
      }
      
                                                                }

} // for todos los episodios en la lista de subcripcion
  
} //

function telegram(msg){
  
TOKEN = '000000000:AAH-1mZ3C-000000000000000000000000000';
BASE_URL = 'https://api.telegram.org/bot' + TOKEN + '/';

 var formData = {'chat_id': '00000000','text': msg };
 var options = {'method' : 'post','payload' : formData };
 UrlFetchApp.fetch(BASE_URL + 'sendMessage', options);
    
  return
};


function acraCleanup() {
  var ss = SpreadsheetApp.openById("1Rzikpj5xl5EWyII0Ie7i8gwLVBXI7q717imqynHUMQM");
  var pasteSheet = ss.getSheetByName("hoja2");
  var rowsToKeep = 50; //CHANGE TO YOUR DESIRED NUMBER OF ROWS TO KEEP. 
  var rows = pasteSheet.getLastRow(); 
  var numToDelete = rows - rowsToKeep  -1; 
  pasteSheet.deleteRows(2, numToDelete); 
} 
