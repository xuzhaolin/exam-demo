<template>
    <div>
        <p v-if="result === -1">
            {{name}} 尚未录入 '<span class="kemu"> {{kemu}} </span>' 成绩
        </p>
        <p v-if="result === -2">
            查无 '{{name}}' 此学生
        </p>
        <p>
            <button type="submit" class="btn btn-default" @click.stop="reset">返回重新查询</button>
        </p>
    </div>

</template>

<script>
    export default {
        props: {
            result: {
                type: Number,
                default: 0
            },
            name: {
                type: String,
                default: ''
            },
            kemu: {
                type: String,
                default: ''
            }
        },
        methods: {
            reset() {
                this.$emit('reset');
            }
        }
    }
</script>

<style scoped>
    p {
        font-size: 16px;
    }
</style>
