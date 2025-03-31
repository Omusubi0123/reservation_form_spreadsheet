// フォーム提出後，数秒（約4秒）以内に次の提出がされるとトリガーが発動しないエラーへの対応

function resend_email_check() {
  sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RESERVE_STATUS_SHEETNAME);
  // タイムスタンプの列は取得しない
  var column_data = sheet.getRange(1, 2, 1, sheet.getLastColumn()).getValues()[0];

  var numRows = sheet.getLastRow() - 1;
  Logger.log(numRows);
  var audience_data = sheet.getRange(2, 2, numRows, sheet.getLastColumn() - 1).getValues();
  for (var i=0;i<numRows;i++) {
    // メール送信列に成功も失敗も書かれていない（空欄の）場合
    if (audience_data[i][RESERVE_SUCCESS_FAILURE_COLUMN_INDEX-2] == "" && audience_data[i][0] != "") {
      Logger.log(audience_data[i][0])
      send_email(column_data, audience_data);
    }
  }
}
