<template>
    <el-row>
        <el-col :span="12">
            <h1>学生成绩录入</h1>
            <p>注意录入后将会把以前的成绩覆盖，已最新成绩单为主</p>
        </el-col>
        <el-col :span="12">
            <el-button type="primary" @click="importExcel">导入考试数据</el-button>
            <el-button @click="exportInfo">导出当前考试信息</el-button>
        </el-col>
        <el-col :span="24">
            <el-table
                    :data="users"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        :index="indexMethod">
                </el-table-column>
                <el-table-column
                        prop="姓名"
                        label="姓名"
                        >
                </el-table-column>
                <el-table-column
                        prop="语文"
                        label="语文"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="数学"
                        label="数学"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="英语"
                        label="英语"
                        width="180">
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>
    import {importExcelFile, loadExcelFile, saveExcelFile, saveExcelFileToLocal} from "../service/QueryService";

    export default {
        methods: {
            indexMethod(index) {
                return index;
            }
        },
        data() {
            return {
                users: []
            }
        },
        created() {
            loadExcelFile().then((data) => {
                this.users = data;
            })
        },
        methods: {
            importExcel() {
               importExcelFile((filenames) => {
                  saveExcelFile(filenames[0]).then((data) => {
                      window.alert('保存成功');
                      this.users = data
                  }).catch(() => {
                      window.alert('保存失败');
                  })
               })
            },
            exportInfo() {
                saveExcelFileToLocal()
            },
            indexMethod(index) {
                return index;
            }
        }

    }
</script>

<style scoped>
    h1 {
        margin: 0;
    }
</style>
