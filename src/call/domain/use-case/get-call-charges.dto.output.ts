export class GetCallChargesOutput {
  origin: string;
  callDuration: number;
  destination: string;
  planName: string;
  charges: {
    withPlan: string;
    withoutPlan: string;
  };
}
