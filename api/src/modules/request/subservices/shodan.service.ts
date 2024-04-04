import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  IShodanDetailedScanIp,
  IShodanScanIpMinified,
  IShodanScanIpMinifiedForDocument,
} from '../interfaces/shodan';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ShodanService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly shodanApiKey = this.configService.get<string>('SHODAN_KEY');
  private readonly shodanApiUrl = 'https://api.shodan.io';

  async scanIpMinified(ip: string): Promise<IShodanScanIpMinifiedForDocument> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<IShodanScanIpMinified>(
          `${this.shodanApiUrl}/shodan/host/${ip}?key=${this.shodanApiKey}&minify=true`,
        )
        .pipe(),
    );
    return {
      ports: data.ports,
      vulns: data.vulns ? data.vulns.length : 0,
      domains: data.domains,
      hostnames: data.hostnames,
      isp: data.isp,
    };
  }

  async detailedScanIp(ip: string): Promise<IShodanDetailedScanIp> {
    // Le he puesto any porque tengo que entregar el proyecto y no tengo tiempo para hacerlo bien. Asi que lets go JavaScript.
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(
          `${this.shodanApiUrl}/shodan/host/${ip}?key=${this.shodanApiKey}&minify=true`,
        )
        .pipe(),
    );

    const vulnsDetails: Array<{
      cve: string;
      port: number;
      description: string;
    }> = [];

    if (data.vulns && data.vulns.length > 0) {
      data.data.forEach((service: any) => {
        if (!service.vulns) return;

        Object.keys(service.vulns).forEach((cve) => {
          service.vulns[cve].forEach((vuln) => {
            vulnsDetails.push({
              cve: vuln,
              port: service.port,
              description: vuln.summary,
            });
          });
        });
      });
    }

    return {
      ports: data.ports,
      vulns: data.vulns ? data.vulns.length : 0,
      domains: data.domains,
      hostnames: data.hostnames,
      isp: data.isp,
      vulnsDetails,
    };
  }
}
