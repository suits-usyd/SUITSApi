import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";

import { SerializerInterceptor } from "core";
import { AuthGuard } from "core";
import { EventEntity } from "entities";
import { EventResource } from "resources";

import { EventDto } from "./events.dto";
import { EventsService } from "./events.service";

@ApiUseTags("events")
@Controller(new EventResource().prefix)
@UseGuards(AuthGuard)
@UseInterceptors(SerializerInterceptor)
export class EventsIndexController {
    constructor(private readonly EventsService: EventsService) {}

    @Get()
    @ApiOperation({
        title: "Retrieve all events",
        description:
            "Retrieve all events that are in the system. Does not return attendances for the events.",
    })
    @ApiResponse({
        status: 200,
        type: EventResource,
    })
    public getEvents(): Promise<EventEntity[]> {
        return this.EventsService.getAllEvents();
    }

    @Post()
    @ApiOperation({
        title: "Add a new event",
        description: "Add a new event to the system.",
    })
    @ApiResponse({
        status: 200,
        type: EventResource,
    })
    public addEvent(
        @Body(new ValidationPipe()) data: EventDto,
    ): Promise<EventEntity> {
        return this.EventsService.addEvent(data);
    }
}