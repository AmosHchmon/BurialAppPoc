using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Model
{
    public class ListItemDto
    {
        public int? Id { get; set; }

        public int? Key { get; set; }

        public int? ListTypeId { get; set; }

        public string Text { get; set; }

        public string Description { get; set; }

        public bool IsValid { get; set; }

    }
}
