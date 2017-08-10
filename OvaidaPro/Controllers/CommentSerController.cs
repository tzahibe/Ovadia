using BL;
using Bo;
using BO;
using OvaidaPro.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OvaidaPro.Controllers
{
    public class CommentSerController : ControllerHelper
    {
        // GET: CommentSer
        public ActionResult Save(Comment comment)
        {
            isAllow();
            Result resultToClient = CommentLogic.Save(comment);
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetComment()
        {
            Result resultToClient = CommentLogic.GetComment();
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }

    }
}
