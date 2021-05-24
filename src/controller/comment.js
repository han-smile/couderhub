const { createService, replyService, updateService, removeService, getCommentById } = require('../service/comment')

class Comment {
  async create(ctx, next) {
    const { id } = ctx.user
    const { momentId, content } = ctx.request.body

    const res = await createService(id, momentId, content)
    ctx.body = res
  }

  async reply(ctx) {
    const { id } = ctx.user
    const { momentId, content } = ctx.request.body
    const { commentId } = ctx.params

    const res = await replyService(id, momentId, content, commentId)
    ctx.body = res
  }

  async update(ctx) {
    const { commentId } = ctx.params
    const { content } = ctx.request.body

    const res = await updateService(commentId, content)
    ctx.body = res
  }

  async remove(ctx) {
    const { commentId } = ctx.params

    const res = await removeService(commentId)

    ctx.body = res
  }

}

module.exports = new Comment()