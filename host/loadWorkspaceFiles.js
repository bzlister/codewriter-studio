const fs = require('fs');
const path = require("path");

const args = process.argv.slice(2);
if (args.length === 0) {
  throw new Error("Pass path to project directory as an argument");
}

const [root, displayRoot] = args;
if (displayRoot && !root.includes(displayRoot)) {
  throw new Error("Optionally pass name of subfolder within project directory to be the displayed top-level directory")
}

function extToLang(ext) {
  switch (ext) {
    default:
      return ext;
  }
}

function throughDirectory(dir, files) {
  fs.readdirSync(dir).forEach(file => {
      const absolute = path.join(dir, file);
      if (fs.statSync(absolute).isDirectory()) {
        return throughDirectory(absolute, files);
      }
      
      const displayPath = displayRoot ? absolute.substring(absolute.indexOf(displayRoot)) : absolute;
      const extension = absolute.includes('.') ? absolute.substring(absolute.lastIndexOf('.')+1) : undefined;
      return files.push({ path: displayPath, content: fs.readFileSync(absolute).toString().trim(), language: extToLang(extension)});
  });

  return files;
}


const files = throughDirectory(root, []);
const jsonData = JSON.stringify(files, null, 2);
fs.writeFileSync('./workspace-files.json', jsonData);

