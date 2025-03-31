function update_stage_remaining_and_select_button() {
  var stage_list = [STAGE_1, STAGE_2, STAGE_3, STAGE_4];
  for (var i=0; i<stage_list.length; i++) {
    var stage_sheetname = stage_list[i];
    updateRemainingSeats(stage_sheetname);
  }

  updateStageSelectButton();
}
