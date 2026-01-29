using System;

namespace Core.Helpers
{
    public class Constants
    {
        public const string MasterUser = "D8B19871-B78B-4A44-5548-08D9CE9F7AF2";
        public const string ExcelReport = "report.xlsx";
        public static readonly Guid eventId = Guid.NewGuid();
    }

    #region[Permission Roles]
    public static class Role
    {
        public const string RoleAdmin = "Admin";
        public const string RoleReferent = "User";
        public const string RoleProjectManager = "ProjectManager";
        public const string RoleInspector = "Inspector";
        public const string RoleAccountant = "Accountant";
        public const string RoleCoordinator = "Coordinator";
    }
    #endregion


}
