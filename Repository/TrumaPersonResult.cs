using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO;
using Bo;

namespace Repository
{
    public abstract class TrumaPersonResult
    {
        public static Result Save(TrumaPerson truma)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    db_TrumaPerson trumaRep = (from r in context.db_TrumaPerson
                                               where r.Id == truma.Id
                                               select r).FirstOrDefault();

                    if (trumaRep != null)
                    {

                        trumaRep.Address = truma.Address;
                        trumaRep.City = truma.City;
                        trumaRep.Step = "1";
                        truma.Comment = truma.Comment;
                        trumaRep.Cur = truma.Cur;
                        trumaRep.Donates = truma.Donates;
                        trumaRep.Email = truma.Email;
                        trumaRep.ExpDate = truma.ExpDate;
                        trumaRep.FlatNumber = truma.FlatNumber;
                        trumaRep.Lesson_date = DateTime.Now;
                        DateTime myDate;
                        if (DateTime.TryParse(truma.Lesson_date, out myDate))
                        {
                            trumaRep.Lesson_date = myDate;
                        }
                        trumaRep.Lesson_Name = truma.Lesson_Name;
                        trumaRep.NumberId = truma.NumberId;
                        trumaRep.PayDate = DateTime.Now;
                        if (DateTime.TryParse(truma.Lesson_date, out myDate))
                        {
                            trumaRep.PayDate = myDate;
                        }
                        trumaRep.Payment_FullName = truma.Payment_FullName;
                        trumaRep.Phone1 = truma.Phone1;
                        trumaRep.State = truma.State;
                        trumaRep.Total = truma.Total;
                        trumaRep.Type = truma.Type;

                        context.db_TrumaPerson.Attach(trumaRep);
                        var entry = context.Entry(trumaRep);
                        entry.Property(e => e.Address).IsModified = true;
                        entry.Property(e => e.City).IsModified = true;
                        entry.Property(e => e.Step).IsModified = true;
                        entry.Property(e => e.Comment).IsModified = true;
                        entry.Property(e => e.Cur).IsModified = true;
                        entry.Property(e => e.Donates).IsModified = true;
                        entry.Property(e => e.Email).IsModified = true;
                        entry.Property(e => e.ExpDate).IsModified = true;
                        entry.Property(e => e.FlatNumber).IsModified = true;
                        entry.Property(e => e.Lesson_date).IsModified = true;
                        entry.Property(e => e.Lesson_Name).IsModified = true;
                        entry.Property(e => e.NumberId).IsModified = true;
                        entry.Property(e => e.PayDate).IsModified = true;
                        entry.Property(e => e.Payment_FullName).IsModified = true;
                        entry.Property(e => e.Phone1).IsModified = true;
                        entry.Property(e => e.State).IsModified = true;
                        entry.Property(e => e.Total).IsModified = true;
                        entry.Property(e => e.Type).IsModified = true;
                        context.SaveChanges();
                    }
                    else
                    {
                        trumaRep = new db_TrumaPerson();
                        trumaRep.Address = truma.Address;
                        trumaRep.City = truma.City;
                        trumaRep.Step = "1";
                        trumaRep.Comment = truma.Comment;
                        trumaRep.Cur = truma.Cur;
                        trumaRep.Donates = truma.Donates;
                        trumaRep.Email = truma.Email;
                        trumaRep.ExpDate = truma.ExpDate;
                        trumaRep.FlatNumber = truma.FlatNumber;
                        trumaRep.Lesson_date = DateTime.Now;
                        DateTime myDate;
                        if (DateTime.TryParse(truma.Lesson_date, out myDate))
                        {
                            trumaRep.Lesson_date = myDate;
                        }
                        trumaRep.Lesson_Name = truma.Lesson_Name;
                        trumaRep.NumberId = truma.NumberId;
                        trumaRep.PayDate = new DateTime();
                        trumaRep.PayDate = DateTime.Now;
                        trumaRep.Payment_FullName = truma.Payment_FullName;
                        trumaRep.Phone1 = truma.Phone1;
                        trumaRep.State = truma.State;
                        trumaRep.Total = truma.Total;
                        trumaRep.Type = truma.Type;

                        context.db_TrumaPerson.Add(trumaRep);
                        context.SaveChanges();

                    }

                    result.Data = trumaRep;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("TrumaPersonResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
            return result;
        }
        public static Result PaySucceed(int id)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    db_TrumaPerson trumaRep = (from r in context.db_TrumaPerson
                                               where r.Id == id
                                               select r).FirstOrDefault();

                    trumaRep.Step = "3";
                    var entry = context.Entry(trumaRep);
                    entry.Property(e => e.Step).IsModified = true;
                    result.ErrorCode = 0;
                    context.SaveChanges();
                }
            }
            catch(Exception ex)
            {
                result.Data = false;
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("TrumaPersonResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }

            return result;
        }
        public static Result PayFailed(int id)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    db_TrumaPerson trumaRep = (from r in context.db_TrumaPerson
                                               where r.Id == id
                                               select r).FirstOrDefault();

                    trumaRep.Step = "2";
                    var entry = context.Entry(trumaRep);
                    entry.Property(e => e.Step).IsModified = true;
                    result.ErrorCode = 0;
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("TrumaPersonResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }

            return result;
        }
        public static Result Get(int Id)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    db_TrumaPerson trumaRep = (from r in context.db_TrumaPerson
                                               where r.Id == Id
                                               select r).FirstOrDefault();

                    if (trumaRep != null)
                    {
                        result.Data = trumaRep;
                        result.ErrorCode = 0;
                    }
                    else
                    {
                        result.Data = trumaRep;
                        result.ErrorCode = (int)ErrorEnumcs.NoData;
                    }

                  
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("TrumaPersonResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
            return result;
        }
        public static Result SmallGet()
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    TrumaPersonSmall trumaPersonSmall = (from r in context.db_TrumaPerson
                                               select new TrumaPersonSmall
                                               {
                                                   Id = r.Id,
                                                   Type = r.Type == null ? 0 : (int)r.Type,
                                                   Lesson_date = r.Lesson_date == null ?  DateTime.Now.ToString("yyyyMMddHHmmss") : r.Lesson_date.Value.ToString("yyyyMMddHHmmss"),
                                                   Donates = r.Donates,
                                                   Email = r.Email,
                                                   Lesson_Name = r.Lesson_Name
                                               }).FirstOrDefault();

                    if (trumaPersonSmall != null)
                    {
                        result.Data = trumaPersonSmall;
                        result.ErrorCode = 0;
                    }
                    else
                    {
                        result.Data = trumaPersonSmall;
                        result.ErrorCode = (int)ErrorEnumcs.NoData;
                    }


                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("TrumaPersonResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
            return result;
        }
    }
}
