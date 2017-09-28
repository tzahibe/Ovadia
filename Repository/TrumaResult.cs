using Bo;
using BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public abstract class TrumaResult
    {
        public static Result Save(Truma truma)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    db_Truma trumaRep = (from r in context.db_Truma
                                           where r.Id == truma.Id
                                           select r).FirstOrDefault();

                    if (trumaRep != null)
                    {

                        trumaRep.Title = truma.Title;
                        trumaRep.Body = truma.Body;
                        truma.FullName = truma.FullName;
                        trumaRep.IsActive = truma.IsActive;
                        trumaRep.IsAlowComment = truma.IsAlowComment;
                        trumaRep.ProfilePic = truma.ProfilePic;
                        trumaRep.Total = truma.Total;
                        trumaRep.TotalMoney = truma.TotalMoney;
                        trumaRep.Truma_Type = truma.Truma_Type;
                        trumaRep.TextBeforeNames = truma.TextBeforeNames;
                        trumaRep.isPerPerson = truma.isPerPerson;

                        context.db_Truma.Attach(trumaRep);
                        var entry = context.Entry(trumaRep);
                        entry.Property(e => e.Body).IsModified = true;
                        entry.Property(e => e.isPerPerson).IsModified = true;
                        entry.Property(e => e.TextBeforeNames).IsModified = true;
                        entry.Property(e => e.FullName).IsModified = true;
                        entry.Property(e => e.IsActive).IsModified = true;
                        entry.Property(e => e.IsAlowComment).IsModified = true;
                        entry.Property(e => e.ProfilePic).IsModified = true;
                        entry.Property(e => e.Title).IsModified = true;
                        entry.Property(e => e.Total).IsModified = true;
                        entry.Property(e => e.TotalMoney).IsModified = true;
                        entry.Property(e => e.Truma_Type).IsModified = true;
                        context.SaveChanges();
                    }
                    else
                    {
                        //trumaRep = new db_Comment();
                        //trumaRep.Text = comment.Text;
                        //trumaRep.PublishDate = DateTime.Now;
                        //trumaRep.Show = comment.Show;
                        //context.db_Comment.Add(commentRep);
                        //context.SaveChanges();

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
                Logger.Write("TrumaResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
            return result;
        }
        public static Result GetAllTActiveTruma()
        {
            Result result = new Result();
            List<Truma> messagesResult = new List<Truma>();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<db_Truma> db_result = new List<db_Truma>();
                    db_result = (from r in context.db_Truma
                                 where r.IsActive == 1
                                 select r).ToList();
                   
                    result.Data = db_result;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("TrumaResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;

            }

            return result;
        }
        public static Result GetAllTTruma()
        {
            Result result = new Result();
            List<Truma> messagesResult = new List<Truma>();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<db_Truma> db_result = new List<db_Truma>();
                    db_result = (from r in context.db_Truma
                                 select r).ToList();

                    result.Data = db_result;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("TrumaResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;

            }

            return result;
        }
    }
}
