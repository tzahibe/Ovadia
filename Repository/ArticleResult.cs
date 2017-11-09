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
        public static Result AddArticle(Bo.Article article, string type = "Article")
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
                        articleRep.Type = type;
                        articleRep.Comment = article.Comment;
                        articleRep.Writer = article.Writer;
                        articleRep.Death_date = article.Death_date;
                        articleRep.Lesson_info = article.Lesson_info;
                        articleRep.ProfilePic = article.ProfilePic;
                        articleRep.CategoryId = article.CategoryId;
                        articleRep.CategoryName = article.CategoryName;
                        articleRep.Publish = article.Publish;
                        articleRep.Body = article.Body;
                        articleRep.Image1 = article.Image1;
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
                        articleRep.Writer = article.Writer;
                        articleRep.Comment = article.Comment;
                        articleRep.Death_date = article.Death_date;
                        articleRep.Lesson_info = article.Lesson_info;
                        articleRep.Image1 = article.Image1;
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
                        entry.Property(e => e.Comment).IsModified = true;
                        entry.Property(e => e.Writer).IsModified = true;
                        entry.Property(e => e.Death_date).IsModified = true;
                        entry.Property(e => e.Lesson_info).IsModified = true;
                        entry.Property(e => e.Image1).IsModified = true;
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
                    Article repResult = (from r in context.Article
                                         where r.ArticleId == articleId select r).FirstOrDefault();
                    if (repResult != null)
                    {
                        
                        Bo.Article boArt = new Bo.Article();
                        boArt.Title = repResult.Title;
                        boArt.ArticleId = repResult.ArticleId;
                        boArt.ProfilePic = repResult.ProfilePic;
                        boArt.CategoryId = repResult.CategoryId == null ? 0 : (int)repResult.CategoryId;
                        boArt.CategoryName = repResult.CategoryName;
                        boArt.Publish = repResult.Publish == null ? 0 : (int)repResult.Publish;
                        boArt.Writer = repResult.Writer;
                        boArt.Comment = repResult.Comment;
                        boArt.Death_date = repResult.Death_date;
                        boArt.Lesson_info = repResult.Lesson_info;
                        boArt.Body = repResult.Body;
                        boArt.Video1 = repResult.Video1;
                        boArt.Video2 = repResult.Video2;
                        boArt.Video3 = repResult.Video3;
                        boArt.Last_edit = repResult.Last_edit == null ? DateTime.Now : (DateTime)repResult.Last_edit;
                        boArt.DatePublish = repResult.DatePublish == null ? DateTime.Now : (DateTime)repResult.DatePublish;
                        boArt.CategoriesList = null;
                        result.ErrorCode = 0;
                        result.Data = boArt;
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
                    List<Bo.Article> articlesListBo = new List<Bo.Article>();
                    List<int> categoriesIds = (from r in context.Categories
                                               where (int)r.ParentId == categoryId
                                               select r.Id).ToList();

                    categoriesIds.Add(categoryId); //add parent cat

                    List<Article> repResult = (from r in context.Article
                                               join p in context.Art_Cat on r.ArticleId equals p.ArticleId
                                               where categoriesIds.Contains((int)p.CategoryId)
                                               && r.Type.Equals("Article")
                                               select r).Distinct().ToList();


                    if (repResult != null)
                    {
                        foreach(Article articleRep in repResult)
                        {
                            Bo.Article boArt = new Bo.Article();
                            boArt.Title = articleRep.Title;
                            boArt.ArticleId = articleRep.ArticleId;
                            boArt.ProfilePic = articleRep.ProfilePic;
                            boArt.CategoryId = articleRep.CategoryId == null ? 0 :(int)articleRep.CategoryId;
                            boArt.CategoryName = articleRep.CategoryName;
                            boArt.Publish = articleRep.Publish == null? 0 : (int)articleRep.Publish;
                            boArt.Body = articleRep.Body;
                            boArt.Video1 = articleRep.Video1;
                            boArt.Video2 = articleRep.Video2;
                            boArt.Video3 = articleRep.Video3;
                            boArt.Writer = articleRep.Writer;
                            boArt.Death_date = articleRep.Death_date;
                            boArt.Lesson_info = articleRep.Lesson_info;
                            boArt.Comment = articleRep.Comment;
                            boArt.Last_edit = articleRep.Last_edit == null? DateTime.Now : (DateTime)articleRep.Last_edit;
                            boArt.DatePublish = articleRep.DatePublish == null ? DateTime.Now : (DateTime)articleRep.DatePublish;
                            boArt.CategoriesList = null;
                            articlesListBo.Add(boArt);
                        }
                        result.ErrorCode = 0;
                        result.Data = articlesListBo;
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
                                               where r.Type.Equals("Article")
                                               orderby r.DatePublish descending
                                               select r).Take(5).ToList();

                    if (repResult != null)
                    {
                        result.Data = repResult;
                        result.ErrorCode = 0;
                    }

                    else
                    {
                        result.ErrorCode = 2;
                        result.Data = false;
                    }

                    return result;
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
                    List<Bo.Article> repResult = (from r in context.Article
                                                  where r.Type.Equals("Article")
                                                  select new Bo.Article
                                                  {
                                                      ArticleId = r.ArticleId,
                                                      Body = r.Body,
                                                      CategoryId = 0,
                                                      DatePublish = r.DatePublish == null ? DateTime.Now : (DateTime)r.DatePublish,
                                                      Last_edit = r.Last_edit == null ? DateTime.Now : (DateTime)r.Last_edit,
                                                      ProfilePic = r.ProfilePic,
                                                      Video1 = r.Video1,
                                                      Video2 = r.Video2,
                                                      Video3 = r.Video3,
                                                      Comment = r.Comment,
                                                      Death_date = r.Death_date,
                                                      Writer = r.Writer,
                                                      Lesson_info = r.Lesson_info,
                                                      Title = r.Title,
                                                      Publish = r.Publish == null ? 0 : (int)r.Publish,
                                                      CategoryName = "",
                                                      CategoriesList = (from q in context.Art_Cat
                                                                        where q.ArticleId == r.ArticleId
                                                                        select new Bo.Art_Cat
                                                                        {
                                                                            ArticleId = r.ArticleId,
                                                                            text = q.Text,
                                                                            CategoryId = q.CategoryId == null ? 0 : (int)q.CategoryId
                                                                        }).ToList()
                                                  }).ToList();
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
        public static Result GetAllActiveArticles()
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Bo.Article> repResult = (from r in context.Article
                                                  where r.Type.Equals("Article")
                                                  && r.Publish == 1
                                                  select new Bo.Article
                                                  {
                                                      ArticleId = r.ArticleId,
                                                      Body = r.Body,
                                                      CategoryId = 0,
                                                      DatePublish = r.DatePublish == null ? DateTime.Now : (DateTime)r.DatePublish,
                                                      Last_edit = r.Last_edit == null ? DateTime.Now : (DateTime)r.Last_edit,
                                                      ProfilePic = r.ProfilePic,
                                                      Video1 = r.Video1,
                                                      Video2 = r.Video2,
                                                      Video3 = r.Video3,
                                                      Comment = r.Comment,
                                                      Death_date = r.Death_date,
                                                      Writer = r.Writer,
                                                      Lesson_info = r.Lesson_info,
                                                      Title = r.Title,
                                                      Publish = r.Publish == null ? 0 : (int)r.Publish,
                                                      CategoryName = "",
                                                      CategoriesList = (from q in context.Art_Cat
                                                                        where q.ArticleId == r.ArticleId
                                                                        select new Bo.Art_Cat
                                                                        {
                                                                            ArticleId = r.ArticleId,
                                                                            text = q.Text,
                                                                            CategoryId = q.CategoryId == null ? 0 : (int)q.CategoryId
                                                                        }).ToList()
                                                  }).ToList();
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
        public static Result UpdateArticleViews(int articleId)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Article articleRep = (from r in context.Article where r.ArticleId == articleId select r).FirstOrDefault();
                    if (articleRep != null)
                    {

                        articleRep.Views = articleRep.Views + 1; ;

                        context.Article.Attach(articleRep);
                        var entry = context.Entry(articleRep);
                        entry.Property(e => e.Views).IsModified = true;
                  
                        context.SaveChanges();
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

        //Recomm
        public static Result GetAllRecomm()
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Article> repResult = (from r in context.Article
                                               where r.Type.Equals("Recommendation")
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
        public static Result GetAllActiveRecomm()
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Article> repResult = (from r in context.Article
                                               where r.Type.Equals("Recommendation")
                                               && r.Publish == 1
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

                    if (categoryList != null)
                    {
                        foreach (Bo.Art_Cat item in categoryList)
                        {
                            Art_Cat artcat = new Art_Cat();
                            artcat.ArticleId = articleId;
                            artcat.Text = item.text;
                            artcat.CategoryId = item.CategoryId;
                            context.Art_Cat.Add(artcat);
                            context.SaveChanges();
                        }
                    }

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
                    if(list.Count == 0)
                    {
                        result.Data = null;
                    }
                    else
                    {
                        List<Bo.Art_Cat> boList = new List<Bo.Art_Cat>();
                        foreach(Art_Cat artcat in list)
                        {
                            Bo.Art_Cat catBo = new Bo.Art_Cat();
                            catBo.ArticleId = artcat.ArticleId == null? 0 : (int)artcat.ArticleId;
                            catBo.CategoryId = artcat.CategoryId == null ? 0 : (int)artcat.CategoryId;
                            catBo.text = artcat.Text;
                            //catBo.Id = artcat.Id;
                            boList.Add(catBo);
                        }
                        result.Data = boList;
                    }
               
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
        //carusel
        public static Result SaveCaruselArticles(List<Bo.Article> articles)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    context.Article.RemoveRange(context.Article.Where(x => x.Type.Equals("Carusel")));
                    context.SaveChanges();

                    foreach(Bo.Article articleBo in articles)
                    {
                        Article articleRep = new Article();
                        articleRep.Title = articleBo.Title;
                        articleRep.Type = "Carusel";
                        articleRep.Comment = articleBo.Comment;
                        articleRep.Writer = articleBo.Writer;
                        articleRep.Death_date = articleBo.Death_date;
                        articleRep.Lesson_info = articleBo.Lesson_info;
                        articleRep.ProfilePic = articleBo.ProfilePic;
                        articleRep.CategoryId = articleBo.CategoryId;
                        articleRep.CategoryName = articleBo.CategoryName;
                        articleRep.Publish = articleBo.Publish;
                        articleRep.Body = articleBo.Body;
                        articleRep.Image1 = articleBo.Image1;
                        articleRep.Video1 = articleBo.Video1;
                        articleRep.Video2 = articleBo.Video2;
                        articleRep.Video3 = articleBo.Video3;
                        articleRep.Last_edit = DateTime.Now;
                        articleRep.DatePublish = DateTime.Now;
                        context.Article.Add(articleRep);
                        context.SaveChanges();
                        result.Data = 0;
                    }
                }

                return result;
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
        public static Result GetCaruselArticles()
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Article> repResult = (from r in context.Article
                                               where r.Type.Equals("Carusel")
                                               select r).ToList();

                    if(repResult != null)
                    {
                        result.Data = repResult;
                        result.ErrorCode = 0;
                    }
                    else
                    {
                        result.ErrorCode = (int)ErrorEnumcs.NoData;
                        result.Data = null;
                    }
                }

                return result;
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
    }
}
