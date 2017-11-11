using OvaidaPro.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Bo;
using BO;
using BL;

namespace OvaidaPro.Controllers
{
    public class Sidur1Controller : ControllerHelper
    {
        // GET: Sidur1

        public  ActionResult EditCategory(Sidur sidur)
        {
            Result result = isAllow();
            if (result.ErrorCode == 0)
            {
                result = SidorLogic.EditCategory(sidur);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public  ActionResult AddCategory(Sidur sidur)
        {
            Result result = isAllow();
            if (result.ErrorCode == 0)
            {
                result = SidorLogic.AddCategory(sidur);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public  ActionResult GetCateogires()
        {
            Result result = SidorLogic.GetCateogires();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public  ActionResult GetsSubCateogires(int parentId)
        {
            Result result = SidorLogic.GetsSubCateogires(parentId);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllSidurTfilot()
        {
            Result result = SidorLogic.GetAllSidurTfilot();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
