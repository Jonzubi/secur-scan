import { View } from 'react-native';
import {} from 'react';
import ReportTitle from '../../components/ReportTitle/ReportTitle';
import { IGetRequest } from 'api/interfaces/request';

const Report = ({ status }: IGetRequest) => {
  return (
    <View>
      <ReportTitle status={status} />
    </View>
  );
};

export default Report;
