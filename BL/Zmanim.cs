using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zmanim;
using Zmanim.TimeZone;
using Zmanim.TzDatebase;
using Zmanim.Utilities;
using Bo;
using BO;
using Repository;
using Zmanim.JewishCalendar;
using Zmanim.Scheduling;

namespace BL
{
    public class ZmanimLogic
    {
        public static Result GetZmanim()
        {
            return MyZmanim.GetZmanim();
        }

        //double latitude = 32.109333; //Lakewood, NJ
        //double longitude = 34.855499; //Lakewood, NJ
        public ComplexZmanimCalendar zc { get; set; }
        public ZmaneYom zmaneYom { get; set; }

        public ZmanimLogic(string locationName, double latitude, double longitude, double elevation)
        {
            ITimeZone timeZone = new OlsonTimeZone(locationName);
            GeoLocation location = new GeoLocation(latitude, longitude, timeZone);
            this.zc = new ComplexZmanimCalendar(location);

            Daf daf = YomiCalculator.GetDafYomiBavli(DateTime.Now);

            ZmaneYom zman = new ZmaneYom();
            string t2 = Common.ReplaceNumberToHebrew(daf.Page);

            Location loca = new Location();
            loca.Latitude = latitude;
            loca.Longitude = longitude;
            loca.LocationName = locationName;

            zman.Alot_Ashachar_Early = this.zc.GetAlos120();
            zman.Alot_Ashachar_Later = this.zc.GetAlosHashachar();
            zman.Netz = this.zc.GetSunrise();
            zman.Zman_Shkia = this.zc.GetSunset();
            zman.Plag_Mincha = this.zc.GetPlagHamincha();
            zman.Zet_AKochavim = this.zc.GetSunset().Value.AddMinutes(18);
            zman.Zet_AKochavim_Tam = this.zc.GetSunset().Value.AddMinutes(72); //רבנו תם
            zman.Hatzot_Night = this.zc.GetSolarMidnight();
            zman.Hatzot_Day = this.zc.GetSolarMidnight().Value.AddHours(-12);
            zman.Big_Mincha = this.zc.GetMinchaGedolaGreaterThan30();
            zman.Small_Mincha = this.zc.GetMinchaKetana();
            zman.SofShma_Gra = this.zc.GetSofZmanShmaGRA();
            zman.SofShma_MG = this.zc.GetSofZmanShmaMGA();
            zman.SofZmanTfila_Gra = this.zc.GetSofZmanTfilaGRA();
            zman.SofZmanTfila_MG = this.zc.GetSofZmanTfilaMGA();
            zman.Talit_Tfilin = this.zc.GetSunrise() != null ? zc.GetSunrise().Value.AddMinutes(-52) : DateTime.Now;
            ////zman.SofShma_KolEliyahu = this.zc.GetSofZmanShmaKolEliyahu();
            zman.Knisat_Shabat = this.zc.GetCandleLighting();
            this.zmaneYom = zman;

        }

    

    }
}
