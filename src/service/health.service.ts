import { IHealthService } from "./interface/health.service.interface";

export class HealthService implements IHealthService {
    constructor() {}
  
    async getStatus() {
    return { status: "ok" };
  }
}
