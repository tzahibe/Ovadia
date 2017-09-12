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
    public class TrumaPersonSer : ControllerHelper
    {
        public ActionResult Save(TrumaPerson truma)
        {
            Result resultToClient = isAllow();
            if (resultToClient.ErrorCode == 0)
            {
                 resultToClient = TrumaPersonLogic.Save(truma);
            }
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Get(int Id)
        {
            Result resultToClient = isAllow();
            if (resultToClient.ErrorCode == 0)
            {
                 resultToClient = TrumaPersonLogic.Get(Id);
            }
            return Json(resultToClient, JsonRequestBehavior.AllowGet);

        }
        public ActionResult SmallGet()
        {
            Result resultToClient = TrumaPersonLogic.SmallGet();
            return Json(resultToClient, JsonRequestBehavior.AllowGet);
        }
    }
}