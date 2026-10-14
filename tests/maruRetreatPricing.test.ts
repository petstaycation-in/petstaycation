import assert from "node:assert/strict";
import test from "node:test";
import { calculateStayEstimate, getDemandBucketForDate } from "../lib/pricing/maruRetreatPricing.ts";

const oneNight = (date: string, bookingUnit: "ONE_VILLA" | "BOTH_VILLAS" = "ONE_VILLA") => calculateStayEstimate({ checkIn: date, checkOut: nextDate(date), bookingUnit, adults: bookingUnit === "ONE_VILLA" ? 2 : 4, children: 0, mealPlan: "EP" });

function nextDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

test("normal weekday, Friday and festival override rates", () => {
  assert.equal(oneNight("2026-10-15").estimatedTotal, 4_999);
  assert.equal(oneNight("2026-10-16").estimatedTotal, 5_999);
  assert.equal(getDemandBucketForDate("2026-10-17"), "D4_FESTIVAL");
  assert.equal(oneNight("2026-10-17").estimatedTotal, 8_499);
});

test("both villas AP crossing Thursday and Friday", () => {
  const estimate = calculateStayEstimate({ checkIn: "2026-11-12", checkOut: "2026-11-14", bookingUnit: "BOTH_VILLAS", adults: 4, children: 0, mealPlan: "AP" });
  assert.equal(estimate.nights, 2);
  assert.equal(estimate.accommodationSubtotal, 20_498);
  assert.equal(estimate.extraAdultSubtotal, 0);
  assert.equal(estimate.mealPlanSubtotal, 14_000);
  assert.equal(estimate.estimatedTotal, 34_498);
});

test("extra adult is charged accommodation and meals on every night", () => {
  const estimate = calculateStayEstimate({ checkIn: "2026-11-12", checkOut: "2026-11-14", bookingUnit: "BOTH_VILLAS", adults: 5, children: 0, mealPlan: "AP" });
  assert.equal(estimate.accommodationSubtotal, 20_498);
  assert.equal(estimate.extraAdultSubtotal, 3_000);
  assert.equal(estimate.mealPlanSubtotal, 17_500);
  assert.equal(estimate.estimatedTotal, 40_998);
});

test("Pushkar Fair MAP stay and minimum stay", () => {
  const estimate = calculateStayEstimate({ checkIn: "2026-11-17", checkOut: "2026-11-19", bookingUnit: "ONE_VILLA", adults: 2, children: 0, mealPlan: "MAP" });
  assert.equal(estimate.accommodationSubtotal, 19_998);
  assert.equal(estimate.mealPlanSubtotal, 4_000);
  assert.equal(estimate.estimatedTotal, 23_998);
  assert.equal(estimate.minimumStayRequired, 2);
  assert.equal(estimate.minimumStaySatisfied, true);
  assert.deepEqual(estimate.eventNames, ["Pushkar Fair 2026"]);
});

test("one-night Pushkar Fair stay fails minimum stay", () => {
  const estimate = calculateStayEstimate({ checkIn: "2026-11-17", checkOut: "2026-11-18", bookingUnit: "ONE_VILLA", adults: 2, children: 0, mealPlan: "EP" });
  assert.equal(estimate.minimumStayRequired, 2);
  assert.equal(estimate.minimumStaySatisfied, false);
});

test("New Year, Republic Day, Valentine and Holi overrides", () => {
  assert.equal(oneNight("2026-12-31").estimatedTotal, 10_999);
  assert.equal(oneNight("2027-01-23").estimatedTotal, 7_499);
  assert.equal(oneNight("2027-02-13").estimatedTotal, 7_499);
  assert.equal(oneNight("2027-03-20").estimatedTotal, 8_499);
});

test("pets do not participate in the tariff", () => {
  const estimateForAnyAllowedPetCount = calculateStayEstimate({ checkIn: "2026-10-15", checkOut: "2026-10-16", bookingUnit: "ONE_VILLA", adults: 2, children: 0, mealPlan: "EP" });
  assert.equal(estimateForAnyAllowedPetCount.estimatedTotal, 4_999);
  assert.equal("pets" in estimateForAnyAllowedPetCount, false);
});

test("children remain uncharged in the automated estimate", () => {
  const withoutChild = calculateStayEstimate({ checkIn: "2026-10-15", checkOut: "2026-10-16", bookingUnit: "ONE_VILLA", adults: 2, children: 0, mealPlan: "CP" });
  const withChild = calculateStayEstimate({ checkIn: "2026-10-15", checkOut: "2026-10-16", bookingUnit: "ONE_VILLA", adults: 2, children: 1, mealPlan: "CP" });
  assert.equal(withChild.estimatedTotal, withoutChild.estimatedTotal);
});

test("checkout is excluded from charged nights", () => {
  const estimate = calculateStayEstimate({ checkIn: "2026-11-12", checkOut: "2026-11-14", bookingUnit: "ONE_VILLA", adults: 2, children: 0, mealPlan: "EP" });
  assert.deepEqual(estimate.nightlyBreakdown.map((night) => night.date), ["2026-11-12", "2026-11-13"]);
});

test("group enquiry never returns an automated price", () => {
  const estimate = calculateStayEstimate({ checkIn: "2026-11-12", checkOut: "2026-11-14", bookingUnit: "GROUP_ENQUIRY", adults: 8, children: 0, mealPlan: "AP" });
  assert.equal(estimate.estimatedTotal, null);
  assert.equal(estimate.accommodationSubtotal, null);
  assert.deepEqual(estimate.nightlyBreakdown, []);
});
