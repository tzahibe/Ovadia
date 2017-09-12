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
    public class RecommendationSerController : ControllerHelper
    {
        //RecommendationSer
        public ActionResult AddRecomm(Bo.Article article)
        {
            Result result = isAllow();
            if (result.ErrorCode == 0)
            {
                 result = RecommendationLogic.AddRecomm(article);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult EditRecomm(Bo.Article article)
        {
            Result result = isAllow();
            if (result.ErrorCode == 0)
            {
                 result = RecommendationLogic.EditRecomm(article);
            }
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public ActionResult RemoveRecommById(int articleId)
        {
            Result result = isAllow();
            if (result.ErrorCode == 0)
            {
                 result = RecommendationLogic.RemoveRecommById(articleId);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public  ActionResult GetRecommById(int articleId)
        {
            Result result = RecommendationLogic.GetRecommById(articleId);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public  ActionResult GetAllRecomm()
        {
            Result result = isAllow();
            if (result.ErrorCode == 0)
            {
                 result = RecommendationLogic.GetAllRecomm();
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public  ActionResult GetAllActiveRecomm()
        {
            Result result = RecommendationLogic.GetAllActiveRecomm();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
