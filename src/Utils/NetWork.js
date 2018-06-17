import axios from 'axios'
const ajax = (function() {
  /**
   * [baseAjax ajax基础请求方法]
   * @param  {[type]} option    [基础请求参数（method，data，url）]
   * @param  {[type]} successFn [请求成功执行函数]
   * @param  {[type]} errorFn   [请求失败执行函数]
   * @return {[type]}           [description]
   */
  var baseAjax = (option, successFn, errorFn, completeFn)=> {
    let _this = this;
    let defaultOption = {
      method: 'get',
      url: '',
      baseURL: '',
      timeout: 1000 * 60 * 2
    }
    defaultOption.url = 'http://localhost:7070'+option.url;
    defaultOption.method = option.method;
    defaultOption.data = option.data;
    axios(defaultOption)
      .then(response=> {
        //console.log(response)
        let data = response.data;
        // if(data.code == 0) {
          successFn && successFn(data)
        // }else {

        //}
        completeFn && completeFn(data);
      })
      .catch(error=> {
        errorFn && errorFn(error)
      })
  }
  /**
   * [post post方式请求方法]
   * @param  {[type]} url       [请求url]
   * @param  {[type]} data      [请求传参]
   * @param  {[type]} successFn [请求成功执行函数]
   * @param  {[type]} errorFn   [请求失败执行函数]
   * @return {[type]}           [description]
   */
  var post = (url, data, successFn, errorFn, completeFn)=> {
    let opt = {
      url: url,
      method: 'post',
      data: data
    }
    baseAjax(opt, successFn, errorFn, completeFn)
  }
  /**
   * [get get方式请求方法]
   * @param  {[type]} url       [请求url]
   * @param  {[type]} successFn [请求成功执行函数]
   * @param  {[type]} errorFn   [请求失败执行函数]
   * @return {[type]}           [description]
   */
  var get = (url, data, successFn, errorFn, completeFn)=> {
    let opt = {
      url: url,
      method: 'get',
      params: data
    }
    baseAjax(opt, successFn, errorFn, completeFn)
  }
  /**
   * [all description]
   * @param  {[type]} list      [基础请求参数列表（method，data，url）]
   * @param  {[type]} successFn [请求成功执行函数（注：回调返回值为每个请求对应的返回值，如有两个请求url1，url2，返回successFn（return1,return2）,return1为url1的返回值,return2为url2返回值）]
   * @param  {[type]} errorFn   [请求失败执行函数]
   * @return {[type]}           [description]
   */
  var all = (list, successFn, errorFn, completeFn)=> {
    let requests = list.map(makeRequest);
    function makeRequest(data){
      return axios(data)
    }
    axios.all(requests)
      .then(axios.spread(successFn))
      .catch(error=> {
        errorFn && errorFn(error);
      });
  }

  return {
    post: post,
    get: get,
    base: baseAjax,
    all: all
  }
})()
export default ajax
