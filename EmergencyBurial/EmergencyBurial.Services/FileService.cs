using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;
using Core.Config;
using Core.Helpers;
using Core.Model;
using Core.Resources;
using DataModel;
using DataModel.Entities;
using Microsoft.AspNetCore.Http;

namespace EmergencyBurial.Services
{
    public class FileService(StorageConfiguration config, EmergencyBurialContext ctx)
    {
        public List<FileResult> UploadFiles(List<IFormFile> files)
        {
            var result = new List<FileResult>();

            foreach (var formFile in files)
            {
                var item = new AppFile() { FileName = formFile.FileName };

                ctx.Files.Add(item);

                ctx.SaveChanges();

                FileHelper.WriteFile(config.Path, string.Format("{0}{1}", item.Id.ToString(), Path.GetExtension(formFile.FileName)), formFile.OpenReadStream().ReadFully());

                result.Add(new FileResult()
                {
                    Name = formFile.FileName,
                    FileId = item.Id.ToString()
                });
            }

            return result;
        }

        public FileResult DownloadFile(Guid? id)
        {
            
            var file = ctx.Files.Find(id);

            if (file == null)
                throw new ApplicationException(UserMessage.FileNotExist);

            var content = FileHelper.ReadFile(config.Path, string.Format("{0}{1}", id, Path.GetExtension(file.FileName)));

            return new FileResult()
            {
                Content = content,
                Name = file.FileName
            };

        }
    }
}
