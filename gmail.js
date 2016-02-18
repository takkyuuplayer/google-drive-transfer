var FORWARD_TO = 'destination@gmail.com';

function main() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getDataRange();
  var values = range.getValues();

  for (var row = 0; row < values.length; row++) {
    var rfcId = values[row][0].toString().replace(/^</, '').replace(/>$/, '');

    if (sheet.getRange(row + 1, 2).getValue() === 'OK') {
      continue;
    }

    var threads = GmailApp.search('rfc822msgid:' + rfcId);
    var statusRange = sheet.getRange(row + 1, 2, 1, 2);
    if (threads.length == 0) {
      statusRange.setValues([
        ['NG', 'mail not found. rfc822msgid:' + rfcId]
      ]);
      continue;
    }

    var msgLength = 0;
    for (var i = 0; i < threads.length; i++) {
      var thread = threads[i];
      var messages = thread.getMessages();
      msgLength += messages.length;

      for (var j = 0; j < messages.length; j++) {
        messages[j].forward(FORWARD_TO);
      }
    }
    statusRange.setValues([
      ['OK', 'threads = ' + threads.length + ', messages = ' + msgLength]
    ]);
  }
}
