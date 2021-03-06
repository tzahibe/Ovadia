﻿using Bo;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public abstract class CategoriesLogic
    {
        public static Result RenameCategoryName(int catId, string newName, bool isActive, string order, int isTag)
        {
            return CategoriesResult.RenameCategoryName(catId, newName, isActive, order, isTag);
        }
        public static Result AddCategory(string catName, bool isActive, int isTag)
        {
            return CategoriesResult.AddCategory(catName, isActive, isTag);
        }
        public static Result RemoveCategoryById(int catId)
        {
            return CategoriesResult.RemoveCategoryById(catId);
        }
        public static Result GetAllParentCategories(bool showTags = true)
        {
            return CategoriesResult.GetAllParentCategories(showTags);

        }
        public static Result GetAllChildrensCategoriesById(int catId, bool showTags = true)
        {
            return CategoriesResult.GetAllChildrensCategoriesById(catId, showTags);
        }
        public static Result GetAllCategories(bool showTags = true)
        {
            return CategoriesResult.GetAllCategories(showTags);
        }
        public static Result isCategoryExist(string catName)
        {
            return CategoriesResult.isCategoryExist(catName);

        }
        public static Result AutoCompleteGetCategoriesByName(string name, int id)
        {
            return CategoriesResult.AutoCompleteGetCategoriesByName(name, id);

        }
        public static Result AddSubCategory(string catName, int parentId, bool isActive, int isTag)
        {
            return CategoriesResult.AddSubCategory(catName, parentId, isActive, isTag);
        }
        public static Result GetAllActiveCategories()
        {
            return CategoriesResult.GetAllActiveCategories();
        }
        public static Result GetAllActiveCategoriesAcceptId(int id)
        {
            Result result = new Result();
            result =  CategoriesResult.GetAllActiveCategories();

            if(result.ErrorCode == 0)
            {
                List<CategoryBo> list = (List<CategoryBo>)result.Data;
                list = list.Where(i => i.isActive == true && i.ParentId == 0
                && i.Id != id
                ).ToList<CategoryBo>();
                result.Data = list;
            }
            else
            {
                LoggerLogic.Write("CategoriesLogic.cs", "bad result GetAllActiveCategoriesAcceptId(int id)",
                 "", DateTime.Now);
                result.ErrorCode = 1;
            }

            return result;
        }


        //tags
        public static Result AddTag(string tagName)
        {
            return CategoriesResult.AddTag(tagName, true);
        }

    }
}
