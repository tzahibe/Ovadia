using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    public class Truma
    {
        public string Truma_Type {get;set;}
        public string Title { get; set; }
        public string Body { get; set; }
        public string Total { get; set; }
        public string FullName { get; set; } //מופרד בפיסיקים
        public string TotalMoney { get; set; } //למחצית השקל, צדקה לפני סוכות, ברכה לכל השנה
        public int IsActive { get; set; }
        public string ProfilePic { get; set; }
        public int? IsAlowComment { get; set; }
        public int Id { get; set; }

    }
}
