using Bo;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;
using System.Web.Http.Controllers;
using Newtonsoft.Json;
using System.Web.Http.Results;
using System.Web.Mvc.Filters;
using System.Web.Http;

namespace OvaidaPro.Filters
{

    public class CustomAuthenticationAttribute : AuthorizeAttribute
    {

        protected override bool IsAuthorized(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            base.IsAuthorized(actionContext);
            return true;
        }
    }
}
