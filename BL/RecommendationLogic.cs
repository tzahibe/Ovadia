using Bo;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public abstract class RecommendationLogic
    {
        public static Result AddRecomm(Bo.Article article)
        {
            Result result = new Result();
            result = ArticleResult.AddArticle(article, "Recommendation");
            return result;
        }
        public static Result EditRecomm(Bo.Article article)
        {
            Result result = new Result();
            result = ArticleResult.EditArticle(article);
            return result;
        }
        public static Result RemoveRecommById(int articleId)
        {
            Result result = new Result();
            result = ArticleResult.RemoveArticleById(articleId);
            return result;
        }
        public static Result GetRecommById(int articleId)
        {
            Result result = new Result();
            result = ArticleResult.GetArticleById(articleId);
            return result;
        }
        public static Result GetAllRecomm()
        {
            Result result = new Result();
            result = ArticleResult.GetAllRecomm();
            return result;
        }
        public static Result GetAllActiveRecomm()
        {
            Result result = new Result();
            result = ArticleResult.GetAllActiveRecomm();
            return result;
        }
    }
}
