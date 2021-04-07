import { Table } from 'antd';
import { columns, data } from '../utils/temporaryData';
import 'antd/dist/antd.css';
import '../css/HomeView.css';

export const ResourcesView = () : JSX.Element =>
  (
    <Table columns={columns} dataSource={data} className="table"/>
  );