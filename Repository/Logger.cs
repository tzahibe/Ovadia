using Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public abstract class Logger
    {
        public static bool Write(string className, string stack, string source, DateTime time)
        {
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.ErrorLog errorLog = new ErrorLog();
                    errorLog.Class = className;
                    errorLog.ErrorMsg = stack;
                    errorLog.IP = Common.LocalIPAddress().ToString();
                    //errorLog.Site = error.Site;
                    errorLog.Source = source;
                    errorLog.Time = time;
                    context.ErrorLog.Add(errorLog);
                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }

            return false;

        }


    }
}
