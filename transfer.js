var SOURCE_FOLDER = "migration-source";
var SOURCE_EMAIL = "Change@Here";

var DESTINATION_FOLDER = "migratition-destination";

var log = (function() {
  var sheet = SpreadsheetApp.getActiveSheet();

  // Initialize
  if(sheet.getRange(1, 1).getValue().toString() !== 'documentId') {
    sheet.clear();
    sheet.getRange('A1:D1').setValues([
        ['documentId', 'documentName', 'Source URL', 'STATUS']
    ]);
  }

  return function(file, status, message) {
    message = message || "";
    sheet.appendRow([
        file.getId(),
        file.getName(),
        file.getUrl(),
        status,
        message
    ]);
  };
})();

var copied = (function() {
  var cp = {};

  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getDataRange();
  var values = range.getValues();

  for (var row = 1; row < values.length; row++) {
    cp[values[row][0].toString()] = true;
  }

  return cp;
})();


function main () {
  var dest = destinationFolder();

  var folders = DriveApp.searchFolders('title = "' + SOURCE_FOLDER + '" and "' + SOURCE_EMAIL + '" in owners');
  while (folders.hasNext()) {
    var folder = folders.next();
    copy(folder, dest);
    break;
  }

  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow(['Done!']);
}

function destinationFolder() {
  var destFolderDir = null;

  var folders = DriveApp.searchFolders('title = "' + DESTINATION_FOLDER + '" and "' + Session.getUser().getEmail() + '" in owners');
  while (folders.hasNext()) {
    destFolderDir = folders.next();
    break;
  }

  destFolderDir = destFolderDir || DriveApp.getRootFolder().createFolder(DESTINATION_FOLDER);

  return destFolderDir;
}

function copy (srcDir, destDir) {
  var files = srcDir.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    if(file.getOwner().getEmail().toLowerCase() !== SOURCE_EMAIL.toLowerCase()) continue;
    if(copied[file.getId()]) continue; // already copied

    var tryCount = 1;
    while(1) {
      try {
        file.makeCopy(file.getName(), destDir);
        log(file, "OK");
        break;
      } catch (error) {
        if(tryCount++ > 3) {
          log(file, "NG", "Copy Manually");
          break;
        } else {
          Logger.log(file.getName());
          Logger.log(error.message);
        }
        Utilities.sleep(1000);
      }
    }
  }

  var dirs = srcDir.getFolders();
  while (dirs.hasNext()) {
    var src = dirs.next();

    if(copied[src.getId()]) continue;

    var dest = (function () {
      var itr = destDir.getFoldersByName(src.getName());
      while(itr.hasNext()) {
        return itr.next();
      }
    })() || destDir.createFolder(src.getName());

    copy(src, dest)
      log(src, "OK");
  }
}
