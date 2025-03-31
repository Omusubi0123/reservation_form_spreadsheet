// フォームの予約日時のプルダウンボタンを更新するスクリプト
const FORM_ID = "1Og...KS4"; // 予約フォームのID 各自の環境に合わせて変更すること
const DAYTIME_BUTTON_TITLE = "予約日時";
const RESERVE_STATUS_HEADER = "予約の空き状況";
const STAGE_DAYTIME = ["5月4日(土) 12:40 ~ 15:10", "5月4日(土) 17:50 ~ 20:20", "5月5日(日) 10:00 ~ 12:30", "5月5日(日) 14:40 ~ 17:10"]; // 予約可能なステの日（フォームと同一のものを記入すること）

function updateStageSelectButton() {
  var status = return_capacity_level_and_left_num();
  var reserve_status = status[0];
  var left_num = status[1];
  Logger.log(reserve_status);
  Logger.log(left_num);

  var form = FormApp.openById(FORM_ID);
  var section_headers = form.getItems(FormApp.ItemType.SECTION_HEADER);
  for (var i=0; i<section_headers.length; i++) {
    if (section_headers[i].getTitle() == RESERVE_STATUS_HEADER) {
      var section_header = section_headers[i];
      break;
    }
  }

  var pulldown_items = form.getItems(FormApp.ItemType.LIST);
  var section_header_description = "\n〇：充分空きあり  △：残りわずか  ×：満席\n\n";
  for (var i=0; i<pulldown_items.length; i++) {
    if (pulldown_items[i].getTitle() == DAYTIME_BUTTON_TITLE) {
      var display_choices = []
      for (var j=0; j<STAGE_DAYTIME.length; j++) {
        if (reserve_status[j] == "〇") {
          display_choices.push(STAGE_DAYTIME[j]);
          section_header_description += `${STAGE_DAYTIME[j]}    状況：${reserve_status[j]}\n`;
        } else if (reserve_status[j] == "△") {
          display_choices.push(STAGE_DAYTIME[j]);
          section_header_description += `${STAGE_DAYTIME[j]}    状況：${reserve_status[j]} (残席${left_num[j]})\n`;
        } else if (reserve_status[j] == "×") {
          section_header_description += `${STAGE_DAYTIME[j]}    状況：${reserve_status[j]}\n`;
        }
      }
      Logger.log(display_choices);
      pulldown_items[i].asListItem().setChoiceValues(display_choices);
      section_header.asSectionHeaderItem().setHelpText(section_header_description);
      break;
    }
  }
}

function return_capacity_level_and_left_num() {
  var total_num_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RESERVE_TOTAL_SHEETNAME);

  var reserve_statas = [];
  var left_num = [];
  for (var i=0; i<Object.keys(STAGE_NUM_DICT).length; i++) {
    var stage_sheetname = Object.keys(STAGE_NUM_DICT)[i];
    var max_people_count = parseInt(total_num_sheet.getRange(STAGE_NUM_DICT[stage_sheetname] + 1, MAX_PEOPLE_NUM_INDEX).getValues());
    var left_people_count = parseInt(total_num_sheet.getRange(STAGE_NUM_DICT[stage_sheetname] + 1, LEFT_PEOPLE_NUM_INDEX).getValues());
    Logger.log(`${max_people_count} ${left_people_count}`);

    left_num.push(left_people_count);
    if ((left_people_count / max_people_count) > 0.15) {
      reserve_statas.push("〇");
    } else if (left_people_count <= 0) {
      reserve_statas.push("×");
    } else {
      reserve_statas.push("△");
    }
  }

  return [reserve_statas, left_num];
}

