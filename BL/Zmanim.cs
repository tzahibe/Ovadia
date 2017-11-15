using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zmanim;
using Zmanim.TimeZone;
using Zmanim.TzDatebase;
using Zmanim.Utilities;

namespace BL
{
    public class ZmanimLogic
    {

        //public string locationName = "Lakewood, NJ";
        //public double latitude = 40.09596; //Lakewood, NJ
        //public double longitude = -74.22213; //Lakewood, NJ
        //public double elevation = 0; //optional elevation
        public ComplexZmanimCalendar zc { get; set; }

        public ZmanimLogic(string locationName, double latitude, double longitude, double elevation)
        {
            ITimeZone timeZone = new OlsonTimeZone("America/New_York");
            GeoLocation location = new GeoLocation(locationName, latitude, longitude, elevation, timeZone);
            this.zc = new ComplexZmanimCalendar(location);
        }

    }
}
