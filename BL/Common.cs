using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public abstract class Common
    {
        public static bool IsMailValid(string emailaddress)
        {
            try
            {
                MailAddress m = new MailAddress(emailaddress);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }

        public IPAddress LocalIPAddress()
        {
            if (!System.Net.NetworkInformation.NetworkInterface.GetIsNetworkAvailable())
            {
                return null;
            }

            IPHostEntry host = Dns.GetHostEntry(Dns.GetHostName());

            return host
                .AddressList
                .FirstOrDefault(ip => ip.AddressFamily == AddressFamily.InterNetwork);
        }

        public static string ReplaceNumberToHebrew(int number)
        {
            string unity = "";
            //string dozen = "";
            //int unity_number = number % 10;
            //int dozen_number = number / 10 % 15;

            //switch (unity_number)
            //{
            //    case 1:
            //        unity = "א";
            //        break;
            //    case 2:
            //        unity = "ב";
            //        break;
            //    case 3:
            //        unity = "ג";
            //        break;
            //    case 4:
            //        unity = "ד";
            //        break;
            //    case 5:
            //        unity = "ה";
            //        break;
            //    case 6:
            //        unity = "ו";
            //        break;
            //    case 7:
            //        unity = "ז";
            //        break;
            //    case 8:
            //        unity = "ח";
            //        break;
            //    case 9:
            //        unity = "ט";
            //        break;
            //}

            //switch (dozen_number)
            //{
            //    case 1:
            //        dozen = "י";
            //        break;
            //    case 2:
            //        dozen = "כ";
            //        break;
            //    case 3:
            //        dozen = "ל";
            //        break;
            //    case 4:
            //        dozen = "מ";
            //        break;
            //    case 5:
            //        unity = "נ";
            //        break;
            //    case 6:
            //        dozen = "ס";
            //        break;
            //    case 7:
            //        dozen = "ע";
            //        break;
            //    case 8:
            //        dozen = "פ";
            //        break;
            //    case 9:
            //        dozen = "צ";
            //        break;
            //    case 10:
            //        dozen = "ק";
            //        break;
            //    case 11:
            //        dozen = "קי";
            //        break;
            //    case 12:
            //        dozen = "קא";
            //        break;
            //}
            switch (number)
            {
                case 1:
                    unity = "י";
                    break;
                case 2:
                    unity = "כ";
                    break;
                case 3:
                    unity = "ג";
                    break;
                case 4:
                    unity = "ד";
                    break;
                case 5:
                    unity = "ה";
                    break;
                case 6:
                    unity = "ו";
                    break;
                case 7:
                    unity = "ז";
                    break;
                case 8:
                    unity = "ח";
                    break;
                case 9:
                    unity = "ט";
                    break;
                case 10:
                    unity = "י";
                    break;
                case 11:
                    unity = "יא";
                    break;
                case 12:
                    unity = "יב";
                    break;
                case 13:
                    unity = "יג";
                    break;
                case 14:
                    unity = "יד";
                    break;
                case 15:
                    unity = "טו";
                    break;
                case 16:
                    unity = "טז";
                    break;
                case 17:
                    unity = "יז";
                    break;
                case 18:
                    unity = "טז";
                    break;
                case 19:
                    unity = "יח";
                    break;
                case 20:
                    unity = "יט";
                    break;
                case 21:
                    unity = "כ";
                    break;
                case 22:
                    unity = "כא";
                    break;
                case 23:
                    unity = "כב";
                    break;
                case 24:
                    unity = "כג";
                    break;
                case 25:
                    unity = "כד";
                    break;
                case 26:
                    unity = "כה";
                    break;
                case 27:
                    unity = "כו";
                    break;
                case 28:
                    unity = "כז";
                    break;
                case 29:
                    unity = "כח";
                    break;
                case 30:
                    unity = "כט";
                    break;
                case 31:
                    unity = "ל";
                    break;
                case 32:
                    unity = "לא";
                    break;
                case 33:
                    unity = "לב";
                    break;
                case 34:
                    unity = "לג";
                    break;
                case 35:
                    unity = "לד";
                    break;
                case 36:
                    unity = "לה";
                    break;
                case 37:
                    unity = "לו";
                    break;
                case 38:
                    unity = "לז";
                    break;
                case 39:
                    unity = "לח";
                    break;
                case 40:
                    unity = "לט";
                    break;
                case 41:
                    unity = "מ";
                    break;
                case 42:
                    unity = "מא";
                    break;
                case 43:
                    unity = "מב";
                    break;
                case 44:
                    unity = "מג";
                    break;
                case 45:
                    unity = "מד";
                    break;
                case 46:
                    unity = "מה";
                    break;
                case 47:
                    unity = "מו";
                    break;
                case 48:
                    unity = "מז";
                    break;
                case 49:
                    unity = "מח";
                    break;
                case 50:
                    unity = "מט";
                    break;
                case 51:
                    unity = "נ";
                    break;
                case 52:
                    unity = "נא";
                    break;
                case 53:
                    unity = "נב";
                    break;
                case 54:
                    unity = "נג";
                    break;
                case 55:
                    unity = "נד";
                    break;
                case 56:
                    unity = "נה";
                    break;
                case 57:
                    unity = "נו";
                    break;
                case 58:
                    unity = "נז";
                    break;
                case 59:
                    unity = "נח";
                    break;
                case 60:
                    unity = "נט";
                    break;
                case 61:
                    unity = "ס";
                    break;
                case 62:
                    unity = "סא";
                    break;
                case 63:
                    unity = "סב";
                    break;
                case 64:
                    unity = "סג";
                    break;
                case 65:
                    unity = "סד";
                    break;
                case 66:
                    unity = "סד";
                    break;
                case 67:
                    unity = "סה";
                    break;
                case 68:
                    unity = "סו";
                    break;
                case 69:
                    unity = "סז";
                    break;
                case 70:
                    unity = "סח";
                    break;
                case 71:
                    unity = "סט";
                    break;
            }

            return unity;
        }

        public static string numberToAlpha(long number)
        {
            string returnVal = "";
            char c = 'א';
            while (number >= 0)
            {
                returnVal = (char)(c + number % 26) + returnVal;
                number /= 26;
                number--;
            }

            return returnVal;
        }
    }
}
