using System.Threading;
using System.Threading.Tasks;
using DataModel.Entities;
using EntityFrameworkCore.Triggered;

namespace DataModel.Triggers
{
    public class SaveMembersTrigger : IBeforeSaveTrigger<Member>
    {
        public Task BeforeSave(ITriggerContext<Member> context, CancellationToken cancellationToken)
        {
            if (context.ChangeType == ChangeType.Added)
            {
                context.Entity.UserName = context.Entity.UserName.PadLeft(9, '0');
            }

            return Task.CompletedTask;
        }
    }
}