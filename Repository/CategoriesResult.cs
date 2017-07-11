using Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class CategoriesResult
    {
        public static Result RenameCategoryName(int catId, string newName, bool isActive)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Categories repResult = (from r in context.Categories where r.Id == catId select r).FirstOrDefault();
                    if (repResult != null)
                    {
                        repResult.Name = newName;
                        if (isActive)
                        {
                            repResult.isActive = 1;
                        }
                        else
                        {
                            repResult.isActive = 0;
                        }
                        context.Categories.Attach(repResult);
                        var enrty = context.Entry(repResult);
                        enrty.Property(e => e.Name).IsModified = true;
                        enrty.Property(e => e.isActive).IsModified = true;
                        context.SaveChanges();
                        result.ErrorCode = 0;
                        result.Data = true;
                        return result;
                    }
                    else
                    {
                        result.ErrorCode = 3; //categoryExist
                        result.ErrorMsg = "Category Not Exist";
                        return result;
                    }
                }
            }
            catch (Exception e)
            {
                result.Data = false;
                result.ErrorCode = 1;
                result.ErrorMsg = "נפילה ב RenameCategoryName";
                return result;
            }
        }
        public static Result AddCategory(string catName, bool isActive)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Categories repResult = (from r in context.Categories where r.Name.Equals(catName) select r).FirstOrDefault();
                    if (repResult == null)
                    {
                        Categories newCatName = new Categories();
                        newCatName.Name = catName;
                        newCatName.ParentId = 0;
                        if (isActive)
                        {
                            newCatName.isActive = 1;
                        }
                        else
                        {
                            newCatName.isActive = 0;
                        }
                        context.Categories.Add(newCatName);
                        context.SaveChanges();
                        result.ErrorCode = 0;
                        result.Data = true;
                        return result;
                    }
                    else
                    {
                        result.ErrorCode = 2; //categoryExist
                        result.ErrorMsg = "Category Already Exist!";
                        return result;
                    }
                }
            }
            catch (Exception e)
            {
                result.Data = false;
                result.ErrorCode = 1;
                result.ErrorMsg = "נפילה ב AddCategory";
                return result;
            }
        }
        public static Result RemoveCategoryById(int catId)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Categories repResult = (from r in context.Categories where r.Id == catId select r).FirstOrDefault();
                    if (repResult != null)
                    {
                        List<Repository.Categories> chidrenCategory =
                             (from r in context.Categories where r.ParentId == repResult.Id select r).ToList();
                        if (chidrenCategory.Count > 0)
                        {
                            foreach (Repository.Categories cat in chidrenCategory)
                            {
                                List<Repository.Categories> subChildrenCategory = (from r in context.Categories where r.ParentId == cat.Id select r).ToList();
                                foreach (Repository.Categories subCat in subChildrenCategory)
                                {
                                    context.Categories.Remove(subCat);
                                    context.SaveChanges();
                                }
                                context.Categories.Remove(cat);
                                context.SaveChanges();
                            }
                        }
                        context.Categories.Remove(repResult);
                        context.SaveChanges();
                        result.ErrorCode = 0;
                        result.Data = repResult;
                        return result;
                    }
                    else
                    {
                        result.ErrorCode = 3;
                        result.Data = repResult;
                        return result;
                    }
                }
            }
            catch (Exception e)
            {
                result.Data = false;
                result.ErrorCode = 1;
                result.ErrorMsg = "נפילה ב RemoveCategoryByName";
                return result;
            }
        }
        public static Result GetAllParentCategories()
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    var repResult = (from r in context.Categories where r.ParentId == 0 select r);
                    List<Repository.Categories> categoryList = repResult.ToList<Repository.Categories>();
                    result.Data = categoryList;
                    result.ErrorCode = 0;
                    return result;
                }
            }
            catch (Exception e)
            {
                result.ErrorCode = 1;
                result.ErrorMsg = "נפילה ב GetAllCategories";
                return result;
            }

        }
        public static Result GetAllChildrensCategoriesById(int catId)
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    var repResult = (from r in context.Categories where r.ParentId == catId select r);
                    List<Repository.Categories> categoryList = repResult.ToList<Repository.Categories>();
                    result.Data = categoryList;
                    result.ErrorCode = 0;
                    return result;
                }
            }
            catch (Exception e)
            {
                result.ErrorCode = 1;
                result.ErrorMsg = "נפילה ב GetAllCategories";
                return result;
            }
        }
        public static Result GetAllCategories()
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    var repResult = (from r in context.Categories select r);
                    List<Repository.Categories> categoryList = repResult.ToList<Repository.Categories>();
                    result.Data = categoryList;
                    result.ErrorCode = 0;
                    return result;
                }
            }
            catch (Exception e)
            {
                result.ErrorCode = 1;
                result.ErrorMsg = "נפילה ב GetAllCategories";
                return result;
            }
        }
        public static Result isCategoryExist(string catName)
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    var repResult = (from r in context.Categories where r.Name.Equals(catName) select r).FirstOrDefault();
                    if (repResult == null)
                    {
                        result.Data = false;
                    }
                    else
                    {
                        result.Data = true;
                    }

                    result.ErrorCode = 0;
                    return result;
                }
            }
            catch (Exception e)
            {
                result.ErrorMsg = "Expetion on isCategoryExist function";
                result.ErrorCode = 1;
                return result;
            }

        }
        public static Result AddSubCategory(string catName, int parentId, bool isActive)
        {
            Result result = new Result();
            bool flag = Convert.ToBoolean(isCategoryExist(catName).Data);
            try
            {
                if (flag == false) //cat not exist
                {
                    using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                    {
                        Categories cat = new Categories();
                        cat.Name = catName;
                        cat.ParentId = parentId;
                        if (isActive)
                        {
                            cat.isActive = 1;
                        }
                        else
                        {
                            cat.isActive = 0;
                        }
                        context.Categories.Add(cat);
                        context.SaveChanges();
                        result.ErrorCode = 0;
                        result.Data = true;
                        return result;
                    }

                }
                else
                {
                    result.ErrorCode = 2;
                    result.Data = false;
                    return result;
                }
            }
            catch (Exception e)
            {
                result.ErrorCode = 1;
                result.ErrorMsg = "נפילה ב AddSubCategory Repository";
                result.Data = false;
                return result;
            }
        }
    }
}
