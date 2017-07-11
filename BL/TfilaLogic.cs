using Bo;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public abstract class TfilaLogic
    {
        public static Result AddTfila(Bo_Tfila Tfila)
        {
            Result result = TfilaResult.AddTfila(Tfila);
            return result;
        }
        public static Result RemoveTfila(int ID)
        {
            Result result = TfilaResult.RemoveTfila(ID);
            return result;
        }
        public static Result GetAllTfilot()
        {
            Result result = TfilaResult.GetAllTfilot();
            return result;
        }
        public static Result UpdateTfila(Bo_Tfila Tfila)
        {
            Result result = TfilaResult.UpdateTfila(Tfila);
            return result;
        }
    }
}
