import Article from '../models/Article.model';
import Comment from '../models/Comment.model';

class ArticleController {
  static async fetchAllArticles(req, res) {
    try {
      const articles = await Article.findAll({
        where: { employeeId: req.employee.id },
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json({
        status: 'success',
        message: 'Successfully fetched Articles!',
        data: articles,
      });
    } catch (error) {
      return res.status(500).json({
        status: error,
        message: error.message,
      });
    }
  }

  static async createArticle(req, res) {
    try {
      const { title, article } = req.body;
      const employeeId = req.employee.id;
      if (!title || !article) {
        throw new Error('Incorrect Parameters!');
      }
      const newArticle = await Article.create({
        employeeId,
        title,
        article,
      });
      return res.status(200).json({
        status: 'success',
        data: {
          articleId: employeeId,
          message: 'Article successfully posted',
          // title,
          // id: newArticle.id,
          newArticle,
        },
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: err.message,
      });
    }
  }

  static async editArticle(req, res) {
    try {
      const { id } = req.params;
      const article = await Article.findOne({ where: { id } });
      if (!id) {
        throw new Error(`Article with ${id} does not exist`);
      }
      if (article.employeeId !== req.employee.id) {
        throw new Error('You cannot do that!');
      }
      // const { title, article } = req.body;
      const articleUpdate = {
        title: req.body.title,
        article: req.body.article,
      };
      // const { title, article } = articleUpdate;
      await Article.update(
        { title: articleUpdate.title, article: articleUpdate.article },
        { where: { id } }
      );

      return res.status(200).json({
        status: 'success',
        data: {
          articleId: article.employeeId,
          message: 'Article successfully updated!',
          title: articleUpdate.id,
          article: articleUpdate.article,
        },
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: err.message,
      });
    }
  }

  static async deleteArticle(req, res) {
    try {
      const { id } = req.params;
      const employeeId = req.employee.id;
      // console.log(req.params.id);
      // console.log(req.employee);
      const article = await Article.findOne({ where: { id } });
      // console.log(article.id);
      if (!id) {
        throw new Error(`Article with ${id} does not exist`);
      }
      if (article.employeeId !== req.employee.id) {
        throw new Error('You cannot do that!');
      }

      await Article.destroy({ where: { id: article.id } });

      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Article successfully deleted',
        },
      });
    } catch (err) {
      return res.status(500).json({
        error: err,
        message: err.message,
      });
    }
  }

  static async getArticle(req, res) {
    try {
      const { id } = req.params;
      const article = await Article.findOne({ where: { id } });
      if (!id) {
        throw new Error('Invalid parameter');
      }
      return res.status(200).json({
        status: 'success',
        data: {
          article,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: err,
        message: err.message,
      });
    }
  }

  static async addComment(req, res) {
    try {
      const articleId = req.params.id;
      const { comment } = req.body;
      const newComment = await Comment.create({
        articleId: Number(articleId),
        comment,
      });
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Comment successfully added!',
          newComment,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: err,
        message: err.message,
      });
    }
  }
}

export default ArticleController;
