const queryUtils = require('../utils/queryUtils');

module.exports = {
  // 查询所有公共数据
  queryAll(callback) {
    queryUtils(['sysData-sql', 'queryAll']).then(res => {
      callback(res)
    })
  },

  // 条件查询
  queryData(params, callback){
    queryUtils(['sysData-sql', 'queryData'], params).then(res => {
      callback(res)
    })
  },

  // 根据id删除记录
  deleteById(id, callback){
    queryUtils(['sysData-sql', 'deleteById'], [id]).then(res => {
      callback(res)
    })
  },

  // 保存公共数据
  saveData(params, callback){
    queryUtils(['sysData-sql', 'saveData'], params).then(res => {
      callback(res)
    })
  },

  // 更新公共数据
  updateData(params, callback) {
    queryUtils(['sysData-sql', 'updateData'], params).then(res => {
      callback(res)
    })
  }
}