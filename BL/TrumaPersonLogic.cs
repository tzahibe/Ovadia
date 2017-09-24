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
    public abstract class TrumaPersonLogic
    {
        public static Result Save(TrumaPerson truma)
        {
            return TrumaPersonResult.Save(truma);
        }
        public static Result Get(int Id)
        {
            return TrumaPersonResult.Get(Id);
        }
        public static Result PaySucceed(int Id)
        {
            return TrumaPersonResult.PaySucceed(Id);
        }
        public static Result PayFailed(int Id)
        {
            return TrumaPersonResult.PayFailed(Id);
        }
        public static Result SmallGet()
        {
            return TrumaPersonResult.SmallGet();
        }

        public static Result GetAllTormim()
        {
            return TrumaPersonResult.GetAllTormim();
        }
    }
}
