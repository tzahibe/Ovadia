using Bo;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public abstract class ArticleResult
    {
        public static Result AddArticle(Bo.Article article)
        {

            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Article articleRep = (from r in context.Article where r.Title.Equals(article.Title) select r).FirstOrDefault();
                    if (articleRep == null)
                    {
                        articleRep = new Article();
                        articleRep.Title = article.Title;
                        articleRep.ProfilePic = article.ProfilePic;
                        articleRep.CategoryId = article.CategoryId;
                        articleRep.CategoryName = article.CategoryName;
                        articleRep.Publish = article.Publish;
                        articleRep.Body = article.Body;
                        articleRep.Video1 = article.Video1;
                        articleRep.Video2 = article.Video2;
                        articleRep.Video3 = article.Video3;
                        //articleRep.Category = (Category)(from r in context.Category where r.id == articleRep.CategoryId select r).FirstOrDefault();
                        articleRep.Last_edit = DateTime.Now;
                        articleRep.DatePublish = DateTime.Now;

                        context.Article.Add(articleRep);
                        context.SaveChanges();
                        result.ErrorCode = 0;
                        result.Data = articleRep;
                        return result;
                    }
                    else
                    {
                        result.ErrorCode = 2;
                        result.Data = false;
                        return result;
                    }

                }
            }
            catch (Exception ex)
            {
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("ArticleResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                result.ErrorCode = 1;
                result.Data = true;
                return result;
            }
        }
        public static Result EditArticle(Bo.Article article)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Article articleRep = (from r in context.Article where r.ArticleId == article.ArticleId select r).FirstOrDefault();
                    if (articleRep != null)
                    {

                        articleRep.Title = article.Title;
                        articleRep.ProfilePic = article.ProfilePic;
                        articleRep.Publish = article.Publish;
                        articleRep.CategoryName = article.CategoryName;
                        articleRep.Body = article.Body + " ";
                        articleRep.Last_edit = DateTime.Today;
                        articleRep.Video1 = article.Video1;
                        articleRep.Video2 = article.Video2;
                        articleRep.Video3 = article.Video3;
                        //articleRep.DatePublish = article.DatePublish;

                        context.Article.Attach(articleRep);
                        var entry = context.Entry(articleRep);
                        entry.Property(e => e.Title).IsModified = true;
                        entry.Property(e => e.ProfilePic).IsModified = true;
                        entry.Property(e => e.CategoryId).IsModified = true;
                        entry.Property(e => e.Publish).IsModified = true;
                        entry.Property(e => e.Video1).IsModified = true;
                        entry.Property(e => e.Video2).IsModified = true;
                        entry.Property(e => e.Video3).IsModified = true;
                        entry.Property(e => e.CategoryName).IsModified = true;
                        entry.Property(e => e.Body).IsModified = true;
                        entry.Property(e => e.Last_edit).IsModified = true;
                        //entry.Property(e => e.DatePublish).IsModified = true;
                        context.SaveChanges();
                        result.ErrorCode = 0;
                        result.Data = articleRep;
                        return result;
                    }
                    else
                    {
                        result.ErrorCode = 2; //article not exist
                        result.ErrorMsg = "Article Not Exist";
                        return result;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("ArticleResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
        }
        public static Result RemoveArticleById(int articleId)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Article repResult = (from r in context.Article where r.ArticleId == articleId select r).FirstOrDefault();
                    if (repResult != null)
                    {
                        context.Article.Remove(repResult);
                        context.SaveChanges();
                        result.ErrorCode = 0;
                        result.Data = true;
                        return result;
                    }
                    else
                    {
                        result.ErrorCode = 2;
                        result.Data = false;
                        return result;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("ArticleResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
        }
        public static Result GetArticleById(int articleId)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Article repResult = (from r in context.Article where r.ArticleId == articleId select r).FirstOrDefault();
                    if (repResult != null)
                    {
                        //if (repResult.Category != null)
                        //{
                        //    repResult.CategoryName = repResult.Category.Name;
                        //    repResult.CategoryId = repResult.Category.id;
                        //}
                        result.ErrorCode = 0;
                        result.Data = repResult;
                        return result;
                    }
                    else
                    {
                        result.ErrorCode = 2;
                        result.Data = false;
                        return result;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("ArticleResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
        }
        public static Result GetArticlesByCategoryId(int categoryId)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {

                    List<int> categoriesIds = (from r in context.Categories
                                               where (int)r.ParentId == categoryId
                                               select r.Id).ToList();
                    categoriesIds.Add(categoryId); //add parent cat

                    List<Article> repResult = (from r in context.Article
                                               where categoriesIds.Contains((int)r.CategoryId)
                                               && r.Publish == 1
                                               select r).Distinct().ToList();

                   
                    if (repResult != null)
                    {
                        result.ErrorCode = 0;
                        result.Data = repResult;
                        return result;
                    }
                    else
                    {
                        result.ErrorCode = 2;
                        result.Data = false;
                        return result;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = 1;
                result.ErrorMsg = "נפילה ב GetAllArticles";
                Logger.Write("ArticleResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
        }
        public static Result GetAllArticles()
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Article> repResult = (from r in context.Article select r).ToList();
                    if (repResult != null)
                    {
                        result.ErrorCode = 0;
                        result.Data = repResult;
                        return result;
                    }
                    else
                    {
                        result.ErrorCode = 2;
                        result.Data = false;
                        return result;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("ArticleResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
        }
    }
}
