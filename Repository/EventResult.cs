using Bo;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public abstract class EventResult
    {
        public static Result GetEvents() {
            Result result = new Result();
            List <Event> eventsResult = new List<Event>();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Repository.db_Event> db_result = new List<Repository.db_Event>();
                   
                    db_result = (from r in context.db_Event where r.@fixed != "1" select r).ToList();
                    if (db_result.Count > 1)
                    {
                        result.Data = db_result.OrderBy(x => DateTime.Parse(x.event_date)).ToList();
                    }
                    else
                    {
                        result.Data = db_result.ToList();
                    }

                    result.ErrorCode = 0;
                }
            }
            catch(Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("EventResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
                
            }

            return result;
        }
        public static Result GetActiveEvents()
        {
            Result result = new Result();
            List<Event> eventsResult = new List<Event>();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Repository.db_Event> db_result = new List<Repository.db_Event>();
                    db_result = (from r in context.db_Event
                                 where !r.@fixed.Equals("1") && r.event_status.Equals("1") select r).ToList();
                    result.Data = db_result.OrderBy(x => DateTime.Parse(x.event_date)).ToList();
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("EventResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;

            }

            return result;
        }
        public static Result AddEvent(Event eventObj)
        {
            Result result = new Result();
            Repository.db_Event repo_event = new db_Event();

            repo_event.eventId = eventObj.Event_Id;
            repo_event.event_date = eventObj.Date;
            repo_event.event_name = eventObj.Event_Name;
            repo_event.event_status = eventObj.Status;
            repo_event.@fixed = eventObj.Fixed;
            repo_event.from_hour = eventObj.From_Hour;
            repo_event.from_minutes = eventObj.From_Minutes;
            repo_event.to_minutes = eventObj.To_Minutes;
            repo_event.to_hour = eventObj.To_Hour;
            repo_event.full_date = eventObj.Full_Date;

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    context.db_Event.Add(repo_event);
                    context.SaveChanges();
                    result.ErrorCode = 0;
                    eventObj.ID = repo_event.ID;
                    result.Data = eventObj;
                }
            }
            catch(Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("EventResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }
        public static Result RemoveEvent(int eventId)
        {
            Result result = new Result();
           
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.db_Event db_result = new db_Event();
                    db_result = (from r in context.db_Event where r.ID == eventId select r).FirstOrDefault();

                    context.db_Event.Attach(db_result);
                    context.db_Event.Remove(db_result);
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
                Logger.Write("EventResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }
        public static Result UpdateEvent(Event eventObj)
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.db_Event db_event = new db_Event();
                    db_event = (from r in context.db_Event where r.ID == eventObj.ID select r).FirstOrDefault();

                    db_event.eventId = eventObj.ID;
                    db_event.event_date = eventObj.Date;
                    db_event.event_name = eventObj.Event_Name;
                    db_event.event_status = eventObj.Status;
                    db_event.from_hour = eventObj.From_Hour;
                    db_event.from_minutes = eventObj.From_Minutes;
                    db_event.full_date = eventObj.Full_Date;
                    db_event.to_hour = eventObj.To_Hour;
                    db_event.to_minutes = eventObj.To_Minutes;
                    db_event.comment = eventObj.Comment;

                    context.db_Event.Attach(db_event);
                    var entry = context.Entry(db_event);
                    entry.Property(e => e.comment).IsModified = true;
                    entry.Property(e => e.eventId).IsModified = true;
                    entry.Property(e => e.event_date).IsModified = true;
                    entry.Property(e => e.event_name).IsModified = true;
                    entry.Property(e => e.event_status).IsModified = true;
                    entry.Property(e => e.from_hour).IsModified = true;
                    entry.Property(e => e.from_minutes).IsModified = true;
                    entry.Property(e => e.ID).IsModified = true;
                    entry.Property(e => e.full_date).IsModified = true;
                    entry.Property(e => e.to_hour).IsModified = true;
                    entry.Property(e => e.to_minutes).IsModified = true;
                    context.SaveChanges();

                    result.ErrorCode = 0;
                    eventObj.ID = db_event.ID;
                    result.Data = eventObj;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("EventResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }

        /*--- Fixed Events--- */
        public static Result GetFixedEvents()
        {
            Result result = new Result();
            List<Event> eventsResult = new List<Event>();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Repository.db_Event> db_result = new List<Repository.db_Event>();
                    db_result = (from r in context.db_Event where r.@fixed.Equals("1") select r).ToList();
                    result.Data = db_result;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("EventResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;

            }

            return result;
        }
        public static Result GetActiveFixedEvents()
        {
            Result result = new Result();
            List<Event> eventsResult = new List<Event>();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Repository.db_Event> db_result = new List<Repository.db_Event>();
                    db_result = (from r in context.db_Event
                                 where r.@fixed.Equals("1") && r.event_status.Equals("1") select r).ToList();
                    result.Data = db_result;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("EventResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;

            }

            return result;
        }
    }
}
