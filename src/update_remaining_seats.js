const RESERVE_TOTAL_SHEETNAME = "予約合計人数";
const PEOPLE_COUNT_COLUMN_INDEX = 6

const MAX_PEOPLE_NUM_INDEX = 3;
const RESERVED_NUM_INDEX = 4;
const LEFT_PEOPLE_NUM_INDEX = 5;

const STAGE_NUM_DICT = {
  [STAGE_1]: 1,
  [STAGE_2]: 2,
  [STAGE_3]: 3,
  [STAGE_4]: 4,
}

function updateRemainingSeats(stage_sheetname) {
  var total_num_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RESERVE_TOTAL_SHEETNAME);
  var stage_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(stage_sheetname);

  // 予約されたステの予約合計人数を計算
  var last_row_index = stage_sheet.getLastRow();
  var values = stage_sheet.getRange(1, PEOPLE_COUNT_COLUMN_INDEX, last_row_index, 1).getValues();
  var people_count_list = values.slice(1).map(function(row) {
    // "n名"のnのみを抽出しintに変換して返却
    return parseInt(row[0][0]);
  });
  var total_count = 0;
  for (var i=0; i<people_count_list.length; i++) {
    total_count += people_count_list[i];
  }
  Logger.log(total_count);

  // 予約合計人数のシートの予約人数と残席を更新
  var max_people_count = total_num_sheet.getRange(STAGE_NUM_DICT[stage_sheetname] + 1, MAX_PEOPLE_NUM_INDEX).getValues();
  var left_people_count = parseInt(max_people_count) - total_count;

  total_num_sheet.getRange(STAGE_NUM_DICT[stage_sheetname] + 1, RESERVED_NUM_INDEX).setValue(total_count);
  total_num_sheet.getRange(STAGE_NUM_DICT[stage_sheetname] + 1, LEFT_PEOPLE_NUM_INDEX).setValue(left_people_count);
}

