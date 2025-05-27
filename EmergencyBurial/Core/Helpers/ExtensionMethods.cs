using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Reflection;
using Newtonsoft.Json;

namespace Core.Helpers
{
    public static class ExtensionMethods
    {
        public static T Clone<T>(this T source)
        {
            var serialized = JsonConvert.SerializeObject(source);
            return JsonConvert.DeserializeObject<T>(serialized);
        }

        public static List<T> ConvertDataTableToList<T>(this DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }

        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    var columnAtrr = pro.GetCustomAttributes<ColumnAttribute>().FirstOrDefault();

                    if (columnAtrr.Name == column.ColumnName)
                        try
                        {
                            pro.SetValue(obj, Convert.ChangeType(dr[column.ColumnName], pro.PropertyType), null);
                        }
                        catch (Exception ex)
                        {

                            throw new InvalidOperationException($"Mismatch of column value {columnAtrr.Name}, {ex}");
                        }

                    else
                        continue;
                }
            }
            return obj;
        }
    }
}
