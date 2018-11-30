import XLSX from 'js-xlsx';
import ti from 'xlsx';
import fs from 'fs';
import { remote } from 'electron';
import db from '../datastore';

export function loadUsersFromDb() {
    return new Promise((resolve) => {
        db.find({}, function(err, docs) {
            if (err) {
                resolve([])
            } else {
                resolve(docs)
            }
        })
    });
}

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


export function saveExcelFileToDB(filename) {
    return new Promise((resolve, reject) => {
        let content = fs.readFileSync(filename);
        let data = new Uint8Array(content);
        let workbook = XLSX.read(data, { type: 'array' });
        db.remove({}, { multi: true }, function(err) {
            if (err) {
                reject()
            }
            console.log(workbook.Sheets)
            db.insert(XLSX.utils.sheet_to_json(workbook.Sheets['学生']), function(err, newDocs) {
                if (err) {
                    reject()
                } else {
                    resolve()
                }
            });
        });
    });
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

export function dbToExcel(filePath) {
    loadUsersFromDb().then((data) => {
        let wb = ti.utils.book_new();
        const new_ws_name = "学生";
        let result = [];
        data.forEach(item => {
            result.push([item['姓名'], item['语文'], item['数学'], item['英语']]);
        });

        let ws_data = [
            ['姓名', '语文', '数学', '英语'],
            ...result
        ];

        console.log(ws_data);
        let ws = ti.utils.aoa_to_sheet(ws_data);
        ti.utils.book_append_sheet(wb, ws, new_ws_name);

        ti.writeFile(wb, filePath);
    })
}


export function saveExcelFileToLocal() {
    remote.dialog.showSaveDialog({
        title: 'exam',
        defaultPath: '~/exam.xlsx'
    }, (filePath) => {
        try {
           dbToExcel(filePath);
        } catch (e) {
            window.alert('导出失败');
        }
    })
}
