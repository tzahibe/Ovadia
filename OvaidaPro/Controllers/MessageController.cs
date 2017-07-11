using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Bo;
using BL;
using OvaidaPro.App_Start;

namespace OvaidaPro.Controllers
{
    public class MessageController : ControllerHelper
    {
        // GET: Message
        public JsonResult SendMail(MessageSend MessageSend)
        {
            isAllow();
            Result result = new Result();
            Message_Logic.SendMsg(MessageSend);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddEmail(Message msg)
        {
            Result result = Message_Logic.AddEmail(msg);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult RemoveEmail(int msgId)
        {
            isAllow();
            Result result = Message_Logic.RemoveEmail(msgId);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult RemoveEmailByToken(int msgId, string token)
        {
            Result result = Message_Logic.RemoveEmailByToken(msgId,token);
            if(result.ErrorCode == 0)
            {
                return Redirect("/pages/removeEmail.html");
            }
            else
            {
                return Redirect("/pages/errorRemoveMail.html");
            }
        }
        public JsonResult GetAllMembers()
        {
            isAllow();
            Result result = Message_Logic.GetAllMembers();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        // GET: Message/Details/5
    }
}
