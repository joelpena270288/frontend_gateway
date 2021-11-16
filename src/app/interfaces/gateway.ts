import { PeripheralDevice } from "./peripheral-device";

export interface Gateway {
    id: string;
    serial_number: string;
    name: string;
    IPv4: string;
    peripherals_devices:PeripheralDevice[];

}
