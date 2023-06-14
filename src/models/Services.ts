export default interface ServiceInterface {
  id: number;
  car_name: string;
  contact: string;
  passengers: number;
  pay_to_driver: boolean;
  realenddatetime: string;
  realendplace: string;
  realstartdatetime: string;
  realstartplace: string;
  servicetype: string;
  to_be_paid: number;
}

export default interface ServiceDetailInterface {
  accepted: any;
  car_id: number;
  car_name: string;
  car_set: boolean;
  cat_name: string;
  contact: string;
  driver_1: string;
  driver_2: string;
  email: string;
  end_kms: number;
  final_end_kms: number;
  flight: string;
  garage: any;
  id: number;
  is_cell: number;
  kms: number;
  notes: string;
  passengers: number;
  pay_to_driver: boolean;
  realenddatetime: string;
  realendplace: string;
  realstartdatetime: string;
  realstartplace: string;
  ref: string
  servicetype: string;
  start_kms: number;
  status: string;
  status_name: string;
  steps: any[];
  suggestedstartdate: string;
  tel: string;
  to_be_paid: number;
  tot_expenses: number;
  travel_sheet: string;
}
