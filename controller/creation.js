/**
 * Created by Administrator on 2017-05-17.
 */
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Video = mongoose.model('Video')
const robot = require('../service/robot')
const config = require('../config/config')

exports.video = async (ctx, next) => {
  let body = ctx.request.body
  let videoData = body.video
  console.log('videoData - 13')
  console.log(videoData)
  let user = ctx.session.user

  if (!videoData || !videoData.key) {
    ctx.body = {
      success: false,
      err: '视频没有上传成功'
    }

    return next
  }

  let video = await Video.findOne({
    qiniu_key: videoData.key
  }).exec()

  if (!video) {
    video = new Video({
      author: user._id,
      qiniu_key: videoData.key,
      persistentId: videoData.persistentId
    })
    console.log('video')
    console.log(video)
    video = await video.save()

  }

  let url = config.qiniu.video + video.qiniu_key

  robot
    .uploadToCloudinary(url)
    .then(function (data) {
      if(data && data.public_id){
        video.public_id = data.public_id
        video.detail = data
        video.save()
      }
    })

  ctx.body = {
    success: true,
    data: video._id
  }

}
