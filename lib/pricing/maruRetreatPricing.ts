export type DemandBucket =
  | "D1_NORMAL_WEEKDAY"
  | "D2_FRI_SUN"
  | "D2S_SATURDAY"
  | "D3_LONG_WEEKEND"
  | "D4_FESTIVAL"
  | "D5_PUSHKAR_FAIR"
  | "D6_NEW_YEAR";

export type BookingUnitCode = "ONE_VILLA" | "BOTH_VILLAS" | "GROUP_ENQUIRY";
export type MealPlanCode = "EP" | "CP" | "MAP" | "AP";

export type SpecialRatePeriod = {
  name: string;
  startDate: string;
  endDate: string;
  bucket: DemandBucket;
  minimumStay: number;
};

export type NightlyRateBreakdown = {
  date: string;
  bucket: DemandBucket;
  eventName?: string;
  baseAccommodationRate: number;
  extraAdultAccommodation: number;
  mealSupplement: number;
  nightTotal: number;
};

export type StayEstimate = {
  nights: number;
  bookingUnit: BookingUnitCode;
  adults: number;
  children: number;
  mealPlan: MealPlanCode;
  accommodationSubtotal: number | null;
  extraAdultSubtotal: number | null;
  mealPlanSubtotal: number | null;
  estimatedTotal: number | null;
  minimumStayRequired: number;
  minimumStaySatisfied: boolean;
  eventNames: string[];
  containsSpecialRate: boolean;
  nightlyBreakdown: NightlyRateBreakdown[];
};

type DateOnly = { year: number; month: number; day: number };

export const MARU_RETREAT_PROPERTY_NAME = "Maru Retreat Farmstay";
export const EXTRA_ADULT_RATE = 1_500;

export const MARU_BOOKING_UNITS = [
  { code: "ONE_VILLA", name: "One Villa", baseAdults: 2, maxGuests: 3, label: "2 guests included · up to 3 guests" },
  { code: "BOTH_VILLAS", name: "Both Villas / Full Farm", baseAdults: 4, maxGuests: 6, label: "4 guests included · up to 6 guests" },
  { code: "GROUP_ENQUIRY", name: "Group Enquiry", baseAdults: 0, maxGuests: 8, label: "7–8 guests · custom quote required" },
] as const satisfies ReadonlyArray<{ code: BookingUnitCode; name: string; baseAdults: number; maxGuests: number; label: string }>;

export const SPECIAL_RATE_PERIODS: readonly SpecialRatePeriod[] = [
  { name: "Dussehra / Festive Window", startDate: "2026-10-17", endDate: "2026-10-20", bucket: "D4_FESTIVAL", minimumStay: 2 },
  { name: "Diwali / Govardhan Window", startDate: "2026-11-07", endDate: "2026-11-09", bucket: "D4_FESTIVAL", minimumStay: 2 },
  { name: "Pushkar Fair 2026", startDate: "2026-11-17", endDate: "2026-11-24", bucket: "D5_PUSHKAR_FAIR", minimumStay: 2 },
  { name: "Christmas Window", startDate: "2026-12-24", endDate: "2026-12-27", bucket: "D4_FESTIVAL", minimumStay: 2 },
  { name: "New Year Period", startDate: "2026-12-30", endDate: "2027-01-03", bucket: "D6_NEW_YEAR", minimumStay: 2 },
  { name: "Republic Day Extended Break", startDate: "2027-01-23", endDate: "2027-01-26", bucket: "D3_LONG_WEEKEND", minimumStay: 1 },
  { name: "Valentine Weekend", startDate: "2027-02-12", endDate: "2027-02-14", bucket: "D3_LONG_WEEKEND", minimumStay: 1 },
  { name: "Holi Window", startDate: "2027-03-19", endDate: "2027-03-23", bucket: "D4_FESTIVAL", minimumStay: 2 },
];

const BASE_RATES: Record<Exclude<BookingUnitCode, "GROUP_ENQUIRY">, Record<DemandBucket, number>> = {
  ONE_VILLA: { D1_NORMAL_WEEKDAY: 4_999, D2_FRI_SUN: 5_999, D2S_SATURDAY: 6_499, D3_LONG_WEEKEND: 7_499, D4_FESTIVAL: 8_499, D5_PUSHKAR_FAIR: 9_999, D6_NEW_YEAR: 10_999 },
  BOTH_VILLAS: { D1_NORMAL_WEEKDAY: 9_299, D2_FRI_SUN: 11_199, D2S_SATURDAY: 12_199, D3_LONG_WEEKEND: 14_499, D4_FESTIVAL: 16_999, D5_PUSHKAR_FAIR: 19_999, D6_NEW_YEAR: 25_999 },
};

const MEAL_SUPPLEMENTS: Record<MealPlanCode, number> = { EP: 0, CP: 300, MAP: 1_000, AP: 1_750 };

export function parseDateOnly(value: string): DateOnly {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new Error("Date must use YYYY-MM-DD format.");
  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText); const month = Number(monthText); const day = Number(dayText);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth) throw new Error("Date is not valid.");
  return { year, month, day };
}

