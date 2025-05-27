using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Model
{
    public enum EDocFormats
    {
        XML = 1,
        NULL,
        SVC,
        IMAGE,
        PDF,
        MHTML,
        EXCEL,
        WORD,
        Generic,
    };

    public class ReportRequest
    {
        public ReportRequest()
        {
            Parameters = new List<RsParameterValue>();
        }

        public string ReportName { get; set; }

        public string ReportServerFolder { get; set; }

        public EDocFormats DocFormat { get; set; } = EDocFormats.PDF;

        public List<RsParameterValue> Parameters { get; set; } = new List<RsParameterValue>();
    }

    public class RsParameterValue
    {
        public string Name { get; set; }

        public string Value { get; set; }
    }
}
