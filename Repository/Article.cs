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
    
    public partial class Article
    {
        public int ArticleId { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> DatePublish { get; set; }
        public Nullable<System.DateTime> Last_edit { get; set; }
        public string ProfilePic { get; set; }
        public string Body { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public string CategoryName { get; set; }
        public Nullable<int> Publish { get; set; }
        public string Video1 { get; set; }
        public string Video2 { get; set; }
        public string Video3 { get; set; }
        public string Type { get; set; }
        public string Image1 { get; set; }
        public string Comment { get; set; }
        public string Death_date { get; set; }
        public string Lesson_info { get; set; }
    }
}
