/**
 * AppsScript script to run in a Google Spreadsheet that synchronizes its
 * contents with a Fusion Table by replacing all rows.
 */

// Replace with your Fusion Table's ID (from File > About this table)
var TABLE_ID = '1pdfHL9o4zgmu-CUqGdJexd_wuRDbI-pTGK721lp8' ;

// First row that has data, as opposed to header information
var FIRST_DATA_ROW = 2;

// True means the spreadsheet and table must have the same column count
var REQUIRE_SAME_COLUMNS = false;

/**
 * Replaces all rows in the Fusion Table identified by TABLE_ID with the
 * current sheet's data, starting at FIRST_DATA_ROW.
 */
function sync() {

  copyInfo();
  
  var tasks = FusionTables.Task.list(TABLE_ID);
  // Only run if there are no outstanding deletions or schema changes.
  var sheet = SpreadsheetApp.getActiveSheet();
  if (tasks.totalItems == 0) {
    
    //var wholeSheet = sheet.getRange(1, 1, sheet.getLastRow(),sheet.getLastColumn());
    var wholeSheet = sheet.getRange(1, 1, 2 ,sheet.getLastColumn());
    var values = wholeSheet.getValues();
    
    if (values.length > 1) {
      var csvBlob = Utilities.newBlob(convertToCsv_(values),
          'application/octet-stream');
      FusionTables.Table.replaceRows(TABLE_ID, csvBlob,
         { isStrict: REQUIRE_SAME_COLUMNS, startLine: FIRST_DATA_ROW - 1 });
      Logger.log('Replaced ' + values.length + ' rows');
      
    }
  } else {
    Logger.log('Skipping row replacement because of ' + tasks.totalItems +
        ' active background task(s)');
  }
  
}


/**
 * Converts the spreadsheet values to a CSV string.
 * @param {Array} data The spreadsheet values.
 * @return {string} The CSV string.
 */
function convertToCsv_(data) {
  // See https://developers.google.com/apps-script/articles/docslist_tutorial#section3
  var csv = '';
  for (var row = 0; row < data.length; row++) {
    for (var col = 0; col < data[row].length; col++) {
      var value = data[row][col].toString();
      if (value.indexOf(',') != -1 ||
          value.indexOf('\n') != -1 ||
          value.indexOf('"') != -1) {
        // Double-quote values with commas, double quotes, or newlines
        value = '"' + value.replace(/"/g, '""') + '"';
        data[row][col] = value;
      }
    }
    // Join each row's columns and add a carriage return to end of each row
    // except the last
    if (row < data.length - 1) {
      csv += data[row].join(',') + '\r\n';
    }
    else {
      csv += data[row];
    }
  }
  return csv;
}

function removeEmptyRows(){

  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  var rowsDeleted = 0;
  for (var i = 0; i <= numRows - 1; i++) {
    var row = values[i];
    if (row[0] == 0 || row[0] == '') {
      sheet.deleteRow((parseInt(i)+1) - rowsDeleted);
      rowsDeleted++;
    }
  }
};
function copyInfo() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var copySheet = ss.getSheetByName("hoja1");
  var pasteSheet = ss.getSheetByName("hoja2");
  // get source range
  var source = copySheet.getRange(2,1,1,2);
  // get destination range
  var destination = pasteSheet.getRange(pasteSheet.getLastRow()+1,1);
  // copy values to destination range
  source.copyTo(destination);
  // clear source values
  // source.clearContent();
};

// Borra las 2000 lineas mas antiguas de la hoja2 , se ejecuta una vez al dia
function acraCleanup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var pasteSheet = ss.getSheetByName("hoja2");
  var rowsToKeep = 2000; //CHANGE TO YOUR DESIRED NUMBER OF ROWS TO KEEP. 
  var rows = pasteSheet.getLastRow(); 
  var numToDelete = rows - rowsToKeep  -1; 
  pasteSheet.deleteRows(2, numToDelete); 
} 
