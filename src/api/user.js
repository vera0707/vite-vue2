/**
 * 用户中心
 */
import { fetch, post } from '@/utils/http';

export default {
  login: params => post('/hb-weber/usermng/login', params),
  logout: () => fetch('/hb-weber/usermng/logout'),
}