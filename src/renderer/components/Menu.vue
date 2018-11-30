<template>
    <el-aside width="200px" class="">
        <el-menu router :default-active="$route.path">
            <el-menu-item index="/query">
                <i class="el-icon-info" />
                考试成绩查询
            </el-menu-item>
            <el-menu-item index="/excel">
                <i class="el-icon-edit"></i>考试录入
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>
