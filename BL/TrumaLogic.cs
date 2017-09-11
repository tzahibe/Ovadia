using Bo;
using BO;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public abstract class TrumaLogic
    {
        public static Result Save(Truma truma)
        {
            return TrumaResult.Save(truma);
        }
        public static Result GetAllTActiveTruma()
        {
            return TrumaResult.GetAllTActiveTruma();
        }
        public static Result GetAllTruma()
        {
            return TrumaResult.GetAllTTruma();
        }
    }
}
