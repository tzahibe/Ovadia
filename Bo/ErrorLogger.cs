using System;
using System.Collections.Generic;
using System.Text;

namespace Bo
{
    public class ErrorLogger
    {   
        public string ErrorMsg { get; set; }
        public DateTime Time { get; set; }
        public int ID { get; set; }
        public string Site { get; set; }
        public string Source { get; set; }
        public string Class { get; set; }
        public string IP { get; set; }
    }
}
