using System;
using System.Collections.Generic;
using System.Text;

namespace Bo
{
    public class Article
    {
        public int ArticleId { get; set; }
        public string Title { get; set; }
        public DateTime DatePublish { get; set; }
        public DateTime Last_edit { get; set; }
        public string ProfilePic { get; set; }
        public string Body { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int Publish { get; set; }
        public string Video1 { get; set; }
        public string Video2 { get; set; }
        public string Video3 { get; set; }

    }
}
