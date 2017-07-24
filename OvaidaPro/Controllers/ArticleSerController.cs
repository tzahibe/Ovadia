using BL;
using Bo;
using OvaidaPro.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OvaidaPro.Controllers
{
    public class ArticleSerController : ControllerHelper
    {
        // GET: ArticleSer
        public ActionResult AddArticle(Bo.Article article)
        {
            isAllow();
            Result result = ArticleLogic.AddArticle(article);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult EditArticle(Bo.Article article)
        {
            isAllow();
            Result result = ArticleLogic.EditArticle(article);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult RemoveArticleById(int articleId)
        {
            isAllow();
            Result result = ArticleLogic.RemoveArticleById(articleId);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetArticleById(int articleId)
        {
            Result result = ArticleLogic.GetArticleById(articleId);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllArticles()
        {
            Result result = ArticleLogic.GetAllArticles();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetArticlesByCategoryId(int categoryId)
        {
            Result result = ArticleLogic.GetArticlesByCategoryId(categoryId);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetNewActiveArticles()
        {
            Result result = ArticleLogic.GetNewActiveArticles();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        

    }
}
