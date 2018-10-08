# Collapsing Creation #

## Installation Instructions ##
1. Make sure you have node and npm installed
2. Run `npm install`
3. Run `electron .` to open game
Run the follow to create an exe for windows:
```shell
electron-packager . collapsing-creation --overwrite --asar --platform=win32 --arch=ia32  --prune=true --out=collapsing-creation-exe --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="Collapsing Creation" --electron-version 3.0.2
```
