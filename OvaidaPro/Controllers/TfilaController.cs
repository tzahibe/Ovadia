﻿using BL;
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

        public ActionResult AddTfila(Bo_Tfila Tfila)
        {
            isAllow();
            Result result = TfilaLogic.AddTfila(Tfila);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UpdateTfila(Bo_Tfila Tfila)
        {
            isAllow();
            Result result = TfilaLogic.UpdateTfila(Tfila);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult RemoveTfila(int ID)
        {
            isAllow();
            Result result = TfilaLogic.RemoveTfila(ID);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAllTfilot()
        {
            Result result = TfilaLogic.GetAllTfilot();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}