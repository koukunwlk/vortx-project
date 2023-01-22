export class GetCallChargesOutput {
  origin: string;
  destination: string;
  planName: string;
  charges: {
    withPlan: string;
    withoutPlan: string;
  };
}
