﻿using BL;
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
    public class TrummaPersonSerController : ControllerHelper
    {
        public ActionResult PaySucceed(int Id)
        {
            Result result = TrumaPersonLogic.PaySucceed(Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PayFailed(int Id)
        {
            Result result = TrumaPersonLogic.PayFailed(Id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Save(TrumaPerson truma)
        {
            Result result = TrumaPersonLogic.Save(truma);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllTormim()
        {
            Result result = isAllow();
            if (result.ErrorCode == 0)
            {
                 result = TrumaPersonLogic.GetAllTormim();
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
