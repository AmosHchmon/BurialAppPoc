using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Core.Resources;

namespace Core.Helpers
{
    public static class FileHelper
    {
        public static byte[] ReadFully(this Stream input)
        {
            using (var ms = new MemoryStream())
            {
                input.CopyTo(ms);
                return ms.ToArray();
            }
        }
        public static void WriteFile(string folderPath, string fileName, byte[] fileContent)
        {

            if (!Directory.Exists(folderPath))
            {
                throw new ApplicationException(string.Format(UserMessage.FolderNotExist, folderPath));
            }

            if (File.Exists(folderPath + fileName))
            {
                File.Delete(folderPath + fileName);
            }

            File.WriteAllBytes(folderPath + fileName, fileContent);

        }

        public static void DeleteFile(string folderPath, string fileName)
        {

            if (!Directory.Exists(folderPath))
            {
                throw new ApplicationException(string.Format(UserMessage.FolderNotExist, folderPath));
            }

            File.Delete(folderPath + fileName);

        }

        public static byte[] ReadFile(string folderPath, string fileName)
        {

            if (!Directory.Exists(folderPath))
            {
                throw new ApplicationException(string.Format(UserMessage.FolderNotExist, folderPath));
            }

            if (!File.Exists(folderPath + fileName))
            {
                throw new ApplicationException(string.Format(UserMessage.FolderNotExist, fileName));
            }

            return File.ReadAllBytes(folderPath + fileName);

        }

        public static HttpResponseMessage DownloadFile(string filePath, string fileName)
        {
            var fileContent = File.ReadAllBytes(filePath);

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(fileContent)
            };

            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = fileName
            };

            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            return result;
        }

        public static string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        public static string GetContentTypeByExtention(string ext)
        {
            var types = GetMimeTypes();
            return types[$".{ext.ToLower()}"];
        }

        private static Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
                {".excel", "application/vnd.ms-excel"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"}
            };
        }

        public static string Encode(string text)
        {
            byte[] mybyte = Encoding.UTF8.GetBytes(text);
            string returntext = Convert.ToBase64String(mybyte);
            return returntext;
        }

        public static string Decode(string text)
        {
            byte[] mybyte = Convert.FromBase64String(text);
            string returntext = Encoding.UTF8.GetString(mybyte);
            return returntext;
        }
    }
}
