using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BL;
using Bo;
using OvaidaPro.App_Start;

namespace OvaidaPro.Controllers
{
    public class CategorySerController : ControllerHelper
    {
        // GET: CategorySer

        public ActionResult GetAllActiveCategoriesAcceptId(int Id)
        {
            Result resultToClient = CategoriesLogic.GetAllActiveCategoriesAcceptId(Id);
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllParentCategories()
        {
            Result resultToClient = CategoriesLogic.GetAllParentCategories();
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }
        public ActionResult isCategoryExist(string catName)
        {
            Result resultToClient = CategoriesLogic.isCategoryExist(catName);
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllChildrensCategoriesById(int catId)
        {
            Result resultToClient = CategoriesLogic.GetAllChildrensCategoriesById(catId);
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllCategories()
        {
            Result resultToClient = CategoriesLogic.GetAllCategories();
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AutoCompleteGetCategoriesByName(string name, int id = 0)
        {
            Result resultToClient = CategoriesLogic.AutoCompleteGetCategoriesByName(name, id);
            return Json(resultToClient.Data, JsonRequestBehavior.AllowGet);
        }
        //Admin
        public ActionResult RenameCategoryName(int catId, string newName, bool isActive, string order, bool isTag)
        {
            Result resultToClient = isAllow();
            if (resultToClient.ErrorCode == 0)
            {
                int tag = isTag ? 1 : 0;

                 resultToClient = CategoriesLogic.RenameCategoryName(catId, newName, isActive, order, tag);

                if (resultToClient.ErrorCode == 0)
                {
                    resultToClient = CategoriesLogic.GetAllParentCategories();
                }
            }
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }
        public ActionResult RenameSubCategoryName(int parentId, int catId, string newName, bool isActive, string order, bool isTag)
        {

            Result resultToClient = isAllow();
            if (resultToClient.ErrorCode == 0)
            {
                int tag = isTag ? 1 : 0;
                 resultToClient = CategoriesLogic.RenameCategoryName(catId, newName, isActive, order, tag);

                if (resultToClient.ErrorCode == 0)
                {
                    resultToClient = CategoriesLogic.GetAllChildrensCategoriesById(parentId);
                }
            }
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddCategory(string catName, bool isActive, bool isTag)
        {
            Result resultToClient = isAllow();
            if (resultToClient.ErrorCode == 0)
            {
                int tag = isTag ? 1 : 0;

                 resultToClient = CategoriesLogic.AddCategory(catName, isActive, tag);

                if (resultToClient.ErrorCode == 0)
                {
                    resultToClient = CategoriesLogic.GetAllParentCategories();
                }
            }
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddSubCategory(string catName, int parentId, bool isActive, bool  isTag)
        {
            Result resultToClient = isAllow();
            if (resultToClient.ErrorCode == 0)
            {
                int tag = isTag ? 1 : 0;

                 resultToClient = new Result();

                resultToClient = CategoriesLogic.AddSubCategory(catName, parentId, isActive, tag);

                if (resultToClient.ErrorCode == 0)
                {
                    resultToClient = CategoriesLogic.GetAllChildrensCategoriesById(parentId);
                }
            }
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }
        public ActionResult RemoveCategoryById(int catId)
        {
            Result resultToClient = isAllow();
            if (resultToClient.ErrorCode == 0)
            {
                 resultToClient = CategoriesLogic.RemoveCategoryById(catId);

                if (resultToClient.ErrorCode == 0)
                {
                    resultToClient = CategoriesLogic.GetAllParentCategories();
                }
            }
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllActiveCategories()
        {
            Result resultToClient = CategoriesLogic.GetAllActiveCategories();

            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }
        public ActionResult RemoveSubCategoryById(int parentId, int catId)
        {
            Result resultToClient = isAllow();
            if (resultToClient.ErrorCode == 0)
            {
                 resultToClient = CategoriesLogic.RemoveCategoryById(catId);

                if (resultToClient.ErrorCode == 0)
                {
                    resultToClient = CategoriesLogic.GetAllChildrensCategoriesById(parentId);
                }
            }
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }

        //tags
        public ActionResult AddTag(string tagName)
        {
            Result resultToClient = isAllow();
            if (resultToClient.ErrorCode == 0)
            {
                 resultToClient = CategoriesLogic.AddTag(tagName);
            }
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }

        

    }
}
