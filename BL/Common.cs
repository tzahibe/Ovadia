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
            return GimarticFunc((float)number, string.Empty);
        }

        private static string GimarticFunc(float number, string ot = "")
        {
            string unity = string.Empty;

            switch (number)
            {
                case 1:
                    unity = "א";
                    break;
                case 2:
                    unity = "ב";
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
                case 20:
                    unity = "כ";
                    break;
                case 30:
                    unity = "ל";
                    break;
                case 40:
                    unity = "מ";
                    break;
                case 50:
                    unity = "נ";
                    break;
                case 60:
                    unity = "ס";
                    break;
                case 70:
                    unity = "ע";
                    break;
                case 80:
                    unity = "פ";
                    break;
                case 90:
                    unity = "צ";
                    break;
                case 100:
                    unity = "ק";
                    break;
                case 200:
                    unity = "ר";
                    break;
                case 300:
                    unity = "ש";
                    break;
                case 400:
                    unity = "ת";
                    break;
            }

            if (number >= 10)
            {
                number = number / 10 % 10;
            }
            else if( number > 0 && number < 10)
            {
                number = number % 10;
            }

            if (number == 0)
            {
                return ot;
            }
            
              return GimarticFunc(number, unity + "" + ot );
            
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
