using BL;
using Bo;
using OvaidaPro.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace OvaidaPro.Controllers
{
    public class UsersDetailsController : ControllerHelper
    {
        public ActionResult IsLogin()
        {
            Result result = new Result();
            if (Session["User"] != null)
            {
                result.ErrorCode = 0;
                result.Data = Session["User"];
            }
            else
            {
                result.ErrorCode = 2;
            }
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult LogOut()
        {
            Result result = new Result();
            result.ErrorCode = 0;
            Session["User"] = null;
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult Login(string userName, string password)
        {
            
            Result result = UsersLogic.Login(userName, password);
            if(result.ErrorCode == 0)
            {
                Session["User"] = result.Data;
            }
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult GetActiveUsers()
        {
            isAllow();
            Result result = UsersLogic.GetActiveUsers();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddUser(User userObj)
        {
            isAllow();
            Result result = UsersLogic.AddUser(userObj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult RemoveUser(int userId)
        {
            isAllow();
            Result result = UsersLogic.RemoveUser(userId);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UpdateUser(User userObj)
        {
            isAllow();
            Result result = UsersLogic.UpdateUser(userObj);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

      
    }
}
