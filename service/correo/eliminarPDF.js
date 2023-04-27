const fs = require('fs');
const path = require('path');

const eliminarPDF= ()=>{
    const folderPath = path.join(__dirname, '../Reports');

    fs.readdir(folderPath, (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        fs.unlink(path.join(folderPath, file), err => {
          if (err) throw err;
          console.log(`${file} eliminado`);
        });
      }
    });
};

module.exports={
    eliminarPDF
}