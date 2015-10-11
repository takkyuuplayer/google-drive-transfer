var SOURCE_FOLDER = "migration-source";
var SOURCE_EMAIL = "source@gmail.com";

var DESTINATION_FOLDER = "migratition-destination";

var log = (function() {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.deleteRows(2, sheet.getLastRow()-1);
  sheet.getRange('A1:D1').setValues([
      ['documentId', 'documentName', 'Source URL', 'STATUS']
  ]);

  var curRow = 2;
  return function(file, status, message) {
    message = message || "";
    sheet.appendRow([
        file.getId(),
        file.getName(),
        file.getUrl(),
        status,
        message
    ]);
    curRow++;
  };
})();


function main () {
  var dest = destinationFolder();

  var folders = DriveApp.searchFolders('title = "' + SOURCE_FOLDER + '" and "' + SOURCE_EMAIL + '" in owners');
  while (folders.hasNext()) {
    var folder = folders.next();
    copy(folder, dest);
    break;
  }
}

function destinationFolder() {
  var destFolderDir = null;

  var folders = DriveApp.searchFolders('title = "' + DESTINATION_FOLDER + '" and "' + SOURCE_EMAIL + '" in owners');
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

    var tryCount = 1;
    while(1) {
      try {
        file.makeCopy(file.getName(), destDir);
        log(file, "OK");
        break;
      } catch (error) {
        if(tryCount++ > 3) {
          log(file, "NG", error.message);
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
    var dest = destDir.createFolder(src.getName());
    copy(src, dest)
  }
}
