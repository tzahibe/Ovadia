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
    public class TrumaSerController : ControllerHelper
    {
        public ActionResult GetAllTActiveTruma()
        {
            Result result = TrumaLogic.GetAllTActiveTruma();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllTTruma()
        {
            Result result = isAllow();
            if (result.ErrorCode == 0)
            {
                 result = TrumaLogic.GetAllTruma();
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Save(Truma truma)
        {
            Result result = isAllow();
            if (result.ErrorCode == 0)
            {
                 result = TrumaLogic.Save(truma);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
