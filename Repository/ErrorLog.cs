//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Repository
{
    using System;
    using System.Collections.Generic;
    
    public partial class ErrorLog
    {
        public string ErrorMsg { get; set; }
        public Nullable<System.DateTime> Time { get; set; }
        public int ID { get; set; }
        public string Site { get; set; }
        public string Source { get; set; }
        public string Class { get; set; }
        public string IP { get; set; }
        public string Function { get; set; }
    }
}
