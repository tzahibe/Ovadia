using Bo;
using BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public static class SidurResult
    {

        public static Result EditCategory(Sidur sidur)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Sidur1 categoryRep = (from r in context.Sidur1 where r.Id == sidur.Id select r).FirstOrDefault();
                    if (categoryRep != null)
                    {

                        categoryRep.Title = sidur.Title;
                        categoryRep.ProfilePic = sidur.ProfilePic;
                        categoryRep.Publish = sidur.Publish;
                        categoryRep.isCategory = sidur.isCategory;
                        categoryRep.Body = sidur.Body;
                        categoryRep.Parent = sidur.Parent;

                        context.Sidur1.Attach(categoryRep);
                        var entry = context.Entry(categoryRep);
                        entry.Property(e => e.Title).IsModified = true;
                        entry.Property(e => e.ProfilePic).IsModified = true;
                        entry.Property(e => e.Publish).IsModified = true;
                        entry.Property(e => e.isCategory).IsModified = true;
                        entry.Property(e => e.Body).IsModified = true;
                        entry.Property(e => e.Publish).IsModified = true;
                        context.SaveChanges();
                        result.Data = categoryRep;
                        return result;
                    }
                    else
                    {
                        categoryRep = new Sidur1();
                        categoryRep.Title = sidur.Title;
                        categoryRep.ProfilePic = sidur.ProfilePic;
                        categoryRep.Publish = sidur.Publish;
                        categoryRep.isCategory = sidur.isCategory;
                        categoryRep.Body = sidur.Body;
                        categoryRep.Parent = sidur.Parent;

                        context.Sidur1.Attach(categoryRep);
                        var entry = context.Entry(categoryRep);
                        entry.Property(e => e.Title).IsModified = true;
                        entry.Property(e => e.ProfilePic).IsModified = true;
                        entry.Property(e => e.Publish).IsModified = true;
                        entry.Property(e => e.isCategory).IsModified = true;
                        entry.Property(e => e.Body).IsModified = true;
                        entry.Property(e => e.Publish).IsModified = true;
                        context.SaveChanges();
                        result.Data = categoryRep;
                        return result;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("SidurResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
        }
        public static Result AddCategory(Sidur sidur)
        {

            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Sidur1 sidurRep = (from r in context.Sidur1 where r.Id.Equals(sidur.Id) select r).FirstOrDefault();
                    if (sidurRep == null)
                    {
                        sidurRep = new Sidur1();
                        sidurRep.Title = sidur.Title;
                        sidurRep.ProfilePic = sidur.ProfilePic;
                        sidurRep.Publish = sidur.Publish;
                        sidurRep.Body = sidur.Body;
                        sidurRep.isCategory = sidur.isCategory;
                        sidurRep.Parent = sidur.Parent;
                        sidurRep.Views = 0;
                        context.Sidur1.Add(sidurRep);
                        context.SaveChanges();
                        result.Data = sidurRep;
                        return result;
                    }
                    else
                    {
                        sidurRep.Title = sidur.Title;
                        sidurRep.ProfilePic = sidur.ProfilePic;
                        sidurRep.Publish = sidur.Publish;
                        sidurRep.isCategory = sidur.isCategory;
                        sidurRep.Body = sidur.Body;
                        sidurRep.Parent = sidur.Parent;

                        context.Sidur1.Attach(sidurRep);
                        var entry = context.Entry(sidurRep);
                        entry.Property(e => e.Title).IsModified = true;
                        entry.Property(e => e.ProfilePic).IsModified = true;
                        entry.Property(e => e.Publish).IsModified = true;
                        entry.Property(e => e.isCategory).IsModified = true;
                        entry.Property(e => e.Body).IsModified = true;
                        entry.Property(e => e.Parent).IsModified = true;
                        entry.Property(e => e.Publish).IsModified = true;
                        context.SaveChanges();
                        result.Data = sidurRep;
                        return result;
                    }

                }
            }
            catch (Exception ex)
            {
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("SidurResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                result.ErrorCode = 1;
                result.Data = true;
                return result;
            }
        }
        public static Result RemoveSidurCategory(int id)
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.Sidur1  
                        db_result = (from r in context.Sidur1 where r.Id == id select r).FirstOrDefault();

                    context.Sidur1.Attach(db_result);
                    context.Sidur1.Remove(db_result);
                    context.SaveChanges();
                    result.ErrorCode = 0;
                    result.Data = db_result;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("SidurResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }
        public static Result GetCateogires()
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Sidur1> categories = (from r in context.Sidur1
                                               where r.isCategory == 1
                                               select r).ToList<Sidur1>();

                    result.Data = categories;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("SidurResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
            return result;
        }
        public static Result GetsSubCateogires(int parentId)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Sidur1> categories = (from r in context.Sidur1
                                               where r.isCategory == 1
                                               && r.Parent == parentId
                                               select r).ToList<Sidur1>();

                    result.Data = categories;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("SidurResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
            return result;
        }
        public static Result GetAllSidurTfilot()
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Sidur1> categories = (from r in context.Sidur1
                                               where r.isCategory == 0
                                               select r).ToList<Sidur1>();

                    result.Data = categories;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("SidurResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
            return result;

        }
        public static Result GetAll()
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Sidur1> categories = (from r in context.Sidur1
                                               select r).ToList<Sidur1>();

                    result.Data = categories;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("SidurResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
            return result;
        }

    }
}
