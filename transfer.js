var SOURCE = "migration-source";
var DESTINATION = "migratition-";

var EMAIL = "migration_source@gmail.com";

function main () {
  var destRootDir = DriveApp.getRootFolder().createFolder(DESTINATION + Math.floor( new Date().getTime() / 1000 ));

  var folders = DriveApp.searchFolders('title = "' + SOURCE + '" and "' + EMAIL + '" in owners');
  while (folders.hasNext()) {
    var folder = folders.next();
    Logger.log(folder.getName())
      copy(folder, destRootDir);
    break;
  }

  Logger.log("Done!!");
}

function copy (srcDir, destDir) {
  var files = srcDir.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    if(file.getOwner().getEmail() !== EMAIL) continue;

    Logger.log("Copying " + file.getName() + " .....");
    file.makeCopy(file.getName(), destDir);
  }

  var dirs = srcDir.getFolders();
  while (dirs.hasNext()) {
    var src = dirs.next();
    if (src.getId() === destDir.getId()) continue;

    var dest = destDir.createFolder(src.getName());
    copy(src, dest)
  }
}
