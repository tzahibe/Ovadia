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
        public static Result RenameCategoryName(int catId, string newName, bool isActive, string order)
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
                        if (order != null)
                            repResult.Cat_Order = order;
                        else
                            repResult.Cat_Order = "0";
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
                        enrty.Property(e => e.Cat_Order).IsModified = true;
                        enrty.Property(e => e.isActive).IsModified = true;
                        context.SaveChanges();
                        //result.ErrorCode = 0;
                        //result.Data = true;

                        result = UpadateArticles_Category(newName, catId);
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
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("CategoriesResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
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
                        newCatName.Cat_Order = "0";
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
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("CategoriesResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
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
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("CategoriesResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
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
                    result.Data = categoryList.OrderBy(x => int.Parse(x.Cat_Order)).ToList().Reverse<Repository.Categories>();
                    result.ErrorCode = 0;
                    return result;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("CategoriesResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
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
                    result.Data = categoryList.OrderBy(x => int.Parse(x.Cat_Order)).ToList().Reverse<Repository.Categories>();
                    result.ErrorCode = 0;
                    return result;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("CategoriesResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
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
                    var repResult = (from r in context.Categories
                                     orderby r.Cat_Order descending
                                     select r);
                    List<Repository.Categories> categoryList = repResult.ToList<Repository.Categories>();
                    //result.Data = categoryList.OrderBy(x => x.Cat_Order).ToList().Reverse<Repository.Categories>();
                    result.Data = categoryList;
                    result.ErrorCode = 0;
                    return result;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("CategoriesResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
        }
        public static Result AutoCompleteGetCategoriesByName(string name, int id = 0)
        {
            Result result = new Result();
            List<Bo.Art_Cat> catResult = new List<Bo.Art_Cat>();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    var repResult = (from r in context.Categories
                                     where r.Name.Contains(name)
                                     select r);
                    List<Repository.Categories> categoryList = repResult.ToList<Repository.Categories>();

                    for(int i=0; i<categoryList.Count; i++)
                    {
                        Bo.Art_Cat cat = new Bo.Art_Cat();
                        cat.text = categoryList[i].Name;
                        cat.CategoryId = categoryList[i].Id;
                        cat.ArticleId = id;
                        catResult.Add(cat);
                    }
                    result.ErrorCode = 0;
                    result.Data = catResult;
                    return result;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("CategoriesResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
        } //for autocomplete
        public static Result GetAllActiveCategories()
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    var repResult = (from r in context.Categories where r.isActive.HasValue && r.isActive == 1 select r );
                    List<Repository.Categories> categoryList = repResult.ToList<Repository.Categories>();
                    result.Data = categoryList.OrderBy(x => int.Parse(x.Cat_Order)).ToList().Reverse<Repository.Categories>();
                    result.ErrorCode = 0;

                    if(categoryList.Count > 0)
                    {
                        List<CategoryBo> listBo = new List<CategoryBo>();
                        foreach(Categories cat in categoryList)
                        {
                            CategoryBo catBo = new CategoryBo();
                            catBo.id = cat.Id;
                            catBo.isActive = cat.isActive == 1 ? true : false;
                            catBo.Name = cat.Name;
                            catBo.ParentId = cat.ParentId == null ? 0 : (int)cat.ParentId;
                            catBo.Cat_Order = cat.Cat_Order;
                            listBo.Add(catBo);
                        }

                        result.Data = listBo;
                    }
                    return result;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("CategoriesResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
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
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("CategoriesResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
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
                        cat.Cat_Order = "0";
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
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("CategoriesResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
        }
        public static Result UpadateArticles_Category(string newcat, int id)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {

                    List<Article> articleRep = (from r in context.Article where r.CategoryId == id select r).ToList();
                    if (articleRep != null)
                    {
                        for (int i = 0; i < articleRep.Count; i++)
                        {
                            articleRep[i].CategoryName = newcat;
                        }
                        context.SaveChanges();
                        result.ErrorCode = 0;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("CategoriesResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }

            return result;

        }

    }
}
