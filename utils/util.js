//格式化时间
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//格式化时间
const format_Time = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 填充时分
const format_H_M_S = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-') + ' '
}

//格式化时分
const format_HM = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 对象深拷贝
function cloneObj(obj){
  if(!isPlainObj(obj)) {
    return false;
  }
  return JSON.parse(JSON.stringify(obj));
}

// md5 && base64
var md5 = require('md5.min.js'), base64 = require('base64.min.js'),
sign = function(data){
  var _data = cloneObj(data);
  _data['\x74\x6f\x6b\x65\x6e'] = base64.decode(getApp()['\x5f\x74']);
  return md5(JSON.stringify(_data));
},
key = function (data) {
  if (!isPlainObject(data)) { return false; }
  data.timestamp = parseInt(new Date().getTime().toString().substr(0, 10));

  data.sign = sign(data);

  return {
    key: base64.encode(JSON.stringify(data))
  };
}

// 模态框显示数据结果
function showModal(title, content, callBack) {
  wx.showModal({
    title,
    content,
    showCancel: false,
    confirmColor: '#ff833b',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定, 关闭模态框');
        callBack && callBack();
      }
    },
    fail: function() {}
  })
}

module.exports = {
  format_HM: format_HM,
  format_H_M_S: format_H_M_S,
  format_Time: format_Time,
  formatTime: formatTime,
  md5: md5,
  base64: base64,
  key: key,
  showModal: showModal,
}
