using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Model
{
    public class FileResult
    {
        public int? RelId { get; set; }
        public string Name { get; set; }
        public string FileId { get; set; }
        public short Order { get; set; }
        public byte[] Content { get; set; }
        public int? FileType { get; set; }
        public string Text { get; set; }
        public bool IsConfirm { get; set; }
        public string Remarks { get; set; }

    }
}
