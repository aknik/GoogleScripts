function ivoox() {

// '"iVoox/2.203 (Linux; Android 6.0; Scale/1.0)"';
var agent =  "ivooxApp/2.204_176 (MI 3W Build/KTU84P; Android 5.1.1; d:1000; KTU84P) ";
var url  = "http://api.ivoox.com/1-1/?function=getSuscriptionAudios&format=json&session=457475445745";

var headers = {
    'User-Agent': agent,
    'Accept-Encoding': 'gzip',
    'accept-language': 'es-ES',
    'user-lang': 'spa' ,
    'user-country': 'ES', 
    'Connection': 'Keep-Alive'}

var options = {
    'method' : 'post',
    'headers' : headers };
  
var i = 0;

while (1) {
  try {
    var response = UrlFetchApp.fetch( url , options );
    Logger.log('Response Code: ' + response.getResponseCode());

    if(response.getResponseCode() == 200) {
      break ;
    }
  } catch (err) {
      Utilities.sleep(20000);
  }

}  
  
  var ss = SpreadsheetApp.openById("fgdfgdfgdfgdfgerhvbghftfjfghsgdfhetreryetyytry");
  var sheet = ss.getSheetByName("hoja1");
  var pasteSheet = ss.getSheetByName("hoja2");
  
  var dataSet = JSON.parse(response.getContentText()); //
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
  
TOKEN = '34534534534:AAH-1mZ3C-9999999999999999999999';
BASE_URL = 'https://api.telegram.org/bot' + TOKEN + '/';

 var formData = {'chat_id': '9999999','text': msg };
 var options = {'method' : 'post','payload' : formData };
 UrlFetchApp.fetch(BASE_URL + 'sendMessage', options);
    
  return
};


function acraCleanup() {
  var ss = SpreadsheetApp.openById("99999999999999999999999999999999999");
  var pasteSheet = ss.getSheetByName("hoja2");
  var rowsToKeep = 22; //CHANGE TO YOUR DESIRED NUMBER OF ROWS TO KEEP. 
  var rows = pasteSheet.getLastRow(); 
  if (rows > rowsToKeep) {
  var numToDelete = rows - rowsToKeep  -1; 
  pasteSheet.deleteRows(2, numToDelete); 
  } 
};
