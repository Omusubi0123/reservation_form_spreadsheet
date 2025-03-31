const RESERVED_PEOPLE_COLUMN = "予約人数";

function assessSubmittedReservation(column_data, submitted_data) {
  // 予約人数と残席数に矛盾がないか（予約が成功するか）判定
  // 矛盾なし-> true, 矛盾アリ -> false
  var total_num_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RESERVE_TOTAL_SHEETNAME);

  var reserved_daytime = "";
  var reserve_people_count = 0;
  for (var i=0; i<column_data.length; i++) {
    if (column_data[i] == RESERVED_DAYTIME_COLUMN) {
      reserved_daytime = submitted_data[i];
    }
    if (column_data[i] == RESERVED_PEOPLE_COLUMN) {
      reserve_people_count = parseInt(submitted_data[i][0]);
    }
  }

  var stage_num = STAGE_NUM_DICT[STAGE_NAME_DICT[reserved_daytime]];
  var left_people_count = parseInt(total_num_sheet.getRange(stage_num + 1, LEFT_PEOPLE_NUM_INDEX).getValues());

  Logger.log(`${reserve_people_count} ${left_people_count}`);

  if (reserve_people_count <= left_people_count) {
    return true;
  } else {
    return false;
  }
}
