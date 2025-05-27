using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Model
{
    public class AppResponse
    {
        public bool IsValid { get; set; } = true;
        public string RetValStr { get; set; }
        public int RetValNumber { get; set; }
        public string ClientMessage { get; set; }
        public string ErrorMessage { get; set; }
        public string Title { get; set; }
    }
}
