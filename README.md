# google-drive-transfer

Copy files/folders OWNED BY source@gmail.com in `migration-source` to `migration-destination`

## How to use

### source@gmail.com

1. Create `migration-source` folder and move all documents to the folder
1. Share the folder to destination@gmail.com

### destination@gmail.com

1. Create new Google spreadsheet
1. Click `Tools > Script Editor`
1. Copy [transfer.js](https://github.com/takkyuuplayer/google-drive-transfer/blob/master/transfer.js) and set `SOURCE_EMAIL` up as source@gmail.com
1. Click `Run > main`
1. Wait untill `Running function main...` finish
  * When error occur, re-run
  * Copy log is available on the spreadsheet
  * Copy log end with `Done!`
1. Check all STATUS = `OK`. Copy manually the files/folders if you find `NG` STATUS
