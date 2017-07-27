﻿using Bo;
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
                        result = UpdateArtCat(articleRep.ArticleId, article.CategoriesList);
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
                        result = UpdateArtCat(articleRep.ArticleId, article.CategoriesList);
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
                        result = RemoveArtCat(articleId);

                        if (result.ErrorCode == 0)
                            context.SaveChanges();
                        
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
                                               join p in context.Art_Cat on r.ArticleId equals p.ArticleId
                                               where categoriesIds.Contains((int)p.CategoryId)
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
        public static Result GetNewActiveArticles()
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {

                    List<Article> repResult = (from r in context.Article
                                               select r).OrderBy(r => r.Last_edit).ToList();

                    if (repResult != null)
                    {
                        result.ErrorCode = 0;
                        if(repResult.Count > 4)
                            result.Data = repResult.Take(5);
                        else
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
                result.ErrorMsg = "נפילה ב GetNewActiveArticles";
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
                    List<Article> repResult = (from r in context.Article
                                               where r.ArticleId != 1
                                               select r).ToList();
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
        //ArtCat
        public static Result UpdateArtCat(int articleId, List<Bo.Art_Cat> categoryList)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    context.Art_Cat.RemoveRange(context.Art_Cat.Where(x => x.ArticleId == articleId));
                    if(categoryList != null)
                    {
                        foreach (Bo.Art_Cat item in categoryList)
                        {
                            Art_Cat artcat = new Art_Cat();
                            artcat.ArticleId = articleId;
                            artcat.Text = item.text;
                            artcat.CategoryId = item.CategoryId;
                            context.Art_Cat.Add(artcat);
                        }
                    }

                    context.SaveChanges();
                    result.ErrorCode = 0; 
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("ArticleResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }

            return result;
        }
        public static Result RemoveArtCat(int articleId)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    context.Art_Cat.RemoveRange(context.Art_Cat.Where(x => x.ArticleId == articleId));
                    context.SaveChanges();
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("ArticleResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }

            return result;
        }
        public static Result GetArtCat(int articleId)
        {
            Result result = new Result();

            using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
            {
                List<Art_Cat> list = new List<Art_Cat>();
                try
                {
                    list = (from r in context.Art_Cat
                            where r.ArticleId == articleId
                            select r).ToList<Art_Cat>();

                    result.ErrorCode = 0;
                    result.Data = list;
               
                }
                catch(Exception ex)
                {
                    result.Data = false;
                    result.ErrorMsg = Consts.CODE_1_MSG;
                    Logger.Write("ArticleResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                    return result;
                }

                return result;
            }
        }
    }
}
