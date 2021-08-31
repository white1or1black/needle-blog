import Mock from 'mockjs';
import pageApi from './page';

if (process.env.NODE_ENV !== 'production') 
  Mock.mock(/\api\/page\/get/, 'get', pageApi.get);