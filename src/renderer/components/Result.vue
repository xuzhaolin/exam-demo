<template>
    <div>
        <p>学生姓名：{{name}}</p>
        <p>考试科目: {{kemu}}</p>
        <p>考试成绩: {{point}}</p>
        <p>
            <button  class="btn btn-default" @click.stop="reset">返回重新查询</button>
        </p>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                default: ''
            },
            kemu: {
                type: String,
                default: ''
            },
            point: {
                type: Number,
                default: 0
            }
        },
        methods: {
            reset () {
                this.$emit('reset')
            }
        }
    }
</script>

<style scoped>
    p {
        font-size: 16px;
    }
</style>
