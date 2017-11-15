using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL;
using Zmanim.TzDatebase;
using Zmanim.TimeZone;
using Zmanim.Utilities;
using Zmanim;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            string locationName = "Lakewood, NJ";
            double latitude = 40.09596; //Lakewood, NJ
            double longitude = -74.22213; //Lakewood, NJ
            double elevation = 0; //optional elevation
            ITimeZone timeZone = new OlsonTimeZone("America/New_York");
            GeoLocation location = new GeoLocation(locationName, latitude, longitude, elevation, timeZone);
            ComplexZmanimCalendar zc = new ComplexZmanimCalendar(location);


        }
    }
}
