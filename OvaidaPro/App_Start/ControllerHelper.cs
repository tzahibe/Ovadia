using Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace OvaidaPro.App_Start
{
    public abstract class ControllerHelper : Controller
    {
        protected void isAllow()
        {
            Result result = new Result();
            HttpContext.Response.ContentType = "application/json";
            HttpContext.Response.AppendHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            HttpContext.Response.AppendHeader("Pragma", "no-cache");
            HttpContext.Response.AppendHeader("Expires", "0");
            if (Session["User"] == null)
            {
                result.ErrorCode = 5;
                var serializer = new JavaScriptSerializer();
                var serializedResult = serializer.Serialize(result);
                HttpContext.Response.Write(serializedResult);
            }
            else
            {
                User user = Session["User"] as User;
                if (user.UserRole.Equals("Admin") || user.UserRole.Equals("Editor"))
                {
                    return;
                }
                else
                {
                    result.ErrorCode = 5;
                    var serializer = new JavaScriptSerializer();
                    var serializedResult = serializer.Serialize(result);
                    HttpContext.Response.Write(serializedResult);
                }
            }
        }
    }
}