using Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public abstract class TfilaResult
    {
        public static Result AddTfila(Bo_Tfila Tfila)
        {
            Result result = new Result();
            Repository.Tfila repo_tfila = new Tfila();

            repo_tfila.Min = Tfila.Min.Trim();
            repo_tfila.Hour = Tfila.Hour.Trim();
            repo_tfila.Name = Tfila.Name.Trim();
            repo_tfila.Order1 = Tfila.Order1;
            repo_tfila.Time = Tfila.Time;

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.Tfila db_result = new Tfila();

                    db_result = (from r in context.Tfila
                                 where r.Name.Equals(Tfila.Name)
                                 select r).FirstOrDefault();

                    if (db_result != null)
                    {
                        result.ErrorCode = 2;
                        result.Data = Tfila;
                        return result;
                    }
                    context.Tfila.Add(repo_tfila);
                    context.SaveChanges();
                    Tfila.ID = repo_tfila.ID;
                    result.ErrorCode = 0;
                    result.Data = Tfila;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;

                Logger.Write("TfilaResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }
        public static Result RemoveTfila(int ID)
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.Tfila db_result = new Tfila();
                    db_result = (from r in context.Tfila where r.ID == ID select r).FirstOrDefault();

                    context.Tfila.Attach(db_result);
                    context.Tfila.Remove(db_result);
                    context.SaveChanges();
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("TfilaResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }
        public static Result UpdateTfila(Bo_Tfila Tfila)
        {
            Result result = new Result();
            Repository.Tfila repo_tfila = new Tfila();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.Tfila db_result = new Tfila();

                    db_result = (from r in context.Tfila
                                 where r.ID == Tfila.ID
                                 select r).FirstOrDefault();

                    if (db_result != null)
                    {
                        db_result.Min = Tfila.Min.Trim();
                        db_result.Hour = Tfila.Hour.Trim();
                        db_result.Name = Tfila.Name.Trim();
                        db_result.Order1 = Tfila.Order1;
                        db_result.Time = Tfila.Time;

                        var entry = context.Entry(db_result);
                        entry.Property(e => e.Min).IsModified = true;
                        entry.Property(e => e.Name).IsModified = true;
                        entry.Property(e => e.Order1).IsModified = true;
                        entry.Property(e => e.Time).IsModified = true;
                        context.SaveChanges();
                        result.ErrorCode = 0;
                        result.Data = Tfila;
                    }
                    else
                    {
                        result.ErrorCode = 1;
                        result.Data = Tfila;
                    }
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;

                Logger.Write("TfilaResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }
        public static Result GetAllTfilot()
        {
            Result result = new Result();
            List<Message> messagesResult = new List<Message>();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Repository.Tfila> db_result = new List<Repository.Tfila>();
                    db_result = (from r in context.Tfila select r).ToList();

                    for(int i=0; i< db_result.Count; i++)
                    {
                        db_result[i].Hour = db_result[i].Hour.Trim();
                        db_result[i].Min = db_result[i].Min.Trim();
                    }
                    result.Data = db_result;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("TfilaResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;

            }

            return result;
        }
    }
}
