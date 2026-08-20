export const Schema = z.object({
  世界: z.object({
    当前日期: z.string().prefault('2026/09/01'),
    当前时段: z.enum(['清晨', '上午', '中午', '下午', '傍晚', '夜间']).prefault('上午'),
    当前地点: z.string().prefault('橘花学院校门'),
    已触发事件: z.array(z.string()).prefault([]),
  }).prefault({}),
  玩家: z.object({
    身份: z.string().prefault('转学生'),
    与主角关系: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(10),
    与女主关系: z.record(
      z.enum(['绫濑', '七海', '茉优', '羽月', '千咲']),
      z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    ).prefault({ 绫濑: 10, 七海: 10, 茉优: 0, 羽月: 10, 千咲: 0 }),
  }).prefault({}),
  在原晓: z.object({
    潜伏任务进度: z.enum(['转入学院', '日常潜伏', '伪钞调查', '失踪案调查', '身份危急', '任务终结']).prefault('转入学院'),
    身份暴露: z.record(
      z.enum(['绫濑', '七海', '茉优', '羽月', '千咲', '恭平']),
      z.boolean().prefault(false),
    ).prefault({ 绫濑: false, 七海: false, 茉优: false, 羽月: false, 千咲: false, 恭平: false }),
    绫濑秘密知情: z.boolean().prefault(false),
  }).prefault({}),
  路线: z.object({
    当前: z.enum(['共通线', '绫濑线', '七海线', '茉优线', '羽月线', '千咲线', '自由探索']).prefault('共通线'),
  }).prefault({}),
}).prefault({});

export type Schema = z.output<typeof Schema>;
