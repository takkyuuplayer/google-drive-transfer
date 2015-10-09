# google-drive-transfer

Copy ALL files/folders in `migration-source` to `migration-xxxxxxxxxxx`

## How to use

### migration_source@gmail.com

1. Create `migration-source` folder and move all documents to the folder.
1. Share the folder to migration_destination@gmail.com

### migration_destination@gmail.com

1. Open [Apps Script – Google Apps Script](https://www.google.com/script/start/)
1. Click `Start Scripting` and create `Blank Project`
1. Copy https://github.com/takkyuuplayer/google-drive-transfer/blob/master/transfer.js and change `EMAIL` to your source gmail address.
1. Click Run > main
1. Wait untill `Running function main...` finish.
1. All `migration-source` files are copied to `migration-xxxxxxxxxxx` folder.
