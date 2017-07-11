using Bo;
using System;
using Repository;
using System.Collections.Generic;

namespace BL
{
    public abstract class Event_Logic
    {

        public static Result GetActiveFixedEvents()
        {
            Result result = new Result();
            result = EventResult.GetActiveFixedEvents();
            result = TranslateEventsToBO(result);

            return result;
        }
        public static Result GetEvents()
        {
            Result result = new Result();
            result =  EventResult.GetEvents();
            result = TranslateEventsToBO(result);

            return result;
        }
        public static Result GetActiveEvents()
        {
            Result result = new Result();
            result = EventResult.GetActiveEvents();
            result = TranslateEventsToBO(result);

            return result;
        }
        public static Result GetFixedEvents()
        {
            Result result = new Result();
            result = EventResult.GetFixedEvents();
            result = TranslateEventsToBO(result);
            return result;
        }
        public static Result GetWeekEvents()
        {
            AddToDic();
            Result result = new Result();

            try
            {
                result = EventResult.GetActiveEvents();
                result = TranslateEventsToBO(result);

                DateTime today = DateTime.Today;
                WeekEventsResult weekResult = new WeekEventsResult();
                weekResult.Day_1 = new List<Event>();
                weekResult.Day_2 = new List<Event>();
                weekResult.Day_3 = new List<Event>();

                List<Event> resultBo = (List<Event>)result.Data;

                for (int i = 0; i < resultBo.Count; i++)
                {
                    if (DateTime.Parse(resultBo[i].Date) == today)
                    {
                        weekResult.Day_1.Add(resultBo[i]);
                    }
                    else if (DateTime.Parse(resultBo[i].Date) == today.AddDays(1))
                    {
                        weekResult.Day_2.Add(resultBo[i]);
                    }
                    else if (DateTime.Parse(resultBo[i].Date) == today.AddDays(2))
                    {
                        weekResult.Day_3.Add(resultBo[i]);
                    }
                }

                //adding fixed events 
                result = EventResult.GetActiveFixedEvents();
                TranslateEventsToBO(result);
                resultBo = (List<Event>)result.Data;

                for (int i = 0; i < resultBo.Count; i++)
                {
                    if (Consts.od[today.DayOfWeek.ToString()].Equals(resultBo[i].Date)) //day_1
                    {
                        weekResult.Day_1.Add(resultBo[i]);
                    }
                    else if (Consts.od[today.AddDays(1).DayOfWeek.ToString()].Equals(resultBo[i].Date)) //day_2
                    {
                        weekResult.Day_2.Add(resultBo[i]);
                    }
                    else if (Consts.od[today.AddDays(2).DayOfWeek.ToString()].Equals(resultBo[i].Date)) //day_3
                    {
                        weekResult.Day_3.Add(resultBo[i]);
                    }
                }
                result.ErrorCode = 0;
                result.Data = weekResult;

            }
            catch (Exception ex)
            {
                result.ErrorCode = 1;
                LoggerLogic.Write("MessageResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }
            
            return result;
        }
        public static Result AddEvent(Event eventObj)
        {
            Result result = new Result();
            result = EventResult.AddEvent(eventObj);
            result = TranslateEventToBO(result);
            return result;
        }
        public static Result RemoveEvent(int eventId)
        {
            Result result = new Result();
            result =  EventResult.RemoveEvent(eventId);
            //result = TranslateEventToBO(result);
            return result;
        }
        public static Result UpdateEvent(Event eventObj)
        {
            Result result = new Result();
            result = EventResult.UpdateEvent(eventObj);
            //result = TranslateEventToBO(result);
            return result;

        }

        //private section
        private static Result TranslateEventToBO(Result result)
        {
            return result;
        }
        private static Result TranslateEventsToBO(Result result)
        {
            if (result.ErrorCode == 0 && result.Data != null) {
                List<Event> events = new List<Event>();
                List<db_Event> repo_event = (List<db_Event>)result.Data;

                for (int i = 0; i < repo_event.Count; i++)
                {
                    Event eventBo = new Event();
                    eventBo.Event_Id = repo_event[i].eventId;
                    eventBo.Event_Name = repo_event[i].event_name;
                    eventBo.Fixed = repo_event[i].@fixed;
                    eventBo.From_Hour = repo_event[i].from_hour;
                    eventBo.From_Minutes = repo_event[i].from_minutes;
                    eventBo.Full_Date = repo_event[i].full_date;
                    eventBo.Date = repo_event[i].event_date;
                    eventBo.ID = repo_event[i].ID;
                    eventBo.Status = repo_event[i].event_status;
                    eventBo.To_Hour = repo_event[i].to_hour;
                    eventBo.To_Minutes = repo_event[i].to_minutes;
                    eventBo.Comment = repo_event[i].comment;
                    events.Add(eventBo);
                }

                result.Data = events;
            }

            return result;
        }
        private static void AddToDic()
        {
            if(Consts.od["Sunday"] == null)
            {
                Consts.od.Add("Sunday", "ראשון");
                Consts.od.Add("Monday", "שני");
                Consts.od.Add("Tuesday", "שלישי");
                Consts.od.Add("Wednesday", "רביעי");
                Consts.od.Add("Thursday", "חמישי");
                Consts.od.Add("Friday", "שישי");
                Consts.od.Add("Saturday", "שבת");
            }
        }
    }
}
 