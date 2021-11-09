/**
 * 用户中心
 */
import { fetch, post } from '@/utils/http';

export default {
  login: params => post('/test/login', params),
  logout: () => fetch('/test/logout'),
}