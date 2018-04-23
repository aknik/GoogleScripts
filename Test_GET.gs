function testGET() {
  
  //var queryString = "?name=labnol&blog=ctrlq&type=get";
  
  //var url = ScriptApp.getService().getUrl() + queryString;
  
  var url = "https://s6a99m0aklc7.runscope.net/";
  var options =
      {
        "method"  : "GET",   
        "followRedirects" : true,
        "muteHttpExceptions": true,
      };
    
  var result = UrlFetchApp.fetch(url, options);
  
  if (result.getResponseCode() == 200) {
    
    var params = JSON.parse(result.getContentText());
    
    Logger.log(params.name);
    Logger.log(params.blog);
    
  }  
}
