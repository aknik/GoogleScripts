function Delete_Old_Tweets() {

TWITTER_ACCESS_TOKEN    = '00000000-0000000000000000000000000000000000';
TWITTER_ACCESS_SECRET   = '00000000000000000000000000000000000000000000';
TWITTER_CONSUMER_KEY    =  '0000000000000000';
TWITTER_CONSUMER_SECRET = '00000000000000000000000000000000';
screen_name = "gggggg";
  
   sendTelegramNotification("00000000:AAH-1mZ3C-00000000000000000", "0000000", "Borrando tw ggggg");
  
 var props = PropertiesService.getScriptProperties();
  props.setProperties({
    TWITTER_CONSUMER_KEY: TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET: TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN: TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_SECRET: TWITTER_ACCESS_SECRET,
    MAX_TWITTER_ID: 0  
  });

  twit = new Twitter.OAuth(props);
 
  
   
  max_id = 0;
  
  var dias = 0;
  var destroy_count = 0;
  var tweets = user_timeline();
  var run_time = new Date();
  var tweet_date = new Date();
  var tweet_age = 1;
  
  while (tweets.length>1) {
    max_id = tweets[tweets.length-1].id_str ;
    for (var i=tweets.length-1; i>=0; i--) {
      tweet_date = new Date(tweets[i].created_at);
      tweet_age = (run_time-tweet_date)/1000/60/60/24;
      
      if (tweet_age >> dias)
      {
        destroy(tweets[i].id_str);
        
        Utilities.sleep(300);
                                   //logstuff(tweets[i].id_str,max_id);
        
        
        destroy_count+=1;
      }
      
                                         }
    
  tweets = user_timeline(max_id);
    
    
  }
  
  
}


//////// https://api.twitter.com/1.1/statuses/user_timeline.json?count=200

function user_timeline(max_id) {
  

var payload = '';
    
    twit.checkAccess();
    
  var options = {method:"GET", payload:payload};
  
  var status = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='+screen_name+'&count=200&trim_user=t';
  if (max_id >> 0) {status = status + "&max_id="+max_id };
    try {
        var result = twit.fetch(status, options);
        Logger.log("Fetch timeline success. Response was:\n" + result.getContentText("UTF-8") + "\n\n");
        //return JSON.parse(result.getContentText("UTF-8"));
        return JSON.parse(result);
    }
    catch (e) {
        Logger.log("Fetch timeline. Error was:\n" + JSON.stringify(e) + "\n\noptions were:\n" + JSON.stringify(options) + "\n\n");
        return {};
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function destroy (id ) {
    
    var payload = '';
    
    twit.checkAccess();
    
    var options = {method:"POST", payload:payload};
  var status = "https://api.twitter.com/1.1/statuses/destroy/"+id+'.json';
    try {
        var result = twit.fetch(status, options);
        Logger.log("Delete success:\n" + result.getContentText("UTF-8") + "\n\n");
        return JSON.parse(result.getContentText("UTF-8"));
    }
    catch (e) {
        Logger.log("Delete failure:\n" + JSON.stringify(e) + "\n\noptions were:\n" + JSON.stringify(options) + "\n\n");
        return null;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sendTelegramNotification(botSecret, chatId, body) {
var response = UrlFetchApp.fetch("https://api.telegram.org/bot" + botSecret + "/sendMessage?text=" + encodeURIComponent(body) + "&chat_id=" + chatId + "&parse_mode=HTML");
}  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function logstuff(value1,value2){
  var sheet = SpreadsheetApp.openById('1ptiWXo6XrgExbZP8mDk0TjJrfSbjAUbIEueb3vab15c').getSheetByName('hook');
  var row = sheet.getLastRow();
  row = row + 1;
  Logger.log('Row = ' + row);
  sheet.getRange('A' + row).setValue(value1);
  sheet.getRange('B' + row).setValue(value2);
  return;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// List propiedades y metodos de un objeto
// http://mjcarrascosa.com/listando-los-metodos-y-propiedades-de-un-objeto-en-javascript/
function inspeccionar(obj)
{
  var msg = '';

  for (var property in obj)
  {
    if (typeof obj[property] == 'function')
    {
      var inicio = obj[property].toString().indexOf('function');
      var fin = obj[property].toString().indexOf(')')+1;
      var propertyValue=obj[property].toString().substring(inicio,fin);
      msg +=(typeof obj[property])+' '+property+' : '+propertyValue+' ;\n';
    }
    else if (typeof obj[property] == 'unknown')
    {
      msg += 'unknown '+property+' : unknown ;\n';
    }
    else
    {
      msg +=(typeof obj[property])+' '+property+' : '+obj[property]+' ;\n';
    }
  }
  return msg;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
