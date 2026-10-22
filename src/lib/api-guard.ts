import { NextResponse } from 'next/server';
import { isAccessAllowed } from './auth';

/** API Route 共享守卫：无密码时公开访问；配置密码后未登录返回 401。 */
export function guardRequest(req: Request): NextResponse | null {
  if (!isAccessAllowed(req.headers.get('cookie'))) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }
  return null;
}

export function jsonError(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}
