'use strict';

const Service = require('egg').Service;

// 这些方法可以具体参考https://mongoosejs.com/docs/api.html#model_Model
class DbBaseService extends Service {

  /*
	 * 功能：在数据库新增一条数据
	 * @param db 数据库名称可以参考app/model下的文件名称
	 * @param data 对象 example: { name: 'wly' }，如果要新增多个数据可以直接传入数组[{},{}]
	 * @return {Promise<void>}
	 */
  async add(db, data) {
    // 创建单个数据直接传入数据模型obj即可，如果想要创建多个数据可以直接传入数组 [{},{}]
    const result = await this.ctx.model[db].create(data);
    return result;
  }

  /*
	 * 功能：将符合条件的全部删除
	 * @param db 数据库名称可以参考app/model下的文件名称
	 * @param data 对象 example: { name: 'wly' }，
	 * @return {Promise<*>}
	 */
  async deleteMany(db, data) {
    // 将符合条件的全部删除
    const result = await this.ctx.model[db].deleteMany(data);
    return result;
  }

  /*
	 * 功能：删除符合条件的一个数据
	 * @param db 数据库名称可以参考app/model下的文件名称
	 * @param data 对象 example: { name: 'wly' }，
	 * @return {Promise<*>}
	 */
  async deleteOne(db, data) {
    // 删除一个
    const result = await this.ctx.model[db].deleteOne(data);
    return result;
  }

  /*
	 * 功能：更新第一个符合条件的数据
	 * @param db 数据库名称可以参考app/model下的文件名称
	 * @param query 条件 对象 example: { name: 'wly' }，
	 * @param data 跟新后的文档 对象 example: { name: 'wly' }，
	 * @return {Promise<void>}
	 */
  async update(db, query, data) {
    const result = await this.ctx.model[db].update(query, data, { upsert: false, overwrite: false });
    return result;
  }

  /*
	 * 功能：更新所有符合条件的数据
	 * @param db 数据库名称可以参考app/model下的文件名称
	 * @param query 条件 对象 example: { name: 'wly' }，
	 * @param data 跟新后的文档 对象 example: { name: 'wly' }，
	 * @return {Promise<void>}
	 */
  async updateMany(db, query, data) {
    const result = await this.ctx.model[db].updateMany(query, data);
    return result;
  }

  /*
	 * 功能：根据条件获取到一个数字
	 * @param db 数据库名称可以参考app/model下的文件名称
	 * @param data 对象 example: { name: 'wly' }
	 * @return {Promise<*>}
	 * 返回值为 数字
	 */
  async count(db, data) {
    // 直接传入查询条件即可
    const result = await this.ctx.model[db].count(data);
    return result;
  }

  /*
	 * 功能：查询到一个符合条件的数据
	 * @param db 数据库名称可以参考app/model下的文件名称
	 * @param data {
	 *  query: {name: 'wly'}, 查询条件
	 *  select: 'name type time', 字符串 'name type', -> 不包含 '-name -type'
	 *  sort: { key: 1 } 排序 其中 1 为升序排列，而 -1 是用于降序排列。
	 *  skip: 正整数 要跳过的文档数。默认为0。
	 *  limit: 非负整数 要返回的最大文档数。如果未指定，则默认为无限制。限制为0相当于设置无限制。
	 * }
	 * @return {Promise<*>}
	 */
  async findOne(db, data) {
    let query = null;
    let select = null;
    let options = null;
    if (data.query) {
      query = data.query;
    }
    if (data.select) {
      select = data.select;
    }
    if (data.sort) {
      options = {
        sort: data.sort,
      };
    }
    const result = await this.ctx.model[db].findOne(query, select, options);
    return result;
  }

  /*
	 * 功能：查询到对应id的数据
	 * @param db 数据库名称可以参考app/model下的文件名称
	 * @param id 数据的id
	 * @return {Promise<*>}
	 */
  async findOneById(db, id) {
    const result = await this.ctx.model[db].findById(id);
    return result;
  }

  /*
	 * 功能：查询到一个列表
	 * @param db
	 * @param query 条件 { name: 'wly' }
	 * @param select 字符串 'name type', -> 不包含 '-name -type'
	 * @param options {
		*   sort: { key: 1 } 排序 其中 1 为升序排列，而 -1 是用于降序排列。
		*   skip: 正整数 要跳过的文档数。默认为0。
		*   limit: 非负整数 要返回的最大文档数。如果未指定，则默认为无限制。限制为0相当于设置无限制。
		* }
	 * @return {Promise<void>}
	 */
  async find(db, data) {
    let query = null;
    let select = null;
    let options = null;
    if (data.query) {
      query = data.query;
    }
    if (data.select) {
      select = data.select;
    }
    if (data.sort || data.skip || data.limit) {
      data.skip = data.skip ? data.skip : 1;
      data.limit = data.limit ? data.limit : 10;
      const skip = (parseInt(data.skip) - 1) * parseInt(data.limit) || 0;
      const limit = parseInt(data.limit) || 1000;
      options = {
        sort: data.sort,
        skip,
        limit,
      };
    }
    const result = await this.ctx.model[db].find(query, select, options);
    return result;
  }

  /*
	 * 功能：查询到一个列表
	 * @param db
	 * @param query 条件 { name: 'wly' }
	 * @param select 字符串 'name type', -> 不包含 '-name -type'
	 * @param options {
		*   sort: { key: 1 } 排序 其中 1 为升序排列，而 -1 是用于降序排列。
		*   skip: 正整数 要跳过的文档数。默认为0。
		*   limit: 非负整数 要返回的最大文档数。如果未指定，则默认为无限制。限制为0相当于设置无限制。
		* }
	 * @return {Promise<void>}
	 */
  async findAndCount(db, data) {
    let query = null;
    let select = null;
    let options = null;
    if (data.query) {
      query = data.query;
    }
    if (data.select) {
      select = data.select;
    }
    if (data.sort || data.skip || data.limit) {
      data.skip = data.skip ? data.skip : 1;
      data.limit = data.limit ? data.limit : 10;
      const skip = (parseInt(data.skip) - 1) * parseInt(data.limit) || 0;
      const limit = parseInt(data.limit) || 10;
      options = {
        sort: data.sort,
        skip,
        limit,
      };
    }
    const result = await this.ctx.model[db].find(query, select, options);
    const count = await this.ctx.model[db].count(query);
    return {
      data: result,
      count,
    };
  }

  // 聚合操作-->实验中
  async aggregate(db) {
    this.ctx.model[db].aggregate([
      { $match: { type: '1' } },
      { $group: { _id: null, maxBalance: { $max: '$balance' } } },
      { $project: { _id: 0, maxBalance: 1 } },
    ]).then(function(res) {
      return res;
    });

    // this.ctx.model[db].model
    // 	.aggregate()
    // 	.match(data.match)
    // 	.group(data.group)
    // 	.exec(cb);
  }

}

module.exports = DbBaseService;

