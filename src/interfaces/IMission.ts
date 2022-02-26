import { Orientations } from "@/constants/orientations";
import { IPosition } from "./IPosition";

export interface IMission {
  commands: string,
  orientation: Orientations,
  startPosition: IPosition
}