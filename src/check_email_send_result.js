// 参考：https://zenn.dev/rabee/articles/gas-bounce-mail-check
// 不明なメールアドレスをチェック
// 未完成
// スレッドというのが良く分からない
// 送信失敗メール検知してどう処理する？
const EMAIL_CHECK_MINUTE=15;

function checkBouncedEmails(email) {
  // GmailAppを使って、バウンスしたメールを含むスレッドを取得
  var threads = GmailApp.search('from:(mailer-daemon@googlemail.com)');

  if (!threads.length) return ;
  
  // 各スレッドをループします(最新で１件にしてますが、自由に変更してOKです)
  // 全件の場合は threads.length を使用する
  for (var i = 0; i < threads.length; i++) {
    // スレッド内のメッセージを取得
    Logger.log(threads[i].getFirstMessageSubject());
    var messages = threads[i].getMessages();
    
    // 各メッセージをループします
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];

      // メールの本文を取得します
      var body = message.getPlainBody();

      // メールの日付を取得し、JST（日本時間）に変換
      var date = message.getDate();
      date = new Date(date.getTime() + (9 * 60 * 60 * 1000));

      // 現在の日付と時間を取得し、JSTに変換
      var now = new Date();
      Logger.log(now.getTime());
      now = new Date(now.getTime() + (9 * 60 * 60 * 1000));
      Logger.log(now.getTime() - date.getTime());
      Logger.log(EMAIL_CHECK_MINUTE * 60 * 1000);
      Logger.log(body);

      // 5分以内のメールをチェック
      if (now.getTime() - date.getTime() <= EMAIL_CHECK_MINUTE * 60 * 1000) {
        // メールの本文に特定のフレーズと送信したメールアドレスが含まれているかをチェック
        if ((body.includes('アドレス不明') && body.includes('配信されませんでした')) || body.includes('メールはブロックされました。')) {
          // メールの本文を改行で分割し、最初の7行を取得
          var lines = body.split('\n');
          var firstLines = lines.slice(0, 7).join('\n');
          // ここで行いたい処理を記述
          Logger.log(body)
          Logger.log(firstLines)
        }
      }
    }
  }
}
