using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataModel;
using DataModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmergencyBurial.Services.DbServices;

public class EventService(EmergencyBurialContext db)
{
    public async Task<List<Event>> GetEvents()
    {
        return await db.Events
            .OrderByDescending(e => e.CreatedOn)
            .ToListAsync();
    }

    public async Task<Event> GetEventById(Guid? id)
    {
        return await db.Events.FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<Event> AddEvent(Event entity, Guid userId)
    {
        entity.CreatedBy = userId;
        entity.CreatedOn = DateTime.Now;
        
        entity.UpdateBy = userId;
        entity.UpdateOn = DateTime.Now;

        db.Events.Add(entity);

        await db.SaveChangesAsync();

        return entity;
    }

    public async Task<Event> UpdateEvent(Event entity)
    {
        entity.UpdateOn = DateTime.Now;

        db.Events.Update(entity);

        await db.SaveChangesAsync();

        return entity;
    }
}