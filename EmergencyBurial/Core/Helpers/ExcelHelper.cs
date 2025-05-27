using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Reflection;
using ClosedXML.Excel;

namespace Core.Helpers
{
    public class ExcelHelper
    {
        public static byte[] CreateExcelTableFromList<T>(List<T> values, bool adjustColum = true)
        {
            Type type = typeof(T);

            var NumberOfProperties = type.GetProperties().Length - 1;

            var column = GetColumnName(NumberOfProperties);

            var wb = new XLWorkbook() { RightToLeft = true };
            var ws = wb.AddWorksheet();
            var tab = ws.Range($"A1:${column}1").CreateTable();
            tab.ShowAutoFilter = false;
            tab.AppendData(values, true);
            tab.Row(1).Delete(XLShiftDeletedCells.ShiftCellsUp);

            short PropIndex = 1;
            var displayAtt = new List<string>();

            foreach (PropertyInfo prop in type.GetProperties())
            {
                var columnAtt = prop.GetCustomAttributes<ColumnAttribute>().FirstOrDefault();

                if (columnAtt.Name == null)
                {
                    throw new InvalidOperationException("Column name missing");
                }

                tab.Cell(1, PropIndex++).CreateRichText().ClearText().AddText(columnAtt.Name);

                if (prop.GetCustomAttributes<DisplayAttribute>().Any())
                {
                    displayAtt.Add(columnAtt.Name);
                }
            }


            if (adjustColum)
            {
                foreach (var item in ws.Columns("A", column))
                {
                    item.AdjustToContents();

                    var columnTxt = item.Cell(1).GetText();

                    if (!displayAtt.Contains(columnTxt))
                    {
                        item.Hide();
                    }
                }
            }

            using var ms = new MemoryStream();

            wb.SaveAs(ms);

            return ms.ToArray();
        }

        public static List<T> ReadDataFromExcel<T>(Stream stream)
        {
            Type type = typeof(T);

            XLWorkbook wb = new(stream);

            IXLWorksheet workSheet = wb.Worksheet(1);
            var tab = workSheet.Tables.FirstOrDefault();

            var dt = tab.AsNativeDataTable();

            if (type.GetProperties().Length != dt.Columns.Count)
            {
                throw new InvalidOperationException("Mismatch of columns count");
            }

            var index = 0;
            foreach (PropertyInfo prop in type.GetProperties())
            {
                var columnAtrr = prop.GetCustomAttributes<ColumnAttribute>().FirstOrDefault() ?? throw new Exception($"Mismatch column attribute {prop.Name}");

                if (columnAtrr.Name != dt.Columns[index++].ColumnName)
                {
                    throw new InvalidOperationException($"Mismatch of column name {columnAtrr.Name}");
                }
            }

            var list = dt.ConvertDataTableToList<T>();

            return list;

        }

        #region [private methods]
        private static string GetColumnName(int index)
        {
            const string letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            var value = "";

            if (index >= letters.Length)
                value += letters[index / letters.Length - 1];

            value += letters[index % letters.Length];

            return value;
        }
        #endregion

    }
}
