var SOURCE_FOLDER = "migration-source";
var SOURCE_EMAIL = "source@gmail.com";

var DESTINATION_FOLDER = "migratition-destination";


function main () {
  var dest = destinationFolder();

  var folders = DriveApp.searchFolders('title = "' + SOURCE_FOLDER + '" and "' + SOURCE_EMAIL + '" in owners');
  while (folders.hasNext()) {
    var folder = folders.next();
    copy(folder, dest);
    break;
  }
}

function copy (srcDir, destDir) {
  var files = srcDir.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    if(file.getOwner().getEmail().toLowerCase() !== SOURCE_EMAIL.toLowerCase()) continue;

    try {
      file.makeCopy(file.getName(), destDir);
    } catch (error) {
      Logger.log("Copy failure: " + file.getName() + " !!!!");
      Logger.log(error.message);
    }
  }

  var dirs = srcDir.getFolders();
  while (dirs.hasNext()) {
    var src = dirs.next();
    var dest = destDir.createFolder(src.getName());
    copy(src, dest)
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

