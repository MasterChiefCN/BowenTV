import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getDefaultSources } from './env-sources';
import { BUILTIN_SOURCES } from './builtin-sources';
import { GET as getStatus } from '@/app/api/status/route';

beforeEach(() => vi.stubEnv('DEFAULT_SOURCES', ''));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('内置与预置点播源', () => {
  it('无需环境配置即可向客户端下发启用源及成人标记，排除注释停用源', async () => {
    const response = await getStatus(new Request('http://localhost/api/status'));
    const { defaultSources } = await response.json();
    expect(defaultSources).toHaveLength(31);
    expect(defaultSources.filter((source: { isAdult?: boolean }) => source.isAdult)).toHaveLength(8);
    expect(defaultSources.some((source: { key: string }) => ['builtin_subo', 'builtin_fczy', 'builtin_ukzy'].includes(source.key))).toBe(false);
    expect(new Set(defaultSources.map((source: { key: string }) => source.key)).size).toBe(31);
    expect(new Set(defaultSources.map((source: { url: string }) => source.url)).size).toBe(31);
  });

  it('额外预置源与内置源同时保留，成人标记和详情地址不丢失', () => {
    vi.stubEnv('DEFAULT_SOURCES', JSON.stringify([
      { name: '额外源', url: 'https://extra.example.com/api/', detail: 'https://extra.example.com', isAdult: true },
    ]));
    const sources = getDefaultSources();
    expect(sources).toHaveLength(32);
    expect(sources.at(-1)).toMatchObject({
      key: 'env_0', name: '额外源', url: 'https://extra.example.com/api', detail: 'https://extra.example.com', isAdult: true,
    });
    expect(sources.filter((source) => source.isAdult)).toHaveLength(9);
  });

  it('相同 URL（含尾斜杠）只保留部署者配置，保留原有 env key 与内置清单', () => {
    const builtin = BUILTIN_SOURCES[0];
    const originalName = builtin.name;
    vi.stubEnv('DEFAULT_SOURCES', JSON.stringify([{ name: '自定义名称', url: `${builtin.url}/` }]));
    const sources = getDefaultSources();
    expect(sources).toHaveLength(31);
    expect(sources.filter((source) => source.url === builtin.url)).toEqual([
      expect.objectContaining({ key: 'env_0', name: '自定义名称' }),
    ]);
    expect(BUILTIN_SOURCES[0].name).toBe(originalName);
  });

  it.each(['not-json', '{}', '[{"name":"缺少地址"}]'])('无效 DEFAULT_SOURCES 不影响内置源：%s', (raw) => {
    vi.stubEnv('DEFAULT_SOURCES', raw);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(getDefaultSources()).toHaveLength(31);
    expect(warn).toHaveBeenCalledOnce();
  });
});
