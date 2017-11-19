using Bo;
using Repository.myZmanimService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public abstract class MyZmanim
    {
        const string APIURL = "https://api.myzmanim.com/engine1.svc";
        const string APIUSER = "0008653713";
        const string APIKEY = "379a70e97663f7b176650177905026e41a52f984ec6c6675a63e89f41dabeca581057ecd8261cbf8";
        //Look up the locationID for the desired place: (Uncomment one of the following examples)
        //string LocationID = FindPostal("11559");     //Typical US zip code
                                              //LocationID = FindPostal("M6B2K9");   //Typical Canadian postal code
                                              //LocationID = FindPostal("NW118AU");  //Typical UK postcode
                                              //LocationID = FindPostal("90500");    //Typical 5-digit Israel Mikud code
                                              //LocationID = FindPostal("JFK");      //Typical airport code
                                              //LocationID = FindPostal("27526341"); //Typical MyZmanim LocationID
                                              //LocationID = FindGps(48.86413211779521324, 2.32941612345133754);   //Typical GPS coordinates
        public static Result GetZmanim()
        {
            Result result = new Result();
            EngineResultDay Day = new EngineResultDay();
            EngineClient Client = CreateApiInstance();

            EngineParamDay Params = new EngineParamDay();
            Params.User = APIUSER;
            Params.Key = APIKEY;
            Params.Coding = "CS";
            Params.Language = "en";     // Can be set to any MZ-supported language: he|es|fr|de|ru|pt
            Params.InputDate = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Unspecified);
            Params.LocationID = FindPostal("27512341");
            

            try
            {
                Day = Client.GetDay(Params);     // You may also use: GetDayAsync()
                result.ErrorCode = 0;
                result.Data = Day;
            }
            catch (System.ServiceModel.CommunicationException cex)
            {
                result.ErrorCode = 1;

            }
            catch (Exception ex)
            {
                result.ErrorCode = 1;
            }

            return result;
        }

        public static string FindPostal(string pPostalCode)
        {
            EngineClient ZmanimAPI = CreateApiInstance();
            EngineParamPostal Params = new EngineParamPostal();
            EngineResultPostal Result = new EngineResultPostal();

            //Pass the client's time zone (ignoring DST). Optional, but if provided, is sometimes used to resolve ambiguous queries.
            double ClientTimeZone = TimeZone.CurrentTimeZone.GetUtcOffset(new DateTime()).TotalHours;

            Params.User = APIUSER;
            Params.Key = APIKEY;
            Params.Coding = "CS";
            Params.TimeZone = ClientTimeZone;
            Params.Query = pPostalCode;

            try
            {
                Result = ZmanimAPI.SearchPostal(Params);     // You may also use: SearchPostalAsync()
            }
            catch (System.ServiceModel.CommunicationException cex)
            {
                return null;

            }
            catch (Exception ex)
            {
                return null;
            }

            if (Result.ErrMsg != null)
            {
                return null;
            }

            ZmanimAPI.Close();

            return Result.LocationID;
        }

        public static EngineClient CreateApiInstance()
        {
            System.ServiceModel.BasicHttpBinding binding = new System.ServiceModel.BasicHttpBinding();
            System.ServiceModel.EndpointAddress address = new System.ServiceModel.EndpointAddress(APIURL);
            if (APIURL.Contains("https://"))
                binding.Security.Mode = System.ServiceModel.BasicHttpSecurityMode.Transport;
            EngineClient Client = new EngineClient(binding, address);
            return Client;
        }
    }
}
