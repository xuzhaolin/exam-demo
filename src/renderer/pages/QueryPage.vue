<template>
    <el-row>
        <el-col :span="24">
            <table class="table table-bordered">
                <tbody>
                <tr>
                    <td><img src="../assets/left.jpg" width="200" height="200" /></td>
                    <td class="title-td"><span class="title">盐道街小学 五年级一班<br>考试成绩查询</span></td>
                    <td scope="col"><img src="../assets/right.jpg" width="200" height="200" alt=""/></td>
                </tr>
                <tr class="content-tr">
                    <td class="content-td">
                        <span>2018年9月考试成绩查询：</span>
                    </td>
                    <td class="content-td">
                        <query @search="search" v-show="searchStatus == 0"></query>
                        <loading v-show="searchStatus === 1" :name="searchName" :kemu="searchKemu"></loading>
                        <no-result :result="searchResult" v-if="searchStatus === -1"
                        :name="searchName" :kemu="searchKemu"
                        @reset="reset"
                        ></no-result>
                        <result v-if="searchStatus === 2" :name="searchName" :kemu="searchKemu" :point="searchKemuPoint" @reset="reset"></result>
                    </td>
                    <td class="content-td">操作说明：<br>
                        1、选择考试科目。
                        <br>
                        2、输入姓名，点击提交按钮进行查询。
                    </td>
                </tr>
                </tbody>
            </table>
        </el-col>
    </el-row>
</template>

<script>
    import Query from '@/components/Query';
    import Loading from '@/components/Loading';
    import NoResult from '@/components/NoResult';
    import Result from '@/components/Result';
    import {loadExcelFile} from "@/service/QueryService";
    import {searchUserInDB} from "../service/QueryService";
    export default {
        components: {
            Query,
            Loading,
            NoResult,
            Result,
        },
        data() {
            return {
                searchStatus: 0,
                searchName: '',
                searchKemu: '',
                searchResult: 0,
                searchKemuPoint: 0
            }
        },
        methods: {
            reset() {
                this.searchStatus = 0;
                this.searchName = '';
                this.searchKemu = '';
                this.searchResult = 0;
                this.searchKemuPoint = 0;
            },
            search({name, kemu}) {
                this.searchStatus = 1;
                this.searchName = name;
                this.searchKemu = kemu;
                this._findUserInUsers();
            },
            _findUserInUsers() {
                searchUserInDB(this.searchName).then((user) => {
                    if (user[this.searchKemu]) {
                        this.searchStatus = 2;
                        this.searchResult = 1;
                        this.searchKemuPoint = parseFloat(user[this.searchKemu]);
                    } else {
                        this.searchStatus = -1;
                        this.searchResult = -1;
                    }
                }).catch(() => {
                    this.searchStatus = -1;
                    this.searchResult = -2;
                });
            }
        }
    }
</script>

<style>
    h1 {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        border-radius: 4px;
    }

    .title {
        font-size: 40px;
        font-weight: 700;
    }

    td {
        text-align: center;
    }

    td.title-td {
        vertical-align: middle;
        padding: 5px;
    }

    .content-td {
        min-height: 500px;
        vertical-align: middle;
    }




</style>
