import { View } from 'react-native';
import { FC } from 'react';
import ReportTitle from '../../components/ReportTitle/ReportTitle';
import { IGetRequest } from 'api/interfaces/request';
import { RequestType } from '@jonzubi/securscan-shared';
import ReportResolveDns from '../../components/ReportResolveDns/ReportResolveDns';

const Report = (request: IGetRequest) => {
  const { status } = request;

  const typeToComponent: Record<RequestType, FC> = {
    [RequestType.RESOLVE_DNS]: () => <ReportResolveDns request={request} />,
    [RequestType.SCAN_IP]: () => null,
    [RequestType.DETAILED_SCAN]: () => null,
    [RequestType.MITIGATION_ADVICES]: () => null,
  };

  return (
    <View>
      <ReportTitle status={status} />
      {typeToComponent[request.requestType](request)}
    </View>
  );
};

export default Report;
