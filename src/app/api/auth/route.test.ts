import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DELETE, GET, POST } from './route';
import { GET as getStatus } from '../status/route';
import { guardRequest } from '@/lib/api-guard';
import { clearRateLimit, SESSION_COOKIE, signSession } from '@/lib/auth';

const PASSWORD = 'optional-password-test';
const TEST_IP = '192.0.2.40';

function request(cookie?: string, password?: string): Request {
  const headers = new Headers({ 'x-real-ip': TEST_IP });
  if (cookie) headers.set('cookie', cookie);
  if (password !== undefined) headers.set('Content-Type', 'application/json');
  return new Request('http://localhost/api/auth', {
    method: password === undefined ? 'GET' : 'POST',
    headers,
    body: password === undefined ? undefined : JSON.stringify({ password }),
  });
}

beforeEach(() => {
  vi.stubEnv('PASSWORD', '');
  clearRateLimit(TEST_IP);
});

afterEach(() => {
  vi.unstubAllEnvs();
  clearRateLimit(TEST_IP);
});

describe('可选访问密码', () => {
  it.each([undefined, ''])('PASSWORD 为 %s 时状态和 API 守卫均允许匿名访问', async (value) => {
    vi.stubEnv('PASSWORD', value);
    const req = request();
    expect(guardRequest(req)).toBeNull();
    expect(await (await GET(req)).json()).toMatchObject({ verified: true });
    expect(await (await getStatus(req)).json()).toMatchObject({ passwordRequired: false, verified: true });
    const login = await POST(new Request('http://localhost/api/auth', { method: 'POST' }));
    expect(login.status).toBe(200);
    expect(await login.json()).toEqual({ success: true });
    expect(login.headers.get('set-cookie')).toBeNull();
  });

  it('无密码模式下退出后仍允许匿名访问', async () => {
    expect((await DELETE()).cookies.get(SESSION_COOKIE)?.value).toBe('');
    expect(await (await GET(request())).json()).toMatchObject({ verified: true });
    expect(guardRequest(request())).toBeNull();
  });

  it('设置密码后拒绝未登录和无效会话', async () => {
    vi.stubEnv('PASSWORD', PASSWORD);
    const { token } = signSession();
    for (const cookie of [undefined, `${SESSION_COOKIE}=${token}tampered`]) {
      const req = request(cookie);
      expect(guardRequest(req)?.status).toBe(401);
      expect(await (await GET(req)).json()).toMatchObject({ verified: false });
      expect(await (await getStatus(req)).json()).toMatchObject({ passwordRequired: true, verified: false });
    }
  });

  it('设置密码后仍验证密码，并允许有效登录会话访问', async () => {
    vi.stubEnv('PASSWORD', PASSWORD);
    expect((await POST(request(undefined, 'wrong'))).status).toBe(401);
    const login = await POST(request(undefined, PASSWORD));
    expect(login.status).toBe(200);
    const cookie = login.cookies.get(SESSION_COOKIE);
    expect(cookie?.value).toBeTruthy();
    const req = request(`${SESSION_COOKIE}=${cookie!.value}`);
    expect(guardRequest(req)).toBeNull();
    expect(await (await GET(req)).json()).toMatchObject({ verified: true });
    expect(await (await getStatus(req)).json()).toMatchObject({ passwordRequired: true, verified: true });
  });
});
