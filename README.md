# google-drive-transfer

Copy ALL files/folders in `migration-source` to `migration-destination`

## How to use

### source@gmail.com

1. Create `migration-source` folder and move all documents to the folder
1. Share the folder to destination@gmail.com

### destination@gmail.com

1. Create new Google spreadsheet
1. Click `Menu > Tools > Script Editor`
1. Copy https://github.com/takkyuuplayer/google-drive-transfer/blob/master/transfer.js and change `SOURCE_EMAIL` to source@gmail.com
1. Click `Run > main`
1. Wait untill `Running function main...` finish
  * When error occur, re-run
  * Copy log is available on the spreadsheet
  * Copy log end with `Done!`
1. Check all STATUS = `OK`. Copy manually the files/folders if you find `NG` STATUS
