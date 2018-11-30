import XLSX from 'js-xlsx';
import fs from 'fs';
import { remote } from 'electron';
import path from 'path';
// const dialog = require('electron').dialog;
// const win = remote.getCurrentWindow();

export function loadExcelFile() {
    return new Promise((resolve) => {
        let file = new XMLHttpRequest();
        file.open('GET', 'static/exam.xlsx', true);
        file.responseType = 'arraybuffer';
        file.onload = function () {
            let data = new Uint8Array(file.response);
            let workbook = XLSX.read(data, { type: 'array' })
            resolve(XLSX.utils.sheet_to_json(workbook.Sheets['Sheet1']));
        };
        file.send()
    })
}


export function saveExcelFile(filename) {

    try {
        let content = fs.readFileSync(filename);
        fs.writeFileSync(path.join(__static, 'exam.xlsx'), content);
        return loadExcelFile()
    } catch (e) {
        console.log(e);
    }
}

export function importExcelFile(callback) {
    remote.dialog.showOpenDialog({
        title: '选择您需要导入的文件',
        filters: [
            { name: 'excel', extensions: ['xlsx']}
        ],
        properties: ['openFile']
    }, callback)
}


export function saveExcelFileToLocal() {
    remote.dialog.showSaveDialog({
        title: 'exam',
        defaultPath: '~/exam.xlsx'
    }, (filePath) => {
        try {
            let content = fs.readFileSync(path.join(__static, 'exam.xlsx'));
            fs.writeFileSync(filePath, content);
        } catch (e) {
            window.alert('导出失败');
        }
    })
}
