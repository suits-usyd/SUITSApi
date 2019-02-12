import { Event } from "interfaces";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { AttendanceEntity } from "./attendance.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: "Event" })
export class EventEntity extends BaseEntity implements Event {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column({ nullable: true })
    public description?: string;

    @Column({ nullable: false, type: "timestamp" })
    public time: Date;

    @OneToMany(type => AttendanceEntity, att => att.event)
    public membersAttended?: AttendanceEntity[];

    public getType(): new (...args: any[]) => EventEntity {
        return EventEntity;
    }
}
