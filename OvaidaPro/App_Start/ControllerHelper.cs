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
        public Result isAllow()
        {
            Result result = new Result();

            if (Session["User"] == null)
            {
                result.ErrorCode = 5;
                return result;
            }
            else
            {
                User user = Session["User"] as User;
                if (user.UserRole.Equals("Admin") || user.UserRole.Equals("Editor"))
                {
                    result.ErrorCode = 0;
                    return result;
                }
                else
                {
                    result.ErrorCode = 5;
                    return result;
                }
            }
        }
    }
}