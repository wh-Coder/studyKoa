/**
 * Created by Administrator on 2017-05-17.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Mixed = Schema.Types.Mixed

const VideoSchema = new Schema({
  author: {
    type: ObjectId,
    ref: 'User'
  },
  qiniu_key: String,
  persistentId: String,
  qiniu_final_key: String,
  qiniu_detail: Mixed,

  public_id: String,
  detail: Mixed,

  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

VideoSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.meta.updateAt = Date.now();
  }
  next()
})

module.exports = mongoose.model('Video', VideoSchema)


