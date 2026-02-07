import { IHealthService } from "../../domain/interfaces/service/health.service.interface";

export class HealthController {
  constructor(private readonly healthService: IHealthService) {}

  getHealth = async (_req: any, res: any) => {
    // const status = await this.healthService.getStatus();
    res.json({ status: "ok" });
  };
}
