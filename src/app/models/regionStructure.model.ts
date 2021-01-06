import { User } from "./user.model";

export interface RegionStructure {
  area: string;
  director: User;
  agents: User[]
}