using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bo;
using Repository;

namespace BL
{
    public class LoggerLogic
    {
        public static bool Write(string className, string stack, string source, DateTime time)
        {
            return Logger.Write(className, stack, source, time);
        }
    }
}
