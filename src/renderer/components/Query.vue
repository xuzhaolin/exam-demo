<template>
  <div class="form-horizontal">
      <div class="form-group">
        <label class="col-sm-2 control-label">科目</label>
        <div class="col-sm-10">
          <select name="kemu" v-model="kemu" class="form-control">
            <option value="" selected>请选择考试科目</option>
            <option v-for="(item, index) in kemuList" :key="index" :value="item">
              {{item}}
            </option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label  class="col-sm-2 control-label">姓名</label>
        <div class="col-sm-10">
          <input type="text" name="name" class="form-control" placeholder="请输入学生姓名" v-model="name">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default" @click.stop="submit">查询</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      kemu: '',
      kemuList: []
    }
  },
  created () {
    this.loadKemu()
  },
  methods: {
    submit: function () {
      if (this.kemu === '') {
        window.alert('请选择需要查询的科目');
        return
      }

      if (this.name === '') {
        window.alert('请输入要查询的姓名');
        return
      }

      this.$emit('search', { name: this.name, kemu: this.kemu })
      this.name = '';
      this.kemu = '';
    },
    loadKemu () {
      this.kemuList = ['语文', '数学', '英语'];
    }
  }
}
</script>

<style scoped>

</style>
