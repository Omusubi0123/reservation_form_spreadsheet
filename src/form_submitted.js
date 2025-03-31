// スプシの該当する列名と，予約成功可否の列インデックス(int)
const RESERVE_STATUS_SHEETNAME = "予約状況";
const RESERVE_SUCCESS_FAILURE_COLUMN_INDEX = 12

function formSubmitted() {
  // 予約フォームが送信されたときにもろもの処理を行う
  // 絶対する処理：予約成否のメール送信
  // 予約成功の場合にする処理：予約ステのシートに情報追加、残席数更新、フォームの残席説明・選択可能ステ更新

  sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RESERVE_STATUS_SHEETNAME);
  // タイムスタンプの列は取得しない
  var column_data = sheet.getRange(1, 2, 1, sheet.getLastColumn()).getValues()[0];
  var submitted_data = sheet.getRange(sheet.getLastRow(), 2, 1, sheet.getLastColumn()).getValues()[0];
  
  var is_capacity_availabale = assessSubmittedReservation(column_data, submitted_data);

  if (!is_capacity_availabale) {
    sendEmailCapacityOver(column_data, submitted_data);
    sheet.getRange(sheet.getLastRow(), RESERVE_SUCCESS_FAILURE_COLUMN_INDEX).setValue("失敗(残席超過申し込み)");
  } else {
    sendEmailSuccess(column_data, submitted_data);
    sheet.getRange(sheet.getLastRow(), RESERVE_SUCCESS_FAILURE_COLUMN_INDEX).setValue("成功");

    var stage_sheetname = updateReservedStageSheet(column_data, submitted_data);

    updateRemainingSeats(stage_sheetname);

    updateStageSelectButton();
  }
}