export function formatDateOnly(date: DateOnly): string {
  return `${String(date.year).padStart(4, "0")}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

export function addDateOnlyDays(value: string, days: number): string {
  const date = parseDateOnly(value);
  const next = new Date(Date.UTC(date.year, date.month - 1, date.day + days));
  return formatDateOnly({ year: next.getUTCFullYear(), month: next.getUTCMonth() + 1, day: next.getUTCDate() });
}

export function getSpecialRatePeriod(value: string): SpecialRatePeriod | undefined {
  const date = formatDateOnly(parseDateOnly(value));
  return SPECIAL_RATE_PERIODS.find((period) => date >= period.startDate && date <= period.endDate);
}

export function getDemandBucketForDate(value: string): DemandBucket {
  const specialPeriod = getSpecialRatePeriod(value);
  if (specialPeriod) return specialPeriod.bucket;
  const date = parseDateOnly(value);
  const dayOfWeek = new Date(Date.UTC(date.year, date.month - 1, date.day)).getUTCDay();
  if (dayOfWeek === 6) return "D2S_SATURDAY";
  if (dayOfWeek === 0 || dayOfWeek === 5) return "D2_FRI_SUN";
  return "D1_NORMAL_WEEKDAY";
}

export function getBaseAccommodationRate(unit: BookingUnitCode, bucket: DemandBucket): number | null {
  return unit === "GROUP_ENQUIRY" ? null : BASE_RATES[unit][bucket];
}

export function getMealSupplement(mealPlan: MealPlanCode): number {
  return MEAL_SUPPLEMENTS[mealPlan];
}

export function getMaruBookingUnitCode(name: string): BookingUnitCode | undefined {
  return MARU_BOOKING_UNITS.find((unit) => unit.name === name)?.code;
}

export function isMealPlanCode(value: string): value is MealPlanCode {
  return value in MEAL_SUPPLEMENTS;
}

export function calculateStayEstimate(input: { checkIn: string; checkOut: string; bookingUnit: BookingUnitCode; adults: number; children: number; mealPlan: MealPlanCode }): StayEstimate {
  const checkIn = formatDateOnly(parseDateOnly(input.checkIn));
  const checkOut = formatDateOnly(parseDateOnly(input.checkOut));
  if (checkOut <= checkIn) throw new Error("Check-out must be after check-in.");
  if (!Number.isInteger(input.adults) || input.adults < 1) throw new Error("At least one adult is required.");
  if (!Number.isInteger(input.children) || input.children < 0) throw new Error("Children cannot be negative.");

  const dates: string[] = [];
  for (let date = checkIn; date < checkOut; date = addDateOnlyDays(date, 1)) dates.push(date);
  const periods = dates.map(getSpecialRatePeriod).filter((period): period is SpecialRatePeriod => Boolean(period));
  const minimumStayRequired = periods.reduce((highest, period) => Math.max(highest, period.minimumStay), 1);
  const eventNames = [...new Set(periods.map((period) => period.name))];

  if (input.bookingUnit === "GROUP_ENQUIRY") {
    return { nights: dates.length, bookingUnit: input.bookingUnit, adults: input.adults, children: input.children, mealPlan: input.mealPlan, accommodationSubtotal: null, extraAdultSubtotal: null, mealPlanSubtotal: null, estimatedTotal: null, minimumStayRequired, minimumStaySatisfied: dates.length >= minimumStayRequired, eventNames, containsSpecialRate: periods.length > 0, nightlyBreakdown: [] };
  }

  const unit = MARU_BOOKING_UNITS.find((candidate) => candidate.code === input.bookingUnit);
  if (!unit) throw new Error("Booking unit is not valid.");
  const extraAdults = Math.max(0, input.adults - unit.baseAdults);
  const nightlyBreakdown = dates.map((date): NightlyRateBreakdown => {
    const period = getSpecialRatePeriod(date);
    const bucket = period?.bucket ?? getDemandBucketForDate(date);
    const baseAccommodationRate = getBaseAccommodationRate(input.bookingUnit, bucket) ?? 0;
    const extraAdultAccommodation = extraAdults * EXTRA_ADULT_RATE;
    const mealSupplement = input.adults * getMealSupplement(input.mealPlan);
    return { date, bucket, ...(period ? { eventName: period.name } : {}), baseAccommodationRate, extraAdultAccommodation, mealSupplement, nightTotal: baseAccommodationRate + extraAdultAccommodation + mealSupplement };
  });
  const sum = (key: "baseAccommodationRate" | "extraAdultAccommodation" | "mealSupplement" | "nightTotal") => nightlyBreakdown.reduce((total, night) => total + night[key], 0);
  return { nights: dates.length, bookingUnit: input.bookingUnit, adults: input.adults, children: input.children, mealPlan: input.mealPlan, accommodationSubtotal: sum("baseAccommodationRate"), extraAdultSubtotal: sum("extraAdultAccommodation"), mealPlanSubtotal: sum("mealSupplement"), estimatedTotal: sum("nightTotal"), minimumStayRequired, minimumStaySatisfied: dates.length >= minimumStayRequired, eventNames, containsSpecialRate: periods.length > 0, nightlyBreakdown };
}
