using System.Threading;
using System.Threading.Tasks;
using DataModel.Entities;
using EntityFrameworkCore.Triggered;

namespace DataModel.Triggers
{
    public class SaveMembersTrigger : IBeforeSaveTrigger<Account>
    {
        public Task BeforeSave(ITriggerContext<Account> context, CancellationToken cancellationToken)
        {
            if (context.ChangeType == ChangeType.Added)
            {
                context.Entity.UserName = context.Entity.UserName.PadLeft(9, '0');
            }

            return Task.CompletedTask;
        }
    }
}