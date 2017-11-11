using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bo;
using BO;
using Repository;

namespace BL
{
    public static class SidorLogic
    {
        public static Result EditCategory(Sidur sidur)
        {
            return SidurResult.EditCategory(sidur);
        }
        public static Result AddCategory(Sidur sidur)
        {
            return SidurResult.AddCategory(sidur);
        }
        public static Result GetCateogires()
        {
            return SidurResult.GetCateogires();
        }
        public static Result GetsSubCateogires(int parentId)
        {
            return SidurResult.GetsSubCateogires(parentId);
        }

        public static Result GetAllSidurTfilot()
        {
            return SidurResult.GetAllSidurTfilot();
        }
    }
}
