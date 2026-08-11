import type { Resend } from 'resend';
import type { SkillCourse } from './skill-builder';

export interface SkillLeadAttribution {
  source: string;
  medium: string;
  campaign: string;
  referrer: string;
  landingPage: string;
}

const PROPERTY_DEFINITIONS = [
  'skill_app',
  'skill_goal',
  'skill_level',
  'skill_pace',
  'skill_course_id',
  'skill_grounding',
  'skill_source_count',
  'skill_generated_at',
  'skill_utm_source',
  'skill_utm_medium',
  'skill_utm_campaign',
  'skill_referrer',
  'skill_landing_page',
] as const;
let contactPropertiesReady: Promise<boolean> | null = null;

function clean(value: unknown, maxLength: number): string {
  return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

export function parseSkillLeadAttribution(value: unknown): SkillLeadAttribution {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    source: clean(input.source, 80),
    medium: clean(input.medium, 80),
    campaign: clean(input.campaign, 120),
    referrer: clean(input.referrer, 180),
    landingPage: clean(input.landingPage, 180),
  };
}

export function buildSkillLeadProperties(course: SkillCourse, attribution: SkillLeadAttribution): Record<string, string | number> {
  return {
    skill_app: clean(course.app, 80),
    skill_goal: clean(course.goal, 240),
    skill_level: course.level,
    skill_pace: course.pace,
    skill_course_id: clean(course.id, 80),
    skill_grounding: course.grounding,
    skill_source_count: course.sources.length,
    skill_generated_at: clean(course.generatedAt, 40),
    skill_utm_source: attribution.source,
    skill_utm_medium: attribution.medium,
    skill_utm_campaign: attribution.campaign,
    skill_referrer: attribution.referrer,
    skill_landing_page: attribution.landingPage,
  };
}

async function loadContactProperties(resend: Resend): Promise<boolean> {
  const listed = await resend.contactProperties.list();
  if (listed.error || !listed.data) return false;
  const existing = new Set(listed.data.data.map((property) => property.key));
  const missing = PROPERTY_DEFINITIONS.filter((key) => !existing.has(key));
  if (!missing.length) return true;
  const created = await Promise.all(missing.map((key) => resend.contactProperties.create({ key, type: key === 'skill_source_count' ? 'number' : 'string' })));
  return created.every((response) => !response.error);
}

async function ensureContactProperties(resend: Resend): Promise<boolean> {
  contactPropertiesReady ??= loadContactProperties(resend);
  const ready = await contactPropertiesReady;
  if (!ready) contactPropertiesReady = null;
  return ready;
}

export async function persistSkillBuilderLead(
  resend: Resend,
  email: string,
  course: SkillCourse,
  attribution: SkillLeadAttribution,
  marketingConsent: boolean,
  marketingSegmentId?: string,
  legacyAudienceId?: string,
  skillRequestsAudienceId?: string,
): Promise<boolean> {
  try {
    let properties: Record<string, string | number> | undefined;
    try {
      if (await ensureContactProperties(resend)) properties = buildSkillLeadProperties(course, attribution);
    } catch (error) {
      console.warn('[skill-builder-lead] contact properties unavailable:', (error as Error).message);
    }

    const existing = await resend.contacts.get({ email });
    const consentUpdate = marketingConsent ? { unsubscribed: false as const } : {};
    let stored = existing.data
      ? await resend.contacts.update({ email, ...consentUpdate, properties })
      : await resend.contacts.create({ email, unsubscribed: !marketingConsent, properties });

    if (stored.error && properties) {
      stored = existing.data
        ? await resend.contacts.update({ email, ...consentUpdate })
        : await resend.contacts.create({ email, unsubscribed: !marketingConsent });
    }
    if (stored.error) return false;

    if (skillRequestsAudienceId) {
      const remainsSubscribed = marketingConsent || existing.data?.unsubscribed === false;
      const skillRequester = await resend.contacts.update({ audienceId: skillRequestsAudienceId, email, unsubscribed: !remainsSubscribed });
      if (skillRequester.error) console.warn('[skill-builder-lead] skill requester audience update failed:', skillRequester.error.message);
    }

    if (marketingConsent && marketingSegmentId) {
      const segmented = await resend.contacts.segments.add({ email, segmentId: marketingSegmentId });
      if (segmented.error) console.warn('[skill-builder-lead] marketing segment add failed:', segmented.error.message);
    } else if (marketingConsent && legacyAudienceId) {
      const legacy = await resend.contacts.update({ audienceId: legacyAudienceId, email, unsubscribed: false });
      if (legacy.error) console.warn('[skill-builder-lead] legacy audience update failed:', legacy.error.message);
    }

    return true;
  } catch (error) {
    console.warn('[skill-builder-lead] contact persistence failed:', (error as Error).message);
    return false;
  }
}
