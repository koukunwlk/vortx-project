import { Injectable } from "@nestjs/common";
import { Plan } from "src/plan/domain/model/entity/plan.model";
import { Tariff } from "src/tariff/domain/model/entity/tariff.model";
import { Call } from "../model/entity/call.model";

type CallCharges = {
	withPlan: string,
	withoutPlan: string
}

export class CallService {
	static getCallCharges(plan: Plan, tariff: Tariff, call: Call) : CallCharges {
		const callDuration = call.getCallDuration()

		const withoutPlan = tariff.getTotalValue(callDuration).toFixed(2)
		const withPlan = this.calculateCallChargeWithPlan(callDuration, plan, tariff).toFixed(2)

		return {
			withPlan,
			withoutPlan
		}
	}

	private static calculateCallChargeWithPlan(callDuration: number, plan: Plan, tariff: Tariff): number {
		const minutesSurchargePercentage = plan.getPercentageSurcharge()
		const minutesToDiscount = plan.getPlanMinutesDiscount()
		const totalMinutes = callDuration - minutesToDiscount
		const chargeWithPlan = tariff.getTotalValue(totalMinutes)

		if(totalMinutes <= 0) {
			return 0
		}

		const totalCharge = this.calculatePercentage(chargeWithPlan, minutesSurchargePercentage)

		return totalCharge;
	}

	private static calculatePercentage(value: number, percentage: number): number {
		const additionalValue = (value / 100) * percentage

		return value + additionalValue
	}
}