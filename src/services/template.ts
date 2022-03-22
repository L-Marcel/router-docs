import { ProjectVersions } from "../models/projectVersions";
import { getProjectChannelServer } from "../utils/getProjectChannel";
import { sleep } from "../utils/sleep";
import RealtimeServer from "./pusher/server";

export class Template {
  static async use(
    template: "blank" | "examples" | "express" | "prisma",
    data: {
      id: string,
      version: string,
      project: string
    },
  ) {
    const channel = getProjectChannelServer(data);
    const { id, version, project } = data;

    const projectVersion = !id? await ProjectVersions.create({
      version,
      template,
      project: {
        connect: {
          id: project
        }
      }
    }):await ProjectVersions.update(id, {
      template
    });

    await RealtimeServer.trigger<RealtimeProgress>(channel, "template", {
      progress: 5,
      message: "Checking chosen template..."
    }).catch(err => console.log(err.message));

    return await this[template](channel, projectVersion);
  };
  static async blank(channel: string, _:any) {
    await sleep(2000);
    await RealtimeServer.trigger<RealtimeProgress>(channel, "template", {
      progress: 100,
      message: "(Blank) Document created",
    }).catch(err => console.log(err.message));
    return true;
  };
  static async examples(channel: string, projectVersion: ProjectVersion) {
    await RealtimeServer.trigger<RealtimeProgress>(channel, "template", {
      progress: 10,
      message: "Loading document examples"
    });

    await RealtimeServer.trigger<RealtimeProgress>(channel, "template", {
      progress: 40,
      message: "Creating routes instances",
    });

    await RealtimeServer.trigger<RealtimeProgress>(channel, "template", {
      progress: 70,
      message: "Creating routes resources"
    });

    await RealtimeServer.trigger<RealtimeProgress>(channel, "template", {
      progress: 100,
      message: "(Examples) Document created"
    });
    return true;
  };
  static async express(channel: string, projectVersion: ProjectVersion) {
    await RealtimeServer.trigger<RealtimeProgress>(channel, "template", {
      progress: 100,
      message: "(Express) Document created"
    });
    return true;
  };
  static async prisma(channel: string, projectVersion: ProjectVersion) {
    await RealtimeServer.trigger<RealtimeProgress>(channel, "template", {
      progress: 100,
      message: "(Prisma) Document created"
    });
    return true;
  };
};