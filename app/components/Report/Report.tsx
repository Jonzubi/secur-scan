import { ScrollView } from 'react-native';
import { FC } from 'react';
import ReportTitle from '../../components/ReportTitle/ReportTitle';
import { IGetRequest } from 'api/interfaces/request';
import { RequestType } from '@jonzubi/securscan-shared';
import ReportResolveDns from '../../components/ReportResolveDns/ReportResolveDns';
import ReportScanIp from '../../components/ReportScanIp/ReportScanIp';

const Report = (request: IGetRequest) => {
  const { status } = request;

  const typeToComponent: Record<RequestType, FC> = {
    [RequestType.RESOLVE_DNS]: () => <ReportResolveDns request={request} />,
    [RequestType.SCAN_IP]: () => <ReportScanIp request={request} />,
    [RequestType.DETAILED_SCAN]: () => null,
    [RequestType.MITIGATION_ADVICES]: () => null,
  };

  return (
    <ScrollView>
      <ReportTitle status={status} />
      {typeToComponent[request.requestType](request)}
    </ScrollView>
  );
};

export default Report;
