using System;
using System.Collections.Generic;
using System.Text;

namespace Bo
{
    public class Result
    {
        public int ErrorCode {get;set;}
        public string ErrorMsg { get; set; }
        public string Exception { get; set; }
        public object Data { get; set; }
    }

    public class TagsResult
    {
        public int Id { get; set; }
        public string text { get; set; }
    }
}
