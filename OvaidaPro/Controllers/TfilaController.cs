using BL;
using Bo;
using OvaidaPro.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OvaidaPro.Controllers
{
    public class TfilaController : ControllerHelper
    {
        // GET: Tfila

        public ActionResult Zmanim()
        {
            ZmanimLogic zman = new ZmanimLogic("Lakewood, NJ", 40.09596, -74.22213,0);
            return Json(zman.zc, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddTfila(Bo_Tfila Tfila)
        {
            Result result = isAllow();
            if (result.ErrorCode == 0)
            {
                 result = TfilaLogic.AddTfila(Tfila);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UpdateTfila(Bo_Tfila Tfila)
        {
            Result result = isAllow();
            if (result.ErrorCode == 0)
            {
                 result = TfilaLogic.UpdateTfila(Tfila);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult RemoveTfila(int ID)
        {
            Result result = isAllow();
            if (result.ErrorCode == 0)
            {
                 result = TfilaLogic.RemoveTfila(ID);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllTfilot()
        {
            Result result = TfilaLogic.GetAllTfilot();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}