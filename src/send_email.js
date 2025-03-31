const MAIL_ADDRESS_COLUMN = "メールアドレス";
const REPRESENTATIVE_NAME_COLUMN = "お名前（代表者）";

function sendEmailSuccess(column_data, submitted_data) { 
  // 予約に成功した場合
  // 提出されたフォームデータから確認メールを送信
  var dict = merge_list_to_dict(column_data, submitted_data);

  var subject = 'UTESS Drama Section Spring Production 2024 "Into The Woods" ご予約確定のお知らせ';
  
  var email = dict[MAIL_ADDRESS_COLUMN];
  // var from = "essdrama24producer@gmail.com"
  var from = "izawa-yoshihiro146@g.ecc.u-tokyo.ac.jp"
  var body = header_body_success(dict);
  body += form_data_to_body(dict, true);
  body += play_description();
  body += footer_body();
  
  GmailApp.sendEmail(email, subject, "", {htmlBody: body, from: from});
  Logger.log(body);
}

function sendEmailCapacityOver(column_data, submitted_data) {
  // 予約に失敗した場合（予約人数が残席を超えた）
  // 提出されたフォームデータから確認メールを送信
  var dict = merge_list_to_dict(column_data, submitted_data);

  var subject = 'UTESS Drama Section Spring Production 2024 "Into The Woods" ご予約残席不足のお知らせ';
  var email = dict[MAIL_ADDRESS_COLUMN];
  var from = "essdrama24producer@gmail.com"
  var body = header_body_failure(dict);
  body += form_data_to_body(dict, false);
  body += footer_body();

  GmailApp.sendEmail(email, subject, "", {htmlBody: body, from: from});
  Logger.log(body);
}


function merge_list_to_dict(column_data, submitted_data) {
  var dict = {}
  for (var i=0; i<column_data.length; i++) {
    if (submitted_data[i] != '') {
      dict[column_data[i]] = submitted_data[i];
    }
  }
  return dict;
}

function form_data_to_body(dict, result) {
  var body = "<p>----------------------------------------------<br>";
  body += `【ご予約日時】：${dict['予約日時']}<br>`;
  if (result) {
    body += "※受付開始・開場は30分前となっております。<br>";
  }
  body += `【お名前】：${dict['お名前（代表者）']}<br>`;
  body += `【メールアドレス】：${dict['メールアドレス']}<br>`;
  body += `【電話番号】：${dict['電話番号']}<br>`;
  body += `【所属】：${dict['ご所属']}<br>`;
  body += `【人数】：${dict['予約人数']}<br>`;

  var companion = ['同行者名1', '同行者名2', '同行者名3', '同行者名4']
  for (var i=0; i<companion.length; i++) {
    if (dict[companion[i]]) {
      body += `【${companion[i]}】：${dict[companion[i]]}<br>`;
    }
  }
  body += "----------------------------------------------</p>";
  return body;
}

function header_body_success(dict) {
  var body = `<p>${dict[REPRESENTATIVE_NAME_COLUMN]} 様<br><br>`;
  body += "この度は東京大学ESSドラマセクションSpring Production2024 “Into the Woods”へのご予約誠にありがとうございます。<br><br>";
  body += "お申し込みが完了しました。<br>";
  body += "以下にご予約の詳細を記載いたしますので、ご確認の上、ご来場賜りますようお願い申し上げます。<br>";
  body += "（キャンセル・変更の際は、essdrama24producer@gmail.com までご連絡ください。）<br><br></p>";
  return body;
}

function header_body_failure(dict) {
  var body = `<p>${dict[REPRESENTATIVE_NAME_COLUMN]} 様<br><br>`;
  body += "この度は東京大学ESSドラマセクションSpring Production2024 “Into the Woods”へのご予約誠にありがとうございます。<br><br>";
  body += "大変申し訳ありませんが、ご予約いただいた人数が公演の残りの席数を超えてしまいましたので、ご予約を受け付けることができませんでした。<br>まだ空席のある公演もございますので、もしご都合がよろしければそちらでの観劇をご検討ください。<br>";
  body += "お手数おかけして申し訳ありませんが、どうぞよろしくお願いいたします。<br></p>";
  return body;
}

function play_description() {
  var body = "<p>【劇場アクセス】<br>東京大学駒場キャンパス内 駒場小空間（多目的ホール）<br>";
  body += "京王井の頭線駒場東大前駅東口より徒歩10分<br>";
  body += "※駐車場などはございませんので、公共交通機関をご利用ください。<br><br>";
  body += "■ 本公演は入場無料・カンパ制となっております。受付開始・開場は開演の30分前です。日程・開演時刻等ご確認のうえ、会場へお越しください。<br>";
  body += "■ 開演5分前を過ぎるとお席をご用意できないことがございます。お早めにご来場ください。<br>";
  body += "■ 他のお客様の観劇の妨げとならないよう、途中入場は原則お断りしております。やむを得ない事情で開演に間に合わない場合は、その旨と到着予定時刻を本メール文下部のメールアドレス宛にご連絡ください。何卒ご理解・ご協力の程よろしくお願い申し上げます。<br>";
  body += "■ 当日の公演に際しご希望等がございましたら、お気軽にご連絡ください。<br><br>キャスト・スタッフ一同、ご来場いただくことを心よりお待ち申し上げております。<br><p>";
  return body;
}

function footer_body() {
  var body = "<p>*************************************************<br>";
  body += "東京大学 ESS drama section<br>";
  body += "Email: essdrama24producer@gmail.com<br>"
  body += "*************************************************</p>";
  return body;
}
