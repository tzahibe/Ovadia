using BL;
using Bo;
using OvaidaPro.App_Start;
using OvaidaPro.Filters;
using System.Net;
using System.Web.Http;
using System.Web.Mvc;

namespace OvaidaPro.Controllers
{
    public class EventController : ControllerHelper
    {
        public ActionResult GetAllEvents()
        {
            isAllow();
            Result result = Event_Logic.GetEvents();
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult GetActiveEvents()
        {
            Result result = Event_Logic.GetActiveEvents();
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetActiveFixedEvents()
        {
            Result result = Event_Logic.GetActiveFixedEvents();
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult GetWeekEvents()
        {
            Result result = Event_Logic.GetWeekEvents();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllFixedEvents()
        {
            Result result = Event_Logic.GetFixedEvents();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddEvent(Event eventObj)
        {
            isAllow();
            Result result = Event_Logic.AddEvent(eventObj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult RemoveEvent(int eventId)
        {
            isAllow();
            Result result = Event_Logic.RemoveEvent(eventId);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UpdateEvent(Event eventObj)
        {
            isAllow();
            Result result = Event_Logic.UpdateEvent(eventObj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
