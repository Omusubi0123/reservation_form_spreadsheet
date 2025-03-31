const RESERVED_DAYTIME_COLUMN = "予約日時";
const STAGE_1 = "1ステ";
const STAGE_2 = "2ステ";
const STAGE_3 = "3ステ";
const STAGE_4 = "4ステ";
const STAGE_NAME_DICT = {
  "5月4日(土) 12:40 ~ 15:10": STAGE_1,
  "5月4日(土) 17:50 ~ 20:20": STAGE_2,
  "5月5日(日) 10:00 ~ 12:30": STAGE_3,
  "5月5日(日) 14:40 ~ 17:10": STAGE_4
};

function updateReservedStageSheet(column_data, submitted_data) {
  // 予約されたステのシートに予約者情報を追加
  var reserved_daytime = "";
  for (var i=0; i<column_data.length; i++) {
    if (column_data[i] == RESERVED_DAYTIME_COLUMN) {
      reserved_daytime = submitted_data[i];
      break;
    }
  }
  var stage_sheetname = STAGE_NAME_DICT[reserved_daytime];

  var stage_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(stage_sheetname);
  var last_row_index = stage_sheet.getLastRow();
  for (var i=0; i<submitted_data.length; i++) {
    stage_sheet.getRange(last_row_index + 1, i + 1).setValue(submitted_data[i]);
  }

  return stage_sheetname;
}
