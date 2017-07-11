using Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OvaidaPro.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            if (Session["User"] != null)
            {
                User user = Session["User"] as User;
                ViewBag.Role = user.UserRole;
                ViewBag.AccountCreate = user.AccountCreate;
                ViewBag.Active = user.Active;
                ViewBag.Email = user.Email;
                ViewBag.FullName = user.FullName;
                ViewBag.LastLogin = user.LastLogin;
                ViewBag.UserName = user.UserName;

            }
            return View("Index");
        }
    }
}