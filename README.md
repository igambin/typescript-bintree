# Typescript BinTree

Dieses Projekt ist als Basis zum üben von Typescript anhand eines selbst implementierten Binärbaumes gedacht. Im lib Verzeichnis gibt es bereits die Klasse, welche angepasst werden soll. Im Ordner test befinden sich (auskommentierte) Unit Tests, anhand derer man die Methoden implementieren kann. Ihr seid natürlich herzlich eingeladen einfach nur herumzuspielen und müsst den Vorschlägen der Tests nicht folgen, sie dienen nur zur Hilfe.

## Vorab
Ihr braucht:
1. [Git](https://git-scm.com/)
1. [Node.js inkl npm](https://nodejs.org/en/download/) 
1. Eine IDE mit der ihr arbeiten könnt:
    - [IntelliJ oder Webstorm](https://www.jetbrains.com/) - Enterprise Lizenz für IntelliJ erforderlich
    - [Visual Studio Code](https://code.visualstudio.com/) - Hier müsst ihr euch selber Plugins zurechtsuchen, das ist recht aufwändig.

Zunächst muss das Projekt geklont werden. 
```bash
git clone https://github.com/angular-academy/typescript-bintree.git
```
Danach müsst ihr nur noch in das Verzeichnis wechseln und die Dependencies installieren:
```bash
npm install
```
Zum Ausführen der Tests ([Jest](https://jestjs.io/)): 
```bash
npm test
``` 
Zum Build (landet in `./dist`):
```bash
npm run build
```