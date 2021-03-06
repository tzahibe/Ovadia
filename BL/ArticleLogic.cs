﻿using Bo;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public abstract class ArticleLogic
    {
        public static Result AddArticle(Bo.Article article)
        {
            Result result = new Result();
            result = ArticleResult.AddArticle(article);
            return result;
        }
        public static Result EditArticle(Bo.Article article)
        {
            Result result = new Result();
            result = ArticleResult.EditArticle(article);
            return result;
        }
        public static Result RemoveArticleById(int articleId)
        {
            Result result = new Result();
            result = ArticleResult.RemoveArticleById(articleId);
            return result;
        }
        public static Result GetArticleById(int articleId)
        {
            Result result = new Result();
            result = ArticleResult.GetArticleById(articleId);

            if (result.ErrorCode == 0 && result.Data != null)
            {
                Bo.Article article = (Bo.Article)result.Data;
                result = GetArtCat(articleId);
                if (result.ErrorCode == 0 && result.Data != null)
                {
                    article.CategoriesList = (List<Bo.Art_Cat>)result.Data;
                }
                result.Data = article;
            }

            return result;
        }
        public static Result GetAllArticles()
        {
            Result result = new Result();
            result = ArticleResult.GetAllArticles();
            return result;
        }
        public static Result GetAllActiveArticles()
        {
            Result result = new Result();
            result = ArticleResult.GetAllActiveArticles();
            return result;
        }
        public static Result GetArticlesByCategoryId(int categoryId)
        {
            Result result = new Result();
            result = ArticleResult.GetArticlesByCategoryId(categoryId);
            return result;
        }
        public static Result GetNewActiveArticles()
        {
            Result result = new Result();
            result = ArticleResult.GetNewActiveArticles();

            return result;
        }
        public static Result GetArtCat(int articleId)
        {
            Result result = new Result();
            result = ArticleResult.GetArtCat(articleId);
            return result;
        }

        public static Result UpdateArticleViews(int articleId)
        {
            Result result = new Result();
            result = ArticleResult.UpdateArticleViews(articleId);
            return result;
        }
        //carusel
        public static Result SaveCaruselArticles(List<Bo.Article> articles)
        {
            Result result = new Result();
            result = ArticleResult.SaveCaruselArticles(articles);
            return result;
        }
        public static Result GetCaruselArticles()
        {
            Result result = new Result();
            result = ArticleResult.GetCaruselArticles();
            return result;
        }

    }
}
