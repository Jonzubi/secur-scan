import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
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
}
